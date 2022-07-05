import React, { useRef, useEffect } from 'react';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';

const EditCanvas = props => {
    const data = useSelector(state => state.reducer);
    const file = data?.file;
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const crop = document.getElementById('crop');
        const image = document.getElementById('mask');
        
        // 設定預設背景
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (file) {
            canvas.width = 1300;
            canvas.height = 1300;
            context.drawImage(crop, 0, 0, 1300, 1300); //canvas圖片模糊 https://blog.csdn.net/felicity_zll/article/details/109193602
            
            context.globalAlpha = 0.7; // 設定透明度
            context.drawImage(image, 0, 0); // 遮罩
        }
        

        // 輸出到第二張圖的結果
        // context.globalCompositeOperation = "destination-out";
        // context.globalAlpha = 1; // 設定透明度
        // context.drawImage(image, 0, 0); // 遮罩
        
    }, )
    
    


    
    return ( <>
        <div>
            <img
            id="crop"
            className={styles.reviewCanvasIcon}
            alt=""
            src={`${file}`}
            hidden
            />
            <img
            id="mask"
            className={styles.mask}
            alt=""
            src="./face_outline_outside.png"
            hidden
            />
            <canvas
            className={styles.canvas}
            ref={canvasRef}
            {...props}
            />
        </div>

    </>)
}
export default EditCanvas;