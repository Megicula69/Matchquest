import React, { useState, useRef, useEffect } from 'react';
import { Users, UserPlus, MessageSquare, Send, Trophy, Shield, Trash2, Calendar, Clock, Gamepad2 } from 'lucide-react';
import { useTeam } from '../hooks/useTeam';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import { useToast } from '../context/ToastContext';
import { useTournament } from '../hooks/useTournament';
import styles from './Team.module.css';

export const TeamPage: React.FC = () => {
  const { team, addMember, removeMember, isCaptain, sendMessage, deleteMessage } = useTeam();
  const { user, getUserName } = useAuth();
  const { addNotification } = useNotifications();
  const toast = useToast();
  const { schedule } = useTournament();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [newMember, setNewMember] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [team?.chatHistory]);

  const upcomingMatches = schedule.filter(m => 
    (m.team1 === team?.teamName || m.team2 === team?.teamName) && 
    m.status !== 'FINAL'
  );

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
          <p>Official Roster | Captain: {getUserName(team.captainUsername)}</p>
        </header>

        <section className={styles.teamCard}>
          <h2 className={styles.sectionTitle}><Users size={20} /> Team Roster</h2>
          
          <div className={styles.roster}>
            {team.roster.map((member, idx) => (
              <div key={idx} className={styles.memberCard}>
                <div className={styles.avatar}>{getUserName(member).charAt(0)}</div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{getUserName(member)}</span>
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

        <section className={styles.matchesCard}>
          <h2 className={styles.sectionTitle}><Calendar size={20} /> Upcoming Matches</h2>
          <div className={styles.matchesList}>
            {upcomingMatches.length === 0 ? (
              <div className={styles.emptyMatches}>
                <Gamepad2 size={32} />
                <p>No matches scheduled yet.</p>
              </div>
            ) : (
              upcomingMatches.map(match => (
                <div key={match.id} className={styles.matchCard}>
                  <div className={styles.matchMeta}>
                    <div className={styles.matchStatus}>{match.status}</div>
                    <div className={styles.matchTime}>
                      <Clock size={14} /> {match.time} | {match.date}
                    </div>
                  </div>
                  <div className={styles.matchVersus}>
                    <div className={`${styles.vsTeam} ${match.team1 === team.teamName ? styles.highlight : ''}`}>
                      {match.team1}
                    </div>
                    <div className={styles.vsCircle}>VS</div>
                    <div className={`${styles.vsTeam} ${match.team2 === team.teamName ? styles.highlight : ''}`}>
                      {match.team2}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <aside className={styles.chatbox}>
        <div className={styles.chatHeader}>
          <MessageSquare size={20} color="var(--cyan)" />
          <h2>Team Comms</h2>
        </div>
        
        <div className={styles.chatMessages} ref={chatContainerRef}>
          {(!team.chatHistory || team.chatHistory.length === 0) ? (
            <div className={`${styles.message} ${styles.system}`}>
              <span className={styles.msgAuthor}>System</span>
              <div className={styles.msgBubble}>Team channel initialized. Good luck!</div>
            </div>
          ) : (
            team.chatHistory.map(msg => (
              <div key={msg.id} className={`${styles.message} ${msg.author === user?.username ? styles.mine : ''} ${msg.author.toLowerCase() === 'system' ? styles.system : ''}`}>
                <div className={styles.msgHeader}>
                  <span className={styles.msgAuthor}>{getUserName(msg.author)}</span>
                </div>
                <div className={styles.msgContent}>
                  {(msg.author === user?.username || isCaptain) && msg.author.toLowerCase() !== 'system' && (
                    <button 
                      className={styles.unsendBtn} 
                      onClick={() => deleteMessage(msg.id)}
                      title="Unsend message"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className={styles.msgBubble}>
                    {msg.text}
                  </div>
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
