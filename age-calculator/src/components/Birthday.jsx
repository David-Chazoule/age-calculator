import React, { useState } from "react";
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

  const dateToday = new Date();
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

    calculAge(dateToday,birthDate,setYearsResult,setMonthResult,setDaysResult);
    setIsCalculted(true);
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
                onChange={(e) => setDays(e.target.value)}
                placeholder="DD"
              />
              {errors.day && <p className="error">{errors.day}</p>}
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
                onChange={(e) => setMonths(e.target.value)}
              />
              {errors.month && <p className="error">{errors.month}</p>}
            </span>
            <span>
              <label className={errors.year ? "error-label" : ""}>YEAR</label>
              <input
                type="text"
                id="year"
                className={errors.year ? "error-input" : ""}
                value={years}
                maxLength="4"
                onChange={(e) => setYears(e.target.value)}
                placeholder="YYYY"
              />
              {errors.year && <p className="error">{errors.year}</p>}
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
            <h1 className="result">{isCalculed ? yearsResult : "--"}</h1>
            <h1 className="unit">years</h1>
          </span>
          <span>
            <h1 className="result">{isCalculed ? monthResult : "--"}</h1>
            <h1 className="unit">months</h1>
          </span>
          <span>
            <h1 className="result">{isCalculed ? daysResult : "--"}</h1>
            <h1 className="unit">days</h1>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Birthday;
