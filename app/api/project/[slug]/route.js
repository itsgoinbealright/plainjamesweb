import { google } from 'googleapis';
import { projectSheets } from '@/lib/projectSheets';

function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
  });
}

function parseEstimateData(header, scopeRows, lineItems) {
  const getValue = (label) => {
    const row = header.find(r => r[0] === label);
    return row ? row[1] || '' : '';
  };

  // Scope is in rows 13-17 (merged cells) - combine non-empty cells
  const scope = scopeRows
    .map(row => row[0])
    .filter(Boolean)
    .join(' ')
    .trim();

  const items = lineItems
    .filter(row => {
      return row[0] && row[1] && row[3] && !row[0].includes('SECTION') && row[0] !== 'Section';
    })
    .map(row => ({
      section: row[0] || '',
      qty: parseFloat(row[1]) || 0,
      unit: row[2] || '',
      description: row[3] || '',
      unitPrice: parseFloat(row[6]?.toString().replace(/[$,]/g, '')) || 0,
      lineTotal: parseFloat(row[7]?.toString().replace(/[$,]/g, '')) || 0,
      clientGroup: row[8] || 'Other', // Column I - Client Group
    }))
    .filter(item => item.qty > 0);

  // Detailed grouping by Section (for your reference)
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  // Consolidated grouping by Client Group (for client view)
  const clientGroupTotals = items.reduce((acc, item) => {
    const group = item.clientGroup || 'Other';
    if (!acc[group]) acc[group] = 0;
    acc[group] += item.lineTotal;
    return acc;
  }, {});

  // Convert to array and sort by a logical order
  const groupOrder = ['Labour', 'Sheet Goods', 'Hardwood', 'Finishing', 'Hardware', 'Fasteners', 'Other'];
  const clientGroups = Object.entries(clientGroupTotals)
    .map(([group, total]) => ({ group, total }))
    .filter(item => item.total > 0)
    .sort((a, b) => {
      const aIndex = groupOrder.indexOf(a.group);
      const bIndex = groupOrder.indexOf(b.group);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  return {
    projectId: getValue('Estimate ID'),
    clientName: getValue('Client Name'),
    clientEmail: getValue('Client Email'),
    clientPhone: getValue('Client Phone'),
    projectAddress: getValue('Project Address'),
    date: getValue('Date'),
    validUntil: getValue('Valid Until'),
    scope,
    lineItems: items,
    groupedItems,      // Detailed view (by Section)
    clientGroups,      // Consolidated view (by Client Group)
    subtotal,
    gst,
    total,
  };
}

function parseInvoices(rows) {
  return rows
    .filter(row => row[0] && row[0].startsWith('INV'))
    .map(row => ({
      invoiceId: row[0] || '',
      type: row[1] || '',
      dateIssued: row[2] || '',
      dueDate: row[3] || '',
      subtotal: parseFloat(row[4]?.toString().replace(/[$,]/g, '')) || 0,
      gst: parseFloat(row[5]?.toString().replace(/[$,]/g, '')) || 0,
      total: parseFloat(row[6]?.toString().replace(/[$,]/g, '')) || 0,
      status: row[7] || 'Draft',
      paidDate: row[8] || '',
      paymentMethod: row[9] || '',
      notes: row[10] || '',
    }))
    .filter(inv => inv.total > 0 || inv.status !== 'Draft');
}

function parseInvoiceSummary(rows) {
  const getValue = (label) => {
    const row = rows.find(r => r[0] === label);
    return row ? parseFloat(row[1]?.toString().replace(/[$,]/g, '')) || 0 : 0;
  };

  return {
    contractTotal: getValue('Contract Total'),
    totalInvoiced: getValue('Total Invoiced'),
    paidToDate: getValue('Paid to Date'),
    balanceRemaining: getValue('Balance Remaining'),
  };
}

function parseCalendar(rows) {
  return rows
    .filter(row => row[0] && row[1] && row[0].match(/^\d{4}-\d{2}-\d{2}$/))
    .map(row => ({
      date: row[0] || '',
      event: row[1] || '',
      type: row[2] || '',
      notes: row[3] || '',
    }));
}

function parseProject(rows) {
  const getValue = (label) => {
    const row = rows.find(r => r[0] === label);
    return row ? row[1] || '' : '';
  };

  return {
    stage: getValue('Stage'),
    password: getValue('Password'),
    startDate: getValue('Start Date'),
    targetCompletion: getValue('Target Completion'),
    clientPinterest: getValue('Client Pinterest'),
    contractorPinterest: getValue('Contractor Pinterest'),
  };
}

export async function GET(request, { params }) {
  const { slug } = await params;

  const spreadsheetId = projectSheets[slug];

  if (!spreadsheetId) {
    return Response.json({ error: 'Project not found' }, { status: 404 });
  }

  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch all tabs in one batch request
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: [
        'Estimate!A3:B10',      // Header info (client details)
        'Estimate!A13:A17',     // Scope of work (rows 13-17)
        'Estimate!A20:I100',    // Line items (now includes Column I for Client Group)
        'Invoices!A4:K20',      // Invoice rows
        'Invoices!A22:B26',     // Invoice summary
        'Calendar!A4:D20',      // Calendar events
        'Project!A3:B10',       // Project info
      ],
    });

    const [
      headerData,
      scopeData,
      lineItemsData,
      invoicesData,
      invoiceSummaryData,
      calendarData,
      projectData,
    ] = response.data.valueRanges.map(r => r.values || []);

    const estimate = parseEstimateData(headerData, scopeData, lineItemsData);
    const invoices = parseInvoices(invoicesData);
    const invoiceSummary = parseInvoiceSummary(invoiceSummaryData);
    const calendar = parseCalendar(calendarData);
    const project = parseProject(projectData);

    return Response.json({
      success: true,
      slug,
      estimate,
      invoices,
      invoiceSummary,
      calendar,
      project,
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Failed to fetch project data', details: error.message },
      { status: 500 }
    );
  }
}