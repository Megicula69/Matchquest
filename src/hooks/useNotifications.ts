import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../context/AuthContext';

export interface Notification {
  id: string;
  type: 'INVITE' | 'SYSTEM' | 'ALERT' | 'ANNOUNCEMENT';
  title: string;
  message: string;
  timestamp: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  data?: any;
}

export function useNotifications() {
  const { user, allUsers } = useAuth();
  const [allNotifications, setAllNotifications] = useLocalStorage<Record<string, Notification[]>>('mq_notifications', {});

  const getPriorityWeight = (p?: string) => {
    switch (p) {
      case 'Urgent': return 4;
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  const userNotifications = user ? (allNotifications[user.username] || []).sort((a, b) => 
    getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
  ) : [];

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

  const broadcastNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const timestamp = 'Just now';
    const id = Math.random().toString(36).substr(2, 9);
    
    setAllNotifications(prev => {
      const updated = { ...prev };
      allUsers.forEach(u => {
        const newNotif: Notification = { ...notification, id, timestamp };
        updated[u.username] = [newNotif, ...(updated[u.username] || [])];
      });
      return updated;
    });
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
    broadcastNotification,
    clearNotifications,
    removeNotification
  };
}
