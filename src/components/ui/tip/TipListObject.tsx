'use client';

import Link from 'next/link';
import styles from './TipListObject.module.css';

interface TipListObjectProps {
  tipId?: unknown;
  tipName?: string;
}

export default function TipListObject({ tipId, tipName }: TipListObjectProps) {
  return (
    <Link className={styles.tipListObject} href={`/tip/${tipId}`}>
      <div>{tipName}</div>
    </Link>
  );
}
