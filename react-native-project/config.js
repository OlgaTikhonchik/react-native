// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv4Q40fl2diovSZyBi1CEI_zSv5CSIVdU",
  authDomain: "react-native-project-cecd0.firebaseapp.com",
  databaseURL: "https://react-native-project-cecd0-default-rtdb.firebaseio.com",
  projectId: "react-native-project-cecd0",
  storageBucket: "react-native-project-cecd0.appspot.com",
  messagingSenderId: "231452636743",
  appId: "1:231452636743:web:557900244bd94fc8eba362",
  measurementId: "G-1FR57E3G6T",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
