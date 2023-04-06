import React, { useEffect, FC } from "react";
import { Modal, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import dayjs from "dayjs";

import { Input, Select, DatePicker } from "~/components/common";
import Options from "./components/Options";
import Specifications from "./components/Specifications";
import Images from "./components/Images";
import Description from "./components/Description";

import { useAppDispatch, useAppSelector } from "~/redux";
import { SubmitGroup, SubmitButton } from "./styled";
import { ASYNC_STATUS, fetchSuppliers, fetchCategories } from "~/redux";
import Log from "~/utils/Log";

const MoreProductModal: FC<{
  moreModal: boolean;
  setMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ moreModal, setMoreModal }) => {
  Log("MoreProductModal");

  const handleModal = (status: boolean) => {
    setMoreModal(status);
  };

  const { suppliers, categories } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      sale: 0,
      quantity: 0,
      images: [],
      category: "",
      supplier: "",
      expiry_date: dayjs(),
      options: "",
      specifications: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Log(data);
    Log(dayjs(data.expiry_date, "YYYY-MM-DD").toDate());
    setMoreModal(true);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
  }, []);

  return (
    <Modal
      centered
      open={moreModal}
      title={null}
      onCancel={() => handleModal(false)}
      footer={null}
      width={1400}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col>
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange } }) => (
                <Images onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Controller
              name="options"
              control={control}
              render={({ field: { onChange } }) => (
                <Options onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="specifications"
              control={control}
              render={({ field: { onChange } }) => (
                <Specifications onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) => (
                <Description onChange={onChange} />
              )}
              rules={{ required: true }}
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
