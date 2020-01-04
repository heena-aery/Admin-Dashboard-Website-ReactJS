const initialState = {
    dashboardDetails: localStorage.getItem('dashboardPageDetails') !== undefined && localStorage.getItem('dashboardPageDetails') !== '' ? JSON.parse(localStorage.getItem('dashboardPageDetails')) : []
}

const DashboardReducer = (defaultState = initialState, action) => {
    return { ...defaultState }
}

export default DashboardReducer;