import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";

import { Spinner } from "../../components/Loading";
import { ActivityTopBar } from "../../components/TopBar";
import {
  getActivity,
  editTitleActivity,
  getAllTodo,
} from "./ActivityDetail.handler";
import { TodoList } from "../../components/Todo";
import AddTodoModal from "../../components/Modal/AddTodoModal";

const ActivityDetail = () => {
  const { id } = useParams();
  const [todolist, setTodolist] = useState([]);
  const [activity, setActivity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    const getActivityDetail = async () => {
      try {
        let data = await getActivity(id);
        document.title = `To Do List - Detail ${activity.title}`;
        setActivity(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    const getTodolist = async () => {
      try {
        let { data } = await getAllTodo(id);
        setTodolist(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getActivityDetail();
    getTodolist();
  }, [id, isLoading]);

  const handleEditTitle = debounce(async (e) => {
    setIsLoading(true);
    let title = e.target.value;
    try {
      await editTitleActivity(id, title);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, 800);

  const handleAddTodo = () => {
    setModalAdd(!modalAdd);
    return;
  };
  const handleSubmitTodo = () => {};

  const setTodoId = async (id) => {
    try {
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <ActivityTopBar
        activity={activity}
        handleAddTodo={handleAddTodo}
        handleEditTitle={handleEditTitle}
      />

      <TodoList todolists={todolist} setTodoId={setTodoId} />
      <AddTodoModal
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        handleSubmitTodo={handleSubmitTodo}
      />
    </div>
  );
};

export default ActivityDetail;
