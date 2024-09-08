import React from 'react';
import styles from './index.module.scss';

type ScrollerProps = { children: React.ReactNode }

export const Scroller: React.FC<ScrollerProps> = ({ children }) => (
    <div className={styles.scrollContainer}>
        {children}
    </div>
)
