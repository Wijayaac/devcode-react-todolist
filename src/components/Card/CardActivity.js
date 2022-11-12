import React, { useState } from "react";
import format from "date-fns/format";
import { NavLink } from "react-router-dom";

// import { deleteActivity } from "./CardActivity.handler";
import style from "./CardActivity.module.scss";

const CardActivity = (props) => {
  const { deleteActivity, activity } = props;
  const { title, id, created_at } = activity;
  const formatedDate = format(new Date(created_at || null), "d MMMM yyyy");

  const onDelete = (id) => {
    deleteActivity(id);
  };
  return (
    <div className={style.card}>
      <NavLink to={`/activity/${id}`}>
        <p className={style.title}>{title ? title : "Activity Name"}</p>
      </NavLink>
      <div className={style.footer}>
        <p className={style.created}>
          {created_at ? formatedDate : "10 Oktober 2022"}
        </p>
        <button className='trash' onClick={() => onDelete(id)}>
          <span className='icon'>
            <img src='/icons/trash.svg' alt='' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CardActivity;
