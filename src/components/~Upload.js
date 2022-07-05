import React, { useRef, useEffect, forwardRef } from 'react';
const Upload = forwardRef((props, ref) => {
    const canvas = document.getElementById("preview");
    console.log(canvas.current);
    console.log('uup')
})
export default Upload;