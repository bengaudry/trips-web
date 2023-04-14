import { Cta } from "../../../components";

export function Landing() {
  return (
    <main className="">
      <section className="flex flex-col md:flex-row items-center md:h-screen">
        <div className="md:flex-1 p-8 flex flex-col justify-center w-full h-full">
          <h1 className="text-4xl font-semibold">Trips</h1>
          <p className="text-lg text-grayblue-500 mt-4">
            Sign in to add a trip or
            <br /> to see your previous ones
          </p>
          <Cta type="link" className="mt-6" to="/signin">
            Accéder à l'application
          </Cta>
        </div>
        <div className="md:flex-1 relative w-full h-[calc(100vh-100px)] md:py-8">
          <div className="absolute w-11/12 right-1/2 translate-x-1/2 h-full py-10 flex items-center">
            <img
              src="/add-screenshot.png"
              alt=""
              className="block translate-x-14 w-full z-10 scale-[65%] shadow-2xl md:scale-75"
            />
            <img
              src="/home-screenshot.png"
              alt=""
              className="block -translate-x-14 w-full z-40 shadow-2xl scale-75 shadow-black md:scale-100"
            />
          </div>
        </div>
        {/* <div className="relative px-8 h-screen bg-amber-700 flex flex-col justify-center text-left flex-1">
          
        </div> */}
        {/* <div className="relative w-full h-screen flex-1 bg-purple-800">
          
        </div> */}
      </section>
    </main>
  );
}
