const initialState = {
    isLoggedIn: localStorage.getItem("IsLoggedIn") === "true",
    notification: false,
    message: ''
}

const MainReducer = (defaultState = initialState, action) => {
    if (action.type === "LOGIN") {
        localStorage.setItem('IsLoggedIn', true);
        return { ...defaultState, isLoggedIn: true }
    }
    else if (action.type === "LOGOUT") {
        localStorage.setItem('IsLoggedIn', false);
        return { ...defaultState, isLoggedIn: false }
    }
    else if (action.type === "SHOW_NOTIFICATION") {
        return { ...defaultState, notification: true, message: action.message }
    } else if (action.type === "Hide_NOTIFICATION") {
        return { ...defaultState, notification: false, message: '' }
    }

    return { ...defaultState };
}

export default MainReducer;