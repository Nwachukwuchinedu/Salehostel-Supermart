import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DatePicker = ({ 
  value, 
  onChange, 
  placeholder = 'Select date',
  error = false,
  className = '',
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDateChange = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  const isDateDisabled = (date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    
    // Previous month's days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-center text-customer-gray-400 text-sm">
          {i}
        </div>
      );
    }

    // Current month's days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isCurrentDate = value && date.toDateString() === new Date(value).toDateString();
      const isToday = date.toDateString() === today.toDateString();
      const disabled = isDateDisabled(date);

      days.push(
        <button
          key={i}
          onClick={() => !disabled && handleDateChange(date)}
          disabled={disabled}
          className={`p-2 text-center text-sm rounded-full w-8 h-8 mx-auto ${
            isCurrentDate
              ? 'bg-customer-primary text-white'
              : isToday
              ? 'bg-customer-primary/10 text-customer-primary'
              : disabled
              ? 'text-customer-gray-300 cursor-not-allowed'
              : 'text-customer-gray-700 hover:bg-customer-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next month's days
    const totalCells = 42; // 6 rows x 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="p-2 text-center text-customer-gray-400 text-sm">
          {i}
        </div>
      );
    }

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-customer-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-customer-gray-600" />
          </button>
          <div className="font-medium text-customer-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-customer-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-customer-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-customer-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={datePickerRef}>
      <div
        className={`flex items-center justify-between rounded-lg border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
            : 'border-customer-gray-300 focus:border-customer-primary focus:ring-customer-primary/50'
        } ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-3 py-2 text-customer-gray-700">
          {value ? formatDate(new Date(value)) : placeholder}
        </div>
        <div className="px-3 py-2">
          <Calendar className="w-5 h-5 text-customer-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg shadow-lg bg-white border border-customer-gray-200">
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;