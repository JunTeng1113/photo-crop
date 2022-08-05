
const initState = {
    file: null,
    count: 0,
    size: 1.0,
    rotate: 0,
    x: 0,
    y: 0
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "setData": {
            const { data } = payload;
            return {...state, ...data};
        }
        case "positionOffest": {
            const { data } = payload;
            data.x += state.x
            data.y += state.y
            return {...state, ...data};
        }
        default: {
            return state;
        }
    }
}
export default reducer;