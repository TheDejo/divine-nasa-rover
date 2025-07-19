import styles from "./page.module.css";
import HomeSection from '@/pageComponents/HomeSection/HomeSection';
import localTexts from './home.texts.json';


export default function Home() {
  return (
    <div className={styles.page}>
      <h1>{localTexts.title}</h1>
      <main className={styles.main}>
        <HomeSection />
      </main>
    </div>
  );
}
