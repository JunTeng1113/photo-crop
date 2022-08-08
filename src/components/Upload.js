import { Button } from "@mui/material";
import styles from "../css/PhotoCrop.module.css";

function Upload(props) {
    const token = 'eyJhbGciOiJIUzIEc9mz';
    const { userID } = props;
    // Upload
    const handleUpload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 1200;

        const preview_canvas = document.getElementById('previewCanvas');
        context.drawImage(preview_canvas, 0, 0);
    
        const mask = document.getElementById('mask2');
        context.globalCompositeOperation = "destination-out";
        context.globalAlpha = 1; // 設定透明度
        context.drawImage(mask, 0, 0); // 遮罩

        const resultImage = canvas.toDataURL('image/png');
        
        // 儲存至資料庫
        const postData  = new FormData();
        postData.append('token', token);
        postData.append('user_id', userID);
        postData.append('personal_photo', resultImage.split(',')[1]); // base64

        fetch('https://toysrbooks.com/dev/v0.1/uploadPhotoData.php', {
            body: postData, 
            method: 'POST', 
        })
        .then(response => {
            return response.json();
        })
        .then(response => {
            // 從回傳值取得圖片，顯示圖片
            localStorage.setItem('editedFace', response['photo_url']);
            document.getElementById('personalImage').src = localStorage.getItem('editedFace');
        })
        .catch(error => {
            console.error(error)
        });
    }
    return (
        <Button className={`${styles['button']} ${styles['bg-dark']} ${styles['color-white']}`} variant="contained" onClick={handleUpload} >
            Upload
        </Button>
    )
}
export default Upload;
