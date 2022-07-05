
const initState = {
    file: null,
    count: 0,
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "set": {
            const { data } = payload;
            return {...state, ...data};
        }
        default: {
            return state;
        }
    }
}
export default reducer;