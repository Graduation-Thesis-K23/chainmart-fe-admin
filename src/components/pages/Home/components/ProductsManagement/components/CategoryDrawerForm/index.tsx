import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { notification } from "antd";

import { Input, Textarea } from "~/components/common";
import { useAppDispatch } from "~/redux";
import { addCategory } from "~/redux/category";
import { CategoryType } from "~/redux/mocks/get-categories";

type AddCategory = Omit<CategoryType, "id">;

const SubmitButton = styled.input`
  background-color: green;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const CategoryDrawerForm = () => {
  const dispatch = useAppDispatch();

  const [api, contextHolder] = notification.useNotification();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<AddCategory> = async (data, e) => {
    const response = await dispatch(addCategory(data));

    if (response.meta.requestStatus === "fulfilled") {
      e?.target.reset();
      api.open({
        message: "Success",
        description: "Add category successfully.",
        duration: 1.5,
        placement: "topLeft",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, name } }) => (
            <Input label="Name" onChange={onChange} name={name} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, name } }) => (
            <Textarea label="Description" onChange={onChange} name={name} />
          )}
        />
        <SubmitButton type="submit" />
      </form>
    </>
  );
};

export default CategoryDrawerForm;
