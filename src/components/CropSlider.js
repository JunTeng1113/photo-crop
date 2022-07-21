import React, { useRef, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import styles from "../css/PhotoCrop.module.css";
import { useSelector } from 'react-redux';
import { updatePreview } from './Preview';

const marks = [
    {
        value: 0.5,
        label: '50%'
    }, {
        value: 2.0,
        label: '200%'
    }
]

const CropSlider = props => {
    const data = useSelector(state => state.reducer);
    const file = data?.file;
    const [loading, setLoading] = useState(false);
    const [tSize, setTSize] = useState(1.0);

    useEffect(() => {
        setLoading(true);
    }, []);

    function handleChangeSize(e, value) {
        if (tSize !== value) {
            console.log(value);
            setTSize(value);
        }
    }

    return ( <>
        <Slider
            defaultValue={1.0}
            step={0.1}
            min={0.5}
            max={2.0}
            value={tSize}
            valueLabelDisplay="auto"
            onChange={handleChangeSize}
            marks={marks}
            valueLabelFormat={(value) => {return `${(value * 100).toFixed(0)}%`}}
        />
    </>);
}
export default CropSlider;