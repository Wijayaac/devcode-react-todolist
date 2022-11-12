import React from "react";
import { useForm } from "react-hook-form";

import style from "./CardTodo.module.scss";
const CardTodo = (props) => {
  const { todo, setTodoId, handleCheckTodo } = props;
  const { register } = useForm();

  const handleSetId = (id) => {
    setTodoId(id);
  };
  const onChecked = () => {
    handleCheckTodo();
  };

  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <div className={style.edit}>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              {...register("is_active")}
              onChange={() => onChecked()}
            />
          </div>
          <div className={style.title}>
            <span className={`${style.priority} ${style.red}`}></span>
            <p className={style.title}>
              {todo.title ? todo.title : "Default Title"}
            </p>
            <button className={style.edit} onClick={() => handleSetId(todo.id)}>
              <span>
                <img src='/icons/edit.svg' alt='' />
              </span>
            </button>
          </div>
        </div>
        <button className={style.delete} onClick={() => handleSetId(todo.id)}>
          <span>
            <img src='/icons/trash.svg' alt='' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CardTodo;
