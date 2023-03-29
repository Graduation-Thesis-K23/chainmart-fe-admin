import React from "react";
import { Modal, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";

import MoreModalInput from "../MoreModalInput";

import { useAppDispatch } from "~/redux";

import { SubmitGroup, SubmitButton } from "./styled";
import { addProduct } from "~/redux/product";

const MoreModal: React.FC<{
  state: {
    moreModal: boolean;
    setMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
}> = ({ state }) => {
  const handleModal = (status: boolean) => {
    state.setMoreModal(status);
  };

  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      discount: 0,
      quantity: 0,
      image: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addProduct(data));
    state.setMoreModal(true);
  };

  return (
    <Modal
      centered
      open={state.moreModal}
      title="Add Product"
      onCancel={() => handleModal(false)}
      footer={null}
      width={900}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Controller
              name="name"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <MoreModalInput
                  label="Name"
                  innerRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="price"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <MoreModalInput
                  label="Price"
                  innerRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="quantity"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <MoreModalInput
                  label="Quantity"
                  innerRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Controller
              name="discount"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <MoreModalInput
                  label="Discount"
                  innerRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
            />
          </Col>
          <Col span={12}>
            {/* <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <div>
                  <label htmlFor="s">Image</label>
                  <ImgCrop>
                    <Upload
                      onChange={onChange}
                      showUploadList={false}
                      onPreview={onPreview}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </ImgCrop>
                </div>
              )}
            /> */}
            <Controller
              name="image"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <MoreModalInput
                  label="Image"
                  innerRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </Col>
        </Row>
        <SubmitGroup>
          <SubmitButton type="submit" value="Save" />
        </SubmitGroup>
      </form>
    </Modal>
  );
};

export default MoreModal;
