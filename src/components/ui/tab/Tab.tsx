'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import styles from './Tab.module.css';

interface TabProps {
  items: TabItems[];
}

interface TabItems {
  url: string;
  name: string;
}

const Tab = ({ items }: TabProps) => {
  const pathName = usePathname();

  return (
    <div className={styles.tab}>
      {items &&
        items.map((item: TabItems, index: number) => {
          return (
            <Link
              key={'tab' + index}
              href={item.url}
              className={
                pathName === item.url ? styles.tabActiveItem : styles.tabItem
              }
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default Tab;
