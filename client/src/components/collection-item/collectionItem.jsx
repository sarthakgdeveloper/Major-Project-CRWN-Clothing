import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.action'
import {CollectionFooterContainer, CollectionItemContainer, CustomButtonContainer, ImageContainer} from './collectionItem.style'

const CollectionItem = ({item,  addItem}) => {

    const {name, price, imageUrl} = item


    return (
        <CollectionItemContainer>
                <ImageContainer style = {{backgroundImage: `url(${imageUrl})`}} ></ImageContainer>
                <CollectionFooterContainer>
                    <span>{name}</span>
                    <span>${price}</span>
                </CollectionFooterContainer>
                <CustomButtonContainer onClick={() => addItem(item)}>Add To Cart</CustomButtonContainer>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item)),
})

export default connect(null, mapDispatchToProps)(CollectionItem);