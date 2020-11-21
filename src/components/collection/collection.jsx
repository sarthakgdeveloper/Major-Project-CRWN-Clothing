import React from 'react';
import CollectionItem from '../collection-item/collectionItem';
import {selectCollection} from '../../redux/shop/shop.selector';
import {connect} from 'react-redux'
import './collection.scss';


const collectionPage = ({match, CollectionItems}) => {
    console.log(CollectionItems)
    return (
    <div className="collection">
        <div className="title">{match.params.collectionId}</div>
        <div className="preview">
            {CollectionItems.items.map(item => <CollectionItem key={item.id} item={item}/>)}
        </div>
    </div>
)};

const mapStateToprops = (state, ownProps) => ({
    CollectionItems: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToprops)(collectionPage);