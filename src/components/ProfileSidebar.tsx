import Image from 'next/image';
import styles from './ProfileSidebar.module.css';

interface ProfileProps {
    profile: {
        displayName: string;
        username: string;
        bio: string;
        avatar: string;
        location: string;
        contact?: string;
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
            {profile.contact && (
                <p className={styles.contact}>Contact: {profile.contact}</p>
            )}
            <button className={styles.contactBtn}>Contact</button>
        </div>
    );
}
