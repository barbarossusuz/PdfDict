import Firebase from "firebase";


var config = {
    apiKey: "AIzaSyCTl18O5Ux0t_BOo3lLW11Kkmo41mRS9T0",
    authDomain: "pdfdict.firebaseapp.com",
    databaseURL: "https://pdfdict.firebaseio.com",
    projectId: "pdfdict",
    storageBucket: "pdfdict.appspot.com",
    messagingSenderId: "691834867957"
};
export const firebaseRef = Firebase.initializeApp(config);
