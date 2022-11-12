import axios from "axios";

import { API_URL } from "../../utils/constant";

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
  const headers = {
    "Content-Type": "application/json",
  };
  await axios.patch(`${API_URL}/activity-groups/${id}`, body, headers);
  return;
};

export { getActivity, editTitleActivity, getAllTodo };
