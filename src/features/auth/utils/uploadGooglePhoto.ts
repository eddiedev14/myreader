import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";

export const uploadGooglePhoto = async (
  photoURL: string,
  uid: string,
): Promise<string> => {
  // Descargar imagen
  const response = await fetch(photoURL);
  const blob = await response.blob();

  // Referencia en storage
  const storageRef = ref(storage, `users/${uid}/profile.jpg`);

  // Subir imagen
  await uploadBytes(storageRef, blob);

  // Obtener URL pública
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};
