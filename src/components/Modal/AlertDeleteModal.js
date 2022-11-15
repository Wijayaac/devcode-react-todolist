import React from "react";

import Modal from "./ModalRoot";
import style from "./AlertDeleteModal.module.scss";

const AlertDeleteModal = (props) => {
  const { alert, setAlert, item } = props;
  return (
    <Modal
      shown={alert}
      close={() => {
        setAlert(false);
      }}>
      <div className={style.alert}>
        <div className={style.content}>
          <div className={style.icon}>
            <span>
              <img src='/icons/info.svg' alt='' />
            </span>
          </div>
          <p className={style.title}>
            {item.priority ? "List Item" : "Activity"} berhasil dihapus
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AlertDeleteModal;
