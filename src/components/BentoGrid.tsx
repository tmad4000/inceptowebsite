import Tile from './Tile';
import styles from './BentoGrid.module.css';

interface BentoGridProps {
    tiles: any[];
}

export default function BentoGrid({ tiles }: BentoGridProps) {
    return (
        <div className={styles.grid}>
            {tiles.map((tile) => (
                <Tile key={tile.id} data={tile} />
            ))}
        </div>
    );
}
