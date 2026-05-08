'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, MapPin, Users, Clock, Plus, 
  Search, ChevronLeft, ChevronRight, Bell,
  QrCode, UserPlus, Info, CheckCircle2,
  Calendar, LayoutGrid, List
} from 'lucide-react';
import styles from './EventsManagement.module.css';

interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  participants: number;
  maxParticipants: number;
  organizer: string;
  status: 'Open' | 'Full' | 'Started' | 'Completed';
  category: 'Tournament' | 'Meetup' | 'Workshop';
  banner: string;
}

const mockEvents: CampusEvent[] = [
  { id: '1', title: 'Valorant Finals Night', date: 'May 12, 2026', time: '18:00', venue: 'PLP Auditorium', participants: 450, maxParticipants: 500, organizer: 'PLP Esports Society', status: 'Open', category: 'Tournament', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { id: '2', title: 'Cosplay Community Meet', date: 'May 15, 2026', time: '13:00', venue: 'Student Center', participants: 85, maxParticipants: 100, organizer: 'Arts & Design Club', status: 'Open', category: 'Meetup', banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { id: '3', title: 'Streaming 101 Workshop', date: 'May 18, 2026', time: '10:00', venue: 'Computer Lab 3', participants: 40, maxParticipants: 40, organizer: 'Multimedia Arts', status: 'Full', category: 'Workshop', banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400' }
];

export default function EventsManagement() {
  const [view, setView] = useState<'grid' | 'calendar'>('grid');
  const [selectedDay, setSelectedDay] = useState(8);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Events & Attendance</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className={styles.viewToggle}>
            <button className={`${styles.toggleBtn} ${view === 'grid' ? styles.active : ''}`} onClick={() => setView('grid')}>
              <LayoutGrid size={16} /> Grid
            </button>
            <button className={`${styles.toggleBtn} ${view === 'calendar' ? styles.active : ''}`} onClick={() => setView('calendar')}>
              <Calendar size={16} /> Calendar
            </button>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', border: 'none', borderRadius: '10px', color: '#0a0c14', fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={18} /> Create Event
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className={styles.title} style={{ fontSize: '18px' }}>Upcoming Campus Events</h2>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input 
                type="text" 
                placeholder="Search events..." 
                style={{ background: 'var(--surface)', border: '1px solid rgba(0, 201, 224, 0.1)', borderRadius: '8px', padding: '8px 12px 8px 36px', color: 'var(--text)', fontSize: '13px', outline: 'none' }} 
              />
            </div>
          </div>

          <div className={styles.eventsGrid}>
            {mockEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <img src={event.banner} className={styles.banner} alt={event.title} />
                <div className={styles.cardBody}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className={styles.tag}>{event.category}</div>
                    <span className={styles.registration} style={{ color: event.status === 'Full' ? 'var(--red)' : '#22c55e' }}>{event.status}</span>
                  </div>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}><CalendarDays size={14} className={styles.icon} /> {event.date}</div>
                    <div className={styles.metaItem}><Clock size={14} className={styles.icon} /> {event.time}</div>
                    <div className={styles.metaItem}><MapPin size={14} className={styles.icon} /> {event.venue}</div>
                    <div className={styles.metaItem}><Users size={14} className={styles.icon} /> {event.participants} / {event.maxParticipants} Registered</div>
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.metaItem} style={{ fontSize: '11px' }}>Org: {event.organizer}</div>
                    <button className={styles.toggleBtn} style={{ padding: '6px 12px', background: 'var(--surface2)', border: 'none' }}>Manage</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.calendarCard}>
            <div className={styles.calHeader}>
              <div className={styles.calTitle}>May 2026</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className={styles.calGrid}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className={styles.calDayHead}>{d}</div>)}
              {/* Padding for first day of month (mock) */}
              <div /><div /><div /><div /><div />
              {days.map(d => (
                <div 
                  key={d} 
                  className={`${styles.calDay} ${selectedDay === d ? styles.active : ''}`}
                  onClick={() => setSelectedDay(d)}
                >
                  {d}
                  {(d === 12 || d === 15 || d === 18) && <div className={styles.eventDot} />}
                </div>
              ))}
            </div>

            <div className={styles.remindersList}>
              <h3 className={styles.calTitle} style={{ fontSize: '12px', color: 'var(--muted)' }}>Reminders</h3>
              <div className={styles.reminder}>
                <div className={styles.remIcon}><Bell size={18} /></div>
                <div className={styles.remContent}>
                  <div className={styles.remTitle}>Valorant Finals Setup</div>
                  <div className={styles.remTime}>In 2 days · 16:00</div>
                </div>
              </div>
              <div className={styles.reminder}>
                <div className={styles.remIcon} style={{ color: 'var(--violet)' }}><CheckCircle2 size={18} /></div>
                <div className={styles.remContent}>
                  <div className={styles.remTitle}>QR Codes Generated</div>
                  <div className={styles.remTime}>Workshop 101</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.calendarCard}>
            <div className={styles.calHeader}>
              <div className={styles.calTitle}>Attendance Tracking</div>
              <QrCode size={18} color="var(--cyan)" />
            </div>
            <div className={styles.qrArea}>
              <div className={styles.qrCode}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <rect x="10" y="10" width="20" height="20" fill="#0a0c14" />
                  <rect x="70" y="10" width="20" height="20" fill="#0a0c14" />
                  <rect x="10" y="70" width="20" height="20" fill="#0a0c14" />
                  <rect x="40" y="40" width="20" height="20" fill="#0a0c14" />
                  <rect x="40" y="10" width="10" height="10" fill="#0a0c14" />
                  <rect x="70" y="40" width="10" height="10" fill="#0a0c14" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>V-MASTERS-2026</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Live QR for Entrance Tracking</div>
              </div>
              <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--surface2)', border: '1px solid rgba(0, 201, 224, 0.1)', color: 'var(--cyan)', fontSize: '12px', fontWeight: 600 }}>Download Poster</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
