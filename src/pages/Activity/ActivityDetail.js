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
  addTodoItem,
  checkTodo,
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
        document.title = `To Do List - Detail ${data.title}`;
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
  const handleSubmitTodo = async (data) => {
    try {
      let response = await addTodoItem(data, id);
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCheckTodo = async (id, isActive) => {
    try {
      let { data } = await checkTodo(id, isActive);
      toast.success(
        `${data.title} ${
          data.is_active == 0 ? "terselesaikan" : "belum selesai"
        }`
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setTodoId = async (id) => {
    try {
      console.log(id);
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
      <TodoList
        todolists={todolist}
        setTodoId={setTodoId}
        handleCheckTodo={handleCheckTodo}
      />
      <AddTodoModal
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        handleSubmitTodo={handleSubmitTodo}
      />
    </div>
  );
};

export default ActivityDetail;
