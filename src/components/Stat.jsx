import useCountUp from "../hooks/useCountUp.js";

export default function Stat({ num, suffix = "", label }) {
  const [ref, value] = useCountUp(num, { suffix });
  return (
    <div className="stat">
      <span className="stat__num" ref={ref}>{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
