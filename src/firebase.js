import Firebase from 'firebase'
import {config} from './firebaseConfig'

export const db = Firebase.initializeApp(config).database();