import { useEffect, useState } from "react";
import {
  get,
  onValue,
  push,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
  type DatabaseReference,
} from "firebase/database";
import { realtimeDB } from "../config";

// Tipo base de documento
type Doc<T> = {
  id: string;
} & T;

export const useRealTimeCollection = <T>(node: string) => {
  //* States
  const [results, setResults] = useState<Doc<T>[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //* Helper para generar referencias a nodos
  // Si se pasa una id, se apunta a un nodo hijo específico, por ejemplo "tasks/task1"
  // Si no se pasa una id, se apunta al nodo completo, por ejemplo "tasks"
  const getRef = (id?: string): DatabaseReference =>
    id ? ref(realtimeDB, `${node}/${id}`) : ref(realtimeDB, node);

  //* Effects (onValue)
  useEffect(() => {
    // Referencia al nodo general o principal, por ejemplo "tasks"
    const nodeRef = getRef();

    const unsubscribe = onValue(nodeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convertir el objeto de datos en un array de documentos con id
        const docs: Doc<T>[] = Object.keys(data).map((key) => ({
          id: key,
          ...(data[key] as T),
        }));
        setResults(docs);
      } else {
        setResults([]);
      }
    });

    return () => unsubscribe(); // limpiar listener al desmontar
  }, [node]);

  //* 1. READ
  const getAll = async (): Promise<Doc<T>[]> => {
    setIsPending(true);
    setError(null);

    try {
      // ? Se obtiene la referencia del nodo principal, por ejemplo "tasks"
      const nodeRef = getRef();
      const snapshot = await get(nodeRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Convertir el objeto de datos en un array de documentos con id
        const docs: Doc<T>[] = Object.keys(data).map((key) => ({
          id: key,
          ...(data[key] as T),
        }));

        setResults(docs);
        setIsPending(false);
        return docs;
      } else {
        setResults([]);
        setIsPending(false);
        return [];
      }
    } catch {
      setError(`Error al consultar los registros de ${node}`);
      setIsPending(false);
      return [];
    }
  };

  //* 1. READ
  const getById = async (id: string): Promise<Doc<T> | null> => {
    setIsPending(true);
    setError(null);

    try {
      // ? Se obtiene la referencia de ese nodo específico, por ejemplo "tasks/task1"
      const nodeRef = getRef(id);
      const snapshot = await get(nodeRef);

      if (snapshot.exists()) {
        const data = snapshot.val() as T;

        // Combinar el id con los datos para formar un documento completo
        const result: Doc<T> = {
          id,
          ...data,
        };

        setIsPending(false);
        return result;
      } else {
        setIsPending(false);
        return null; // No existe el nodo
      }
    } catch {
      setError(`Error al obtener el registro con id ${id} de ${node}`);
      setIsPending(false);
      return null;
    }
  };

  //* 2. CREATE
  const add = async (data: T): Promise<string | null> => {
    setIsPending(true);
    setError(null);

    try {
      // ? Se obtiene la referencia del nodo general, por ejemplo "tasks"
      const nodeRef = getRef();

      // * Agregar un nuevo nodo con id automático
      const newRef = await push(nodeRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      setIsPending(false);
      return newRef.key; // Se retorna el id generado
    } catch {
      setError(`Error al agregar un nuevo registro en ${node}`);
      setIsPending(false);
      return null;
    }
  };

  //* 2. CREATE (con set)
  const setById = async (id: string, data: T): Promise<boolean> => {
    setIsPending(true);
    setError(null);

    try {
      // ? Se obtiene la referencia de ese nodo específico, por ejemplo "tasks/task1" (así no exista, se crea)
      const nodeRef = getRef(id);
      await set(nodeRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
      setIsPending(false);
      return true;
    } catch {
      setError(`Error al guardar el nodo ${node} con id ${id}`);
      setIsPending(false);
      return false;
    }
  };

  //* 3. UPDATE
  // ? En este caso se implementa con update, pues se actualiza solo los campos indicados, sin afectar el resto del nodo
  // ? Set, en cambio, reemplazaría todo el nodo, por lo que se perderían los campos no incluidos en la actualización
  const updateNode = async (id: string, data: Partial<T>) => {
    setIsPending(true);
    setError(null);

    try {
      // ? Se obtiene la referencia de ese nodo específico, por ejemplo "tasks/task1"
      const nodeRef = getRef(id);

      // Actualizar solo los campos indicados
      await update(nodeRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setIsPending(false);
      setError(`Error al actualizar el registro con id ${id} en ${node}`);
      return false;
    }
  };

  //* 4. DELETE
  const removeNode = async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      // ? Se obtiene la referencia de ese nodo específico, por ejemplo "tasks/task1"
      const nodeRef = getRef(id);

      // Eliminar el nodo
      await remove(nodeRef);

      setIsPending(false);
      return true;
    } catch {
      setError(`Error al eliminar el registro con id ${id} de ${node}`);
      setIsPending(false);
      return false;
    }
  };

  return {
    results,
    isPending,
    error,

    getRef,
    getAll,
    getById,
    add,
    setById,
    updateNode,
    removeNode,
  };
};
