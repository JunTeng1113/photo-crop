import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import styles from "../css/PhotoCrop.module.css";
import { Set } from "../actions/Set.js";
function SelectPhoto(props) {
    const dispatch = useDispatch();
    // Select Photo
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
    return (
        <Button
            className={styles.button}
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
    )
}
export default SelectPhoto;