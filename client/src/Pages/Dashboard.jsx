import React from "react";
import ShowAllEvents from "../Components/ShowAllEvents";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <div>
      <div>
        <ShowAllEvents />
      </div>
    </div>
  );
};

export default Dashboard;
