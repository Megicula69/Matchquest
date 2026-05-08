'use client';

import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Download, Eye, Pencil, Ban, ShieldOff, ShieldCheck,
  Trash2, X, Users, UserCheck, UserX, Clock, Trophy, Swords,
  MessageCircle, Star, AlertTriangle, CalendarDays,
  CheckCircle2,
} from 'lucide-react';
import s from './UserManagement.module.css';
import AddUserModal from './AddUserModal';

/* ===== MOCK DATA ===== */
interface UserRecord {
  id: number; firstName: string; lastName: string; username: string; email: string;
  studentId: string; games: string[]; reputation: number; role: string;
  status: string; verified: boolean; lastActive: string; color: string;
}

const USERS: UserRecord[] = [
  { id:1,firstName:'Juan',lastName:'Cruz',username:'phantom_j',email:'juan@plp.edu.ph',studentId:'2024-0001',games:['Valorant','CS2'],reputation:92,role:'admin',status:'active',verified:true,lastActive:'2 min ago',color:'#e8334a' },
  { id:2,firstName:'Maria',lastName:'Santos',username:'m_santos',email:'maria@plp.edu.ph',studentId:'2024-0012',games:['League of Legends'],reputation:88,role:'moderator',status:'active',verified:true,lastActive:'5 min ago',color:'#9b6dff' },
  { id:3,firstName:'Carlo',lastName:'Reyes',username:'carlo_rx',email:'carlo@plp.edu.ph',studentId:'2024-0034',games:['Dota 2','Valorant'],reputation:75,role:'user',status:'active',verified:true,lastActive:'12 min ago',color:'#00c9e0' },
  { id:4,firstName:'Ana',lastName:'Garcia',username:'ana_gg',email:'ana@plp.edu.ph',studentId:'2024-0045',games:['Apex Legends'],reputation:60,role:'user',status:'suspended',verified:true,lastActive:'1 day ago',color:'#f0a500' },
  { id:5,firstName:'Miguel',lastName:'Torres',username:'ghost99',email:'miguel@plp.edu.ph',studentId:'2024-0056',games:['CS2','Valorant'],reputation:25,role:'user',status:'banned',verified:false,lastActive:'3 days ago',color:'#e8334a' },
  { id:6,firstName:'Sofia',lastName:'Lim',username:'sofi_lim',email:'sofia@plp.edu.ph',studentId:'2024-0078',games:['League of Legends','Dota 2'],reputation:95,role:'organizer',status:'active',verified:true,lastActive:'30 min ago',color:'#22c55e' },
  { id:7,firstName:'Diego',lastName:'Ramos',username:'d_ramos',email:'diego@plp.edu.ph',studentId:'2024-0089',games:['Valorant'],reputation:70,role:'user',status:'active',verified:false,lastActive:'1 hr ago',color:'#9b6dff' },
  { id:8,firstName:'Isabella',lastName:'Morales',username:'isa_m',email:'isabella@plp.edu.ph',studentId:'2024-0091',games:['Apex Legends','CS2'],reputation:83,role:'moderator',status:'active',verified:true,lastActive:'15 min ago',color:'#00c9e0' },
  { id:9,firstName:'Rafael',lastName:'Dela Cruz',username:'raf_dc',email:'rafael@plp.edu.ph',studentId:'2024-0102',games:['Dota 2'],reputation:45,role:'user',status:'pending',verified:false,lastActive:'5 days ago',color:'#f0a500' },
  { id:10,firstName:'Camille',lastName:'Aquino',username:'cam_q',email:'camille@plp.edu.ph',studentId:'2024-0113',games:['Valorant','League of Legends','CS2'],reputation:98,role:'admin',status:'active',verified:true,lastActive:'Just now',color:'#e8334a' },
  { id:11,firstName:'Ethan',lastName:'Bautista',username:'eth_b',email:'ethan@plp.edu.ph',studentId:'2024-0124',games:['Valorant'],reputation:55,role:'user',status:'active',verified:true,lastActive:'2 hr ago',color:'#22c55e' },
  { id:12,firstName:'Jasmine',lastName:'Villanueva',username:'jas_v',email:'jasmine@plp.edu.ph',studentId:'2024-0135',games:['League of Legends'],reputation:78,role:'user',status:'active',verified:true,lastActive:'45 min ago',color:'#9b6dff' },
];

const repColor = (v:number) => v >= 80 ? '#22c55e' : v >= 50 ? '#f0a500' : '#e8334a';

