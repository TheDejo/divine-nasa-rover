import styles from "./page.module.css";
import HomeSection from '@/pageComponents/HomeSection/HomeSection';


export default function Home() {
  return (
    <div className={styles.page}>
      <h1>MARS ROVER</h1>
      <main className={styles.main}>
        <HomeSection />
      </main>
    </div>
  );
}
