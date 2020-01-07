import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FaTachometerAlt, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import Notification from './Notifications';

class Header extends Component {
    LogOut = () => {
        this.props.UserLogOut();
    }

    render() {
        return (
            <div className="titlediv">
                {this.props.showNotification ? <Notification visible={true}>{this.props.message}</Notification> : ''}
                <div className="LeftNav" style={{ display: 'inline-block', margin: '20px', marginLeft: '100px' }}>
                    <Link to="/Dashboard">PRODUCT ADMIN</Link>
                </div>
                <div className="middleNav">
                    <div className="icon" style={{ display: 'inline-block', margin: '20px', textAlign: 'center', fontSize: '16px' }}><Link to="/Dashboard"><FaTachometerAlt Icon size={30} /></Link> <br />Dashboard</div>
                    <div className="icon" style={{ display: 'inline-block', margin: '20px', textAlign: 'center', fontSize: '16px' }}><Link to="/Products"><FaShoppingCart Icon size={30} /></Link> <br />Products</div>
                    <div className="icon" style={{ display: 'inline-block', margin: '20px', textAlign: 'center', fontSize: '16px' }}><Link to="/Accounts"><FaUserAlt Icon size={30} /></Link> <br />Accounts</div>
                </div>

                <div className="rightNav" style={{ display: 'inline-block', marginLeft: '150px' }}>
                    {this.props.isLoggedIn ? <span onClick={this.LogOut}>Hello Admin, <Link to='/'>LogOut</Link></span> : ''}
                </div>

            </div>
        );
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        showNotification: globalState.main.notification,
        message: globalState.main.message,
        isLoggedIn: globalState.main.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserLogOut: () => { dispatch({ type: 'LOGOUT' }) }
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Header);