/* ===== DRAWER COMPONENT ===== */
function UserDrawer({ user, onClose }: { user: UserRecord; onClose: () => void }) {
  const initials = user.firstName[0] + user.lastName[0];
  const history = [
    { text:'Joined Valorant Masters tournament',time:'2 hours ago',color:'#00c9e0' },
    { text:'Won ranked match vs Team Echo',time:'5 hours ago',color:'#22c55e' },
    { text:'Reported by user for toxic behavior',time:'1 day ago',color:'#e8334a' },
    { text:'Achieved Diamond rank in Valorant',time:'3 days ago',color:'#9b6dff' },
    { text:'Registered for Campus Gaming Week',time:'1 week ago',color:'#f0a500' },
  ];

  return (
    <>
      <div className={s.drawerOverlay} onClick={onClose} />
      <div className={s.drawer}>
        <div className={s.drawerHeader}>
          <span className={s.drawerTitle}>User Profile</span>
          <button className={s.drawerClose} onClick={onClose}><X size={18} /></button>
        </div>
        <div className={s.drawerBody}>
          {/* Profile */}
          <div className={s.drawerProfile}>
            <div className={s.drawerAvatar} style={{ background:`linear-gradient(135deg,${user.color},${user.color}88)` }}>{initials}</div>
            <div className={s.drawerProfileInfo}>
              <h3>{user.firstName} {user.lastName}</h3>
              <p>@{user.username} · {user.email}</p>
              <div className={s.drawerBadges}>
                <span className={`${s.badge} ${s[user.status]}`}>{user.status}</span>
                <span className={`${s.badge} ${s[user.role]}`}>{user.role}</span>
                <span className={`${s.badge} ${user.verified ? s.verified : s.unverified}`}>{user.verified ? 'Verified' : 'Unverified'}</span>
              </div>
            </div>
          </div>

          {/* Gaming Stats */}
          <div className={s.drawerSection}>
            <div className={s.drawerSectionTitle}>Gaming Statistics</div>
            <div className={s.drawerGrid}>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>247</div><div className={s.drawerStatLabel}>Matches Played</div></div>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>2.4</div><div className={s.drawerStatLabel}>K/D/A Ratio</div></div>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>62%</div><div className={s.drawerStatLabel}>Win Rate</div></div>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>{user.reputation}</div><div className={s.drawerStatLabel}>Reputation</div></div>
            </div>
          </div>

          {/* Tournament Participation */}
          <div className={s.drawerSection}>
            <div className={s.drawerSectionTitle}>Tournament History</div>
            <div className={s.drawerGrid}>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>8</div><div className={s.drawerStatLabel}>Tournaments</div></div>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>3</div><div className={s.drawerStatLabel}>Championships</div></div>
            </div>
          </div>

          {/* Social / Reports */}
          <div className={s.drawerSection}>
            <div className={s.drawerSectionTitle}>Social &amp; Reports</div>
            <div className={s.drawerGrid}>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>156</div><div className={s.drawerStatLabel}>Posts</div></div>
              <div className={s.drawerStat}><div className={s.drawerStatValue}>2</div><div className={s.drawerStatLabel}>Reports Filed</div></div>
            </div>
          </div>

          {/* Activity History */}
          <div className={s.drawerSection}>
            <div className={s.drawerSectionTitle}>Recent Activity</div>
            <div className={s.historyList}>
              {history.map((h,i) => (
                <div key={i} className={s.historyItem}>
                  <div className={s.historyDot} style={{ background:h.color, boxShadow:`0 0 6px ${h.color}66` }} />
                  <div className={s.historyContent}>
                    <div className={s.historyText}>{h.text}</div>
                    <div className={s.historyTime}>{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className={s.drawerActions}>
            <button className={`${s.drawerBtn} ${s.primary}`}>Edit Profile</button>
            <button className={`${s.drawerBtn} ${s.success}`}><ShieldCheck size={14} /> Verify</button>
            <button className={`${s.drawerBtn} ${s.warn}`}><ShieldOff size={14} /> Suspend</button>
            <button className={`${s.drawerBtn} ${s.danger}`}><Ban size={14} /> Ban</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gameFilter, setGameFilter] = useState('all');
  const [verifyFilter, setVerifyFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userList, setUserList] = useState<UserRecord[]>(USERS);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return userList.filter(u => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.studentId.includes(q);
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchGame = gameFilter === 'all' || u.games.some(g => g.toLowerCase().includes(gameFilter.toLowerCase()));
      const matchVerify = verifyFilter === 'all' || (verifyFilter === 'verified' ? u.verified : !u.verified);
      return matchSearch && matchRole && matchStatus && matchGame && matchVerify;
    });
  }, [search, roleFilter, statusFilter, gameFilter, verifyFilter, userList]);

  const handleAddUser = (newUser: UserRecord) => {
    setUserList(prev => [newUser, ...prev]);
    setToast('User created successfully!');
    setTimeout(() => setToast(null), 3000);
    console.log('Activity Log Created: Admin added user', newUser.username);
  };

  const counts = { 
    total:userList.length, 
    active:userList.filter(u=>u.status==='active').length, 
    banned:userList.filter(u=>u.status==='banned').length, 
    pending:userList.filter(u=>!u.verified).length 
  };

  return (
    <div>
      {/* Summary */}
      <div className={s.summaryBar}>
        <div className={s.summaryItem}><Users size={16} /> Total <span className={s.summaryValue}>{counts.total}</span></div>
        <div className={`${s.summaryItem} ${s.active}`}><UserCheck size={16} /> Active <span className={s.summaryValue}>{counts.active}</span></div>
        <div className={`${s.summaryItem} ${s.banned}`}><UserX size={16} /> Banned <span className={s.summaryValue}>{counts.banned}</span></div>
        <div className={`${s.summaryItem} ${s.pending}`}><Clock size={16} /> Unverified <span className={s.summaryValue}>{counts.pending}</span></div>
      </div>

      {/* Toolbar */}
      <div className={s.toolbar}>
        <div className={s.searchWrap}>
          <Search size={16} className={s.searchIcon} />
          <input className={s.searchInput} placeholder="Search by name, username, email, ID..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <select className={s.filterSelect} value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option><option value="admin">Admin</option><option value="moderator">Moderator</option><option value="organizer">Organizer</option><option value="user">User</option>
        </select>
        <select className={s.filterSelect} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="all">All Status</option><option value="active">Active</option><option value="suspended">Suspended</option><option value="banned">Banned</option><option value="pending">Pending</option>
        </select>
        <select className={s.filterSelect} value={gameFilter} onChange={e=>setGameFilter(e.target.value)}>
          <option value="all">All Games</option><option value="Valorant">Valorant</option><option value="League of Legends">LoL</option><option value="CS2">CS2</option><option value="Dota 2">Dota 2</option><option value="Apex Legends">Apex</option>
        </select>
        <select className={s.filterSelect} value={verifyFilter} onChange={e=>setVerifyFilter(e.target.value)}>
          <option value="all">Verification</option><option value="verified">Verified</option><option value="unverified">Unverified</option>
        </select>
        <button className={s.btnPrimary} onClick={() => setShowAddModal(true)}><Plus size={16} /> Add User</button>
        <button className={s.btnOutline}><Download size={16} /> Export</button>
      </div>

      {/* Table */}
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>User</th><th>Student ID</th><th>Games</th><th>Reputation</th><th>Role</th><th>Status</th><th>Verified</th><th>Last Active</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const initials = u.firstName[0] + u.lastName[0];
              return (
                <tr key={u.id} onClick={() => setSelectedUser(u)}>
                  <td>
                    <div className={s.userCell}>
                      <div className={s.avatar} style={{ background:`linear-gradient(135deg,${u.color},${u.color}88)` }}>{initials}</div>
                      <div className={s.userInfo}><span className={s.userName}>{u.firstName} {u.lastName}</span><span className={s.userHandle}>@{u.username}</span></div>
                    </div>
                  </td>
                  <td style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{u.studentId}</td>
                  <td><div className={s.gameTags}>{u.games.map(g=><span key={g} className={s.gameTag}>{g}</span>)}</div></td>
                  <td>
                    <div className={s.repWrap}>
                      <div className={s.repBar}><div className={s.repFill} style={{ width:`${u.reputation}%`, background:repColor(u.reputation) }} /></div>
                      <span className={s.repVal}>{u.reputation}</span>
                    </div>
                  </td>
                  <td><span className={`${s.badge} ${s[u.role]}`}>{u.role}</span></td>
                  <td><span className={`${s.badge} ${s[u.status]}`}>{u.status}</span></td>
                  <td><span className={`${s.badge} ${u.verified ? s.verified : s.unverified}`}>{u.verified ? '✓ Yes' : '✗ No'}</span></td>
                  <td style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted)' }}>{u.lastActive}</td>
                  <td>
                    <div className={s.actions} onClick={e=>e.stopPropagation()}>
                      <button className={s.actionBtn} title="View" onClick={()=>setSelectedUser(u)}><Eye size={14} /></button>
                      <button className={s.actionBtn} title="Edit"><Pencil size={14} /></button>
                      <button className={`${s.actionBtn} ${s.success}`} title="Verify"><ShieldCheck size={14} /></button>
                      <button className={`${s.actionBtn} ${s.warn}`} title="Suspend"><ShieldOff size={14} /></button>
                      <button className={`${s.actionBtn} ${s.danger}`} title="Ban"><Ban size={14} /></button>
                      <button className={`${s.actionBtn} ${s.danger}`} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={s.pagination}>
          <span className={s.pageInfo}>Showing {filtered.length} of {userList.length} users</span>
          <div className={s.pageButtons}>
            {[1,2,3].map(p=>(
              <button key={p} className={`${s.pageBtn} ${page===p?s.activePage:''}`} onClick={()=>setPage(p)}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Drawer */}
      {selectedUser && <UserDrawer user={selectedUser} onClose={()=>setSelectedUser(null)} />}

      {/* Add User Modal */}
      <AddUserModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSuccess={handleAddUser}
      />

      {/* Success Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(34, 197, 94, 0.95)',
          color: '#fff', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center',
          gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 10000, animation: 'slideIn 0.3s ease'
        }}>
          <CheckCircle2 size={18} /> {toast}
        </div>
      )}
    </div>
  );
}
