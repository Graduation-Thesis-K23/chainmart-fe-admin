import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import { Input, Textarea } from "~/components/common";
import { useAppDispatch } from "~/redux";
import { addCategories } from "~/redux/category";
import { CategoryType } from "~/redux/mocks/get-categories";

type AddCategory = Omit<CategoryType, "id">;

const SubmitButton = styled.input`
  background-color: green;
  color: white;
  padding: 8px 12px;
  border: none;
`;

const CategoryDrawerForm = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<AddCategory> = (data) => {
    dispatch(addCategories(data));
  };

  return (
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
  );
};

export default CategoryDrawerForm;
