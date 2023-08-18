import { Cta } from "../../components";

export function Certificate() {
  return (
    <div className="px-6 py-16">
      <h1 className="text-4xl font-bold">Télécharger mon certificat</h1>
      <p className="mt-4 mb-6 text-neutral-400 dark:text-grayblue-400 text-xl">
        Obtenez votre certificat personnel et non falsifiable d'obtention des
        3000 kilomètres nécessaires pour passer le permis pour seulement 2.99€
      </p>
      <Cta type="link" to="/show-certificate">
        Générer mon certificat
      </Cta>
    </div>
  );
}
