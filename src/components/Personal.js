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
        style={{width: '100%', height: '100%'}}
        alt=""
        />
    )
}
export default Personal;
