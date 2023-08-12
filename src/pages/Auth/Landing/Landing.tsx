import { NavLink } from "react-router-dom";
import { Cta } from "../../../components";
import { useEffect, useRef } from "react";

export function Landing() {
  const cardOne = useRef(null);
  const cardTwo = useRef(null);
  const cardThree = useRef(null);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(`opacity-0`, !entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    {
      threshold: 1,
    }
  );

  useEffect(() => {
    const cards = [cardOne.current, cardTwo.current, cardThree.current];

    cards.forEach((card) => {
      if (!card) return;
      observer.observe(card);
    });
  });

  if (window.location.toString().includes("https://tripsapp.web.app/")) {
    return (
      <div className="p-8 pb-16 absolute bottom-0 dark:bg-grayblue-800 rounded-t-3xl w-full">
        <h1 className="text-4xl font-semibold text-center dark:text-white">
          Trips
        </h1>
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

  return (
    <main>
      <header className="backdrop-blur-md bg-[#ffffff20] fixed top-0 w-screen left-0 right-0 border-b border-b-[#ffffff50]">
        <div className="max-w- flex flex-row justify-between items-center px-10 py-2">
          <div>
            <img
              src="/icons/icon-svg.svg"
              alt=""
              className="aspect-square w-12"
            />
          </div>
          <NavLink to="/signin">
            <span>Go to the app</span>
            <i className="fi fi-rr-arrow-right" />
          </NavLink>
        </div>
      </header>

      <section className="bg-gradient-to-r from-[#0284C7] to-[#4F46E5] min-h-[90vh] grid place-content-center pb-12">
        <h1 className="text-5xl font-bold block max-w-3xl mb-8">
          L'application qui rend la conduite accompagnée agréable
        </h1>
        <p className="text-xl max-w-3xl">
          Trips est une application web permettant de compter en toute
          simplicité le nombre de kilomètres réalisés durant la conduite
          accompagnée
        </p>
      </section>

      <section className="flex flex-col gap-60 py-64 px-20">
        <article ref={cardOne} className="transition-[opacity] duration-1000">
          <h4 className="text-2xl font-medium mb-3">Plus intuitive</h4>
          <p className="text-4xl font-medium max-w-3xl">
            Trips à été créée pour&nbsp;
            <span className="text-brand-300">faire face à un problème</span> :
            Le manque d’applications facile à utiliser et bien designée pour
            compter ses kilomètres de conduite accoompagnée
          </p>
        </article>

        <article ref={cardTwo} className="transition-[opacity] duration-1000">
          <h4 className="text-2xl font-medium mb-3">Plus intelligente</h4>
          <p className="text-4xl font-medium max-w-3xl">
            Trips facilite la saisie des trajets en&nbsp;
            <span className="text-brand-300">
              autocomplétant certains éléments
            </span>
            &nbsp; comme la météo, la longueur du trajet, la durée du trajet ...
          </p>
        </article>

        <article ref={cardThree} className="transition-[opacity] duration-1000">
          <h4 className="text-2xl font-medium mb-3">
            Faite pour <u className="text-underline">vous</u>
          </h4>
          <p className="text-4xl font-medium max-w-3xl">
            Lorsque vous atteindrez les 3000 kilomètres requis pour passer votre
            permis, Trips saura vous donner un&nbsp;
            <span className="text-brand-300">compte-rendu précis</span>&nbsp;de
            votre conduite et en&nbsp;
            <span className="text-brand-300">déduire des conseils.</span>
          </p>
        </article>
      </section>

      <section>
        <h2>Commencez à utiliser Trips gratuitement</h2>
        <div>
          <NavLink to="/signin">Accéder à l'app</NavLink>
          <a href="https://github.com/bengaudry/trips-web">
            Soutenir le projet
          </a>
        </div>
      </section>

      <footer>© 2022 TRIPS. TOUS DROITS RÉSERVÉS</footer>
    </main>
  );
}
