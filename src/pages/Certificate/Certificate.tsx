import { Cta } from "../../components";

export function Certificate() {
  return (
    <>
      <h1>Télécharger mon certificat</h1>
      <p>
        Obtenez votre certificat personnel et non falsifiable d'obtention des
        3000 kilomètres nécessaires pour passer le permis pour seulement 2.99€
      </p>
      <Cta type="link" to="/show-certificate">
        Générer mon certificat
      </Cta>
    </>
  );
}
