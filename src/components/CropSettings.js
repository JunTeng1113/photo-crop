
import { useSelector, useDispatch } from 'react-redux';
import styles from "../css/PhotoCrop.module.css";
import { SetData } from "../actions/SetData.js";
export default function CropSettings(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.reducer);
    const rotate = data?.rotate;

    function handleRotate(value) {
        if (value === 360) { // 將旋轉重置
            dispatch(SetData({rotate: 0}))
        } else { // 調整旋轉，將角度維持在 0 ~ 359
            dispatch(SetData({rotate: (360 + rotate + value) % 360}))
        }
    }
    
    return (<>
        <button className={styles.rotateBtn} onClick={(e) => handleRotate(-5)}>
            <input type='image' className={styles.rotateImg} alt='' src='./crop/rotate-left.png' />
        </button>
        <button className={styles.rotateBtn} onClick={(e) => handleRotate(5)}>
            <input type='image' className={styles.rotateImg} alt='' src='./crop/rotate-right.png' />
        </button>
        <button className={styles.rotateBtn} onClick={(e) => handleRotate(360)}>
            Reset
        </button>
    </>)
}