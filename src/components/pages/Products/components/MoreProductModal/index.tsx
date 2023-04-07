import React, { useEffect, FC } from "react";
import { Modal, Row, Col, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import dayjs from "dayjs";

import { Input, Select, DatePicker } from "~/components/common";
import Options from "./components/Options";
import Specifications from "./components/Specifications";
import Images from "./components/Images";
import Description from "./components/Description";

import { addProduct, useAppDispatch, useAppSelector } from "~/redux";
import { SubmitGroup } from "./styled";
import { ASYNC_STATUS, fetchSuppliers, fetchCategories } from "~/redux";
import Log from "~/utils/Log";
import { toast } from "react-toastify";

const MoreProductModal: FC<{
  moreModal: boolean;
  setMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ moreModal, setMoreModal }) => {
  Log("MoreProductModal");

  const handleModal = (status: boolean) => {
    setMoreModal(status);
  };

  const { suppliers, categories, products } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.expiry_date = dayjs(data.expiry_date).toISOString();
    if (data.sale === 0) {
      delete data.sale;
    }
    const bodyFormData = new FormData();

    for (const key in data.images) {
      bodyFormData.append("images", data.images[key]);
    }
    delete data.images;
    for (const key in data) {
      bodyFormData.append(key, data[key]);
    }

    await dispatch(addProduct(bodyFormData));
    toast.success("Add product success!", {
      autoClose: 1000,
      hideProgressBar: true,
    });
    handleModal(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
  }, []);

  return (
    <Modal
      open={moreModal}
      title={null}
      onCancel={() => handleModal(false)}
      footer={null}
      style={{
        top: 20,
      }}
      width="100vw"
    >
      <form encType="multipart/form-data">
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
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            loading={!(products.status === ASYNC_STATUS.SUCCEED)}
          >
            Save
          </Button>
        </SubmitGroup>
      </form>
    </Modal>
  );
};

export default MoreProductModal;
