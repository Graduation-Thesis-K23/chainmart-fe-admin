import React, { useEffect, FC } from "react";
import { Row, Col, Button, Drawer } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Input, Select } from "~/components/common";

import Specifications from "./components/Specifications";
import Images from "./components/Images";
import Description from "./components/Description";

import { addProduct, useAppDispatch, useAppSelector } from "~/redux";
import { SubmitGroup } from "./styled";
import { ASYNC_STATUS, fetchSuppliers } from "~/redux";
import categories from "~/sub-categories/categories";
import TranslateFunc from "~/utils/dictionary";
import { toast } from "react-toastify";

interface MoreProduct {
  name: string;
  price: number;
  sale: number;
  images: [];
  category: string;
  supplier_id: string;
  product_code: string;
  specifications: string;
  description: string;
  acceptable_expiry_threshold: number;
}

const MoreProductModal: FC<{
  moreModal: boolean;
  setMoreModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ moreModal, setMoreModal }) => {
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
    supplier_id: "",
    product_code: "",
    specifications: "",
    description: "",
    acceptable_expiry_threshold: 30,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<MoreProduct> = async (data) => {
    const bodyFormData = new FormData();

    if (data.images.length < 2) {
      // set errors images
      setError("images", {
        type: "manual",
        message: "Please select at least 2 images",
      });
      return;
    }

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

    const result = await dispatch(addProduct(bodyFormData));

    if (addProduct.fulfilled.match(result)) {
      toast.success("Add product success!", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      handleModal(false);
    } else {
      const message = result.payload as string;

      toast.error("Add product failed!" + message[0], {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  console.log(errors);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, []);

  return (
    <Drawer
      title="Categories List"
      placement="right"
      onClose={() => handleModal(false)}
      open={moreModal}
      width="1300px"
    >
      <form encType="multipart/form-data">
        <Row gutter={[24, 24]}>
          <Col span={12}>
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
              rules={{
                required: "Please enter product name",
              }}
            />
            <ErrorMessage errors={errors} name="name" />
          </Col>
          <Col span={6}>
            <Controller
              name="acceptable_expiry_threshold"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Acceptable Expiry Threshold"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="number"
                />
              )}
              rules={{
                required: "Please enter acceptable expiry threshold",
              }}
            />
            <ErrorMessage errors={errors} name="acceptable_expiry_threshold" />
          </Col>
          <Col span={6}>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Category"
                  onChange={onChange}
                  options={[
                    ...categories.map((i) => ({
                      value: i.textKey,
                      label: TranslateFunc(i.textKey),
                    })),
                  ]}
                />
              )}
              rules={{ required: "Please select category" }}
            />
            <ErrorMessage errors={errors} name="category" />
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
              rules={{
                min: {
                  value: 1,
                  message: "Price must be greater than 1",
                },
                required: true,
              }}
            />
            <ErrorMessage errors={errors} name="price" />
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
              rules={{
                required: true,
                max: {
                  value: 100,
                  message: "Sale must be less than 100",
                },
              }}
            />
            <ErrorMessage errors={errors} name="sale" />
          </Col>
          <Col span={6}>
            <Controller
              name="supplier_id"
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
              rules={{
                required: "Please select supplier",
              }}
            />
            <ErrorMessage errors={errors} name="supplier_id" />
          </Col>
          <Col span={6}>
            <Controller
              name="product_code"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Product Code"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
              rules={{ required: "Please enter product code" }}
            />{" "}
            <ErrorMessage errors={errors} name="product_code" />
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
              rules={{ required: "Please enter min 2 images" }}
            />
            <ErrorMessage errors={errors} name="images" />
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
            />
          </Col>
          <Col span={12}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) => (
                <Description onChange={onChange} />
              )}
            />
          </Col>
        </Row>
        <SubmitGroup>
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={products.status === ASYNC_STATUS.LOADING}
            type="primary"
          >
            Save
          </Button>
        </SubmitGroup>
      </form>
    </Drawer>
  );
};

export default MoreProductModal;
