import { IonButton, IonContent, IonLabel, IonPage } from "@ionic/react";

const Error: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonLabel>
          <h1>hi this is new page</h1>
        </IonLabel>
        <IonButton routerLink="/home">Click to go to home page</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Error;
