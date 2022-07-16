import { Button } from "@mui/material";
import styles from "../css/PhotoCrop.module.css";
import { useDispatch } from 'react-redux';
import Crop from "./Crop.js";
import Preview from "./Preview.js";
import Personal from "./Personal.js";
import SelectPhoto from "./SelectPhoto.js";
import Upload from "./Upload.js";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { useEffect, useState, createRef } from "react";

export const PhotoCrop = () => {
  const { userID } = useParams();

  // 開發用：製作遮罩的code
  // useEffect(() => {
  //   const canvas = document.getElementById('merge');
  //   const ctx = canvas.getContext('2d')
  //   canvas.width = 1200;
  //   canvas.height = 1200;
  //   const cw = canvas.width;
  //   const ch = canvas.height;
  //   canvas.style.border='1px solid red';
  //   ctx.globalCompositeOperation = "source-over";
  //   ctx.fillStyle = "rgba(127, 127, 127, 1)";
  //   ctx.fillRect(0, 0, cw, ch);


  //   const outside = document.getElementById('outside');
  //   ctx.globalCompositeOperation = "source-over";
  //   ctx.globalAlpha = 1; // 設定透明度
  //   ctx.drawImage(outside, 0, 0); // 遮罩
    
  //   const inside = document.getElementById('inside');
  //   ctx.globalCompositeOperation = "destination-out";
  //   ctx.globalAlpha = 1; // 設定透明度
  //   ctx.drawImage(inside, 0, 0); // 遮罩

  //   const img = canvas.toDataURL('image/png');
  //   const link = document.createElement('a');
  //   link.download = `${userID}.png`;
  //   link.href = img;
  //   link.click();
  // }, )

  return (<>
    {/* <canvas
    id="merge"
    />
    <img
    id="inside"
    alt=""
    src="./face_outline_inside.png"
    hidden
    />
    <img
    id="outside"
    alt=""
    src="./face_outline_outside.png"
    hidden
    /> */}
    <div className={styles.photoCropDiv}>
      <div className={styles.titleDiv}>Your Personal Photo</div>
      <div className={styles.editCanvasDiv}>
        {/* Crop */}
        <Crop /> 
      </div>
      <div className={styles.reviewCanvasDiv}>
        {/* review */}
        <Preview />
      </div>
      <div className={styles.successCanvasDiv}>
        {/* personal */}
        <Personal />
      </div>
      <div className={styles.selectPhotoDiv}>
        <SelectPhoto />
      </div>
      <div className={styles.uploadDiv}>
        <Upload userID={userID} />
      </div>
    </div>
  </>);
};
