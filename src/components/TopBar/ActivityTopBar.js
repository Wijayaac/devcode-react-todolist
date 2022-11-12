import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const ActivityTopBar = (props) => {
  const { activity, handleAddTodo, handleEditTitle } = props;
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const [editTitle, setEditTitle] = useState(false);

  const focusTitle = () => {
    setEditTitle(!editTitle);
    setValue("title", activity.title);
    setTimeout(() => {
      document.getElementById("item-title").focus();
    }, 1);
    return;
  };

  return (
    <>
      <div className='top-bar'>
        <div className='top-bar-label'>
          <NavLink to='/'>
            <span className='back'>
              <img src='/icons/chevron-back.svg' alt='' />
            </span>
          </NavLink>
          {editTitle ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <input
                type='text'
                id='item-title'
                className=''
                {...register("title", {
                  validate: "Enter at leas 1 keyword",
                })}
                onBlur={() => setEditTitle(!editTitle)}
                onKeyDown={(e) =>
                  e.code === 13 ? setEditTitle(!editTitle) : false
                }
                onChange={handleEditTitle}
              />
              {errors.title ? <p>{errors.title.message}</p> : ""}
            </form>
          ) : (
            <h1 className='' data-cy='todo-title' onClick={() => focusTitle()}>
              {activity?.title || "Default Title"}
            </h1>
          )}
          <button type='button' className='pt-1' onClick={() => focusTitle()}>
            <span className='edit'>
              <img src='/icons/edit.svg' alt='' />
            </span>
          </button>
        </div>
        <div className='top-bar-button'>
          <div className='dropdown dropdown-end'>
            {/* <label
                tabIndex={0}
                className='btn btn-circle btn-outline btn-secondary m-1'
                data-cy='todo-sort-button'>
                <i className='bx bx-sort-alt-2 bx-sm'></i>
              </label>
              <ul
                tabIndex={0}
                className='dropdown-content menu shadow bg-base-100 rounded-md w-52'>
                {sortOption.map((sortItem) => (
                  <li
                    key={sortItem.value}
                    className={sortValue == sortItem.value ? "bordered" : ""}
                    onClick={() => {
                      setSortValue(sortItem.value);
                      document.activeElement.blur();
                    }}
                    data-cy='sort-selection'>
                    <a>
                      <i className={sortItem.icon}></i>
                      {sortItem.label}
                    </a>
                  </li>
                ))}
              </ul> */}
          </div>
          <button className='add btn btn-main' onClick={() => handleAddTodo()}>
            <span className='icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                preserveAspectRatio='xMidYMid meet'
                viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeWidth='2'
                  d='M12 20v-8m0 0V4m0 8h8m-8 0H4'
                />
              </svg>
            </span>
            Tambah
          </button>
        </div>
      </div>
    </>
  );
};

export default ActivityTopBar;
