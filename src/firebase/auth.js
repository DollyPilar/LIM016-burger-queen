import {
  auth,
  signInWithEmailAndPassword,
  getDoc,
  doc,
  db,
} from "./firebase-config.jsx";

export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getUserProfile = async (id) => {
  const docRef = await doc(db, "users", id);
  return getDoc(docRef);
};
