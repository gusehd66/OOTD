import { Modal, Button } from "antd";
import { useState } from "react";
import UploadProductPage from "../views/UploadProductPage/UploadProductPage";

const UpdateModal = ({ detail }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal
        title="Update"
        visible={visible}
        onCancel={handleCancel}
        footer={false}
      >
        <UploadProductPage detail={detail} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default UpdateModal;
