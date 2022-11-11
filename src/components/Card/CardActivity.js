import React from "react";
import format from "date-fns/format";

import style from "./CardActivity.module.scss";
const CardActivity = (props) => {
  const { title, id, created_at } = props.activity;
  const formatedDate = format(new Date(created_at || null), "d MMMM yyyy");
  const onDelete = (id) => {
    console.log("tes");
  };
  return (
    <div className={style.card}>
      <p className={style.title}>{title ? title : "Activity Name"}</p>
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
