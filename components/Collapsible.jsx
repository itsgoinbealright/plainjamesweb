'use client';

import { useState } from 'react';

export default function Collapsible({ title, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="mb-4">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-4 px-5 bg-[#E8E4DF] text-left hover:bg-[#DFDBCE] transition-colors"
      >
        <span className="text-xs font-medium tracking-widest text-[#5C5C5C] uppercase">
          {title}
        </span>
        <span className="text-[#7C8C6E] text-lg">
          {isOpen ? String.fromCharCode(9679) : String.fromCharCode(9675)}
        </span>
      </button>
      
      {isOpen ? (
        <div className="mt-px">
          <div className="bg-[#E8E4DF] p-5">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}