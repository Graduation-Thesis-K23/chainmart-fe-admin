import React, { FC, useEffect } from "react";
import { Button, Col, Modal, Row } from "antd";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import { Select, Input } from "~/components/common";

import Description from "./components/Description";
import Specifications, {
  SpecificationsType,
} from "./components/Specifications";
import { SubmitGroup } from "./styled";
import { ProductUpdate } from "../..";
import {
  fetchSuppliers,
  updateProduct,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import categories from "~/sub-categories/categories";
import TranslateFunc from "~/utils/dictionary";

const DetailModal: FC<{
  detailModal: boolean;
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductUpdate;
}> = ({ setDetailModal, detailModal, product }) => {
  const { suppliers } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleModal = (status: boolean) => {
    setDetailModal(status);
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      ...product,
      sale: product.sale ? product.sale : 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isDirty) {
      const newFields = Object.keys(dirtyFields);
      const newData: FieldValues = { id: data.id };
      for (const property in data) {
        if (newFields.includes(property)) {
          newData[property] = data[property];
        }
      }

      dispatch(updateProduct(newData));
      toast.success("Product updated");
      handleModal(false);
    } else {
      toast.error("Product not update");
    }
  };

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, []);

  return (
    <Modal
      title="Product Detail"
      open={detailModal}
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
              name="category"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Category"
                  onChange={onChange}
                  defaultValue={product.category}
                  options={[
                    ...categories.map((i) => ({
                      value: i.textKey,
                      label: TranslateFunc(i.textKey),
                    })),
                  ]}
                />
              )}
              rules={{ required: true }}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="supplier"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Supplier"
                  onChange={onChange}
                  defaultValue={product.supplier.name}
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
          <Col span={12}>
            <Controller
              name="specifications"
              control={control}
              render={({ field: { onChange } }) => (
                <Specifications
                  onChange={onChange}
                  defaultValue={
                    JSON.parse(product.specifications) as SpecificationsType[]
                  }
                />
              )}
              rules={{ required: true }}
            />
          </Col>
          <Col span={12}>
            <Col span={24}>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange } }) => (
                  <Description
                    onChange={onChange}
                    defaultValue={product.description}
                  />
                )}
                rules={{ required: true }}
              />
            </Col>
          </Col>
        </Row>
        <SubmitGroup>
          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </SubmitGroup>
      </form>
    </Modal>
  );
};

export default DetailModal;
