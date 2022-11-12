import React from "react";
import { CardActivity } from "../Card";

const ActivityList = (props) => {
  const { activities, deleteActivity } = props;
  return (
    <div className='activity'>
      <div className='activity-wrapper row'>
        {activities.length < 1 || !activities ? (
          <EmptyActivity />
        ) : (
          activities.map((activity, key) => (
            <div className='col-lg-3' key={key}>
              <CardActivity
                activity={activity}
                deleteActivity={deleteActivity}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const EmptyActivity = () => {
  return (
    <>
      <div className='activity-background'>
        <img src='/img/activity-empty-state.svg' alt='' />
      </div>
    </>
  );
};

export default ActivityList;
