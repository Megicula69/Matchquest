import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../context/AuthContext';

export interface Notification {
  id: string;
  type: 'INVITE' | 'SYSTEM' | 'ALERT';
  title: string;
  message: string;
  timestamp: string;
  data?: any;
}

export function useNotifications() {
  const { user } = useAuth();
  const [allNotifications, setAllNotifications] = useLocalStorage<Record<string, Notification[]>>('mq_notifications', {});

  const userNotifications = user ? allNotifications[user.username] || [] : [];

  const addNotification = (username: string, notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotif: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: 'Just now'
    };

    setAllNotifications(prev => ({
      ...prev,
      [username]: [newNotif, ...(prev[username] || [])]
    }));
  };

  const clearNotifications = () => {
    if (!user) return;
    setAllNotifications(prev => ({
      ...prev,
      [user.username]: []
    }));
  };

  const removeNotification = (id: string) => {
    if (!user) return;
    setAllNotifications(prev => ({
      ...prev,
      [user.username]: (prev[user.username] || []).filter(n => n.id !== id)
    }));
  };

  return {
    notifications: userNotifications,
    addNotification,
    clearNotifications,
    removeNotification
  };
}
