import React, { useState } from "react";

const FilterButtons = ({ setFilter }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setFilter(filter);
  };

  return (
    <div className="filter-buttons">
      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className={activeFilter === "pending" ? "active" : ""}
        onClick={() => handleFilterChange("pending")}
      >
        Pending
      </button>
      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => handleFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
