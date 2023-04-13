import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  SpecificationsContainer,
  SpecificationsHeader,
  SpecificationsLabel,
  SpecificationsList,
} from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import Log from "~/utils/Log";

export interface SpecificationsType {
  id: string;
  key: string;
  value: string;
}

const Specifications: FC<{
  onChange: (...event: unknown[]) => void;
  defaultValue?: SpecificationsType[];
}> = ({ onChange, defaultValue = [] }) => {
  Log("Specifications");

  const [moreSpecifications, setMoreSpecifications] = useState(false);
  const [specifications, setSpecifications] =
    useState<SpecificationsType[]>(defaultValue);

  const initFormValues = {
    key: "",
    value: "",
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initFormValues,
  });

  const handleMoreSpecifications = useCallback((status: boolean) => {
    setMoreSpecifications(status);
  }, []);

  const onSubmit: SubmitHandler<{ key: string; value: string }> = (data) => {
    if (specifications.find((item) => item.key === data.key)) {
      return;
    }
    setSpecifications([
      ...specifications,
      {
        id: Date.now().toString(),
        key: data.key,
        value: data.value,
      },
    ]);
    handleMoreSpecifications(false);
  };

  useEffect(() => {
    onChange(JSON.stringify(specifications));

    return () => {
      reset(initFormValues);
    };
  }, [specifications]);

  return (
    <SpecificationsContainer>
      <SpecificationsHeader>
        <SpecificationsLabel>Specifications</SpecificationsLabel>

        <PlusCircleTwoTone
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleMoreSpecifications(true)}
        />
      </SpecificationsHeader>

      <SpecificationsList>
        <div>
          {specifications.map((spec) => (
            <div key={spec.id}>
              + {spec.key}: {spec.value}
            </div>
          ))}
        </div>

        {moreSpecifications && (
          <div>
            <div>
              <input {...register("key")} />
              <input {...register("value")} />
            </div>
            <div>
              <button onClick={handleSubmit(onSubmit)}>Add</button>
              <button onClick={() => handleMoreSpecifications(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </SpecificationsList>
    </SpecificationsContainer>
  );
};

export default memo(Specifications);
