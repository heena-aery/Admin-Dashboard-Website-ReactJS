import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.fileUploader = React.createRef();
        this.productImage = React.createRef();
        this.state = {
            ProductName: '',
            Description: '',
            Category: '',
            ExpireDate: '',
            UnitsInStock: '',
            ImageUrl: 'https://www.freeiconspng.com/minicovers/document-file-page-paper-sheet-up-upload-icon-3.png',
            allowdedFiles: ['jpg', 'png', 'bmp', 'svg', 'webp'],
            fileName: ''
        }
    }

    onInput = (name, e) => {
        let currentValue = e.target.value;
        switch (name) {
            case 'productName':
                this.setState({ ProductName: currentValue });
                break;
            case 'description':
                this.setState({ Description: currentValue });
                break;
            case 'category':
                this.setState({ Category: currentValue });
                break;
            case 'expireDate':
                this.setState({ ExpireDate: currentValue });
                break;
            case 'unitsInStock':
                this.setState({ UnitsInStock: currentValue });
                break;
        }
    }

    UploadImage = () => {
        this.refs.fileUploader.click();
    }

    validateImage(imageUrl) {
        debugger;
        var imageExtension = imageUrl !== '' && imageUrl !== null ? imageUrl.split('.')[1] : '';
        if (this.state.allowdedFiles.indexOf(imageExtension) === -1) {
            return false;
        }
        return true;
    }

    UpdateImage = () => {
        var image = this.refs.productImage;
        var file = this.refs.fileUploader.files.length > 0 ? this.refs.fileUploader.files[0] : null;
        if (file !== null && this.validateImage(file.name)) {
            var reader = new FileReader();
            var url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                this.setState({ ImageUrl: reader.result, fileName: file.name });
            }.bind(this);
        }
        else {
            this.Notification('Allowded files are ' + this.state.allowdedFiles.join(','));
        }
    }

    onAddClick = () => {
        var stateObj = this.state;
        if (stateObj.ProductName === '' || stateObj.ProductName === null) {
            this.Notification('Name is required.');
        }
        else if (stateObj.Description === '' || stateObj.Description === null) {
            this.Notification('Please enter Description.');
        }
        else if (stateObj.Category === '' || stateObj.Category === null) {
            this.Notification('Please select Category.');
        } else if (stateObj.UnitsInStock === '' || stateObj.UnitsInStock === null) {
            this.Notification('Units In Stock is required.');
        }
        else if (stateObj.ExpireDate === '' || stateObj.ExpireDate === null) {
            this.Notification('Expire Date is required.');
        } else if (stateObj.ImageUrl === 'https://www.freeiconspng.com/minicovers/document-file-page-paper-sheet-up-upload-icon-3.png' || stateObj.ImageUrl === '') {
            this.Notification('Image is required.');
        }
        else if (!this.validateImage(stateObj.fileName)) {
            this.Notification('Allowded files are ' + this.state.allowdedFiles.join(','));
        }
        else {
            var newProduct = {
                name: stateObj.ProductName,
                stock: stateObj.UnitsInStock,
                unitSold: '',
                expireDate: stateObj.ExpireDate,
                imageUrl: stateObj.ImageUrl,
                description: stateObj.Description,
                category: stateObj.Category
            }
            this.props.OnAddProduct(newProduct);
            this.Notification('Product added successfully.');
            this.props.history.push('/Products');
        }

    }

    Notification = (message) => {
        this.props.SendNotification(message);
        setTimeout(() => {
            this.props.HideNotification('');
        }, 3000)
    }


    render() {
        let categories = this.props.ProductPageDetails.categories;
        const CategoriesList = categories.map((item) => {
            return <option value={item}>{item}</option>
        })

        return (
            <div className="Addproduct">
                <div style={{ display: 'inline-block', float: 'left', }}>
                    <h4 style={{ marginBottom: '0px', marginLeft: '20px', }}>Add Product</h4><br />
                    Username<br /><input type="text" value={this.state.ProductName} onInput={(e) => this.onInput('productName', e)} className="textbox" /><br />
                    Description<br /><textarea rows="4" className="textarea" cols="50" onInput={(e) => this.onInput('description', e)}></textarea><br />
                    <select className="ddl" onChange={(e) => this.onInput('category', e)}>
                        <option value="">Select Category</option>
                        {CategoriesList}
                    </select><br />
                    Expire Date<br /><input type="text" className="textbx" onInput={(e) => this.onInput('expireDate', e)} />
                    Unit In Stoke<br /><input type="text" className="textbx" onInput={(e) => this.onInput('unitsInStock', e)} />
                </div>
                <div style={{ display: 'inline-block', }}>
                    <img className="UploadImage" src={this.state.ImageUrl} />
                    <input type="file" id="file" onChange={this.UpdateImage} ref="fileUploader" style={{ display: "none" }} />
                </div>
                <input type="button" className="Button"  style={{ height: '40px', width: '300px', paddingLeft: '5px', marginTop: '10px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange', fontSize: '20px' }} onClick={this.UploadImage} value="Upload Product Image" />
                <div>
                    <input type="button" className="Button"  style={{ height: '50px', width: '100%', paddingLeft: '5px', marginTop: '40px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange', fontSize: '20px' }} onClick={this.onAddClick} value="ADD Product Now" />

                </div>

            </div>

        );
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        ProductPageDetails: globalState.product.ProductPageDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OnAddProduct: (product) => { dispatch({ type: 'ADD_PRODUCT', data: product }) },
        SendNotification: (message) => { dispatch({ type: 'SHOW_NOTIFICATION', message: message }) },
        HideNotification: () => { dispatch({ type: 'Hide_NOTIFICATION' }) }
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(AddProduct);