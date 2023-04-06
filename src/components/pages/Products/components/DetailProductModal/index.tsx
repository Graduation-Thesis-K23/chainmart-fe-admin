import React, { FC, memo } from "react";
import { Modal } from "antd";

const DetailModal: FC<{
  detailModal: boolean;
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}> = ({ setDetailModal, detailModal, id }) => {
  const handleModal = (status: boolean) => {
    setDetailModal(status);
  };

  return (
    <Modal
      title="Product Detail"
      centered
      open={detailModal}
      onCancel={() => handleModal(false)}
      footer={null}
    >
      {id}
    </Modal>
  );
};

export default memo(DetailModal);
