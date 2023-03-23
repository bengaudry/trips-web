import { Cta } from "../../../components";
// import {
//   AreaChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Area,
//   CartesianAxis,
// } from "recharts";

export function Welcome() {
  // const data = [
  //   {
  //     name: "2020",
  //     uv: 15,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 20,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 30,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 70,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 20,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 10,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 40,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  return (
    <div className="p-8 pb-16 absolute bottom-0 bg-neutral-800 rounded-t-3xl w-full">
      {/* <AreaChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart> */}
      <h1 className="text-4xl font-semibold text-center ">Trips</h1>
      <p className="text-lg text-center text-neutral-500 mt-4">
        Sign in to add a trip or
        <br /> to see your previous ones
      </p>
      <Cta type="link" className="mt-6" to="/signin">
        Let's get started
      </Cta>
    </div>
  );
}
