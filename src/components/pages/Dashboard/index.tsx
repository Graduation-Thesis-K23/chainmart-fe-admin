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
import { DashboardPayload, getDataDashboard } from "~/redux/dashboard/slide";

import dayjs from "dayjs";
import ReloadButton from "~/components/common/ReloadButton";
dayjs().format();

const DashboardSc: FC = () => {
  const [startDate, setStartDate] = React.useState<string>(
    dayjs().subtract(30, "days").toString()
  );
  const [endDate, setEndDate] = React.useState<string>(
    dayjs().subtract(1, "days").toString()
  );
  const [branch, setBranch] = React.useState<string>("all");
  const [dashboardType, setDashboardType] = React.useState<string>("revenue");
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
              { value: "revenue", label: "Revenue" },
              { value: "income", label: "Income" },
              { value: "product_sell", label: "Product Sell" },
            ]}
            onChange={(value) => setDashboardType(value)}
          />
          {/* only in the pass and max 60 days */}
          <DatePicker.RangePicker
            disabledDate={(current) => {
              const customDate = dayjs().format("YYYY-MM-DD");
              return current && current > moment(customDate, "YYYY-MM-DD");
            }}
            format={"DD/MM/YYYY"}
            onChange={(_, dateStrings) => {
              setStartDate(dateStrings[0]);
              setEndDate(dateStrings[1]);
            }}
            defaultPickerValue={[
              dayjs().subtract(30, "days"),
              dayjs().subtract(1, "days"),
            ]}
            defaultValue={[
              dayjs().subtract(30, "days"),
              dayjs().subtract(1, "days"),
            ]}
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
            <LineChart
              width={1400}
              height={700}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          ) : (
            <BarChart width={1400} height={700} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          )}
        </DashboardBody>
      )}
    </Dashboard>
  );
};

export default withAuth(DashboardSc);
