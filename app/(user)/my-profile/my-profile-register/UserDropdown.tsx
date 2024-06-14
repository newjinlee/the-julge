'use client';

import Image from 'next/image';
import UpArrow from '@/public/dropdown-up.png';
import DownArrow from '@/public/dropdown-down.png';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionSelected: (option: string) => void;
}

export default function Dropdown({ label, options, selectedOption, onOptionSelected }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleOptionClick = (option: string) => {
    onOptionSelected(option); // Use the passed handler
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2 mb-8 relative">
      <label>{label}</label>
      <div
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="flex justify-between items-center bg-white px-5 py-4 border border-solid border-gray-300 rounded-md">
        <span className={`flex items-center ${selectedOption ? 'text-black' : 'text-gray-400'}`}>
          {selectedOption || '선택'}
        </span>
        <Image src={isOpen ? UpArrow : DownArrow} width={16} height={16} alt="Toggle" />
      </div>
      {isOpen && (
        <ul className="absolute mt-2 top-full left-0 w-full z-10 bg-white shadow-md max-h-[230px] overflow-y-auto">
          {options.map(option => (
            <li key={option} className="text-center hover:bg-gray-100">
              <button className="w-full py-3" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
