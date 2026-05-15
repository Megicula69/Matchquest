import React, { useState } from 'react';
import { Users, UserPlus, MessageSquare, Send, Trophy, Shield, Trash2 } from 'lucide-react';
import { useTeam } from '../hooks/useTeam';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import { useToast } from '../context/ToastContext';
import styles from './Team.module.css';

export const TeamPage: React.FC = () => {
  const { team, addMember, removeMember, isCaptain, sendMessage } = useTeam();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const toast = useToast();
  const [newMember, setNewMember] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.trim()) return;
    
    addNotification(newMember.trim(), {
      type: 'INVITE',
      title: 'Team Invitation',
      message: `${user?.fullName || user?.username} has invited you to join team "${team?.teamName}".`,
      data: { teamName: team?.teamName, captain: user?.username }
    });

    setNewMember('');
    toast.success(`Invitation sent to ${newMember.trim()}!`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    sendMessage(chatMessage);
    setChatMessage('');
  };

  if (!team) {
    return (
      <div className={styles.noTeam}>
        <Shield size={64} color="var(--glass-border)" />
        <h2>You are not part of a team.</h2>
        <p>Register a team on the login page to access this section.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} fade-in`}>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1><Trophy size={40} color="var(--cyan)" /> {team.teamName}</h1>
          <p>Official Roster | Captain: {team.captainUsername}</p>
        </header>

        <section className={styles.teamCard}>
          <h2 className={styles.sectionTitle}><Users size={20} /> Team Roster</h2>
          
          <div className={styles.roster}>
            {team.roster.map((member, idx) => (
              <div key={idx} className={styles.memberCard}>
                <div className={styles.avatar}>{member.charAt(0)}</div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member}</span>
                  <span className={styles.memberRole}>
                    {member.toLowerCase() === team.captainUsername.toLowerCase() ? 'Captain' : 'Player'}
                  </span>
                </div>
                {isCaptain && member.toLowerCase() !== team.captainUsername.toLowerCase() && (
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => removeMember(member)}
                    style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--red)', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isCaptain && (
            <form className={styles.addMemberForm} onSubmit={handleAddMember}>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Enter username to invite..." 
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <button type="submit" className={styles.addBtn}>
                <UserPlus size={18} /> Invite Member
              </button>
            </form>
          )}
        </section>
      </div>

      <aside className={styles.chatbox}>
        <div className={styles.chatHeader}>
          <MessageSquare size={20} color="var(--cyan)" />
          <h2>Team Comms</h2>
        </div>
        
        <div className={styles.chatMessages}>
          {(!team.chatHistory || team.chatHistory.length === 0) ? (
            <div className={styles.message}>
              <span className={styles.msgAuthor}>System</span>
              <div className={styles.msgBubble}>Team channel initialized. Good luck!</div>
            </div>
          ) : (
            team.chatHistory.map(msg => (
              <div key={msg.id} className={`${styles.message} ${msg.author === user?.username ? styles.mine : ''}`}>
                <span className={styles.msgAuthor}>{msg.author}</span>
                <div className={styles.msgBubble}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form className={styles.chatInputArea} onSubmit={handleSendMessage}>
          <input 
            type="text" 
            className={styles.chatInput} 
            placeholder="Type a message..." 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button type="submit" className={styles.sendBtn}>
            <Send size={18} />
          </button>
        </form>
      </aside>
    </div>
  );
};
