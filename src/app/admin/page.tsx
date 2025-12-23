"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import styles from "./admin.module.css";

export default function AdminPage() {
    const [data, setData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/profile")
            .then((res) => res.json())
            .then((d) => setData(d));
    }, []);

    const saveChanges = async () => {
        setSaving(true);
        await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        setSaving(false);
        alert("Saved!");
    };

    const updateTile = (id: string, field: string, value: string) => {
        const newData = { ...data };
        const tile = newData.tiles.find((t: any) => t.id === id);
        if (tile) {
            tile[field] = value;
            setData(newData);
        }
    };

    if (!data) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Bento Editor</h1>
                <div className={styles.actions}>
                    <button onClick={saveChanges} disabled={saving} className={styles.saveBtn}>
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button onClick={() => signOut()} className={styles.logoutBtn}>Logout</button>
                </div>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>Profile Info</h2>
                    <div className={styles.formGroup}>
                        <label>Display Name</label>
                        <input
                            value={data.profile.displayName}
                            onChange={(e) => setData({ ...data, profile: { ...data.profile, displayName: e.target.value } })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Bio</label>
                        <textarea
                            value={data.profile.bio}
                            onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })}
                        />
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Tiles</h2>
                    <div className={styles.tileList}>
                        {data.tiles.map((tile: any) => (
                            <div key={tile.id} className={styles.tileItem}>
                                <div className={styles.tileHeader}>
                                    <span className={styles.tileType}>{tile.type}</span>
                                    <span className={styles.tileSize}>{tile.size}</span>
                                </div>
                                {tile.type === 'link' && (
                                    <>
                                        <input
                                            value={tile.title || ''}
                                            placeholder="Title"
                                            onChange={(e) => updateTile(tile.id, 'title', e.target.value)}
                                        />
                                        <input
                                            value={tile.url || ''}
                                            placeholder="URL"
                                            onChange={(e) => updateTile(tile.id, 'url', e.target.value)}
                                        />
                                    </>
                                )}
                                {tile.type === 'text' && (
                                    <>
                                        <textarea
                                            value={tile.content || ''}
                                            placeholder="Content"
                                            onChange={(e) => updateTile(tile.id, 'content', e.target.value)}
                                        />
                                        <input
                                            value={tile.variant || ''}
                                            placeholder="Variant (e.g. quote)"
                                            onChange={(e) => updateTile(tile.id, 'variant', e.target.value)}
                                        />
                                    </>
                                )}
                                {tile.type === 'image' && (
                                    <>
                                        <input
                                            value={tile.url || ''}
                                            placeholder="Image URL"
                                            onChange={(e) => updateTile(tile.id, 'url', e.target.value)}
                                        />
                                        <input
                                            value={tile.caption || ''}
                                            placeholder="Caption"
                                            onChange={(e) => updateTile(tile.id, 'caption', e.target.value)}
                                        />
                                    </>
                                )}
                                <input
                                    value={tile.size || ''}
                                    placeholder="Size (1x1, 2x1, etc.)"
                                    onChange={(e) => updateTile(tile.id, 'size', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
