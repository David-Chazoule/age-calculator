import React, { useState } from "react";
import arrow from "../assets/images/icon-arrow.svg";

function Birthday() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [monthResult, setMonthResult] = useState(0);
  const [yearsResult, setYearsResult] = useState(0);
  const [daysResult, setDaysResult] = useState(0);

  const dateToday = new Date();
  const dateBirth = new Date(years, months - 1, days);

  const differenceYears = () => {
    const yearToday = dateToday.getFullYear();
    const yearBirth = dateBirth.getFullYear();
    const yearDifference = yearToday - yearBirth;

    return setYearsResult(yearDifference);
  };

  const differenceMonth = () => {
    const monthToday = dateToday.getMonth() + 1;
    const monthBirth = dateBirth.getMonth() + 1;
    const monthDifference = monthToday - monthBirth;

    if (monthDifference < 0) {
      return setMonthResult(Math.abs(monthDifference));
    } else {
      return setMonthResult(monthDifference);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    differenceMonth();
    differenceYears();
  };

  return (
    <div className="calculator_container">
      <div className="age_form">
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <label>DAY</label>
              <input
                type="text"
                id="day"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </span>
            <span>
              <label>MONTH</label>
              <input
                type="text"
                id="month"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </span>
            <span>
              <label>YEAR</label>
              <input
                type="text"
                id="year"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
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
            <h1 className="result">{yearsResult}</h1>
            <h1 className="unit">years</h1>
          </span>
          <span>
            <h1 className="result">{monthResult}</h1>
            <h1 className="unit">months</h1>
          </span>
          <span>
            <h1 className="result">{daysResult}</h1>
            <h1 className="unit">days</h1>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Birthday;
