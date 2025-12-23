import ProfileSidebar from "@/components/ProfileSidebar";
import BentoGrid from "@/components/BentoGrid";
import profileData from "@/data/profile.json";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <ProfileSidebar profile={profileData.profile} />
        </div>
        <div className={styles.gridContainer}>
          <BentoGrid tiles={profileData.tiles} />
        </div>
      </div>
    </main>
  );
}
