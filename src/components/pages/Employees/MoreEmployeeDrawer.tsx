import { Button, Col, Drawer, Row } from "antd";
import React, { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Select } from "~/components/common";
import {
  ASYNC_STATUS,
  AddEmployeeType,
  addEmployee,
  fetchBranch,
  useAppDispatch,
  useAppSelector,
} from "~/redux";

const MoreEmployeeDrawer: FC<{
  employeeDrawer: boolean;
  handleEmployeeDrawer: (status: boolean) => void;
}> = ({ employeeDrawer, handleEmployeeDrawer }) => {
  const { branch } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      branch_id: "",
    },
  });

  const onSubmit: SubmitHandler<AddEmployeeType> = async (data) => {
    const result = await dispatch(addEmployee(data));

    if (addEmployee.fulfilled.match(result)) {
      handleEmployeeDrawer(false);
      toast.success("Employee added successfully");
    }

    if (addEmployee.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  useEffect(() => {
    dispatch(fetchBranch());
  }, []);

  return (
    <Drawer
      title="More Employee"
      placement="right"
      size="large"
      open={employeeDrawer}
      onClose={() => handleEmployeeDrawer(false)}
    >
      <form>
        <Row gutter={[24, 24]}>
          <Col span={16}>
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
          <Col span={8}>
            <Controller
              name="phone"
              control={control}
              render={({ field: { ref, onChange, value, name } }) => (
                <Input
                  label="Phone"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                  name={name}
                  type="tel"
                />
              )}
              rules={{ required: true }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Controller
              name="branch_id"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Branch"
                  onChange={onChange}
                  loading={!true}
                  options={[
                    ...branch.data.map((i) => ({
                      label: i.name,
                      value: i.id,
                    })),
                  ]}
                />
              )}
              rules={{ required: true }}
            />
          </Col>
        </Row>
      </form>
      <Button
        type="primary"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        loading={branch.status === ASYNC_STATUS.LOADING}
      >
        Save
      </Button>
    </Drawer>
  );
};

export default MoreEmployeeDrawer;
