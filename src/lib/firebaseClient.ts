// src/lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
// Adicione outras importações do Firebase que você precisar (ex: getAuth, getFirestore)
// import { getAnalytics } from 'firebase/analytics';

// Documentação:
// Pegamos as variáveis do .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Documentação:
// Isso evita que o Firebase seja inicializado várias vezes (um erro comum no Next.js).
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporte o 'app' ou outros serviços que você for usar
// export const analytics = getAnalytics(app);
export { app as firebaseApp };