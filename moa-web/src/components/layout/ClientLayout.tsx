'use client';

import { ReactNode } from 'react';
import { SidebarProvider } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar/Sidebar';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </SidebarProvider>
  );
}
