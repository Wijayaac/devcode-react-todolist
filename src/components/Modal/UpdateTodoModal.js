import React from "react";
import Select from "react-select";
import chroma from "chroma-js";
import { Controller, useForm } from "react-hook-form";

import Modal from "./ModalRoot";

import style from "./AddTodoModal.module.scss";
import { useEffect } from "react";
import { useState } from "react";

const options = [
  { value: "very-high", label: "Very High", color: "#ED4C5C" },
  { value: "high", label: "High", color: "#F8A541" },
  { value: "normal", label: "Medium", color: "#00A790" },
  { value: "very-low", label: "Very Low", color: "#8942C1" },
  { value: "low", label: "Low", color: "#428BC1" },
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 100,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 14,
    width: 14,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: undefined,
      color: "#000",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
      ":hover": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
      ...dot(data.color),
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const UpdateTodoModal = (props) => {
  const { modalUpdate, setModalUpdate, handleUpdateTodo, todo } = props;
  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    setDefaultValue(options.find((element) => element.value === todo.priority));
    setValue("title", todo.title);
    setValue("priority", todo.priority);
  }, [todo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    setValue,
    control,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    handleUpdateTodo(data);
    reset();
  };
  return (
    <Modal
      shown={modalUpdate}
      close={() => {
        setModalUpdate(false);
        reset();
      }}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.header}>
            <p>Tambah List Item</p>
            <button className={style.close}>
              <span>
                <img src='/icons/close.svg' alt='' />
              </span>
            </button>
          </div>
          <form className={style.form}>
            <div className={style.field}>
              <label htmlFor='todo-title'>NAMA LIST ITEM</label>
              <input
                className='form-control'
                type='text'
                defaultValue={todo.title}
                id='todo-title'
                {...register("title")}
                placeholder='Tambahkan nama list item'
              />
              {errors.title ? <p>{errors.title.message}</p> : ""}
            </div>
            <div className={style.field}>
              <label htmlFor='todo-title'>PRIORITY</label>
              <Controller
                control={control}
                name='priority'
                defaultValue={defaultValue?.value}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    inputRef={ref}
                    value={defaultValue}
                    onChange={(val) => {
                      onChange(val.value);
                      setDefaultValue(val);
                    }}
                    defaultValue={defaultValue?.value}
                    classNamePrefix='priority'
                    styles={colourStyles}
                    options={options}
                  />
                )}
              />
            </div>
            <div className={style.submit}>
              <button
                className='btn btn-add'
                type='button'
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateTodoModal;
