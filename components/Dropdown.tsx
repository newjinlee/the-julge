'use client';

import Image from 'next/image';
import UpArrow from '@/public/dropdown-up.png';
import DownArrow from '@/public/dropdown-down.png';
import { useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
}

export default function Dropdown({ label, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 mb-8">
      <label>{label}</label>
      <div className="flex justify-between bg-white px-5 py-4  border border-solid border-gray-300 rounded-md">
        <span className={`flex items-center ${selectedOption ? 'text-black' : 'text-gray-400'}`}>
          {selectedOption || '선택'}
        </span>
        <button onClick={toggleDropdown}>
          {isOpen ? (
            <Image src={UpArrow} className="w-4 h-4" alt="UpArrow" />
          ) : (
            <Image src={DownArrow} className="w-4 h-4" alt="DownArrow" />
          )}
        </button>
      </div>
      {isOpen && (
        <ul className="shadow-md">
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
