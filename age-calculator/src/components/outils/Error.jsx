
// Function to validate the 'day' input
export const validateDay = (
  days,
  months,
  years,
  isValidDayForMonth,
  setErrors
) => {
  let error = "";

  // If the day field is empty, set an error message
  if (days === "") {
    error = "This field is required";
  } else {
    // Convert the input values to integers
    const day = parseInt(days, 10);
    const month = parseInt(months, 10);
    const year = parseInt(years, 10);

    // If the month is invalid, stop validation here (return true, meaning valid by assumption)
    if (isNaN(month) || month < 1 || month > 12) {
      return true;
    }
    // Check if the day is within a valid range (1-31)
    if (isNaN(day) || day < 1 || day > 31) {
      error = "Must be a valid day";
    } else if (!isValidDayForMonth(day, month, year)) {
      error = "Must be a valid day for the given month";
    }
  }
  // Update the 'day' field's error message in the state
  setErrors((prevErrors) => ({ ...prevErrors, day: error }));
  return error === "";
};

// Function to check if the day is valid for the specific month and year
export const isValidDayForMonth = (day, month, year) => {
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1;
};

// Function to validate the 'month' input
export const validateMonth = (months, setErrors) => {
  let error = "";

  if (months === "") {
    error = "This field is required";
  } else {
    const month = parseInt(months, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      error = "Must be a valid month";
    }
  }

  setErrors((prevErrors) => ({ ...prevErrors, month: error }));
  return error === "";
};

// Function to validate the 'year' input
export const validateYear = (years, dateToday, setErrors) => {
  const year = parseInt(years, 10);
  let error = "";
  const currentYear = dateToday.getFullYear();

  if (isNaN(year) || year > currentYear) {
    error = "Must be a valid year";
  }
  if (years === "") {
    error = "This field is required";
  }
  setErrors((prevErrors) => ({ ...prevErrors, year: error }));
  return error === "";
};
