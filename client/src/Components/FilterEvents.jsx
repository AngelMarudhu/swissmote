import React, { useState } from "react";
import { getEventByCategoriesAndDate } from "../Features/AllEventFeature";
import { useDispatch } from "react-redux";

const cetegories = ["sports", "music", "arts", "technology", "food", "other"];

const FilterEvents = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cetegory, setCetegory] = useState("");

  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    if (cetegory || (fromDate && toDate)) {
      dispatch(getEventByCategoriesAndDate({ cetegory, fromDate, toDate }));
    } else {
      alert("Please select a category or a date range");
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Category</label>
        <select onChange={(e) => setCetegory(e.target.value)}>
          <option value="">All</option>
          {cetegories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterEvents;
