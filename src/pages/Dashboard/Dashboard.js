import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Activities } from "../../components/Activity";
import { Spinner } from "../../components/Loading";
import { getActivities, addActivity } from "./Dashboard.handler";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await getActivities();
        setActivities(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [isLoading]);

  const addActivities = async () => {
    setIsLoading(true);
    try {
      await addActivity();
      toast.success("New Activity created");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
      <Activities activities={activities} />
    </div>
  );
};

export default Dashboard;
