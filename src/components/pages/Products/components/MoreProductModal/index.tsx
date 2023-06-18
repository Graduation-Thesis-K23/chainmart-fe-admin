import React, { useEffect, FC } from "react";
import { Modal, Row, Col, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";

import { Input, Select } from "~/components/common";

import Specifications from "./components/Specifications";
import Images from "./components/Images";
import Description from "./components/Description";

import { addProduct, useAppDispatch, useAppSelector } from "~/redux";
import { SubmitGroup } from "./styled";
import { ASYNC_STATUS, fetchSuppliers } from "~/redux";
import Log from "~/utils/Log";
import categories from "~/sub-categories/categories";
import TranslateFunc from "~/utils/dictionary";
import { toast } from "react-toastify";

interface MoreProduct {
  name: string;
  price: number;
  sale: number;
  images: [];
  category: string;
  supplier: string;
  specifications: string;
  description: string;
}

const MoreProductModal: FC<{
  moreModal: boolean;
  setMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ moreModal, setMoreModal }) => {
  Log("MoreProductModal");

  const handleModal = (status: boolean) => {
    setMoreModal(status);
  };

  const { suppliers, products } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const defaultValues: MoreProduct = {
    name: "",
    price: 0,
    sale: 0,
    images: [],
    category: "",
    supplier: "",
    specifications: "",
    description: "",
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<MoreProduct> = async (data) => {
    const bodyFormData = new FormData();
    for (const image of data.images) {
      bodyFormData.append("images", image);
    }
    for (const key in data) {
      if (key === "images") {
        continue;
      }

      if (key === "sale") {
        const sale = data[key as keyof typeof data];

        bodyFormData.append("sale", sale as string);
        continue;
      }

      bodyFormData.append(key, data[key as keyof MoreProduct] as string);
    }

    await dispatch(addProduct(bodyFormData));
    toast.success("Add product success!", {
      autoClose: 1000,
      hideProgressBar: true,
    });
    handleModal(false);
  };

  useEffect(() => {
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
          <Col span={6}>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Category"
                  onChange={onChange}
                  defaultValue={TranslateFunc(categories[0].textKey)}
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
              name="specifications"
              control={control}
              render={({ field: { onChange } }) => (
                <Specifications onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </Col>
          <Col span={12}>
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
        <Row gutter={[24, 24]}></Row>
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
