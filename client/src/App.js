import React, {useEffect} from 'react';
import {HomePage} from './components/homepage/homepage.component';
import ShopPage from './components/shop/shop-page-component';
import SignUpAndSignIn from './components/sign-in-and-sign-up/sign-in-and-sign-up';
import {connect} from 'react-redux'
import Header from './components/header/header';
import {checkUserSession} from './redux/user/user-action';
import {Switch, Route, Redirect} from 'react-router-dom';
import { selectCurrentUser } from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'
import CheckOut from './components/checkout/checkout'
import './App.css';


const App = ({checkUserSession, currentUser}) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
  
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component = {HomePage} />
        <Route path='/shop' component = {ShopPage} />
        <Route path='/checkout' component = {CheckOut} />
        <Route path='/signin' render = {() => 
          currentUser ? < Redirect to='/'/> : <SignUpAndSignIn/>
        } />
      </Switch>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
