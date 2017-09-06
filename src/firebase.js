import Firebase from 'firebase';
import { config } from './firebaseConfig';

export const fb = Firebase.initializeApp(config);
export const db = fb.database();