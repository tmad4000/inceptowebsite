import Image from 'next/image';
import styles from './ProfileSidebar.module.css';

interface ProfileProps {
    profile: {
        displayName: string;
        username: string;
        bio: string;
        avatar: string;
        location: string;
    };
}

export default function ProfileSidebar({ profile }: ProfileProps) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.avatarWrapper}>
                <img src={profile.avatar} alt={profile.displayName} className={styles.avatar} />
            </div>
            <h1 className={styles.name}>{profile.displayName}</h1>
            <p className={styles.bio}>{profile.bio}</p>
            <div className={styles.meta}>
                <span className={styles.location}>📍 {profile.location}</span>
            </div>
            <button className={styles.contactBtn}>Contact</button>
        </div>
    );
}
