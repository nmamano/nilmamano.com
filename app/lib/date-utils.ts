/**
 * Format a date string (YYYY-MM-DD) to a human-readable format (Month D, YYYY)
 */
export function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = dateString.split("-");
  const monthIndex = parseInt(month, 10) - 1; // 0-based index
  const formattedDay = parseInt(day, 10); // Remove leading zero if present

  return `${months[monthIndex]} ${formattedDay}, ${year}`;
}
