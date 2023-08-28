import { useState } from "react";
import { PanelSwitcher } from "../../components";

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
      <PanelSwitcher
        onChange={setPlatform}
        tabs={platforms}
        current={platform}
        className="my-4"
      />
      {platforms[platform] === "Ios" ? (
        <div>
          <img
            src="/ios-install.gif"
            alt=""
            className="h-calc(100vh-20rem) aspect-[828/1792] mx-auto"
          />
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
        </div>
      ) : (
        <ol className="py-4 pl-6 flex flex-col gap-3 list-decimal">
          <li>Sur votre appareil Android, ouvrez Chrome</li>
          <li>
            Accédez à un site Web comportant une PWA que vous souhaitez
            installer.
          </li>
          <li>
            Appuyez sur <strong>Installer</strong>.
          </li>
          <li>Suivez les instructions à l'écran.</li>
          <p className="pt-2 text-center font-semibold">Et c'est tout !</p>
        </ol>
      )}
    </div>
  );
}
