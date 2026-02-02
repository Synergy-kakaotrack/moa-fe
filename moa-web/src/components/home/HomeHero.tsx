import IconSearch from '@/components/icons/IconSearch';
import styles from './home.module.css';

type Props = {
  userName: string;
};


export default function HomeHero({ userName }: Props) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Ryan님, 오늘은 어떤 멋진 프로젝트를 만드실건가요?
      </h1>

      <div className={styles.searchWrap}>
        <IconSearch className={styles.searchIcon} size={20} />
        <input className={styles.searchInput} placeholder="프로젝트를 검색하세요" />
      </div>
    </section>
  );
}
