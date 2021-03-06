// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

async function main() {

  // Add Firebase project configuration object here
  const firebaseConfig = {
  apiKey: "AIzaSyBzMX1cqqg3e12ICmtlL2PCsVm5Q3BM7mc",
  authDomain: "fir-web-codelab-27b75.firebaseapp.com",
  databaseURL: "https://fir-web-codelab-27b75.firebaseio.com",
  projectId: "fir-web-codelab-27b75",
  storageBucket: "fir-web-codelab-27b75.appspot.com",
  messagingSenderId: "869821555458",
  appId: "1:869821555458:web:4e783ed9bd2d215c9fd81b",
  measurementId: "G-54X7Y4JG1H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Listen to RSVP button clicks
  startRsvpButton.addEventListener("click",() => {   
    if(firebase.auth().currentUser){
      firebase.auth().signOut();
    }
    else{
      ui.start("#firebaseui-auth-container", uiConfig);
    }
    
  });

  // Listen to the current Auth state
  firebase.auth().onAuthStateChanged((user) => {
    if (user){
      startRsvpButton.textContent = "LOGOUT";   
      // Show guestbook to logged-in users 
      guestbookContainer.style.display = "block";
      // Subscribe to the guestbook collection
      subscribeGuestbook();
      }
    else{
      startRsvpButton.textContent = "RSVP";
      // Hide guestbook for non-logged-in users
       guestbookContainer.style.display = "none";

      // Unsubscribe from the guestbook collection
      unsubscribeGuestbook();
      }
  });

  // Listen to the form submission
  form.addEventListener("submit", (e) => {
    // Prevent the default form redirect
    e.preventDefault(); 
    // Write a new message to the database collection "guestbook"
    firebase.firestore().collection("guestbook").add({   
      text: input.value,  
      timestamp: Date.now(),  
      name: firebase.auth().currentUser.displayName,
      userId: firebase.auth().currentUser.uid 
      })
      // clear message input field 
      input.value = ""; 
      // Return false to avoid redirect 
      return false;
  });

  // Listen to guestbook updates
  function subscribeGuestbook(){
    // Create query for messages
    guestbookListener = firebase.firestore().collection("guestbook")
    .orderBy("timestamp","desc")
    .onSnapshot((snaps) => {
      // Reset page
      guestbook.innerHTML = "";
      // Loop through documents in database
      snaps.forEach((doc) => {
        // Create an HTML entry for each document and add it to the chat
        const entry = document.createElement("p");
        entry.textContent = doc.data().name + ": " + doc.data().text;
        guestbook.appendChild(entry);
      });
    });
  };

  

  // Unsubscribe from guestbook updates
  function unsubscribeGuestbook(){
    if (guestbookListener != null)
    {
      uestbookListener();
      guestbookListener = null;
    }
  };

}


main();

