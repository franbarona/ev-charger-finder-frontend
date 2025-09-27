import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import Alert from '../components/ui/Alert';
import type { AlertType } from '../types/types';


interface AlertItem {
  id: number;
  type: AlertType;
  message: string;
  isLeaving?: boolean;
}

interface AddAlertParams {
  type: AlertType;
  message: string;
  duration?: number;
}

interface AlertContextType {
  addAlert: (alert: AddAlertParams) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

let idCounter = 0;

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = useCallback(({ type, message, duration = 150000 }: AddAlertParams) => {
    const id = idCounter++;
    const newAlert = { id, type, message };
    setAlerts((prev) => [...prev, newAlert]);

    if (duration > 0) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, duration);
    }
  }, []);

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.map((alert) => alert.id === id ? { ...alert, isLeaving: true } : alert));

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 300); // same as the CSS transition duration
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {/* UI de alertas */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 transition-all duration-300">
        {alerts.reverse().map((alert) => (
          <Alert key={alert.id} id={alert.id} type={alert.type} message={alert.message} onClose={removeAlert} isLeaving={alert.isLeaving} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe usarse dentro de <AlertProvider>');
  }
  return context;
};
