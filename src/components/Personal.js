import React, { useRef, useEffect, forwardRef } from 'react';
import styles from "../css/PhotoCrop.module.css";
const Personal = props => {
    useEffect(() => {
        // canvas related vars
        const img = document.getElementById('personal');
        img.style.border='1px solid red';
    }, );
    return (
        <img
        id="personal"
        className={styles.successCanvasIcon}
        alt=""
        />
    )
}
export default Personal;
