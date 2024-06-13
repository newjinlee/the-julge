import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomCalendarProps {
  label: string | null;
  value: string | null;
  isTime: boolean;
  onChange: (date: string | null) => void;
}

export default function Calendar({ label, value, isTime = false, onChange }: CustomCalendarProps) {
  const initialDate = value ? new Date(value) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedTime, setSelectedTime] = useState<Date | null>(initialDate);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      const combinedDate = new Date(date);
      combinedDate.setHours(selectedTime.getHours());
      combinedDate.setMinutes(selectedTime.getMinutes());
      combinedDate.setSeconds(0);
      combinedDate.setMilliseconds(0);
      onChange(combinedDate.toISOString());
    } else if (date && !isTime) {
      const localDate = new Date(date);
      localDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
      onChange(localDate.toISOString());
    } else {
      onChange(null);
    }
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
    if (selectedDate && time) {
      const combinedDate = new Date(selectedDate);
      combinedDate.setHours(time.getHours());
      combinedDate.setMinutes(time.getMinutes());
      combinedDate.setSeconds(0);
      combinedDate.setMilliseconds(0);
      onChange(combinedDate.toISOString());
    } else {
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-8 relative">
      <label>{label}</label>
      <div className="flex flex-row gap-2">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy.MM.dd"
          className={`px-5 py-4 bg-white border border-solid border-gray-300 rounded-md ${isTime ? 'w-[180px]' : 'w-[308px]'}`}
          minDate={new Date()}
          placeholderText="날짜 선택"
        />
        {isTime && (
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="시간"
            dateFormat="HH:mm"
            className="w-[120px] px-5 py-4 bg-white border border-solid border-gray-300 rounded-md"
            placeholderText="시간 선택"
          />
        )}
      </div>
    </div>
  );
}
