import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Sube una imagen a Firebase Storage y retorna la URL pública
 */
export const uploadBookCover = async (
  file: File,
  userId: string,
): Promise<string> => {
  try {
    // Nombre único
    const fileName = `${Date.now()}-${file.name}`;

    // Estructura en storage
    const storageRef = ref(storage, `books/${userId}/${fileName}`);

    // Subir archivo
    await uploadBytes(storageRef, file);

    // Obtiene URL pública
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
