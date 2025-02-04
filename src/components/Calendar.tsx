import React from "react";

interface CalendarProps {
  month: number;
  year: number;
  isDark: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ month, year }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [currentMonth, setCurrentMonth] = React.useState(month);
  const [currentYear, setCurrentYear] = React.useState(year);

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };
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
            <button onClick={() => handleMonthChange(-1)}>
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
            <button onClick={() => handleMonthChange(1)}>
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
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2">Mon</th>
              <th className="p-2">Tue</th>
              <th className="p-2">Wed</th>
              <th className="p-2">Thu</th>
              <th className="p-2">Fri</th>
              <th className="p-2">Sat</th>
              <th className="p-2">Sun</th>
            </tr>
          </thead>
            <tbody>
            {Array.from(
              {
              length: Math.max(6, Math.ceil((daysInMonth + adjustedFirstDayOfMonth) / 7)),
              },
              (_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                const day =
                  weekIndex * 7 + dayIndex - adjustedFirstDayOfMonth + 1;
                return (
                  <td
                  key={dayIndex}
                  className={`p-2 ${
                    day > 0 && day <= daysInMonth
                    ? "text-gray-800 dark:text-white"
                    : ""
                  }`}
                  >
                  {day > 0 && day <= daysInMonth ? (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-red dark:hover:bg-background-green hover:text-white">
                    {day}
                    </div>
                  ) : (
                    ""
                  )}
                  </td>
                );
                })}
              </tr>
              )
            )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
