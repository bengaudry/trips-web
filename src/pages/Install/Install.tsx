import { useState } from "react";
import { TabSlider } from "../../components";

export function Install() {
  const platforms = ["Ios", "Android"];
  const [platform, setPlatform] = useState(0);

  return (
    <div className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Install Trips</h1>
      <p className="text-grayblue-500">
        Trips est une application web, donc elle n'est pas disponible sur les
        stores de votre appareil. L'installation de l'app reste très simple, il
        vous suffit de suivre ces étapes :
      </p>
      <TabSlider
        onChange={setPlatform}
        tabs={platforms}
        current={platform}
        className="my-4"
      />
      {platform === 0 ? (
        <div>
          <img
            src="/ios-install.gif"
            alt=""
            className="h-calc(100vh-12rem) aspect-[828/1792] mx-auto"
          />
          <ol className="py-4 flex flex-col gap-3">
            <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
              1 - Appuyez sur le bouton "share" en bas de l'écran
            </li>
            <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
              2 - Appuyez sur "Ajouter à l'écran d'accueil"
            </li>
            <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
              3 - Appuyez sur "Ajouter" en haut à droite
            </li>
            <li className="pt-2 text-center font-semibold">Et c'est tout !</li>
          </ol>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
