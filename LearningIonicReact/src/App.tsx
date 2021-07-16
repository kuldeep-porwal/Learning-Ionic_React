import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonLoading,
  IonRouterOutlet,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import NewPage from "./pages/Login";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./config/firebaseConfig";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    redirectTo: "/home",
  },
  {
    path: "/home",
    component: Home,
    exact: true,
    redirectTo: "",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/error",
    component: Home,
  },
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((res: any) => {
      if (res != null && res.status) {
        console.log();
        window.history.replaceState({}, "", window.location.pathname);
      } else {
        window.history.replaceState({}, "", "/login");
      }
      setIsLoading(false);
    });
  }, [isLoading]);
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Learning Ionic React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!isLoading ? (
          <IonReactRouter>
            <IonRouterOutlet>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                ></Route>
              ))}
            </IonRouterOutlet>
          </IonReactRouter>
        ) : (
          <IonLoading message="Please wait" isOpen={isLoading}></IonLoading>
        )}
      </IonContent>
    </IonApp>
  );
};

export default App;
