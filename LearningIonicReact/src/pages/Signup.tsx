import {
  IonButton,
  IonCard,
  IonContent,
  IonInput,
  IonLabel,
  IonLoading,
  IonPage,
} from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser, presentToast, signUpUser } from "../config/firebaseConfig";

const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  async function onSignup() {
    if (userName.trim() == "" || password.trim() == "")
      return presentToast(
        "UserName and Password are Required.",
        1000,
        "danger"
      );

    if (password.length < 6)
      return presentToast(
        "Password should be at least 6 characters.",
        1000,
        "danger"
      );

    if (password !== cpassword)
      return presentToast(
        "Password and Confirm Password Should be same.",
        1000,
        "danger"
      );

    setIsLoading(true);
    const signUpResponse = await signUpUser(userName, password);
    if (signUpResponse && signUpResponse.status) {
      presentToast(signUpResponse.message, 1000, "success");
    } else {
      presentToast(signUpResponse.message, 1000, "danger");
    }
    setIsLoading(false);
  }
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonLoading
          message="Please Wait! Connecting to server"
          isOpen={isLoading}
        ></IonLoading>
        <IonCard style={{ border: "thin solid #fff" }}>
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
          <IonInput
            placeholder="Confirm Password"
            value={cpassword}
            onIonChange={(e: any) => {
              setCPassword(e.target.value);
            }}
          ></IonInput>
          <IonButton expand="full" onClick={onSignup}>
            Sign Up
          </IonButton>
          <IonLabel>
            <p>
              If you Already User? <Link to="/login">Login</Link>
            </p>
          </IonLabel>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
