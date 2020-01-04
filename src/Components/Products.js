import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

class Products extends Component {
    state = {
        Products: [],
        Categories: [],
        selectedProducts: [],
        showModal: false,
        categoryName: ''
    }

    componentDidMount() {
        let ProductPageDetails = this.props.ProductPageDetails;
        if (ProductPageDetails !== null) {
            this.setState({ Products: ProductPageDetails.products, Categories: ProductPageDetails.categories });
        }
    }

    OnAddProduct = () => {
        this.props.history.push('/AddProduct');
    }

    onDeleteProduct = (index) => {
        this.props.DeleteProduct(index);
        this.setState({ state: this.state });
        this.Notification('Product deleted successfully.');
    }

    onDeleteCategory = (index) => {
        this.props.DeleteProductCategory(index);
        this.setState({ state: this.state });
        this.Notification('Category deleted successfully.');
    }

    onProductSelect = (pos) => {
        let checkboxes = this.state.selectedProducts;
        let currentIndex = checkboxes.indexOf(pos);
        if (currentIndex === -1) {
            checkboxes.push(pos);
        } else {
            checkboxes.splice(currentIndex, 1);
        }
        this.setState({ selectedProducts: checkboxes });
    }

    onMultipleDeleteClick = () => {
        console.log(this.state.selectedProducts);
        this.props.DeleteMultipleProducts(this.state.selectedProducts);
        this.setState({ selectedProducts: [] });
        this.Notification('Selected Products deleted successfully.');
    }

    OnAddBtnClick = () => {
        this.setState({ showModal: true });
    }

    OnCategoryInputChange = (e) => {
        this.setState({ categoryName: e.target.value });
    }

    OnAddCategoryBtnClick = () => {
        this.props.AddProductCategory(this.state.categoryName);
        this.setState({ state: this.state });
        this.refreshPopup();
        this.Notification('Category added successfully.');
    }

    onCloseButtonClick = () => {
        this.refreshPopup();
    }

    refreshPopup = () => {
        this.setState({ showModal: false, categoryName: '' });
    }

    Notification = (message) => {
        this.props.SendNotification(message);
        setTimeout(() => {
            this.props.HideNotification('');
        }, 3000)
    }


    render() {

        const modalStyleArr = ['popup'];
        if (this.state.showModal) {
            modalStyleArr.push('show');
        }
        else {
            modalStyleArr.push('hide');
        }
        const productData = this.state.Products.map((item, index) => {
            return <tr key={index}><td><input type="checkbox" key={item.name} name={item.name} onChange={() => this.onProductSelect(index)} /></td><td>{item.name}</td><td>{item.unitSold}</td><td>{item.stock}</td><td>{item.expireDate}</td><td><FaTrashAlt onClick={() => this.onDeleteProduct(index)} /></td></tr>
        });

        const categoryData = this.state.Categories.map((item, index) => {
            return <tr><td>{item}</td><td><FaTrashAlt onClick={() => this.onDeleteCategory(index)} /></td></tr>
        });

        return (
            <div className="tblproduct">
                <Scrollbars className="Producttable">
                    <table className="tableP">
                        <tr className="Table_headerRow">
                            <td></td>
                            <td>Product Name</td>
                            <td>Unit Sold</td>
                            <td>Stock</td>
                            <td>Expire Date</td>
                            <td></td>
                        </tr>
                        {productData}

                    </table>

                </Scrollbars>
                <input type="submit" style={{ height: '50px', width: '1000px', marginTop: '30px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange' }} onClick={this.OnAddProduct} value="Add New Product"></input><br />
                <input type="submit" style={{ height: '50px', width: '1000px', marginTop: '30px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange' }} onClick={this.onMultipleDeleteClick} value="Delete Selected Products"></input>


                <div className="categorytable">
                    <table className="tableP">
                        {categoryData}
                    </table>
                    <input type="button" style={{ height: '50px', width: '100%', paddingLeft: '5px', marginTop: '10px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange', fontSize: '12px' }}  onClick={this.OnAddBtnClick} value="ADD NEW CATEGOERY" />


                </div>
                <div className={modalStyleArr.join(' ')}>  
<div className='popup_inner'>  
<h1 style={{marginLeft:'10px',}}>Add Category</h1>  
<hr></hr>
<p>Category:</p>
<div style={{width: '250px', display: 'inline-block', marginBottom: '20px',}}><input type="text" value={this.state.categoryName} onInput={this.OnCategoryInputChange} name="NewCategory" className="Categorytextbox"/></div> 
<div style={{display:'inline-block'}}><input type="button" alt="SAVE" value="SAVE" style={{height: '40px', cursor:'pointer', width: '200px', marginTop: '20px', color: 'white', fontWeight: 'bold', backgroundColor: 'rgb(245, 166, 35)',marginLeft:'20px', border: 'rgb(245, 166, 35)'}}  onClick={this.OnAddCategoryBtnClick} /></div> 
<div style={{display:'inline-block'}}><input type="button" alt="CANCEL" value="CANCEL" style={{height: '40px', cursor:'pointer', width: '200px', marginTop: '20px', color: 'white', fontWeight: 'bold', backgroundColor: 'rgb(245, 166, 35)',marginLeft:'10px', border: 'rgb(245, 166, 35)'}}  onClick={this.onCloseButtonClick} /></div> 
</div>  
</div>






            </div>
        );
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        ProductPageDetails: globalState.product.ProductPageDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        DeleteProduct: (index) => { dispatch({ type: 'DELETE_PRODUCT', pos: index }) },
        DeleteProductCategory: (index) => { dispatch({ type: 'DELETE_CATEGORY', pos: index }) },
        DeleteMultipleProducts: (posArr) => { dispatch({ type: 'DELETE_PRODUCTS', products: posArr }) },
        SendNotification: (message) => { dispatch({ type: 'SHOW_NOTIFICATION', message: message }) },
        HideNotification: () => { dispatch({ type: 'Hide_NOTIFICATION' }) },
        AddProductCategory: (name) => { dispatch({ type: 'ADD_CATEGORY', data: name }) }
    }
}


export default connect(mapGlobalStateToProps, mapDispatchToProps)(Products);