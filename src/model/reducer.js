
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
        case "set": {
            const { data } = payload;
            return {...state, ...data};
        }
        case "increment": {
            const { data } = payload;
            data.x += state.x
            data.y += state.y
            console.log({state})
            console.log({data})
            return {...state, ...data};
        }
        default: {
            return state;
        }
    }
}
export default reducer;