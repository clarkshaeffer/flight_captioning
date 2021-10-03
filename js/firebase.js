import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';
const firebaseConfig = {
	apiKey: "AIzaSyBPz9fECqw9hzKIP6VCkZ8em6VlC3Ggm7U",
	authDomain: "transcriptstt.firebaseapp.com",
	projectId: "transcriptstt",
	storageBucket: "transcriptstt.appspot.com",
	messagingSenderId: "202047961908",
	appId: "1:202047961908:web:7225a33c1efe3ba25d8361",
	measurementId: "G-8L4M431C7J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;