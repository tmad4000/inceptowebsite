import styles from './Tile.module.css';

interface TileProps {
    data: {
        id: string;
        type: 'link' | 'text' | 'map' | 'image';
        title?: string;
        subtitle?: string;
        url?: string;
        icon?: string;
        content?: string;
        size: '1x1' | '1x2' | '2x1' | '2x2';
        location?: string;
    };
}

export default function Tile({ data }: TileProps) {
    const sizeClass = styles[`size_${data.size}`];

    const renderContent = () => {
        switch (data.type) {
            case 'link':
                return (
                    <a href={data.url} target="_blank" rel="noopener noreferrer" className={styles.linkContent}>
                        {data.icon && <img src={data.icon} alt="" className={styles.icon} />}
                        <div className={styles.textContent}>
                            <h3 className={styles.title}>{data.title}</h3>
                            <p className={styles.subtitle}>{data.subtitle}</p>
                        </div>
                    </a>
                );
            case 'text':
                return (
                    <div className={styles.textContentCenter}>
                        <p className={styles.content}>{data.content}</p>
                    </div>
                );
            case 'map':
                return (
                    <div className={styles.mapPlaceholder}>
                        <div className={styles.mapInfo}>
                            <span className={styles.mapIcon}>📍</span>
                            <span className={styles.location}>{data.location}</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`${styles.tile} ${sizeClass} ${styles[data.type]}`}>
            {renderContent()}
        </div>
    );
}
