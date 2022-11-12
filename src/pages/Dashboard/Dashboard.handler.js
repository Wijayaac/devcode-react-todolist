import axios from "axios";

import { API_URL, EMAIL } from "../../utils/constant";

const getActivities = async () => {
  let { data } = await axios.get(`${API_URL}/activity-groups?email=${EMAIL}`);
  return data;
};

const addActivity = async () => {
  let data = await axios.post(`${API_URL}/activity-groups`, {
    title: "New Activity",
    email: "wijayaac25@gmail.com",
    _comment:
      "email digunakan untuk membedakan list data yang digunakan antar aplikasi",
  });
  return data;
};

const deleteActivity = async (id) => {
  let data = await axios.delete(`${API_URL}/activity-groups/${id}`);
  return data;
};

const getActivity = async (id) => {
  let data = await axios.get(`${API_URL}/activity-groups/${id}`);
  return data;
};

export { getActivities, getActivity, addActivity, deleteActivity };
