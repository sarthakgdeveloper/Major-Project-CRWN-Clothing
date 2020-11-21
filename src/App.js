import React from 'react';
import {HomePage} from './components/homepage/homepage.component';
import ShopPage from './components/shop/shop-page-component';
import SignUpAndSignIn from './components/sign-in-and-sign-up/sign-in-and-sign-up';
import {auth, createUserProfileDocument} from '../src/firebase/firebase.utils';
import {connect} from 'react-redux'
import Header from './components/header/header';
import {setCurrentUser} from './redux/user/user-action';
import {Switch, Route, Redirect} from 'react-router-dom';
import { selectCurrentUser } from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'
import CheckOut from './components/checkout/checkout'
import './App.css';
  


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            }
          );
        });
      }

      setCurrentUser(userAuth)

    });
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component = {HomePage} />
          <Route path='/shop' component = {ShopPage} />
          <Route path='/checkout' component = {CheckOut} />
          <Route path='/signin' render = {() => 
            this.props.currentUser ? < Redirect to='/'/> : <SignUpAndSignIn/>
          } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
