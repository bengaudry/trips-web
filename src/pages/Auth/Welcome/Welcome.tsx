import { Cta } from "../../../components/Buttons/Cta";

export function Welcome() {
  return (
    <div className="p-8 pb-16 absolute bottom-0 bg-neutral-800 rounded-t-3xl w-full">
      <h1 className="text-4xl font-semibold text-center ">Trips</h1>
      <p className="text-lg text-center text-neutral-500 mt-4">
        Sign in to add a trip or
        <br /> to see your previous ones
      </p>
      <Cta func="link" className="mt-6" to="/signin">Let's get started</Cta>
    </div>
  );
}
