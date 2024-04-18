import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Sector,
} from "recharts";

const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"]; // Define genres array

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const newData = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });

    setData(newData);
  }, [events]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const colors = ["#265BA4", "#497fbb", "blue", "#163676 ", "#A3D9EE"];

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius * 1.1}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="container-wrapper">
      <h3 className="event-genres-title">Event Genres</h3>
      <ResponsiveContainer width="99%" height={400}>
        <PieChart style={{ marginTop: "-30px" }}>
          <Tooltip />
          <Pie
            data={data}
            dataKey="value"
            labelLine={false}
            outerRadius={150}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventGenresChart;
