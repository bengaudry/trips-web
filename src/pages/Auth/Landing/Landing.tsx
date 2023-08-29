import { ReactNode, forwardRef, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { Input } from "../../../components/form";
import { Cta } from "../../../components";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getFirebaseApp } from "../../../../server";
import { getFormattedDate } from "../../../lib/functions";

export function Landing() {
  const cardOne = useRef(null);
  const cardTwo = useRef(null);
  const cardThree = useRef(null);

  const isStandaloneMode = () => {
    return window.matchMedia("(display-mode: standalone)").matches;
  };

  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       entry.target.classList.toggle(`opacity-0`, !entry.isIntersecting);
  //       if (entry.isIntersecting) observer.unobserve(entry.target);
  //     });
  //   },
  //   {
  //     threshold: 0.45,
  //   }
  // );

  // useEffect(() => {
  //   const cards = [cardOne.current, cardTwo.current, cardThree.current];

  //   cards.forEach((card) => {
  //     if (!card) return;
  //     observer.observe(card);
  //   });
  // });

  if (
    window.location.toString().includes("https://tripsapp.web.app/") ||
    isStandaloneMode()
  ) {
    return (
      <div className="p-8 pb-16 absolute bottom-0 dark:bg-grayblue-800 rounded-t-3xl w-full">
        <h1 className="text-4xl font-semibold text-center dark:text-white">
          Trips
        </h1>
        <p className="text-lg text-center text-grayblue-500 mt-4">
          Sign in to add a trip or
          <br /> to see your previous ones
        </p>
        <Cta type="link" className="mt-6" to="/auth">
          Let's get started
        </Cta>
      </div>
    );
  }

  const LandingCard = forwardRef<
    HTMLDivElement,
    {
      title: ReactNode | string;
      content: ReactNode | string;
    }
  >((props, ref) => {
    return (
      <article
        ref={ref}
        className="sticky top-0 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 items-center gap-10 transition-opacity duration-1000 h-screen border-b bg-grayblue-900"
        style={{
          scrollSnapAlign: "center",
          boxShadow: "0 -10px 20px 2px #00000050",
        }}
      >
        <div
          style={{
            background: 'url("/phones.png")',
            backgroundPosition: "50% 50%",
          }}
          className="h-full bg-no-repeat bg-contain bg-center"
        />
        {/* <h4 className="text-2xl font-medium mb-3">{props.title}</h4> */}
        <p className="text-lg sm:text-4xl font-medium max-w-3xl">
          {props.content}
        </p>
      </article>
    );
  });

  const [joinBetaPopupShown, setJoinBetaPopupShown] = useState(false);
  const [betaEmailInputFocused, setBetaEmailInputFocused] = useState(false);
  const [betaEmail, setBetaEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean | undefined>(false);
  const [betaSuccessShown, setBetaSuccessShown] = useState(false);
  const [emailInUse, setEmailInUse] = useState(true);

  function isValidEmail(email: string): boolean {
    const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  useEffect(() => {
    if (betaEmail === "") {
      setEmailValid(undefined);
      return;
    }
    setEmailValid(isValidEmail(betaEmail));
  }, [betaEmail]);

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      let q = query(tripsCollection, where("email", "==", betaEmail));
      await getDocs(q)
        .then((val) => {
          if (val.docs.length >= 1) {
            setEmailInUse(true);
            return;
          }
          setEmailInUse(false);
        })
        .catch((err) => console.error(`Error while fetching data : ${err}`));
    };

    fetchData();
  }, [emailValid]);

  const getUserDevice = () => {
    return navigator.platform;
  };

  const handleNewBetaTester = async () => {
    if (!betaEmail || betaEmail === "" || !isValidEmail(betaEmail)) return;

    const db = getFirestore(getFirebaseApp());
    const betaTestersCollection = collection(db, "/betaTesters");

    await addDoc(betaTestersCollection, {
      email: betaEmail,
      creationDate: getFormattedDate(),
      device: getUserDevice(),
    })
      .then(() => {
        setBetaEmail("");
        setJoinBetaPopupShown(false);
        setBetaSuccessShown(true);
        window.setTimeout(() => setBetaSuccessShown(false), 3000);
      })
      .catch((err) => {
        console.log("Firebase error :", err);
        alert(
          `Error while sending to the database, please contact us. (Error: ${err})`
        );
        return false;
      });

    return true;
  };

  return (
    <main className="relative">
      <div
        className={`fixed z-50 bg-[#00ff8880] rounded-2xl px-6 py-3 backdrop-blur-md top-4 left-4 w-[calc(100vw-2rem)] transition-transform duration-300 ${
          betaSuccessShown ? "translate-y-0" : "-translate-y-[calc(100%+1rem)]"
        }`}
      >
        You are now on the waitlist
      </div>
      <div
        className={`${
          joinBetaPopupShown
            ? "pointer-events-all opacity-100 backdrop-blur-lg"
            : "pointer-events-none opacity-0 backdrop-blur-none"
        } transition-all duration-500 ease-out join-beta-popup fixed grid gap-4 place-content-center w-full h-screen bg-[#00000060] z-50`}
      >
        <button
          onClick={() => setJoinBetaPopupShown(false)}
          className="absolute z-40 w-full h-screen hover:cursor-default"
        />
        <button className="fixed top-4 right-4 hover:cursor-pointer text-white">
          <i className="fi fi-rr-cross"></i>
        </button>

        <div
          className={`${
            joinBetaPopupShown
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          } flex flex-col z-50 gap-4 max-w-sm lg:max-w-none transition-all duration-500 delay-300 px-6`}
        >
          <h2 className="text-3xl lg:text-5xl font-semibold text-white">
            Become a beta tester
          </h2>
          <div
            className={`relative bg-[#00000040] rounded-2xl overflow-hidden  transition-all duration-300 border-2 ${
              emailValid && !emailInUse
                ? "border-green-400"
                : emailValid !== undefined
                ? "border-red-400"
                : "border-transparent"
            } ${
              betaEmailInputFocused
                ? "shadow-2xl scale-110"
                : "border-transparent"
            }`}
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent  px-6 py-3  outline-none"
              onChange={(e) => setBetaEmail(e.target.value)}
              onFocus={() => setBetaEmailInputFocused(true)}
              onBlur={() => setBetaEmailInputFocused(false)}
            />
            <button
              className="absolute grid place-content-center right-0 top-0 text-xl h-full aspect-square disabled:text-neutral-400 transition-colors"
              disabled={
                !betaEmail || betaEmail === "" || !isValidEmail(betaEmail)
              }
              onClick={() => handleNewBetaTester()}
            >
              <i className="fi fi-rr-angle-circle-right translate-y-0.5" />
            </button>
          </div>
          <NavLink
            to="/auth"
            className="text-neutral-300 underline w-max block mx-auto"
          >
            I'm already tester
          </NavLink>
        </div>
      </div>

      <header className="backdrop-blur-md bg-[#ffffff20] text-white fixed z-40 top-0 w-screen left-0 right-0 border-b border-b-[#ffffff50]">
        <div className="max-w- flex flex-row justify-between items-center px-10 py-2">
          <div>
            <img
              src="/icons/icon-svg.svg"
              alt=""
              className="aspect-square w-12"
            />
          </div>
          <NavLink to="/auth" className="flex flex-row gap-2 font-medium">
            <span>Sign in</span>
            <i className="fi fi-rr-arrow-right translate-y-0.5" />
          </NavLink>
        </div>
      </header>

      <section
        className="bg-contain bg-center min-h-[90vh] grid place-content-center pb-12 px-10 text-white"
        style={{
          background: 'url("/gradient.png")',
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold block max-w-3xl mb-4 sm:mb-8">
          L'application qui rend la conduite accompagnée agréable
        </h1>
        <p className="text-md sm:text-xl max-w-3xl">
          Trips est une application web permettant de compter en toute
          simplicité le nombre de kilomètres réalisés durant la conduite
          accompagnée
        </p>
        <button
          onClick={() => setJoinBetaPopupShown(true)}
          className="bg-brand-400 text-white hover:bg-brand-800 transition-colors duration-300 shadow-xl px-6 py-2 rounded-full mt-4 w-max"
        >
          Join beta <i className="block fi fi-rr-flask-potion" />
        </button>
      </section>

      {/* <section
      // style={{
      //   scrollSnapType: "y mandatory",
      //   scrollSnapStop: "always",
      //   scrollSnapAlign: "top",
      //   scrollSnapPointsY: "repeat(3, 100vh)",
      // }}
      >
        <LandingCard
          ref={cardOne}
          title="Plus intuitive"
          content={
            <>
              Trips à été créée pour&nbsp;
              <span className="text-brand-300">faire face à un problème</span> :
              Le manque d’applications facile à utiliser et bien designée pour
              compter ses kilomètres de conduite accoompagnée
            </>
          }
        />

        <LandingCard
          ref={cardTwo}
          title="Plus intelligente"
          content={
            <>
              Trips facilite la saisie des trajets en&nbsp;
              <span className="text-brand-300">
                autocomplétant certains éléments
              </span>
              &nbsp; comme la météo, la longueur du trajet, la durée du trajet
              ...
            </>
          }
        />

        <LandingCard
          ref={cardThree}
          title={
            <>
              Faite pour <u className="text-underline">vous</u>
            </>
          }
          content={
            <>
              Lorsque vous atteindrez les 3000 kilomètres requis pour passer
              votre permis, Trips saura vous donner un&nbsp;
              <span className="text-brand-300">compte-rendu précis</span>
              &nbsp;de votre conduite et en&nbsp;
              <span className="text-brand-300">déduire des conseils.</span>
            </>
          }
        />
      </section> */}

      {/* <section>
        <h2>Commencez à utiliser Trips gratuitement</h2>
        <div>
          <NavLink to="/auth">Accéder à l'app</NavLink>
          <a href="https://github.com/bengaudry/trips-web">
            Soutenir le projet
          </a>
        </div>
      </section> */}

      <footer className="h-[10vh] grid place-content-center">
        © 2022 TRIPS. TOUS DROITS RÉSERVÉS
      </footer>
    </main>
  );
}
