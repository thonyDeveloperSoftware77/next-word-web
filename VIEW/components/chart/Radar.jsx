import Radar from "react-d3-radar";

export default function RadarChart({ data, width,   height}) {
  return (
    <div className="Radar">
      <span>
        <Radar
          width={width}
          height={height}
          padding={80}
          domainMax={10}
          data={data}
        />
      </span>
    </div>
  );
}
