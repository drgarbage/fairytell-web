import firebase_app from "../config";
import { getAuth } from "firebase/auth";

export const auth = getAuth(firebase_app);