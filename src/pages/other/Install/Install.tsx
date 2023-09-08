import { useState } from "react";
import { PanelSwitcher, Text } from "components";

export function Install() {
  const platforms = ["Ios", "Android"];
  const [platform, setPlatform] = useState(0);

  return (
    <div className="px-6 py-16">
      <Text.Title className="mb-4">Install Trips</Text.Title>
      <Text.Secondary>
        Trips est une application web, donc elle n'est pas disponible sur les
        stores de votre appareil. L'installation de l'app reste très simple, il
        vous suffit de suivre ces étapes :
      </Text.Secondary>
      <PanelSwitcher
        onChange={setPlatform}
        tabs={platforms}
        current={platform}
        className="my-4"
      />
      {platforms[platform] === "Ios" ? (
        <div className="sm:grid grid-cols-2 gap-4">
          <ol className="py-4 pl-6 flex flex-col gap-3 list-decimal">
            <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
              Appuyez sur le bouton "share" en bas de l'écran
            </li>
            <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
              Appuyez sur "Ajouter à l'écran d'accueil"
            </li>
            <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
              Appuyez sur "Ajouter" en haut à droite
            </li>
            <p className="pt-2 text-center font-semibold">Et c'est tout !</p>
          </ol>
          <img
            src="/ios-install.gif"
            alt=""
            className="max-h-calc(100vh-40rem) aspect-[828/1792] mx-auto"
          />
        </div>
      ) : (
        <ol className="py-4 pl-6 flex flex-col gap-3 list-decimal">
          <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
            Sur votre appareil Android, ouvrez Chrome
          </li>
          <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
            Accédez à Trips.
          </li>
          <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
            Appuyez sur <strong>Installer</strong>.
          </li>
          <li className="bg-grayblue-800 py-2 px-4 rounded-xl">
            Suivez les instructions à l'écran.
          </li>
          <p className="pt-2 text-center font-semibold">Et c'est tout !</p>
        </ol>
      )}
    </div>
  );
}
