import {
  IonButton,
  IonCard,
  IonCheckbox,
  IonContent,
  IonInput,
  IonLabel,
  IonLoading,
  IonPage,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  loginUser,
  populateuserInfo,
  presentToast,
} from "../config/firebaseConfig";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveUserData, setIsSaveUserData] = useState(false);
  const [populateUserData, setpopulateUserData] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    if (userName.trim() == "" || password.trim() == "")
      return presentToast(
        "UserName and Password are Required.",
        1000,
        "danger"
      );

    setIsLoading(true);
    const loginResponse = await loginUser(userName, password, isSaveUserData);
    if (loginResponse && loginResponse.status) {
      presentToast(loginResponse.message, 1000, "success");
      window.location.href = "/home";
    } else {
      presentToast(loginResponse.message, 1000, "danger");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (populateUserData) {
      let userInfo = populateuserInfo();
      setUserName(userInfo.userName);
      setPassword(userInfo.password);
      setpopulateUserData(false);
    }
  }, [populateUserData]);
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonLoading
          message="Please Wait! Connecting to server"
          isOpen={isLoading}
        ></IonLoading>
        <IonCard style={{ border: "1px solid #fff" }}>
          <IonInput
            placeholder="Username"
            value={userName}
            onIonChange={(e: any) => {
              setUserName(e.target.value);
            }}
          ></IonInput>
          <IonInput
            placeholder="Password"
            type="password"
            value={password}
            onIonChange={(e: any) => {
              setPassword(e.target.value);
            }}
          ></IonInput>
          <IonCheckbox
            checked={isSaveUserData}
            onIonChange={(e) => setIsSaveUserData(e.detail.checked)}
          />
          <IonLabel>Save Crediential ?</IonLabel>
          <IonButton expand="full" onClick={onLogin}>
            Login
          </IonButton>
          <IonLabel>
            <p>
              If you have not signup yet <Link to="/signup">Signup</Link>
            </p>
          </IonLabel>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
