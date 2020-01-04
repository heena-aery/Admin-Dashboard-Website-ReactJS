import React,{Component} from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductList from './Components/Products';
import AddProduct from './Components/AddProduct';
import Accounts from './Components/Accounts';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="">
          <Header />
          <Switch>
            <Route path="/Dashboard" render={(props) => this.props.isLoggedIn ? <Dashboard {...props} /> : <Redirect to="/" />} />
            <Route exact path="/" component={Login} />
            <Route path="/Products" render={(props) => this.props.isLoggedIn ? <ProductList {...props} /> : <Redirect to="/" />} />
            <Route path="/AddProduct" render={(props) => this.props.isLoggedIn ? <AddProduct {...props} /> : <Redirect to="/" />} />
            <Route path="/Accounts" render={(props) => this.props.isLoggedIn ? <Accounts {...props} /> : <Redirect to="/" />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapGlobalStateToProps = (globalState) => {
  return {
    isLoggedIn: true,//globalState.mainReducer.isLoggedIn
  }
}

export default connect(mapGlobalStateToProps)(App);