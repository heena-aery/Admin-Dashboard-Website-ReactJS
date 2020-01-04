import React, { Component } from 'react';

class AddProduct extends Component {
    render() {
        return (
            <div className="Addproduct">
    <div style={{display: 'inline-block', float: 'left',}}>
    <h4 style={{marginBottom: '0px', marginLeft: '20px',}}>Add Product</h4><br />
    Username<br /><input type="text" className="textbox" /><br />
    Description<br /><textarea rows="4" className="textarea" cols="50"></textarea><br />
    <select className="ddl">
        <option value="">Select Category</option>
    </select><br />
        Expire Date<br /><input type="text" className="textbx" />
        Unit In Stoke<br /><input type="text" className="textbx" />
</div>
<div style={{display: 'inline-block',}}>
<img className="UploadImage" src="https://www.freeiconspng.com/minicovers/document-file-page-paper-sheet-up-upload-icon-3.png"/>
<input type="file" className="choose"/>
</div>
<input type="button" style={{height: '40px', width: '300px', paddingLeft: '5px', marginTop: '10px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange', fontSize:'20px'}}  value="Upload Product Image"/>
<div>
<input type="button" style={{height: '50px', width: '100%', paddingLeft: '5px', marginTop: '40px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange', fontSize:'20px'}}  value="ADD Product Now"/>

</div>
    
</div>

        );
    }
}

export default AddProduct;