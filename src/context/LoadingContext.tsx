import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  type ReactNode
} from 'react';

// 1. Tipos (Interfaces)
interface LoadingContextType {
  isLoading: boolean;
  wrapPromise: <T>(promise: Promise<T>) => Promise<T>;
}

// 2. Crear el Context, inicializado con un valor que cumpla la interfaz
// El 'as' es necesario aquí para indicar que el valor inicial es de ese tipo
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  wrapPromise: <T,> (promise: Promise<T>) => promise, // Función dummy inicial
});

// 3. Hook personalizado para consumir el Context
export const useLoading = () => {
  return useContext(LoadingContext);
};

// 4. Componente Provider
// Definimos el tipo para las 'props' del Provider
interface LoadingProviderProps {
  children: ReactNode; // El contenido que envuelve el Provider
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Implementación de la función central para gestionar la promesa
  const wrapPromise = async <T,> (promise: Promise<T>): Promise<T> => {
    setIsLoading(true); // 🚀 Pone a TRUE al iniciar la consulta
    try {
      const result = await promise;
      return result; // Devuelve el resultado si es exitoso
    } catch (error) {
      throw new Error(`error fetching data ${error}`);
    } finally {
      setIsLoading(false); // ✅ Pone a FALSE al finalizar (siempre)
    }
  };

  // Memoizar el valor del contexto para optimizar el rendimiento
  const contextValue = useMemo(() => ({
    isLoading,
    wrapPromise,
  }), [isLoading]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};