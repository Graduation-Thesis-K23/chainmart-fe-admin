import React, { useEffect } from "react";
import { Modal, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "~/redux";

import { SubmitGroup, SubmitButton } from "./styled";
import { Input, Select, DatePicker } from "~/components/common";
import { ASYNC_STATUS, fetchSuppliers, fetchCategories } from "~/redux";
import Log from "~/utils/Log";
import Options from "./components/Options";

const MoreProductModal: React.FC<{
  state: {
    moreModal: boolean;
    setMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
}> = ({ state }) => {
  const handleModal = (status: boolean) => {
    state.setMoreModal(status);
  };

  const { suppliers, categories } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      discount: 0,
      quantity: 0,
      image: "",
      category: "",
      supplier: "",
      expiry_date: dayjs(),
      sale: 0,
      options: "",
      specifications: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Log(data);
    Log(dayjs(data.expiry_date, "YYYY-MM-DD").toDate());
    state.setMoreModal(true);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
  }, []);

  return (
    <Modal
      centered
      open={state.moreModal}
      title={null}
      onCancel={() => handleModal(false)}
      footer={null}
      width={1400}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Controller
              name="name"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Name"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <Controller
              name="price"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Price"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="quantity"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Quantity"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="sale"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Sale"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="expiry_date"
              control={control}
              render={({ field: { onChange, name } }) => (
                <DatePicker
                  label="Expiry Date"
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Category"
                  onChange={onChange}
                  loading={!(categories.status === ASYNC_STATUS.SUCCEED)}
                  options={[
                    ...categories.data.map((i) => ({
                      value: i.id,
                      label: i.name,
                    })),
                  ]}
                />
              )}
            />
          </Col>
          <Col span={18}>
            <Controller
              name="supplier"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Supplier"
                  onChange={onChange}
                  loading={!(suppliers.status === ASYNC_STATUS.SUCCEED)}
                  options={[
                    ...suppliers.data.map((i) => ({
                      value: i.id,
                      label: i.name,
                    })),
                  ]}
                />
              )}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Controller
              name="options"
              control={control}
              render={({ field: { onChange } }) => (
                <Options label="Options" onChange={onChange} />
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
              name="specifications"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Specifications"
                  inputRef={ref}
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

export default MoreProductModal;
