import { Dispatch, SetStateAction } from "react";
import { Modal, Text, Cta } from "../../../../components";
import { MAX_KMS_BEFORE_LICENSE } from "../../../../lib/constants";

export function PremiumPopup(props: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const { visible, setVisible } = props;

  return (
    <Modal visible={visible} setVisible={setVisible} title="Mode premium">
      <Text.Title rank={3} className="mb-3">
        Pourquoi le mode premium ?
      </Text.Title>
      <Text.Secondary className="mb-3">
        Grâce à ce mode, un algorithme analysera tes trajets et te proposera des
        conseils en conséquence. Tu pourras voir de nombreuses statistiques qui
        te permettront d'améliorer ta conduite.
      </Text.Secondary>
      <Text.Secondary>
        Lorsque tu atteindras {MAX_KMS_BEFORE_LICENSE} kilomètres, tu recevras
        un certificat prouvant que tu as bien fait le nombre de kilomètres
        attendu.
      </Text.Secondary>
      <Text.Title rank={3} className="mt-5 mb-3">
        Le prix ?
      </Text.Title>
      <p className="text-lg">
        C'est <span className="text-[#DA22FF]">2.99€</span> seulement, et{" "}
        <b>une seule fois</b>.
      </p>
      <Text.Secondary className="mb-4">
        Cette petite donation permet à cette app de se financer et d'éviter la
        publicité qui, on le sait, est très pénible !
      </Text.Secondary>
      <Cta
        type="link"
        to="https://buy.stripe.com/28o6oH27I7u46sw3cc"
        target="_blank"
        color="gradient"
      >
        Acheter premium pour 2.99€
      </Cta>
    </Modal>
  );
}
