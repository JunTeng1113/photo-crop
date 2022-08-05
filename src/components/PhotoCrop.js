import styles from "../css/PhotoCrop.module.css";
import Crop from "./Crop.js";
import Preview from "./Preview.js";
import Personal from "./Personal.js";
import SelectPhoto from "./SelectPhoto.js";
import CropSettings from "./CropSettings.js";
import CropSlider from "./CropSlider.js";
import Upload from "./Upload.js";
import { useParams } from "react-router-dom";

export const PhotoCrop = () => {
  const { userID } = useParams();

  return (<>
    <div className={styles['indent']}>
      <div className={styles['title']}>Your Personal Photo</div>
      <div className={styles['indent']}>
        <div className={styles['canvas-flex']}>
          <div className={styles['canvas-container']}>
            <div className={`${styles['canvas']} ${styles['canvas-large']}`}>
                <Crop />
            </div>
            <div className={styles['canvas-bar']}>
              <div className={styles['row']}>
                <CropSettings />
              </div>
              <div className={styles['row']}>
                <CropSlider />
              </div>
            </div>
          </div>
          <div className={styles['canvas-container']}>
            <div className={`${styles['canvas']} ${styles['canvas-large']}`}>
                <Preview />
            </div>
          </div>
          <div className={styles['canvas-container']}>
            <div className={`${styles['canvas']} ${styles['canvas-small']}`}>
                <Personal />
            </div>
          </div>
        </div>
        <div className={styles['row']}>
            <SelectPhoto />
            <Upload userID={userID} />
        </div>
      </div>
    </div>
  </>);
};
