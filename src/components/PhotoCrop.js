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

  return (
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
  );
};
