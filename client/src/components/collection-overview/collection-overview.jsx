import React from "react";
import CollectionPreview from "../collection-preview/collection-preview-component";
import { connect } from "react-redux";
import { selectCollectionItems } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";

const CollectionOverview = ({ collections }) => {
  return (
    <div className="collection-overview">
      {collections
        ? Object.keys(collections).map((title) => (
            <CollectionPreview
              title={title}
              items={collections[title]}
              key={title}
            />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionItems,
});

export default connect(mapStateToProps)(CollectionOverview);
