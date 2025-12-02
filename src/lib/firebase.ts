import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJSFPTVB1ROP0w34oXFYQzwKVpxwyRnpw",
  authDomain: "oscpets-web.firebaseapp.com",
  databaseURL: "https://oscpets-web-default-rtdb.firebaseio.com",
  projectId: "oscpets-web",
  storageBucket: "oscpets-web.firebasestorage.app",
  messagingSenderId: "667428691412",
  appId: "1:667428691412:web:257645e85bc5e6233c4a41",
  measurementId: "G-NGBK6N8LR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime DB
export const db = getDatabase(app);
