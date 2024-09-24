import React, { useState, useEffect } from "react";
import arrow from "../assets/images/icon-arrow.svg";
import {
  validateDay,
  isValidDayForMonth,
  validateMonth,
  validateYear,
} from "./outils/Error";
import { calculAge } from "./outils/Calcul";

function Birthday() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [monthResult, setMonthResult] = useState(0);
  const [yearsResult, setYearsResult] = useState(0);
  const [daysResult, setDaysResult] = useState(0);
  const [isCalculed, setIsCalculted] = useState(false);
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  // States for animated display
  const [displayYearsResult, setDisplayYearsResult] = useState(0);
  const [displayMonthResult, setDisplayMonthResult] = useState(0);
  const [displayDaysResult, setDisplayDaysResult] = useState(0);

  // get the current date
  const dateToday = new Date();
  //create a new date object with data recorded by the user
  const birthDate = new Date(years, months - 1, days);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDayValid = validateDay(
      days,
      months,
      years,
      isValidDayForMonth,
      setErrors
    );
    const isMonthValid = validateMonth(months, setErrors);
    const isYearValid = validateYear(years, dateToday, setErrors);

    if (!isDayValid || !isMonthValid || !isYearValid) {
      return;
    }

    calculAge(
      dateToday,
      birthDate,
      setYearsResult,
      setMonthResult,
      setDaysResult
    );
    setIsCalculted(true);
  };

  // Animation effect for results
  useEffect(() => {
    if (isCalculed) {
      // Animate years result
      let yearsInterval = setInterval(() => {
        setDisplayYearsResult((prev) => {
          if (prev < yearsResult) {
            return Math.min(prev + 1, yearsResult); // Increment by 1
          } else {
            clearInterval(yearsInterval);
            return yearsResult; // Ensure it reaches the final value
          }
        });
      }, 50); // Adjust speed of the animation

      // Animate months result
      let monthsInterval = setInterval(() => {
        setDisplayMonthResult((prev) => {
          if (prev < monthResult) {
            return Math.min(prev + 1, monthResult); // Increment by 1
          } else {
            clearInterval(monthsInterval);
            return monthResult; // Ensure it reaches the final value
          }
        });
      }, 50); // Adjust speed of the animation

      // Animate days result
      let daysInterval = setInterval(() => {
        setDisplayDaysResult((prev) => {
          if (prev < daysResult) {
            return Math.min(prev + 1, daysResult); // Increment by 1
          } else {
            clearInterval(daysInterval);
            return daysResult; // Ensure it reaches the final value
          }
        });
      }, 50); // Adjust speed of the animation

      // Cleanup intervals on component unmount or when isCalculed changes
      return () => {
        clearInterval(yearsInterval);
        clearInterval(monthsInterval);
        clearInterval(daysInterval);
      };
    }
  }, [yearsResult, monthResult, daysResult, isCalculed]);

  //this function only authorizes the writing of numbers
  const handleNumericInput = (e, setState) => {
    const value = e.target.value;

    const numericValue = value.replace(/\D/g, "");
    setState(numericValue);
  };

  return (
    <div className="calculator_container">
      <div className="age_form">
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <label className={errors.day ? "error-label" : ""}>DAY</label>
              <input
                type="text"
                id="day"
                className={errors.day ? "error-input" : ""}
                value={days}
                maxLength="2"
                placeholder="DD"
                onChange={(e) => handleNumericInput(e, setDays)}
              />
              <div className="box-error">
                {errors.day && <p className="error">{errors.day}</p>}
              </div>
            </span>
            <span>
              <label className={errors.month ? "error-label" : ""}>MONTH</label>
              <input
                type="text"
                id="month"
                className={errors.month ? "error-input" : ""}
                value={months}
                maxLength="2"
                placeholder="MM"
                onChange={(e) => handleNumericInput(e, setMonths)}
              />
              <div className="box-error">
                {errors.month && <p className="error">{errors.month}</p>}
              </div>
            </span>
            <span>
              <label className={errors.year ? "error-label" : ""}>YEAR</label>
              <input
                type="text"
                id="year"
                className={errors.year ? "error-input" : ""}
                value={years}
                maxLength="4"
                placeholder="YYYY"
                onChange={(e) => handleNumericInput(e, setYears)}
              />
              <div className="box-error">
                {errors.year && <p className="error">{errors.year}</p>}
              </div>
            </span>
          </div>
          <div className="seperate-btn-box">
            <span className="hr-box">
              <hr />
            </span>
            <span className="btn-box">
              <button>
                <img src={arrow} alt="arrow-icon" />
              </button>
            </span>
          </div>
        </form>

        <div className="result_container">
          <span>
            <h1 className="result">{isCalculed ? displayYearsResult : "--"}</h1>
            <h1 className="unit">years</h1>
          </span>
          <span>
            <h1 className="result">{isCalculed ? displayMonthResult : "--"}</h1>
            <h1 className="unit">months</h1>
          </span>
          <span>
            <h1 className="result">{isCalculed ? displayDaysResult : "--"}</h1>
            <h1 className="unit">days</h1>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Birthday;
