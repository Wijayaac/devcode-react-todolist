import React from "react";

import Modal from "./ModalRoot";
import style from "./DeleteModal.module.scss";

const DeleteModal = (props) => {
  const { modalShown, setModalShown, handleDelete, activity } = props;
  const onDelete = () => {
    handleDelete(activity.id);
    setModalShown(!modalShown);
  };
  return (
    <Modal
      shown={modalShown}
      close={() => {
        setModalShown(false);
      }}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.icon}>
            <span>
              <img src='/icons/warning.svg' alt='' />
            </span>
          </div>
          <p className={style.title}>
            Apakah anda yakin menghapus activity <br />
            <span>
              “{activity.title ? activity.title : "Default Activity"}”?
            </span>
          </p>
          <div className={style.action}>
            <button
              onClick={() => {
                setModalShown(false);
              }}
              className={`btn ${style.cancle}`}>
              Batal
            </button>
            <button
              onClick={() => {
                onDelete();
              }}
              className={`btn btn-danger ${style.delete}`}>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
