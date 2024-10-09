'use client'
import React, { useState } from "react";
import styles from './index.module.scss';

type SwipperProps = {
    elements: React.ReactNode[];
};

export const Swipper: React.FC<SwipperProps> = ({ elements }) => {
    const [centeredElement, setCenteredElement] = useState(0) // id компонента с акцентом
    const lastElementIndex = elements.length - 1;
    const cliseBorderStart = centeredElement > 1 ? centeredElement - 2 : 0;
    const cliseBorderEnd = centeredElement < lastElementIndex - 2 ?  centeredElement + 2 : lastElementIndex;
    const shownElementLeft = elements.slice(cliseBorderStart, centeredElement); // элементы слева от акцентного
    const shownElementsRight = elements.slice(centeredElement + 1, cliseBorderEnd + 1);  // элементы справа от акцентного


    return (
        <div className={styles.container}>
            { centeredElement > 0 && <button onClick={() => setCenteredElement(state => state - 1)}>Prev</button> }
            <div className={styles.sideContainer}>{shownElementLeft}</div>
            {elements[centeredElement]}
            <div className={styles.sideContainer}>{shownElementsRight}</div>
            { centeredElement < lastElementIndex && <button onClick={() => setCenteredElement(state => state + 1)}>Next</button> }
        </div>
    )
}
