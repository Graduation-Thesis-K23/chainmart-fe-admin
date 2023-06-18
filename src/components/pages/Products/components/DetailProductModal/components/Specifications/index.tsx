import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";

import {
  SpecificationsContainer,
  SpecificationsHeader,
  SpecificationsLabel,
  SpecificationsList,
  SpecificationsSub,
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

  const handleRemoteSpecifications = (id: string) => {
    const newSpec = specifications.filter((spec) => spec.id !== id);

    setSpecifications(newSpec);
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
          {specifications.map((spec, index) => (
            <p key={spec.id}>
              <span>
                {index + 1}. {spec.key}: {spec.value}
              </span>
              <SpecificationsSub
                onClick={() => handleRemoteSpecifications(spec.id)}
              >
                Remove
              </SpecificationsSub>
            </p>
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
