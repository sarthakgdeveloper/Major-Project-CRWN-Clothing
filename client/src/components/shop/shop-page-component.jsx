import React, {useEffect} from 'react';
import '../shop/shop-page.scss';
import {Route} from 'react-router-dom'
import CollectionOverview from '../collection-overview/collection-overview';
import CollectionPage from '../collection/collection';
import {createStructuredSelector} from 'reselect';
import {fetchCollectionsStart} from '../../redux/shop/shop.action';
import {selectIsfetching} from '../../redux/shop/shop.selector'
import {connect} from 'react-redux';
import Loader from '../loader/loader'

const ShopPage = ({match,isFetching,setShopData}) => {

    useEffect(() => {
        setShopData();
    }, [setShopData])

    return isFetching ? <Loader/>: (
        <div className = 'shop-page'>
            < Route exact path={`${match.path}`}  component={CollectionOverview} />
            < Route  path={`${match.path}/:collectionId`}  component={CollectionPage} />
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsfetching
})

const mapDispatchToProps = dispatch => ({
    setShopData: () => dispatch(fetchCollectionsStart())
})


 
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);