import React from 'react';
import '../shop/shop-page.scss';
import {Route} from 'react-router-dom'
import CollectionOverview from '../collection-overview/collection-overview';
import CollectionPage from '../collection/collection';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {getShopdata} from '../../redux/shop/shop.action';
import Loader from '../loader/loader'

class ShopPage extends React.Component{
    state = {
        loading: false,
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        this.setState({loading: true});
        const {setShopData} = this.props;
        const collectionRef = firestore.collection("collections");
        collectionRef.get().then(snapshot => {
            const newShopData = convertCollectionsSnapshotToMap(snapshot);
            this.setState({loading: false});
            setShopData(newShopData);
        })
    }
    
    
    render() {
        const {match} = this.props;
        return this.state.loading ? <Loader/>: (
            <div className = 'shop-page'>
             < Route exact path={`${match.path}`}  component={CollectionOverview} />
             < Route  path={`${match.path}/:collectionId`}  component={CollectionPage} />
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    setShopData: data => dispatch(getShopdata(data))
})


 
export default connect(null, mapDispatchToProps)(ShopPage);