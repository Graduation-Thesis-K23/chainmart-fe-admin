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

const Specifications: FC<{ onChange: (...event: unknown[]) => void }> = ({
  onChange,
}) => {
  Log("Specifications");

  const [moreSpecifications, setMoreSpecifications] = useState(false);
  const [specifications, setSpecifications] = useState<SpecificationsType[]>(
    []
  );

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
            fontSize: 22,
          }}
          onClick={() => handleMoreSpecifications(true)}
        />
      </SpecificationsHeader>

      <SpecificationsList>
        <div>
          {specifications.map((spec, index) => (
            <div
              key={spec.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
                paddingBottom: 3,
                borderBottom: "1px solid #beb5b5",
              }}
            >
              <span>
                {index + 1}. {spec.key}: {spec.value}
              </span>
              <button
                onClick={() => handleRemoteSpecifications(spec.id)}
                style={{
                  display: "inline-block",
                  width: 80,
                  height: 30,
                  cursor: "pointer",
                  backgroundColor: "#9aa3ac",
                  color: "#fff",
                  border: "none",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {moreSpecifications && (
          <div>
            <div
              style={{
                padding: 6,
              }}
            >
              <input
                style={{
                  width: "28%",
                  marginRight: "2%",
                  padding: 6,
                  outline: "none",
                }}
                {...register("key")}
                placeholder="Key"
              />
              <input
                style={{
                  width: "70%",
                  padding: 6,
                  outline: "none",
                }}
                {...register("value")}
                placeholder="Value"
              />
            </div>
            <div
              style={{
                padding: 6,
              }}
            >
              <button
                style={{
                  display: "inline-block",
                  marginRight: 10,
                  width: 80,
                  height: 30,
                  cursor: "pointer",
                  backgroundColor: "#1890ff",
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleSubmit(onSubmit)}
              >
                Add
              </button>
              <button
                style={{
                  display: "inline-block",
                  width: 80,
                  height: 30,
                  cursor: "pointer",
                  backgroundColor: "#9aa3ac",
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => handleMoreSpecifications(false)}
              >
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
