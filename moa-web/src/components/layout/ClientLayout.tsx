'use client';

import { ReactNode } from 'react';
import { SidebarProvider } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar/Sidebar';
import styles from './ClientLayout.module.css';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </SidebarProvider>
  );
}
