'use client';

import Image from 'next/image';
import UpArrow from '@/public/dropdown-up.png';
import DownArrow from '@/public/dropdown-down.png';
import { memo, useEffect, useRef, useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  name: string;
  onChange: (option: string) => void;
}

function Dropdown({ label, options, name, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
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
      <label htmlFor={name}>{label}</label>
      <div
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="flex justify-between bg-white px-5 py-4 border border-solid border-gray-300 rounded-md">
        <span className={`flex items-center ${value ? 'text-black' : 'text-gray-400'}`}>{value || '선택'}</span>
        <button>
          {isOpen ? (
            <Image src={UpArrow} className="w-4 h-4" alt="UpArrow" />
          ) : (
            <Image src={DownArrow} className="w-4 h-4" alt="DownArrow" />
          )}
        </button>
      </div>
      {isOpen && (
        <ul className="shadow-md absolute mt-2 top-full left-0 w-full z-10 max-h-[230px] overflow-y-auto">
          {options.map(option => (
            <li key={option} className="py-3 bg-white hover:bg-gray-100 border-b-2 text-center">
              <button className="w-full" type="button" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(Dropdown);
