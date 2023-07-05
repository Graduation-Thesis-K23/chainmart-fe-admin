import { Button, Col, Drawer, Row } from "antd";
import React, { FC, memo, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Select } from "~/components/common";
import {
  ASYNC_STATUS,
  AddEmployeeType,
  EmployeeType,
  fetchBranch,
  updateEmployee,
  useAppDispatch,
  useAppSelector,
} from "~/redux";

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
    },
  });

  const onSubmit: SubmitHandler<AddEmployeeType> = async (data) => {
    dispatch(
      updateEmployee({
        id: employee.id as string,
        ...data,
      })
    );

    handleViewEmployeeDrawer(false);

    toast.success("Employee update successfully");
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
        </Row>
      </form>
      <Button
        disabled={isSubmitting || !isDirty}
        onClick={handleSubmit(onSubmit)}
        loading={!(branch.status === ASYNC_STATUS.SUCCEED)}
      >
        Save
      </Button>
    </Drawer>
  );
};

export default memo(ViewEmployeeDrawer);
