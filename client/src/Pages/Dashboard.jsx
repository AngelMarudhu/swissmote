import React from "react";
import ShowAllEvents from "../Components/ShowAllEvents";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.login);

  return (
    <div>
      <div>
        <ShowAllEvents userId={user._id} />
      </div>
    </div>
  );
};

export default Dashboard;
