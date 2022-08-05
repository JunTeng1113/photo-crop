import React from 'react';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { SetData } from "../actions/SetData.js";

const marks = [
    {
        value: 0.5,
        label: '50%'
    }, {
        value: 1.0,
        label: '100%'
    }, {
        value: 1.5,
        label: '150%'
    }, {
        value: 2.0,
        label: '200%'
    }, {
        value: 3.0,
        label: '300%'
    }
]

const CropSlider = props => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.reducer);
    const size = data?.size;

    function handleChangeSize(value) {
        dispatch(SetData({size: value}));
    }

    return (<>
        <Slider
            defaultValue={1.0}
            step={0.1}
            min={0.5}
            max={3.0}
            value={size}
            valueLabelDisplay="auto"
            onChange={(e) => handleChangeSize(e.target.value)}
            marks={marks}
            valueLabelFormat={(value) => {return `${(value * 100).toFixed(0)}%`}}
        />
    </>);
}
export default CropSlider;