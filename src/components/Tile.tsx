import styles from './Tile.module.css';

interface TileProps {
    data: {
        id: string;
        type: 'link' | 'text' | 'map' | 'image' | 'header' | 'video' | 'spotify' | 'youtube';
        title?: string;
        subtitle?: string;
        url?: string;
        icon?: string;
        image?: string;
        content?: string;
        size: string;
        location?: string;
        variant?: string;
        caption?: string;
    };
}

export default function Tile({ data }: TileProps) {
    const sizeClass = styles[`size_${data.size}`] || '';

    const renderContent = () => {
        switch (data.type) {
            case 'link':
                return (
                    <a href={data.url} target="_blank" rel="noopener noreferrer" className={styles.linkContent}>
                        {data.image ? (
                            <div className={styles.linkImageWrapper}>
                                <img src={data.image} alt="" className={styles.linkImage} />
                                <div className={styles.linkInfoOverlay}>
                                    {data.icon && <img src={data.icon} alt="" className={styles.miniIcon} />}
                                    <div className={styles.linkText}>
                                        <h3 className={styles.titleSmall}>{data.title}</h3>
                                        <p className={styles.subtitleSmall}>{data.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {data.icon && <img src={data.icon} alt="" className={styles.icon} />}
                                <div className={styles.textContent}>
                                    <h3 className={styles.title}>{data.title}</h3>
                                    <p className={styles.subtitle}>{data.subtitle}</p>
                                </div>
                            </>
                        )}
                    </a>
                );
            case 'text':
                return (
                    <div className={`${styles.textContentCenter} ${data.variant ? styles[data.variant] : ''}`}>
                        {data.variant === 'quote' && <span className={styles.quoteMark}>“</span>}
                        <p className={styles.content}>{data.content}</p>
                    </div>
                );
            case 'image':
                return (
                    <div className={styles.imageWrapper}>
                        <img src={data.url} alt="" className={styles.bgImage} />
                        {data.caption && <span className={styles.caption}>{data.caption}</span>}
                    </div>
                );
            case 'video':
                return (
                    <div className={styles.videoWrapper}>
                        <video
                            src={data.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={styles.bgVideo}
                        />
                    </div>
                );
            case 'spotify':
                const spotifyId = data.url.split('playlist/')[1]?.split('?')[0];
                return (
                    <div className={styles.spotifyWrapper}>
                        <iframe
                            src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </div>
                );
            case 'youtube':
                const youtubeId = data.url.includes('youtu.be')
                    ? data.url.split('/').pop()
                    : data.url.split('v=')[1]?.split('&')[0];
                return (
                    <div className={styles.youtubeWrapper}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={data.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            case 'header':
                return (
                    <div className={styles.headerTitle}>
                        {data.title}
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
