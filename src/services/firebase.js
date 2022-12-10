import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBVpV-3xn6GTU8pCJRwqL2AzjFbM6vROVE", // This is intended to be public
  authDomain: "https://lapsee-memory-game.web.app/",
  databaseURL:
    "https://lapsee-memory-game-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// Development
// Point to the RTDB emulator running on localhost.
// if (window.location.hostname === "localhost") {
//   connectDatabaseEmulator(db, "localhost", 9000);
// }

export { db };
