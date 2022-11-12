import React from "react";
import { useParams } from "react-router-dom";

const ActivityDetail = () => {
  const { id } = useParams();
  return (
    <div>
      ActivityDetail
      <p>{id}</p>
    </div>
  );
};

export default ActivityDetail;
