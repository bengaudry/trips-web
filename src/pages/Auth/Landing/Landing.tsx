import { Cta } from "../../../components";

export function Landing() {
  return (
    <div className="p-8 pb-16 absolute bottom-0 bg-grayblue-800 rounded-t-3xl w-full">
      <h1 className="text-4xl font-semibold text-center ">Trips</h1>
      <p className="text-lg text-center text-grayblue-500 mt-4">
        Sign in to add a trip or
        <br /> to see your previous ones
      </p>
      <Cta type="link" className="mt-6" to="/signin">
        Let's get started
      </Cta>
    </div>
  );
}
