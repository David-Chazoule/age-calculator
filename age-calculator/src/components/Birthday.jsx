import React, { useState } from "react";
import arrow from "../assets/images/icon-arrow.svg";

function Birthday() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [monthResult, setMonthResult] = useState(0);
  const [yearsResult, setYearsResult] = useState(0);
  const [daysResult, setDaysResult] = useState(0);
  const [isCalculed, setIsCalculted] = useState(false);

  const dateToday = new Date();
  const birthDate = new Date(years, months - 1, days);

  const calculAge = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    calculAge();
    setIsCalculted(true);
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
                maxLength="2"
                onChange={(e) => setDays(e.target.value)}
                placeholder="DD"
              />
            </span>
            <span>
              <label>MONTH</label>
              <input
                type="text"
                id="month"
                value={months}
                maxLength="2"
                placeholder="MM"
                onChange={(e) => setMonths(e.target.value)}
              />
            </span>
            <span>
              <label>YEAR</label>
              <input
                type="text"
                id="year"
                value={years}
                maxLength="4"
                onChange={(e) => setYears(e.target.value)}
                placeholder="YYYY"
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
