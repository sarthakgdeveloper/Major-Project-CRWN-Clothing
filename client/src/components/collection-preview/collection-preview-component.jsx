import React from "react";
import { useTranslation } from "react-i18next";
import CollectionItem from "../collection-item/collectionItem";

import "../collection-preview/collection-preview.scss";

const CollectionPreview = ({ title, items }) => {
  const { t } = useTranslation();
  return (
    <div className="collection-preview">
      <h1 className="title">{t(title.toLowerCase())}</h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
