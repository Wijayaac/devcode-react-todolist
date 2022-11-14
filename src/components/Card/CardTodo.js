import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import style from "./CardTodo.module.scss";
const CardTodo = (props) => {
  const { todo, setTodoId, handleCheckTodo } = props;
  const isDone = todo.is_active !== 1 || false;
  const { register } = useForm();
  const todoTitle = useRef();
  const [isChecked, setIsChecked] = useState(isDone);

  useEffect(() => {
    if (isChecked) {
      todoTitle.current.classList.add("checked");
    } else {
      todoTitle.current.classList.remove("checked");
    }
  }, [isChecked]);

  const handleSetId = (id) => {
    setTodoId(id);
  };

  const onChecked = (id) => {
    setIsChecked(!isChecked);
    handleCheckTodo(id, isChecked);
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
              onChange={() => onChecked(todo.id)}
              defaultChecked={isChecked}
            />
          </div>
          <div className={style.title}>
            <span
              className={`${style.priority} todolist-priority ${todo.priority}`}></span>
            <p className={`${style.title}`} ref={todoTitle}>
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
