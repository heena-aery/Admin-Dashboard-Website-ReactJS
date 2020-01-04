const initialState = {
    ProductPageDetails: localStorage.getItem('productPageDetails') !== undefined && localStorage.getItem('productPageDetails') !== '' ? JSON.parse(localStorage.getItem('productPageDetails')) : []
}

const ProductReducer = (defaultState = initialState, action) => {

    var Products = defaultState.ProductPageDetails;
    if (action.type === "ADD_PRODUCT") {
        Products.products.push(action.data);
        localStorage.setItem('productPageDetails', JSON.stringify(Products));
        return { ...defaultState, ProductPageDetails: Products }
    }
    else if (action.type === "DELETE_PRODUCT") {
        Products.products.splice(action.pos, 1);
        localStorage.setItem('productPageDetails', JSON.stringify(Products));
        return { ...defaultState, ProductPageDetails: Products }
    }
    else if (action.type === "DELETE_CATEGORY") {
        Products.categories.splice(action.pos, 1);
        localStorage.setItem('productPageDetails', JSON.stringify(Products));
        return { ...defaultState, ProductPageDetails: Products }
    }
    else if (action.type === "DELETE_PRODUCTS") {
        action.products.map(item => {
            Products.products.splice(item, 1);
            console.log('pos=> ' + item)
        })
        localStorage.setItem('productPageDetails', JSON.stringify(Products));
        return { ...defaultState, ProductPageDetails: Products }
    }
    else if (action.type === "ADD_CATEGORY") {
        Products.categories.push(action.data);
        localStorage.setItem('productPageDetails', JSON.stringify(Products));
        return { ...defaultState, ProductPageDetails: Products }
    }

    return { ...defaultState };
}

export default ProductReducer;