import React, { FC, useEffect } from "react";
import PageTitle from "~/components/common/PageTitle";
import {
  Dashboard,
  DashboardHeader,
  DashboardControl,
  DashboardBody,
} from "./styled";
import withAuth from "~/hocs/withAuth";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Select, Space, DatePicker, Button, Tooltip, Spin } from "antd";
import moment from "moment";
import {
  ASYNC_STATUS,
  fetchBranch,
  useAppDispatch,
  useAppSelector,
} from "~/redux";
import { DashboardPayload, getDataDashboard } from "~/redux";

import dayjs, { Dayjs } from "dayjs";
import ReloadButton from "~/components/common/ReloadButton";
import { DashboardType } from "~/shared";
dayjs().format();

const DashboardSc: FC = () => {
  const [startDate, setStartDate] = React.useState<Dayjs>(
    dayjs().subtract(30, "days")
  );
  const [endDate, setEndDate] = React.useState<Dayjs>(dayjs());
  const [branch, setBranch] = React.useState<string>("all");
  const [dashboardType, setDashboardType] = React.useState<DashboardType>(
    DashboardType.OrdersDaily
  );
  const [chartType, setChartType] = React.useState<string>("line");

  const branches = useAppSelector((state) => state.branch.data);
  const { data, status } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const handleRenderChart = async () => {
    const data: DashboardPayload = {
      startDate,
      endDate,
      branch,
      dashboardType,
    };

    await dispatch(getDataDashboard(data));
  };

  useEffect(() => {
    dispatch(fetchBranch());
    dispatch(
      getDataDashboard({
        startDate,
        endDate,
        branch,
        dashboardType,
      })
    );
  }, []);

  return (
    <Dashboard>
      <DashboardHeader>
        <PageTitle text="Dashboard Management" />
      </DashboardHeader>
      <DashboardControl>
        <Space wrap>
          <Select
            defaultValue={dashboardType}
            style={{ width: 400 }}
            options={[
              { value: DashboardType.OrdersDaily, label: "Orders Per Day" },
              { value: DashboardType.NewUser, label: "New User" },
              { value: DashboardType.RevenueDaily, label: "Revenue Per Day" },
              { value: DashboardType.HotSelling, label: "Hot Selling" },
            ]}
            onChange={(value) => setDashboardType(value)}
          />
          {/* only in the pass and max 60 days */}
          <DatePicker.RangePicker
            disabledDate={(current) => {
              // add 1 day to current date
              const newCurrent = dayjs(current).subtract(1, "day");
              const customDate = dayjs().format("YYYY-MM-DD");

              return (
                newCurrent && newCurrent > moment(customDate, "YYYY-MM-DD")
              );
            }}
            format={"DD/MM/YYYY"}
            onChange={(value) => {
              const [startDate, endDate] = value as [Dayjs, Dayjs];

              setStartDate(startDate);
              setEndDate(endDate);
            }}
            defaultPickerValue={[dayjs().subtract(30, "days"), dayjs()]}
            defaultValue={[startDate, endDate]}
          />
          <Select
            defaultValue={branch}
            style={{ width: 220 }}
            options={[
              {
                value: "all",
                label: "All",
              },
              ...branches.map((branch) => ({
                value: branch.id,
                label: branch.name,
              })),
            ]}
            onChange={(value) => setBranch(value)}
          />
          <Select
            defaultValue={chartType}
            style={{ width: 120 }}
            options={[
              {
                value: "line",
                label: "Line",
              },
              {
                value: "bar",
                label: "Bar",
              },
            ]}
            onChange={(value) => setChartType(value)}
          />
          <Button type="primary" onClick={handleRenderChart}>
            Apply
          </Button>
        </Space>
      </DashboardControl>
      {status === ASYNC_STATUS.FAILED && <ReloadButton />}
      {status === ASYNC_STATUS.IDLE ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 1400,
            height: 700,
          }}
        >
          <Spin />
        </div>
      ) : (
        <DashboardBody>
          {chartType === "line" ? (
            <LineChart width={1600} height={670} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          ) : (
            <BarChart width={1600} height={670} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          )}
        </DashboardBody>
      )}
    </Dashboard>
  );
};

export default withAuth(DashboardSc);
