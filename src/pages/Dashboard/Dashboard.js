import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Activities } from "../../components/Activity";
import { Spinner } from "../../components/Loading";
import AlertDeleteModal from "../../components/Modal/AlertDeleteModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import {
  getActivities,
  addActivity,
  deleteActivity,
  getActivity,
} from "./Dashboard.handler";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [alert, setAlert] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [activity, setActivity] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await getActivities();
        setActivities(data);
        document.title = `To Do List - Dashboard`;
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [isLoading]);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteActivity(id);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
      toast.success("Activity has been deleted");
      setConfirmation(!confirmation);
      setAlert(!alert);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addActivities = async () => {
    setIsLoading(true);
    try {
      await addActivity();
      toast.success("Activity berhasil ditambah");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityId = async (id) => {
    setModalShown(!modalShown);

    try {
      let { data } = await getActivity(id);
      setActivity(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div className='add-activity'>
        <h1>Activity</h1>
        <button className='add btn btn-main' onClick={addActivities}>
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
      <Activities
        activities={activities}
        setModalShown={setModalShown}
        modalShown={modalShown}
        deleteActivity={getActivityId}
      />
      <DeleteModal
        modalShown={modalShown}
        setModalShown={setModalShown}
        item={activity}
        handleDelete={handleDelete}
      />
      <AlertDeleteModal alert={alert} setAlert={setAlert} item={activity} />
    </div>
  );
};

export default Dashboard;
