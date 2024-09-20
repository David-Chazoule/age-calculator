 export const calculAge = ( dateToday, birthDate,setYearsResult,setMonthResult,setDaysResult) => {
  const yearToday = dateToday.getFullYear();
  const monthToday = dateToday.getMonth();
  const dayToday = dateToday.getDate();

  const yearBirth = birthDate.getFullYear();
  const monthBirth = birthDate.getMonth();
  const dayBirth = birthDate.getDate();

  let year = yearToday - yearBirth;
  let month = monthToday - monthBirth;
  let day = dayToday - dayBirth;

  if (day < 0) {
    month--;
    const lastMonth = new Date(yearToday, monthToday - 1, 0);
    day += lastMonth.getDate();
  }

  if (month < 0) {
    year--;
    month += 12;
  }

  setYearsResult(year);
  setMonthResult(month);
  setDaysResult(day);
};