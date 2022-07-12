import React, { useRef, useEffect, forwardRef } from 'react';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';

export function updatePreview(props) {
    const { file } = props;
    const canvas = document.getElementById('preview');
    const context = canvas.getContext('2d')
    canvas.width=1200;
    canvas.height=1200;
    const cw = canvas.width;
    const ch = canvas.height;
    const image = document.getElementById('mask2');
    
    context.clearRect(0, 0, cw, ch);
    // 設定預設背景
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 複製Crop畫布
    const cropCanvas = document.getElementById('cropCanvas');
    context.drawImage(cropCanvas, 0, 0);

    // canvas圖片模糊 https://blog.csdn.net/felicity_zll/article/details/109193602

    // 輸出到第二張圖的結果
    context.globalCompositeOperation = "destination-out";
    context.globalAlpha = 1; // 設定透明度
    context.drawImage(image, 0, 0); // 遮罩

    // 填上背景
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

const Preview = forwardRef((props, ref) => {
    const data = useSelector(state => state.reducer);
    const file = data?.file;
    
    useEffect(() => {
        updatePreview({file: file, ref: ref});
    }, )
    return (<>
        <canvas
        id="preview"
        className={styles.canvas}
        ref={ref}
        {...props}
        />
        <img
        id="mask2"
        className={styles.reviewCanvasIcon}
        alt=""
        src="./face_outline_outside-mask.png"
        hidden
        />
    </>)
})
export default Preview;