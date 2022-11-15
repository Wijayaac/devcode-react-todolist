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
  getTodoItem,
  deleteTodo,
  updateTodoItem,
} from "./ActivityDetail.handler";
import { TodoList } from "../../components/Todo";
import AddTodoModal from "../../components/Modal/AddTodoModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import AlertDeleteModal from "../../components/Modal/AlertDeleteModal";
import UpdateTodoModal from "../../components/Modal/UpdateTodoModal";

const ActivityDetail = () => {
  const { id } = useParams();
  const [todolist, setTodolist] = useState([]);
  const [activity, setActivity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [todoItem, setTodoItem] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [alert, setAlert] = useState(false);

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
  }, [id, isLoading, modalAdd, modalUpdate]);

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
      await addTodoItem(data, id);
      toast.success(`${data.title} Telah ditambahkan`);
      setModalAdd(!modalAdd);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUpdateTodo = async (data) => {
    try {
      await updateTodoItem(data, todoItem.id);
      toast.success(`${data.title} Telah diupdate`);
      setModalUpdate(!modalUpdate);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckTodo = async (id, isActive) => {
    try {
      let { data } = await checkTodo(id, isActive);
      toast.success(
        `${data.title} ${
          data.is_active === 0 ? "terselesaikan" : "belum selesai"
        }`
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setTodoId = async (todoId, action) => {
    if (action === "delete") {
      setModalShown(!modalShown);
    } else if (action === "edit") {
      setModalUpdate(!modalUpdate);
    }
    try {
      let data = await getTodoItem(todoId);
      setTodoItem(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteTodo(id);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
      toast.success("Todolist sudah terhapus");
      setConfirmation(!confirmation);
      setAlert(!alert);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
      <DeleteModal
        modalShown={modalShown}
        setModalShown={setModalShown}
        item={todoItem}
        handleDelete={handleDelete}
      />
      <UpdateTodoModal
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        handleUpdateTodo={handleUpdateTodo}
        todo={todoItem}
      />
      <AlertDeleteModal alert={alert} setAlert={setAlert} item={todoItem} />
    </div>
  );
};

export default ActivityDetail;
