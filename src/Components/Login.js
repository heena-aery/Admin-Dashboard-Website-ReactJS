import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
        accountDetails: {}
    }

    componentWillMount() {
        var exists = this.props.accountDetails !== undefined && this.props.accountDetails !== null && this.props.accountDetails !== '';
        if (!exists) {
            axios.get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json')
                .then(response => {
                    localStorage.setItem('accountDetails', JSON.stringify(response.data.accountsPage));
                    localStorage.setItem('dashboardPageDetails', JSON.stringify(response.data.dasbhoardPage));
                    localStorage.setItem('productPageDetails', JSON.stringify(response.data.productsPage));
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    onInput = (name, e) => {
        switch (name) {
            case 'username':
                this.setState({ username: e.target.value });
                break;
            case 'password':
                this.setState({ password: e.target.value });
                break;
        }
    }

    onSubmit = (e) => {
        debugger;
        if (this.state.username === null || this.state.username === undefined || this.state.username === '') {
            this.Notification('Username is required.');
        }
        else if (this.state.password === null || this.state.password === undefined || this.state.password === '') {
            this.Notification('Password is required.');
        }
        else if (this.state.username === "Admin@gmail.com" && this.state.password === "Admin") {
            this.props.history.push('/Dashboard');
            this.props.LoginUser();
            this.Notification('You are logged in.');
        }
        else {
            this.Notification('Login failed, Invalid username or password.');
        }

        e.preventDefault();
    }
    Notification = (message) => {
        this.props.SendNotification(message);
        setTimeout(() => {
            this.props.HideNotification('');
        }, 3000)
    }


    render() {
        return (
            <div class="contentdiv" >

                <div className="inputfields">
                    <form method="Post" onSubmit={this.onSubmit}>
                        <h2 style={{ marginTop: '50px' }}>Welcome to Dashboard,Login</h2>
                        <span className="label">Username</span><br /><span><input type="text" value={this.state.username} onInput={(e) => this.onInput('username', e)} style={{ height: '40px', marginTop: '8px', width: '300px', }} /></span><br /><br />
                        <span className="label">Password</span><br /><span><input type="password" value={this.state.password} onInput={(e) => this.onInput('password', e)} style={{ height: '40px', marginTop: '8px', width: '300px', }} /></span><br /><br />
                        <input type="submit" className="Loginbutton" style={{ height: '40px', width: '300px', marginTop: '20px', color: 'white', fontWeight: 'bold', backgroundColor: '#f5a623', border: '#f5a623' }} alt="Login" value="Login" />
                    </form>
                </div>

            </div>
        );
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        accountDetails: globalState.account.accountDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SendNotification: (message) => { dispatch({ type: 'SHOW_NOTIFICATION', message: message }) },
        HideNotification: () => { dispatch({ type: 'Hide_NOTIFICATION' }) },
        LoginUser: () => { dispatch({ type: 'LOGIN' }) }
    }
}

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Login);