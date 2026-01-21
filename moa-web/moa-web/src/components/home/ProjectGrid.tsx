import styles from './home.module.css';
import ProjectCard from './ProjectCard';

const mockProjects = [
  {
    id: 'kakao',
    name: 'kakao 현장실습',
    description:
      '카카오 현장실습 프로젝트는 실제 서비스 환경을 기반으로 팀 단위 협업을 통해 문제를 정의하고, 기획부터 구현까지 전 과정을 경험하며 실무 역량을 강화하는...',
    date: '2026/01/09',
  },
  {
    id: 'ai-taekwon',
    name: 'AI 태권 해커톤',
    description:
      'AI 태권 해커톤은 인공지능 기술을 활용해 실제 사회·생활 속 문제를 정의하고, 제한된 시간 안에 아이디어를 서비스 형태로 빠르게 구현해보는...',
    date: '2026/01/01',
  },
];

export default function ProjectGrid() {
  return (
    <section className={styles.grid}>
      {mockProjects.map((p) => (
        <ProjectCard key={p.id} title={p.name} description={p.description} date={p.date} />
      ))}

      <button className={styles.addCard} type="button">
        <div className={styles.addCircle} aria-hidden="true">
          +
        </div>
        <div className={styles.addText}>프로젝트 추가하기</div>
      </button>
    </section>
  );
}
