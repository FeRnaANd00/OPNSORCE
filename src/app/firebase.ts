import { initializeApp } from 'firebase/app'; // SDK de configuración.
import { getFirestore } from 'firebase/firestore'; // Base documental.
import { getAuth, signInAnonymously } from 'firebase/auth'; // Identidad temporal.
export async function conectarFirebase() {
  const r = await fetch('firebase-config.json', { cache: 'no-store' });
  if (!r.ok) throw new Error('No se encontró firebase-config.json');
  const config = await r.json();
  if (!config.apiKey || !config.projectId || config.apiKey.includes('REEMPLAZAR')) {
    throw new Error('Complete public/firebase-config.json y recargue');
  }
  const app = initializeApp(config);
  const auth = getAuth(app);
  await auth.authStateReady(); // Reutiliza la sesión existente.
  const user = auth.currentUser ?? (await signInAnonymously(auth)).user;
  return { db: getFirestore(app), uid: user.uid };
}
