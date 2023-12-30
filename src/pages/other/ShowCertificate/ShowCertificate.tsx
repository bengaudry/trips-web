import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getFirebaseDb } from "../../../../server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "@/api";
// import QRCode from "qrcode";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    maxWidth: "60%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  name: { width: "100%", fontWeight: "extrabold", fontSize: 30 },
  qrcodeContainer: {
    aspectRatio: "1 / 1",
    width: "40%",
    marginHorizontal: "auto",
  },
});

type Certificate = { code: string; uid: string; userName: string };

export function ShowCertificate() {
  const [certificate, setCertificate] = useState<Certificate>();

  const certificatesCol = collection(getFirebaseDb(), "/certificates");

  const [qrCodeDataUri, setQRCodeDataUri] = useState("");

  const navigate = useNavigate();

  // Fetches in firestore where the uid equals the users id
  const fetchData = async () => {
    let q = query(
      certificatesCol,
      where("uid", "==", CurrentUser.getUid())
    );
    await getDocs(q)
      .then((val) => {
        // fetched data
        const docs = val.docs;
        console.log(docs[0].data());
        if (docs.length > 0) {
          // set existing certificate in state
          setCertificate(docs[0].data() as Certificate);
        } else {
          // create new certificate
          if (CurrentUser.isLoggedIn()) {
            setCertificate({
              code: generateCertificate(),
              uid: CurrentUser.getUid() as string,
              userName: CurrentUser.getDisplayName() as string,
            });
          } else {
            // user not logged in
            navigate("/");
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  // useEffect(() => {
  //   const generateQRCode = async () => {
  //     try {
  //       const qrCodeDataUri = await QRCode.toDataURL(certificate?.code ?? "");
  //       setQRCodeDataUri(qrCodeDataUri);
  //     } catch (error) {
  //       console.error("Erreur lors de la génération du QR code :", error);
  //     }
  //   };

  //   generateQRCode();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const generateCertificate = () => {
    var code = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 16; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
      if ((i + 1) % 4 === 0 && i !== 15) {
        code += "-";
      }
    }

    return code;
  };

  return (
    <>
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.main}>
              <Text>
                Certificat d'obtention des 3000 kilomètres en conduite
                accompagnée pour
              </Text>
              <Text style={styles.name}>{certificate?.userName}</Text>
              <Text>Your unique code :</Text>
              <Text>{certificate?.code}</Text>
              <View style={styles.qrcodeContainer}>
                <Image src={qrCodeDataUri} />
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}
