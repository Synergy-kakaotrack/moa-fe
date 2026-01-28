'use client';

import ProjectList from './ProjectList/ProjectList';
import NavAiButton from '@/components/layout/Sidebar/NavAiButton';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import Image from 'next/image';

import IconChevron from '@/components/icons/IconChevron';
import { useSidebarState } from '@/contexts/SidebarContext';

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarState(); // Context 사용

  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed ? styles.sidebarCollapsed : ''
      }`}
    >
      {/* 상단 */}
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo/moa-logo.svg"
            alt="MOA"
            width={32}
            height={32}
            priority
          />
        </Link>

        <button
          className={`${styles.collapseBtn} ${
            collapsed ? styles.collapseBtnCollapsed : ''
          }`}
          onClick={toggle}
          aria-label="사이드바 접기"
          aria-expanded={!collapsed}
        >
          <IconChevron
            size={32}
            className={`${styles.chevron} ${
              collapsed ? styles.chevronCollapsed : ''
            }`}
          />
        </button>
      </div>

      {/* 프로필 */}
      <div className={styles.profileSection}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src="/profile/ryan.png"
              alt="User Avatar"
              width={42}
              height={42}
            />
          </div>

          {!collapsed && (
            <div className={styles.profileText}>
              <p>RYAN</p>
              <span>ryan01@gmail.com</span>
            </div>
          )}
        </div>
      </div>

      {/* 프로젝트 */}
      {!collapsed && (
        <div className={styles.projects}>
          <p className={styles.projectsLabel}>프로젝트</p>
          <ProjectList />
        </div>
      )}

      {/* 하단 AI Agent */}
      <div className={styles.agent}>
        <NavAiButton provider="chatgpt" collapsed={collapsed} />
        <NavAiButton provider="claude" collapsed={collapsed} />
        <NavAiButton provider="gemini" collapsed={collapsed} />
      </div>
    </aside>
  );
}
