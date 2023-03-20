import React, { FC } from "react";
import { Modal } from "antd";

const DetailModal: FC<{
  state: {
    detailModal: boolean;
    setDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  id: string;
}> = ({ state, id }) => {
  const handleModal = (status: boolean) => {
    state.setDetailModal(status);
  };

  return (
    <Modal
      title="Product Detail"
      centered
      open={state.detailModal}
      onCancel={() => handleModal(false)}
      footer={null}
    >
      {id}
    </Modal>
  );
};

export default DetailModal;
