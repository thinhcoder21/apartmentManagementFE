import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Body = () => {
  const users = useSelector((state) => state.admin.allUser);
  const survey = useSelector((state) => state.admin.allSurvey);

  return <h1>day la body</h1>;
};

export default Body;
