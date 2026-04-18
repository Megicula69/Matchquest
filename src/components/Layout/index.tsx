import React from 'react';
import { Sidebar, BottomBar } from '../Navigation';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.mainContent}>
                <div className={styles.scrollArea}>
                    {children}
                </div>
            </main>
            <BottomBar />
        </div>
    );
};
