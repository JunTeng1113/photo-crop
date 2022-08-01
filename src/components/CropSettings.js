
import { useSelector, useDispatch } from 'react-redux';
import styles from "../css/PhotoCrop.module.css";
import { Set } from "../actions/Set.js";
export default function CropSettings(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.reducer);
    const rotate = data?.rotate;

    function handleRotate(value) {
        if (value === 360) {
            dispatch(Set({rotate: 0}))
        } else {
            dispatch(Set({rotate: (360 + rotate + value) % 360}))
        }
    }
    
    return (<>
        <button 
            className={styles.rotateBtn}
            onClick={(e) => handleRotate(-5)}
        >
            <input type='image' className={styles.rotateImg} alt='' src='./crop/rotate-left.png'></input>
        </button>
        <button 
            className={styles.rotateBtn}
            onClick={(e) => handleRotate(5)}
        >
            <input type='image' className={styles.rotateImg} alt='' src='./crop/rotate-right.png'></input>
        </button>
        <button 
            className={styles.rotateBtn}
            onClick={(e) => handleRotate(360)}
        >
            Reset
        </button>
    </>)
}