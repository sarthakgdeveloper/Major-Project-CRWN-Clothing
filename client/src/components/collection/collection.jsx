import React from "react";
import CollectionItem from "../collection-item/collectionItem";
import { useTranslation } from "react-i18next";
import { selectCollection } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";
import "./collection.scss";

const CollectionPage = ({ CollectionItems, match }) => {
  const { t } = useTranslation();
  return CollectionItems ? (
    <div className="collection">
      <div className="title">{t(match.params.collectionId.toLowerCase())}</div>
      <div className="preview">
        {CollectionItems.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  ) : null;
};

const mapStateToprops = (state, ownProps) => ({
  CollectionItems: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToprops)(CollectionPage);
