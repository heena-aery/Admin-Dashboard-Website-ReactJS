const initialState = {
    accountDetails: localStorage.getItem('accountDetails') !== undefined && localStorage.getItem('accountDetails') !== '' ? JSON.parse(localStorage.getItem('accountDetails')) : []
}

const AccountReducer = (defaultState = initialState, action) => {
    let stateData = defaultState.accountDetails;
    if (action.type === "UPDATE") {
        switch (action.accountType) {
            case 'Admin':
                stateData.Admin = action.data;
                break;
            case 'Customer':
                stateData.Customer = action.data;
                break;
            case 'Editor':
                stateData.Editor = action.data;
                break;
            case 'Merchant':
                stateData.Merchant = action.data;
                break;

        }
        localStorage.setItem('accountDetails', JSON.stringify(stateData));
        return { ...defaultState, accountDetails: stateData }
    }
    else if (action.type === "DELETE") {
        switch (action.accountType) {
            case 'Admin':
                stateData.Admin = {};
                break;
            case 'Customer':
                stateData.Customer = {};
                break;
            case 'Editor':
                stateData.Editor = {};
                break;
            case 'Merchant':
                stateData.Merchant = {};
                break;
        }
        localStorage.setItem('accountDetails', JSON.stringify(stateData));
        return { ...defaultState, accountDetails: stateData }
    }

    return { ...defaultState };
}

export default AccountReducer;