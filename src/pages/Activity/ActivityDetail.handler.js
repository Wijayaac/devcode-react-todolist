import axios from "axios";

import { API_URL } from "../../utils/constant";

const headers = {
  "Content-Type": "application/json",
};

const getActivity = async (id) => {
  let { data } = await axios.get(`${API_URL}/activity-groups/${id}`);
  return data;
};

const getAllTodo = async (id) => {
  let { data } = await axios.get(
    `${API_URL}/todo-items?activity_group_id=${id}`
  );
  return data;
};

const editTitleActivity = async (id, title) => {
  const body = {
    title,
  };

  return await axios.patch(`${API_URL}/activity-groups/${id}`, body, headers);
};

const addTodoItem = async (data, id) => {
  const body = {
    activity_group_id: id,
    title: data.title,
    priority: data.priority,
  };

  return await axios.post(`${API_URL}/todo-items`, body, headers);
};
const checkTodo = async (id, isActive) => {
  const body = {
    is_active: isActive ? 1 : 0,
  };

  return await axios.patch(`${API_URL}/todo-items/${id}`, body, headers);
};

export { getActivity, editTitleActivity, getAllTodo, addTodoItem, checkTodo };
