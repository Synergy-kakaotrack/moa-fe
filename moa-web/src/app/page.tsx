'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useSidebarState } from '@/contexts/SidebarContext';
import HomeHero from '@/components/home/HomeHero';
import ProjectGrid from '@/components/home/ProjectGrid';
import styles from './page.module.css';

export default function Page() {
  const { collapsed } = useSidebarState();

  return (
    <main className={styles.main}>
      <Image
        src="/logo/background(MO).svg"
        alt=""
        width={600}
        height={600}
        className={clsx(styles.bgMO, collapsed && styles.bgMOCollapsed)}
        aria-hidden="true"
      />
      <Image
        src="/logo/background(OA).svg"
        alt=""
        width={400}
        height={400}
        className={styles.bgOA}
        aria-hidden="true"
      />
      <HomeHero userName="MOA User" />
      <ProjectGrid />
    </main>
  );
}
