import React, { Component } from 'react';
import { connect } from 'react-redux';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: '',
            email: '',
            name: '',
            password: '',
            repeatPassword: '',
            phone: '',
            profilePic: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
        }
        this.refAccountType = React.createRef();
        this.baseState = this.state;
    }

    componentWillMount() {
        console.log(this.props.accountDetail);
        console.log('mounting...');

    }

    onAccountTypeChange = (e, value) => {
        console.log(e, value);
        let selValue = value === undefined ? e.target.value : value;
        let accountDetail;
        switch (selValue) {
            case 'Admin':
                accountDetail = this.props.accountDetail.Admin;
                if (Object.keys(accountDetail).length === 0 && accountDetail.constructor === Object) {
                    this.setState(this.baseState);
                }
                else {
                    this.setState({
                        name: accountDetail.name, email: accountDetail.email, password: accountDetail.password, phone: accountDetail.phone
                        , repeatPassword: accountDetail.password, profilePic: accountDetail.profilePic, accountType: selValue
                    });
                }
                break;
            case 'Customer':
                accountDetail = this.props.accountDetail.Customer;
                if (Object.keys(accountDetail).length === 0 && accountDetail.constructor === Object) {
                    this.setState(this.baseState);
                }
                else {
                    this.setState({
                        name: accountDetail.name, email: accountDetail.email, password: accountDetail.password, phone: accountDetail.phone
                        , repeatPassword: accountDetail.password, profilePic: accountDetail.profilePic, accountType: selValue
                    });
                }
                break;
            case 'Editor':
                accountDetail = this.props.accountDetail.Editor;
                if (Object.keys(accountDetail).length === 0 && accountDetail.constructor === Object) {
                    this.setState(this.baseState);
                }
                else {
                    this.setState({
                        name: accountDetail.name, email: accountDetail.email, password: accountDetail.password, phone: accountDetail.phone
                        , repeatPassword: accountDetail.password, profilePic: accountDetail.profilePic, accountType: selValue
                    });
                }
                break;
            case 'Merchant':
                accountDetail = this.props.accountDetail.Merchant;
                if (Object.keys(accountDetail).length === 0 && accountDetail.constructor === Object) {
                    this.setState(this.baseState);
                }
                else {
                    this.setState({
                        name: accountDetail.name, email: accountDetail.email, password: accountDetail.password, phone: accountDetail.phone
                        , repeatPassword: accountDetail.password, profilePic: accountDetail.profilePic, accountType: selValue
                    });
                }
                break;
        }
    }

    onInputChange = (name, e) => {
        let currentValue = e.target.value;
        switch (name) {
            case 'accountName':
                this.setState({ name: currentValue });
                break;
            case 'accountEmail':
                this.setState({ email: currentValue });
                break;
            case 'accountPassowrd':
                this.setState({ password: currentValue });
                break;
            case 'accountRepeatPassword':
                this.setState({ accountRepeatPassword: currentValue });
                break;
            case 'phone':
                this.setState({ phone: currentValue });
                break;
        }

    }

    UploadImage = () => {
        this.refs.fileUploader.click();
    }

    UpdateImage = () => {
        var file = this.refs.fileUploader.files.length > 0 ? this.refs.fileUploader.files[0] : null;
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({ profilePic: reader.result });
        }.bind(this);
    }

    RemoveImage = () => {
        this.setState({ profilePic: this.baseState.profilePic })
    }

    Updateprofile = () => {
        var selAccount = this.refAccountType.current.value;
        if (selAccount === "Select Account") {
            this.Notification('Please select account to update.');
        }
        else {
            var currentState = this.state;
            const details = {
                name: currentState.name,
                email: currentState.email,
                phone: currentState.phone,
                profilePic: currentState.profilePic,
                password: currentState.password
            }

            this.props.UpdateProfile(details, currentState.accountType);
            this.Notification('Information updated successfully!');
        }
    }

    onDeleteClick = () => {
        var selAccount = this.refAccountType.current.value;
        if (selAccount === "Select Account") {
            this.Notification('Please select account to delete.');
        }
        else {
            let accountType = this.state.accountType;
            this.props.DeleteProfile(accountType);
            this.setState({ state: this.state });
            this.onAccountTypeChange(null, selAccount);
            this.Notification('Account deleted successfully!');
        }

    }

    Notification = (message) => {
        this.props.SendNotification(message);
        setTimeout(() => {
            this.props.HideNotification('');
        }, 3000)
    }

    render() {
        return (
            <div className="listtitle" >
                <div className="accountlist">
                    <h4 style={{ marginTop: '10px', marginLeft: '30px', fontSize: '18px' }}>List of Accounts</h4>
                    <span class="label">Accounts</span><br />
                    <select class="accountddl" ref={this.refAccountType} onChange={(e) => this.onAccountTypeChange(e)}>
                        <option value="accountddl">Select Account</option>
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                        <option value="Editor">Editor</option>
                        <option value="Merchant">Merchant</option>
                    </select>

                </div>
                <div style={{ width: '100%', }}>
                    <div className="profile">
                        <h2>Change Avtar</h2>
                        <img className="profilepic" src={this.state.profilePic} />
                        <br />
                        <input type="file" id="file" onChange={this.UpdateImage} ref="fileUploader" style={{ display: "none" }} />
                        <input type="button" className="Button"  style={{ height: '40px', width: '250px', marginTop: '30px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange' }} alt="Login" onClick={this.UploadImage} value="Upload New Photo" />
                    </div>

                    <div className="account">
                        <h4 style={{ marginBottom: '0px', marginLeft: '50px',fontSize:'18px', }}>Account Setting </h4>
                        <table className="tblefield">
                            <tr>
                                <td className="accountsetting">Account Name<br /><input type="text" name="accountName" value={this.state.name} onInput={(e) => this.onInputChange('accountName', e)} className="textbox" style={{ height: '30px', marginTop: '5px', paddingLeft: '5px', width: '190px' }} /></td>

                                <td className="accountsetting">Account Email<br /><input name="accountEmail" value={this.state.email} onInput={(e) => this.onInputChange('accountEmail', e)} type="text" className="textbox" style={{ height: '30px', marginTop: '5px', paddingLeft: '5px', width: '190px', }} /></td>
                            </tr>
                            <tr>
                                <td className="accountsetting">Password<br /><input name="accountPassword" type="Password" value={this.state.password} onInput={(e) => this.onInputChange('accountPassword', e)} type="password" className="textbox" style={{ height: '30px', marginTop: '5px', paddingLeft: '5px', width: '190px', }} />
                                </td>
                                <td className="accountsetting">Re-enter Password<br /><input name="accountRepeatPassword" type="Password" value={this.state.repeatPassword} onInput={(e) => this.onInputChange('accountRepeatPassword', e)} type="password" className="textbox" style={{ height: '30px', marginTop: '5px', paddingLeft: '5px', width: '190px', }} />
                                </td>
                            </tr>
                            <tr>
                                <td className="accountsetting">Phone<br /><input type="text" value={this.state.phone} onInput={(e) => this.onInputChange('phone', e)} className="textbox" style={{ height: '30px', marginTop: '5px', paddingLeft: '5px', width: '190px', }} />
                                </td>

                                <td><input type="button" className="Button"  style={{ height: '40px', width: '200px', paddingLeft: '5px', marginTop: '10px', color: 'white', marginLeft:'20px', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange', }} alt="Login" onClick={this.Updateprofile} value="Update Your Profile" />
                                </td>
                            </tr>
                        </table>
                        <input type="button" className="Button" style={{ height: '40px', width: '450px', margin: '10px', color: 'white', fontWeight: 'bold', backgroundColor: 'orange', border: 'orange',marginLeft:'40px' }} alt="Login" value="Update Your Profile" onClick={this.onDeleteClick} />
                    </div>

                </div>



            </div>
        );
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        accountDetail: globalState.account.accountDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateProfile: (details, accountType) => { dispatch({ type: 'UPDATE', data: details, accountType: accountType }) },
        DeleteProfile: (user) => { dispatch({ type: 'DELETE', accountType: user }) },
        SendNotification: (message) => { dispatch({ type: 'SHOW_NOTIFICATION', message: message }) },
        HideNotification: () => { dispatch({ type: 'Hide_NOTIFICATION' }) }
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Accounts);