import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const HistoryChart = ({ data }) => {
  return (
    <>
      {data && (
        <div className="text-center">
          <LineChart
            width={1000}
            height={500}
            data={data.reverse()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="coins"
              stroke="#f09a24"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
    </>
  );
};

export default HistoryChart;
