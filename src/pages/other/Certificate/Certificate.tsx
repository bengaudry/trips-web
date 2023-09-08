import { Cta, Text } from "components";

export function Certificate() {
  return (
    <div className="px-6 py-16">
      <Text.Title>Télécharger mon certificat</Text.Title>
      <Text.Secondary className="mt-4 mb text-xl">
        Obtenez votre certificat personnel et non falsifiable d'obtention des
        3000 kilomètres nécessaires pour passer le permis pour seulement 2.99€
      </Text.Secondary>
      <Cta type="link" to="/show-certificate">
        Générer mon certificat
      </Cta>
    </div>
  );
}
