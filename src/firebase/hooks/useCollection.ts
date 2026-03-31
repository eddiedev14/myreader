import { useState } from "react";
import { db } from "../config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  type DocumentData,
  type WhereFilterOp,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Tipo de filtro (tupla)
export type Filter = [string, WhereFilterOp, unknown];

//? Se tipa el hook con un genérico para tipado de typescript.
export const useCollection = <T>(table: string) => {
  // Tipo base de documento
  type Doc<T> = {
    id: string;
  } & T;

  const [results, setResults] = useState<Doc<T>[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //* 1. R -> READ
  const getAll = async (filters: Filter[] = []): Promise<Doc<T>[]> => {
    // Cargando y no hay errores
    setIsPending(true);
    setError(null);

    try {
      // Se hace una busqueda sobre la colección indicada
      let q = query(collection(db, table));

      // Pueden haber filtros por lo que se itera para obtener aquellos en los que coincide todo.
      // Ejemplo de uso: getAll([["age", ">", 18]]);
      filters.forEach(([field, op, value]) => {
        q = query(q, where(field, op, value));
      });

      // Firebase responde con un “paquete” de documentos
      const snapshot = await getDocs(q);

      // Se unen los documentos para seguir con la estructura del tipo definido
      const docs: Doc<T>[] = snapshot.docs.map((d) => ({
        id: d.id, // Identificador unico del documento
        ...(d.data() as T), // Datos (campos) del documento
      }));

      // Actualizar estados
      setResults(docs);
      setIsPending(false);
      return docs;
    } catch {
      setError(
        `Error al consultar los registros solicitados de la colección ${table}`,
      );
      setIsPending(false);
      return [];
    }
  };

  //* 1. R -> READ
  const getById = async (id: string): Promise<Doc<T> | null> => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result: Doc<T> = {
          id: docSnap.id,
          ...(docSnap.data() as T),
        };

        setIsPending(false);
        return result;
      } else {
        setIsPending(false);
        return null;
      }
    } catch {
      setIsPending(false);
      setError(
        `Error al obtener el registro solcitado de la colección ${table}`,
      );
      return null;
    }
  };

  //* 2. C -> CREATE
  const add = async (data: T): Promise<string | null> => {
    setIsPending(true);
    setError(null);

    try {
      // Añadir el documento al firestore
      const ref = await addDoc(collection(db, table), {
        ...data,
        createdAt: serverTimestamp(),
      } as DocumentData);

      setIsPending(false);
      return ref.id; // Retornar el id del documento creado
    } catch {
      setIsPending(false);
      setError(`Error al agregar un nuevo registro en la colección ${table}`);
      return null;
    }
  };

  //* 2. C -> CREATE
  const setById = async (id: string, data: T): Promise<boolean> => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);

      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setError(`Error al crear el documento en ${table} con id ${id}`);
      setIsPending(false);
      return false;
    }
  };

  //* 3. U -> UPDATE
  const update = async (id: string, data: DocumentData) => {
    setIsPending(true);
    setError(null);

    try {
      // Busca el documento con ese id y lo actualiza
      // con doc(db, table, id), se obtiene un documento específico de esa colección por su id
      // updateDoc, recibe el documento a reemplazar y el nuevo documento
      await updateDoc(doc(db, table, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setIsPending(false);
      setError(
        `Error al actualizar el registro solicitado de la colección ${table}`,
      );
      return false;
    }
  };

  //* 4. D -> DELETE
  const remove = async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      await deleteDoc(doc(db, table, id));
      setIsPending(false);
      return true;
    } catch {
      setError(
        `Error al eliminar el registro solicitado de la colección ${table}`,
      );
      setIsPending(false);
      return false;
    }
  };

  return {
    results,
    isPending,
    error,
    getAll,
    getById,
    add,
    setById,
    update,
    remove,
  };
};
