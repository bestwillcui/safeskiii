import { initializeApp } from 'firebase';

const app = initializeApp( {
    apiKey: "AIzaSyBS5qxoqB7Z7kLovCwuMMEcgdfItWt-c-I",
    authDomain: "safeskiii.firebaseapp.com",
    projectId: "safeskiii",
    storageBucket: "safeskiii.appspot.com",
    messagingSenderId: "673812457617",
    appId: "1:673812457617:web:f57fc91cac0704a9b83730",
    measurementId: "G-CQN9FWRGMK"
});

export const db = app.database();
export const namesRef = db.ref('names');


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyBS5qxoqB7Z7kLovCwuMMEcgdfItWt-c-I",
//     authDomain: "safeskiii.firebaseapp.com",
//     projectId: "safeskiii",
//     storageBucket: "safeskiii.appspot.com",
//     messagingSenderId: "673812457617",
//     appId: "1:673812457617:web:f57fc91cac0704a9b83730",
//     measurementId: "G-CQN9FWRGMK"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>