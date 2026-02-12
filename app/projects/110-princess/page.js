'use client'

import { useState, useMemo } from 'react'

// — Data ————————————————————————————————————————
const PROJECT = {
  name: '110 Princess St — Unit 101',
  location: 'Fairchild Building · Exchange District',
  sf: '~2,753 sf',
  budget: 150000,
}

const SECTIONS = [
  {
    id: 'overall',
    title: 'Overall',
    items: [
      { id: 'paint', name: 'Paint', note: 'Patch, repair, cover it all', type: 'sf' },
      { id: 'hardwood', name: 'Hardwood repair & refinish', type: 'sf' },
      { id: 'blinds', name: 'Electric blinds', type: 'sf' },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    items: [
      { id: 'kitchen-millwork', name: 'Millwork', note: 'Boxes, fronts, storage shelves and counters', type: 'lump' },
      { id: 'kitchen-plumbing', name: 'Plumbing', note: 'Rough-in and water lines', type: 'lump' },
      { id: 'kitchen-electrical', name: 'Electrical', note: 'Appliance additions, plugs', type: 'lump' },
      { id: 'kitchen-appliances', name: 'Appliances', type: 'lump' },
    ],
  },
  {
    id: 'offices',
    title: 'Offices',
    items: [
      { id: 'offices-soundproofing', name: 'Soundproofing', note: '3 partition walls — insulation, drywall, interior windows', type: 'lump' },
      { id: 'offices-doors', name: 'Doors × 3', note: 'Solid-core hinged replacing barn doors', type: 'lump' },
      { id: 'offices-millwork', name: 'Millwork — far office', note: 'Storage cabinets, electrical box build-around', type: 'lump' },
      { id: 'offices-rugs', name: 'Rugs', type: 'lump' },
    ],
  },
  {
    id: 'sunken',
    title: 'Sunken Area',
    items: [
      { id: 'sunken-millwork', name: 'Millwork', note: 'Railing, bar seating, banked seating', type: 'lump' },
      { id: 'sunken-electrical', name: 'Electrical', note: 'Any additions / movements', type: 'lump' },
    ],
  },
  {
    id: 'boardroom',
    title: 'Boardroom',
    items: [
      { id: 'boardroom-millwork', name: 'Millwork', note: 'Media cabinet, storage, mini fridge accommodation', type: 'lump' },
    ],
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    items: [
      { id: 'bathrooms-cosmetic', name: 'Cosmetic', type: 'lump' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    items: [
      { id: 'storage-east', name: 'Call room east', type: 'lump' },
      { id: 'storage-west', name: 'Call room west', type: 'lump' },
    ],
  },
  {
    id: 'commons',
    title: 'Commons Area',
    items: [
      { id: 'commons-furniture', name: 'Furniture', note: 'Modular work / display tables', type: 'lump' },
      { id: 'commons-electrical', name: 'Electrical', note: 'Port additions', type: 'lump' },
    ],
  },
  {
    id: 'permits',
    title: 'Permits, Design & Management',
    items: [
      { id: 'permits-permits', name: 'Permits', type: 'lump' },
      { id: 'permits-design', name: 'Design', type: 'lump' },
      { id: 'permits-management', name: 'Management', type: 'lump' },
    ],
  },
]

// — Helpers ———————————————————————————————————————
function fmt(n) {
  if (n === 0) return '$0'
  return '$' + Math.round(n).toLocaleString('en-CA')
}

const inputBase =
  'font-mono text-[13px] text-[#6B5744] bg-[#F5F0E8] border border-transparent px-2 py-1.5 text-right transition-colors focus:outline-none focus:border-[#A68B6B] focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'

// — Components ————————————————————————————————————
function SfInput({ id, values, onChange }) {
  const sf = values[`${id}-sf`] || ''
  const rate = values[`${id}-rate`] || ''
  const sub = (parseFloat(sf) || 0) * (parseFloat(rate) || 0)

  return (
    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
      <div className="flex items-center gap-1">
        <input
          type="number"
          className={`${inputBase} w-[60px]`}
          placeholder="sf"
          value={sf}
          onChange={(e) => onChange(`${id}-sf`, e.target.value)}
        />
        <span className="text-[11px] text-[#C4B9A8]">×</span>
        <input
          type="number"
          className={`${inputBase} w-[60px]`}
          placeholder="$"
          value={rate}
          onChange={(e) => onChange(`${id}-rate`, e.target.value)}
        />
      </div>
      <div className="font-mono text-[13px] text-[#6B5744] font-medium min-w-[70px] text-right">
        {sub > 0 ? fmt(sub) : '—'}
      </div>
    </div>
  )
}

function LumpInput({ id, values, onChange }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <input
        type="number"
        className={`${inputBase} w-[90px]`}
        placeholder="0"
        value={values[id] || ''}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  )
}

function Card({ section, values, onChange, total }) {
  return (
    <div className="bg-white border border-[#C4B9A8] mb-6 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-[#1A1A1A] text-white">
        <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase">
          {section.title}
        </h3>
        <div className="font-mono text-sm font-medium text-[#C4B9A8]">
          {fmt(total)}
        </div>
      </div>
      <div>
        {section.items.map((item, i) => (
          <div
            key={item.id}
            className={`px-6 py-3.5 ${
              i < section.items.length - 1 ? 'border-b border-[#F5F0E8]' : ''
            } ${
              item.type === 'sf'
                ? 'flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4'
                : 'grid grid-cols-[1fr_auto] items-center gap-4'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="text-sm font-medium text-[#2D2D2D]">{item.name}</div>
              {item.note && (
                <div className="text-[11px] text-[#8C8278] leading-snug">{item.note}</div>
              )}
            </div>
            {item.type === 'sf' ? (
              <SfInput id={item.id} values={values} onChange={onChange} />
            ) : (
              <LumpInput id={item.id} values={values} onChange={onChange} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// — Page ——————————————————————————————————————————
export default function PrincessEstimate() {
  const [values, setValues] = useState({})

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const { cardTotals, subtotal, gst, grand, remaining } = useMemo(() => {
    const cardTotals = {}

    SECTIONS.forEach((section) => {
      let total = 0
      section.items.forEach((item) => {
        if (item.type === 'sf') {
          const sf = parseFloat(values[`${item.id}-sf`]) || 0
          const rate = parseFloat(values[`${item.id}-rate`]) || 0
          total += sf * rate
        } else {
          total += parseFloat(values[item.id]) || 0
        }
      })
      cardTotals[section.id] = total
    })

    const subtotal = Object.values(cardTotals).reduce((a, b) => a + b, 0)
    const gst = subtotal * 0.05
    const grand = subtotal + gst
    const remaining = PROJECT.budget - grand

    return { cardTotals, subtotal, gst, grand, remaining }
  }, [values])

  return (
    <div className="max-w-[820px] mx-auto px-10 pt-16 pb-20 antialiased text-[#2D2D2D]">

      {/* Header */}
      <div className="flex justify-between items-start mb-12 pb-8 border-b-2 border-[#1A1A1A]">
        <div>
          <h1 className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#1A1A1A]">
            Plain James
          </h1>
        </div>
        <div className="text-right text-xs text-[#8C8278] leading-relaxed">
          <strong className="text-[#1A1A1A] font-medium">{PROJECT.name}</strong><br />
          {PROJECT.location}<br />
          {PROJECT.sf}
        </div>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <h2 className="text-[28px] font-bold text-[#1A1A1A] mb-1.5 tracking-tight">
          Renovation Estimate
        </h2>
        <div className="text-sm text-[#8C8278] mb-4">
          {PROJECT.location} · Winnipeg
        </div>
        <div className="text-xs italic text-[#A68B6B] bg-[#F5F0E8] px-3.5 py-2.5 inline-block">
          This estimate is for price discovery — not a final quote
        </div>
      </div>

      {/* Cards */}
      {SECTIONS.map((section) => (
        <Card
          key={section.id}
          section={section}
          values={values}
          onChange={handleChange}
          total={cardTotals[section.id]}
        />
      ))}

      {/* Totals */}
      <div className="mt-10 pt-6 border-t-2 border-[#1A1A1A]">
        <div className="flex justify-between items-baseline py-2 pt-4">
          <div className="text-sm text-[#8C8278]">Subtotal</div>
          <div className="font-mono text-sm text-[#2D2D2D] font-medium">{fmt(subtotal)}</div>
        </div>
        <div className="flex justify-between items-baseline py-2">
          <div className="text-sm text-[#8C8278]">GST 5%</div>
          <div className="font-mono text-sm text-[#2D2D2D] font-medium">{fmt(gst)}</div>
        </div>
        <div className="flex justify-between items-baseline py-4 mt-2 border-t border-[#C4B9A8]">
          <div className="text-lg font-bold text-[#1A1A1A]">Total</div>
          <div className="font-mono text-lg font-bold text-[#1A1A1A]">{fmt(grand)}</div>
        </div>
        <div className="flex justify-between items-baseline pt-6 py-2">
          <div className="text-xs text-[#A68B6B]">Budget target</div>
          <div className="font-mono text-xs text-[#A68B6B]">{fmt(PROJECT.budget)}</div>
        </div>
        <div className="flex justify-between items-baseline py-2">
          <div className="text-xs text-[#A68B6B]">Remaining</div>
          <div
            className="font-mono text-xs font-bold"
            style={{ color: remaining >= 0 ? '#7A8B6F' : '#c0392b' }}
          >
            {fmt(remaining)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-[#C4B9A8] flex justify-between items-end">
        <p className="text-[11px] text-[#8C8278] leading-relaxed">
          Verify all quantities on site before finalizing.<br />
          All costs CAD.
        </p>
        <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#1A1A1A]">
          Plain James
        </div>
      </div>
    </div>
  )
}