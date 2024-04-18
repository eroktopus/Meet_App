import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const newData = allLocations.map((location) => {
        const count = events.filter(
          (event) => event.location === location
        ).length;
        const city = location.split(/, | - /)[0];
        return { city, count };
      });
      return newData;
    };

    setData(getData());
  }, [allLocations, events]); // Dependencies are now directly inside the useEffect

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid className="event-grid" fill="#265BA4" stroke="#7AB4E1" />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{
            dx: 20,
            dy: 40,
            fontSize: 14,
            fill: "white",
            fontWeight: "bold",
          }}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number of Events"
          allowDecimals={false}
          tick={{ fontSize: 14, fill: "white", fontWeight: "bold" }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="blue" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
