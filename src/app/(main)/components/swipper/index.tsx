'use client'
import React, { useState } from "react";
import styles from './index.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type SwipperProps = {
    elements: React.ReactNode[];
};

export const Swipper: React.FC<SwipperProps> = ({ elements }) => {
    const [centeredElement, setCenteredElement] = useState<number>(0) // id компонента с акцентом
    const lastElementIndex = elements.length - 1;
    const cliseBorderStart = centeredElement > 1 ? centeredElement - 2 : 0;
    const cliseBorderEnd = centeredElement < lastElementIndex - 2 ?  centeredElement + 2 : lastElementIndex;
    const shownElementLeft = elements.slice(cliseBorderStart, centeredElement); // элементы слева от акцентного
    const shownElementsRight = elements.slice(centeredElement + 1, cliseBorderEnd + 1);  // элементы справа от акцентного

    return (
        <div className={styles.container}>
            <ArrowBackIosIcon onClick={() => setCenteredElement(state => state - 1)} sx={{ cursor: 'pointer', visibility: centeredElement > 0 ? 'visible' : 'hidden' }} />
            <div className={styles.sideContainer}>
                {shownElementLeft.length === 0 && <><Placeholder /><Placeholder /></>}
                {shownElementLeft.length === 1 && <Placeholder />}
                {shownElementLeft}
            </div>
            <div className={styles.centered}>
                {elements[centeredElement]}
            </div>
            <div className={styles.sideContainer}>
                {shownElementsRight}
                {shownElementsRight.length === 0 && <><Placeholder /><Placeholder /></>}
                {shownElementsRight.length === 1 && <Placeholder />}
            </div>
            { centeredElement < lastElementIndex && <ArrowForwardIosIcon onClick={() => setCenteredElement(state => state + 1)} sx={{ cursor: 'pointer', visibility: centeredElement < lastElementIndex ? 'visible' : 'hidden' }} /> }
        </div>
    )
};

const Placeholder = () => (
    <div style={{ height: '150px', width: '300px' }} />
)
