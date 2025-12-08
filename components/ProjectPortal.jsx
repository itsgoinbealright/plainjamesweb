'use client';

import { useState } from 'react';
import Image from 'next/image';
import StatusBar from './StatusBar';
import Collapsible from './Collapsible';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export default function ProjectPortal({ estimate, invoices, invoiceSummary, calendar, project }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const checkPassword = () => {
    if (password === project?.password || password === 'oak2024') {
      setAuthenticated(true);
    } else {
      setError(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center px-4">
        <div className="bg-[#E8E4DF] p-8 max-w-sm w-full">
          <Image src="/logo.svg" alt="plain james" width={200} height={40} className="w-2/3 h-auto mb-6" />
          <p className="text-[#5C5C5C] text-sm mb-6">Enter your project password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
            placeholder="Password"
            className="w-full bg-[#F5F3EF] border-0 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#7C8C6E]"
          />
          <button
            onClick={checkPassword}
            className="w-full bg-[#7C8C6E] text-white py-3 font-medium hover:bg-[#6B7A5E] transition-colors"
          >
            View Project
          </button>
          {error && <p className="text-[#C17C60] text-sm mt-3">Incorrect password</p>}
        </div>
      </div>
    );
  }

  const hasClientPinterest = project?.clientPinterest;
  const hasContractorPinterest = project?.contractorPinterest;
  const hasInvoices = invoices && invoices.length > 0;
  const hasCalendar = calendar && calendar.length > 0;
  const hasScope = estimate?.scope && estimate.scope.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <header className="sticky top-0 bg-[#F5F3EF] z-50 px-5 py-6 flex justify-end">
        <Image src="/logo.svg" alt="plain james" width={320} height={60} className="w-4/5 max-w-[320px] h-auto" />
      </header>

      <div className="px-5 pb-8">
        <StatusBar project={project} estimate={estimate} calendar={calendar} />

        <Collapsible title="Inspiration" defaultOpen={false}>
          <div className="space-y-4">
            {hasClientPinterest ? (
              <div>
                <p className="text-xs text-[#5C5C5C] mb-2">Your Board</p>
                <a
                  href={project.clientPinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C8C6E] text-sm hover:underline"
                >
                  View Pinterest
                </a>
              </div>
            ) : null}
            {hasContractorPinterest ? (
              <div>
                <p className="text-xs text-[#5C5C5C] mb-2">Our Vision</p>
                <a
                  href={project.contractorPinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C8C6E] text-sm hover:underline"
                >
                  View Pinterest
                </a>
              </div>
            ) : null}
            {!hasClientPinterest && !hasContractorPinterest ? (
              <p className="text-[#A8A8A8] text-sm">No inspiration boards added yet</p>
            ) : null}
          </div>
        </Collapsible>

        <Collapsible title="Estimate" defaultOpen={true}>
          {/* Scope of Work */}
          {hasScope && (
            <div className="mb-6 pb-6 border-b border-[#D4D4D4]">
              <p className="text-xs font-medium text-[#7C8C6E] tracking-wide mb-3">
                SCOPE OF WORK
              </p>
              <p className="text-sm text-[#5C5C5C] leading-relaxed">
                {estimate.scope}
              </p>
            </div>
          )}

          {/* Consolidated Client Groups */}
          {estimate?.clientGroups && estimate.clientGroups.length > 0 ? (
            <div className="mb-4">
              {estimate.clientGroups.map((item, idx) => (
                <div key={idx} className="flex justify-between py-3 border-b border-[#D4D4D4]">
                  <span className="text-sm text-[#2C2C2C]">{item.group}</span>
                  <span className="text-sm text-[#2C2C2C]">{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback to detailed view if no client groups */
            Object.entries(estimate?.groupedItems || {}).map(([section, items]) => (
              <div key={section} className="mb-6">
                <p className="text-xs font-medium text-[#7C8C6E] tracking-wide mb-3">
                  {section.toUpperCase()}
                </p>
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-[#D4D4D4]">
                    <div className="flex-1">
                      <span className="text-sm text-[#2C2C2C]">{item.description}</span>
                      <span className="text-xs text-[#A8A8A8] ml-2">
                        {item.qty} {item.unit}
                      </span>
                    </div>
                    <span className="text-sm text-[#2C2C2C]">
                      {item.lineTotal > 0 ? formatCurrency(item.lineTotal) : '-'}
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}

          {/* Totals */}
          <div className="border-t border-[#2C2C2C] pt-4 mt-4">
            <div className="flex justify-between py-1 text-sm">
              <span className="text-[#5C5C5C]">Subtotal</span>
              <span className="text-[#2C2C2C]">{formatCurrency(estimate?.subtotal || 0)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm">
              <span className="text-[#5C5C5C]">GST (5%)</span>
              <span className="text-[#2C2C2C]">{formatCurrency(estimate?.gst || 0)}</span>
            </div>
            <div className="flex justify-between py-2 text-base font-medium">
              <span className="text-[#2C2C2C]">Total</span>
              <span className="text-[#2C2C2C]">{formatCurrency(estimate?.total || 0)}</span>
            </div>
          </div>
        </Collapsible>

        <Collapsible title="Payments" defaultOpen={false}>
          <div className="mb-4">
            <div className="flex justify-between py-2">
              <span className="text-sm text-[#5C5C5C]">Contract Total</span>
              <span className="text-sm font-medium text-[#2C2C2C]">
                {formatCurrency(invoiceSummary?.contractTotal || 0)}
              </span>
            </div>
          </div>
          {hasInvoices ? (
            <div className="space-y-3 mb-4">
              {invoices.map((inv, idx) => {
                const isPaid = inv.status === 'Paid';
                const dateText = isPaid ? 'Paid ' + inv.paidDate : 'Due ' + inv.dueDate;
                return (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-[#D4D4D4]">
                    <div className="flex items-center gap-3">
                      <span className={isPaid ? 'w-2 h-2 rounded-full bg-[#7C8C6E]' : 'w-2 h-2 rounded-full bg-[#C17C60]'} />
                      <div>
                        <p className="text-sm text-[#2C2C2C]">{inv.type}</p>
                        <p className="text-xs text-[#A8A8A8]">{dateText}</p>
                      </div>
                    </div>
                    <span className="text-sm text-[#2C2C2C]">{formatCurrency(inv.total)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#A8A8A8] text-sm mb-4">No invoices yet</p>
          )}
          <div className="border-t border-[#2C2C2C] pt-4">
            <div className="flex justify-between py-1 text-sm">
              <span className="text-[#5C5C5C]">Paid to Date</span>
              <span className="text-[#7C8C6E]">{formatCurrency(invoiceSummary?.paidToDate || 0)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm font-medium">
              <span className="text-[#2C2C2C]">Balance Remaining</span>
              <span className="text-[#2C2C2C]">{formatCurrency(invoiceSummary?.balanceRemaining || 0)}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#D4D4D4]">
            <p className="text-xs text-[#5C5C5C]">E-transfer to</p>
            <p className="text-sm text-[#7C8C6E]">howdy@plainjames.ca</p>
          </div>
        </Collapsible>

        <Collapsible title="Schedule" defaultOpen={false}>
          {hasCalendar ? (
            <div className="space-y-3">
              {calendar.map((event, idx) => {
                const eventDate = new Date(event.date);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleDateString('en-CA', { month: 'short' });
                let badgeClass = 'bg-[#D4D4D4] text-[#5C5C5C]';
                if (event.type === 'Site') {
                  badgeClass = 'bg-[#7C8C6E] text-white';
                } else if (event.type === 'Shop') {
                  badgeClass = 'bg-[#A8A8A8] text-white';
                } else if (event.type === 'Milestone') {
                  badgeClass = 'bg-[#C41E3A] text-white';
                }
                return (
                  <div key={idx} className="flex items-start gap-3 py-2 border-b border-[#D4D4D4]">
                    <div className="text-center min-w-[50px]">
                      <p className="text-lg font-medium text-[#2C2C2C]">{day}</p>
                      <p className="text-xs text-[#A8A8A8] uppercase">{month}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#2C2C2C]">{event.event}</p>
                      <span className={'text-xs px-2 py-0.5 ' + badgeClass}>{event.type}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#A8A8A8] text-sm">No events scheduled yet</p>
          )}
        </Collapsible>

        <Collapsible title="Files" defaultOpen={false}>
          <p className="text-[#A8A8A8] text-sm">Coming soon</p>
        </Collapsible>

        <footer className="mt-8 pt-6 border-t border-[#D4D4D4] text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-[#5C5C5C]">
            <a href="https://instagram.com/plainjames.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C8C6E]">IG</a>
            <span>-</span>
            <a href="mailto:howdy@plainjames.ca" className="hover:text-[#7C8C6E]">howdy@plainjames.ca</a>
          </div>
        </footer>
      </div>
    </div>
  );
}