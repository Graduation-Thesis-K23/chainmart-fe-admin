import React from "react";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

import Input from "~/components/common/Input";

const CategoryDrawerForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
      <textarea />
      <input type="submit" />
    </form>
  );
};

export default CategoryDrawerForm;
