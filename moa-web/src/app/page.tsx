import HomeHero from '@/components/home/HomeHero';
import ProjectGrid from '@/components/home/ProjectGrid';

export default function Page() {
  return (
    <main>
      <HomeHero userName="MOA User" />
      <ProjectGrid />
    </main>
  );
}
