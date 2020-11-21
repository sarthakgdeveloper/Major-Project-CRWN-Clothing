import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview-component';
import {connect} from 'react-redux';
import {selectShop} from '../../redux/shop/shop.selector';
import {createStructuredSelector} from 'reselect';

const CollectionOverview = ({collections}) =>{
    console.log(collections)
    return (
    <div className="collection-overview">
        {
            Object.values(collections).map(({id, ...otherCollectionPreview}) => (
                <CollectionPreview key = {id} {...otherCollectionPreview}/>
            ))
        }
    </div>
)}

const mapStateToProps = createStructuredSelector({
    collections: selectShop
})

export default connect(mapStateToProps)(CollectionOverview);