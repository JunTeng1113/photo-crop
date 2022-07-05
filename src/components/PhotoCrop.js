import { Button } from "@mui/material";
import styles from "../css/PhotoCrop.module.css";
import { useDispatch } from 'react-redux';
import EditCanvas from "./EditCanvas.js";
import ReviewCanvas from "./ReviewCanvas.js";
import SuccessCanvas from "./SuccessCanvas.js";
import { useSelector } from 'react-redux';

import { useEffect, useState, createRef } from "react";
import { Set } from "../actions/Set.js";

export const PhotoCrop = () => {
  const dispatch = useDispatch();
  const ref = createRef();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      dispatch(Set({file: reader.result}))
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleUpload = () => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const image = document.getElementById('mask2');

    context.globalCompositeOperation = "destination-out";
    context.globalAlpha = 1; // 設定透明度
    context.drawImage(image, 0, 0); // 遮罩
    const img = canvas.toDataURL('image/png');
    
    // 填上背景
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);
            

    // 儲存至資料庫
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = img;
    link.click();
    
    // 從資料庫下載圖片

    // 顯示圖片
    document.getElementById('personal').src = img;
  }

  return (
    <div className={styles.photoCropDiv}>
      <div className={styles.titleDiv}>Title</div>
      <div className={styles.editCanvasDiv}>
        <EditCanvas />
      </div>
      <div className={styles.reviewCanvasDiv}>
        <ReviewCanvas ref={ref} />
      </div>
      <div className={styles.successCanvasDiv}>
        <SuccessCanvas />
      </div>
      <div className={styles.selectPhotoDiv}>
        <Button
          className={styles.buttonWhite}
          sx={{ width: 200 }}
          variant="outlined"
          component="label"
        >
          Select Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleOnChange(e)}
            hidden
          />
        </Button>
      </div>
      <div className={styles.uploadDiv}>
        <Button
          className={styles.buttonDark}
          sx={{ width: 180 }}
          variant="contained"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};
