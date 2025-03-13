import React, { useCallback } from "react";

interface CalendarProps {
  month: number;
  year: number;
  isDark: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ month, year }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [currentMonth, setCurrentMonth] = React.useState(month);
  const [currentYear, setCurrentYear] = React.useState(year);

  const handleMonthChange = useCallback((offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  }, [currentMonth, currentYear]);

  const handleDecreaseMonth = useCallback(() => handleMonthChange(-1), [handleMonthChange]);
  const handleIncreaseMonth = useCallback(() => handleMonthChange(1), [handleMonthChange]);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDayOfMonth = (firstDayOfMonth + 6) % 7;

  return (
    <div
      className={`calendar bg-gray-50 text-black dark:bg-background-dark dark:text-white w-140 h-140 rounded-lg`}
    >
      <div className="px-16 py-16">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-2xl font-inter font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex space-x-4">
            <button onClick={handleDecreaseMonth}>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current text-black dark:text-white"
              >
                <path
                  d="M6.70275 1.00001L1.0459 6.65686L6.70275 12.3137"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={handleIncreaseMonth}>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current text-black dark:text-white"
              >
                <path
                  d="M1.01649 1.00001L6.67334 6.65686L1.01649 12.3137"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: adjustedFirstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8 w-8"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            return (
              <div
                key={day}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
