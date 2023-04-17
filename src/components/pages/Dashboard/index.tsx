import React, { FC } from "react";
import { LineChart, Line } from "recharts";
import withAuth from "~/hocs/withAuth";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 500, pv: 2500, amt: 2500 },
  { name: "Page B", uv: 500, pv: 2500, amt: 2500 },
];

const Dashboard: FC = () => {
  return (
    <section>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </section>
  );
};

export default withAuth(Dashboard);
