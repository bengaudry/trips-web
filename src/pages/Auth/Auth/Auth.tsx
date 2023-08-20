import { useState } from "react";
import { RegisterPage } from "./components/Register/Register";
import { SignInPage } from "./components/SignIn/SignIn";

export function Auth() {
  const [currentPage, setCurrentPage] = useState<0 | 1>(0);

  return (
    <main className="relative md:grid grid-cols-2 h-screen">
      <div
        style={{
          backgroundImage: 'url("/phones.png")',
          translate: `calc(${currentPage} * 100%)`,
        }}
        className="hidden md:block bg-cover bg-center absolute inset-0 w-[calc(100vw/2)] transition-[translate] ease-out duration-700"
      />
      <div
        className={`${
          currentPage === 1 ? "grid" : "hidden"
        } h-screen md:grid place-content-center`}
      >
        {/* <RegisterPage onSignInClick={() => setCurrentPage(0)} /> */}
      </div>

      <div
        className={`${
          currentPage === 0 ? "grid" : "hidden"
        } h-screen md:grid place-content-center`}
      >
        <SignInPage onRegisterClick={() => setCurrentPage(1)} />
      </div>
    </main>
  );
}
