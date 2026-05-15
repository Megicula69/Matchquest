import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../context/AuthContext';

interface TeamMessage {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface RegisteredTeam {
  teamName: string;
  captainUsername: string;
  roster: string[];
  chatHistory: TeamMessage[];
}

export function useTeam() {
  const { user } = useAuth();
  const [teams, setTeams] = useLocalStorage<RegisteredTeam[]>('mq_registered_teams', []);

  const myTeam = user ? teams.find(t => {
    const isCaptain = t.captainUsername.toLowerCase() === user.username.toLowerCase();
    const isMember = t.roster.some(m => 
      m.toLowerCase() === user.username.toLowerCase() || 
      (user.fullName && m.toLowerCase() === user.fullName.toLowerCase())
    );
    return isCaptain || isMember;
  }) : null;

  const sendMessage = (text: string) => {
    if (!user || !myTeam) return;

    const newMessage: TeamMessage = {
      id: Date.now(),
      author: user.username,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedTeams = teams.map(t => {
      if (t.teamName === myTeam.teamName) {
        return { ...t, chatHistory: [...(t.chatHistory || []), newMessage] };
      }
      return t;
    });

    setTeams(updatedTeams);
  };

  const joinTeam = (teamName: string) => {
    if (!user) return;
    
    const updatedTeams = teams.map(t => {
      if (t.teamName.toLowerCase() === teamName.toLowerCase()) {
        const isAlreadyIn = t.roster.some(m => m.toLowerCase() === user.username.toLowerCase());
        if (isAlreadyIn) return t;
        return { 
          ...t, 
          roster: [...t.roster, user.username],
          chatHistory: [...(t.chatHistory || []), {
            id: Date.now(),
            author: 'System',
            text: `${user.fullName || user.username} has joined the team.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]
        };
      }
      return t;
    });

    setTeams(updatedTeams);
  };

  const addMember = (username: string) => {
    if (!myTeam) return { success: false, message: 'You do not have a team.' };
    
    // In a real app, we'd check if the user exists. 
    // For now, we'll just add the string.
    
    if (myTeam.roster.includes(username)) {
      return { success: false, message: 'Member already in team.' };
    }

    const updatedTeams = teams.map(t => {
      if (t.captainUsername.toLowerCase() === user?.username.toLowerCase()) {
        return { ...t, roster: [...t.roster, username] };
      }
      return t;
    });

    setTeams(updatedTeams);
    return { success: true };
  };

  const removeMember = (username: string) => {
    if (!myTeam) return;
    if (username === myTeam.captainUsername) return; // Cannot remove captain

    const updatedTeams = teams.map(t => {
      if (t.captainUsername.toLowerCase() === user?.username.toLowerCase()) {
        return { ...t, roster: t.roster.filter(m => m !== username) };
      }
      return t;
    });

    setTeams(updatedTeams);
  };

  const deleteMessage = (messageId: number) => {
    if (!myTeam) return;

    const updatedTeams = teams.map(t => {
      if (t.teamName === myTeam.teamName) {
        return { 
          ...t, 
          chatHistory: (t.chatHistory || []).filter(msg => msg.id !== messageId) 
        };
      }
      return t;
    });

    setTeams(updatedTeams);
  };

  return {
    team: myTeam,
    joinTeam,
    sendMessage,
    deleteMessage,
    addMember,
    removeMember,
    isCaptain: user && myTeam ? myTeam.captainUsername.toLowerCase() === user.username.toLowerCase() : false
  };
}
