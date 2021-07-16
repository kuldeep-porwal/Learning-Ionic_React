import * as firebase from "firebase";

export const config = {
  apiKey: "AIzaSyBxFbwTFJbc1fyWc-ebuxK-x60mPy6ggnw",
  authDomain: "learning-react-native-ca9e3.firebaseapp.com",
  projectId: "learning-react-native-ca9e3",
  storageBucket: "learning-react-native-ca9e3.appspot.com",
  messagingSenderId: "565853313045",
  appId: "1:565853313045:web:8dab8208426cf54fc2561c",
  measurementId: "G-5EX5PBV0NR",
};

firebase.default.initializeApp(config);

export async function loginUser(
  userName: string,
  password: string,
  isSaveUserData: boolean = false
) {
  const userEmail = `${userName}@gmail.com`;

  let loginResponse = { status: false, message: "" };
  try {
    const response = await firebase.default
      .auth()
      .signInWithEmailAndPassword(userEmail, password);

    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("isSaveUserData", "" + isSaveUserData);
    sessionStorage.setItem("isLoggedIn", "True");
    console.log("isSaveUserData", isSaveUserData);
    loginResponse.status = true;
    loginResponse.message = "Login Successfully";
  } catch (error) {
    //console.log(error);
    loginResponse.status = false;
    loginResponse.message = error.message;
  }
  return loginResponse;
}

export async function logOut() {
  sessionStorage.setItem("isLoggedIn", "");
  return true;
}

export async function signUpUser(userName: string, password: string) {
  const userEmail = `${userName}@gmail.com`;

  let signUpResponse = { status: false, message: "" };
  try {
    var response = await firebase.default
      .auth()
      .createUserWithEmailAndPassword(userEmail, password);

    //console.log(response);
    signUpResponse.status = true;
    signUpResponse.message = "Signup Successfully";
  } catch (error) {
    //console.log(error);
    signUpResponse.status = false;
    signUpResponse.message = error.message;
  }
  return signUpResponse;
}

export function presentToast(
  message: string,
  duration: number = 2000,
  color: string = ""
) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = duration;
  if (color != "") toast.color = color;

  document.body.appendChild(toast);
  return toast.present();
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    console.log("isSave", isLoggedIn);
    if (isLoggedIn?.trim() != "" && isLoggedIn?.toUpperCase() === "TRUE") {
      let userName = sessionStorage.getItem("userName");
      let password = sessionStorage.getItem("password");
      var isSave = sessionStorage.getItem("isSaveUserData");
      // loginUser(
      //   userName == null ? "" : userName,
      //   password == null ? "" : password,
      //   isSave?.toUpperCase() === "TRUE" ? true : false
      // ).then((res) => {
      //   //console.log(res);
      //   if (res) resolve(res);
      //   else resolve(null);
      // });
      resolve({ status: true, message: "" });
    } else {
      resolve(null);
    }
    // var unsubscribe = firebase.default.auth().onAuthStateChanged((user) => {
    //   if (user) resolve(user);
    //   else resolve(null);
    //   unsubscribe();
    // });
  });
}

export function populateuserInfo() {
  var isSave = sessionStorage.getItem("isSaveUserData");

  let userInfo = { userName: "", password: "" };
  if (isSave?.trim() != "" && isSave?.toUpperCase() === "TRUE") {
    let userName = sessionStorage.getItem("userName");
    let password = sessionStorage.getItem("password");

    userInfo.userName = userName == null ? "" : userName;
    userInfo.password = password == null ? "" : password;
  }

  return userInfo;
}
