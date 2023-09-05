import { Button, Col, Drawer, Row } from "antd";
import React, { FC, memo, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Select } from "~/components/common";
import Switch from "~/components/common/Switch";
import {
  ASYNC_STATUS,
  EmployeeType,
  fetchBranch,
  updateEmployee,
  useAppDispatch,
  useAppSelector,
  resetPassword,
} from "~/redux";
import checkUUID from "~/utils/check-uuid";

const ViewEmployeeDrawer: FC<{
  employee: EmployeeType;
  viewEmployeeDrawer: boolean;
  handleViewEmployeeDrawer: (status: boolean) => void;
}> = ({ employee, viewEmployeeDrawer, handleViewEmployeeDrawer }) => {
  const { branch } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      name: employee.name,
      phone: employee.phone,
      branch_id: employee.branch.name,
      isActive: employee.isActive ? "1" : "0",
    },
  });

  console.log(employee);

  const handleResetPassword = async (id: string) => {
    console.log(id);
    const result = await dispatch(resetPassword(id));

    if (resetPassword.fulfilled.match(result)) {
      toast("Password reset successfully", {
        type: "success",
        position: "top-right",
      });
    } else {
      toast("Something was wrong", {
        type: "error",
        position: "top-right",
      });
    }
  };

  const onSubmit: SubmitHandler<{
    name: string;
    phone: string;
    branch_id: string;
    isActive: string;
  }> = async (data) => {
    const branch_id = checkUUID(data.branch_id)
      ? data.branch_id
      : employee.branch.id;

    console.log({
      ...data,
      id: employee.id as string,
      isActive: data.isActive === "1" ? true : false,
      branch_id,
    });

    const result = await dispatch(
      updateEmployee({
        ...data,
        id: employee.id as string,
        isActive: data.isActive === "1" ? true : false,
        branch_id,
      })
    );

    if (updateEmployee.fulfilled.match(result)) {
      toast.success("Employee updated successfully");
    }

    if (updateEmployee.rejected.match(result)) {
      toast.error(result.payload as string);
    }

    handleViewEmployeeDrawer(false);
  };

  useEffect(() => {
    dispatch(fetchBranch());
  }, []);

  return (
    <Drawer
      title="View Employee"
      placement="right"
      size="large"
      open={viewEmployeeDrawer}
      onClose={() => handleViewEmployeeDrawer(false)}
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

        <Row gutter={[24, 24]}>
          <Col span={16}>
            <Controller
              name="branch_id"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Branch"
                  onChange={onChange}
                  loading={!true}
                  defaultValue={employee.branch.name}
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
          <Col span={8}>
            <Controller
              name="isActive"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Active"
                  onChange={onChange}
                  defaultValue={employee.isActive ? "1" : "0"}
                  options={[
                    {
                      label: "Active",
                      value: "1",
                    },
                    {
                      label: "Disable",
                      value: "0",
                    },
                  ]}
                />
              )}
              rules={{ required: true }}
            />
          </Col>
        </Row>
      </form>
      <Col span={24}>
        <Button type="primary" onClick={() => handleResetPassword(employee.id)}>
          Reset Password
        </Button>
      </Col>
      <Button
        style={{ marginTop: 10 }}
        type="primary"
        disabled={isSubmitting || !isDirty}
        onClick={handleSubmit(onSubmit)}
        loading={branch.status === ASYNC_STATUS.LOADING}
      >
        Save
      </Button>
    </Drawer>
  );
};

export default memo(ViewEmployeeDrawer);
