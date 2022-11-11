import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const EMAIL = process.env.REACT_APP_EMAIL;

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

export { getActivities, addActivity };
