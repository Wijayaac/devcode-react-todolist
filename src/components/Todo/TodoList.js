import React from "react";
import { CardTodo } from "../Card";

const TodoList = (props) => {
  const { todolists, setTodoId, handleCheckTodo } = props;
  return (
    <div className='todolist'>
      <div className='todolist-wrapper row'>
        {todolists.length < 1 || !todolists ? (
          <EmptyActivity />
        ) : (
          todolists.map((todo, key) => (
            <div className='col-12' key={key}>
              <CardTodo
                todo={todo}
                setTodoId={setTodoId}
                handleCheckTodo={handleCheckTodo}
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
      <div className='todolist-background'>
        <img src='/img/todo-empty-state.svg' alt='' />
      </div>
    </>
  );
};

export default TodoList;
