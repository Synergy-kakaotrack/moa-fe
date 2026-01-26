import HomeHero from '@/components/home/HomeHero';
import ProjectGrid from '@/components/home/ProjectGrid';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.main}>
      <HomeHero userName="MOA User" />
      <ProjectGrid />
    </main>
  );
}
