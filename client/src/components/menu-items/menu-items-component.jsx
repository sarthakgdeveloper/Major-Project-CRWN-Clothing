import React from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

import "../menu-items/menu-items.scss";

function MenuItem({ title, imageUrl, size, history, match, linkUrl }) {
  const { t } = useTranslation();
  return (
    <div
      className={`${size ? size : ""} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="background-image"
      ></div>
      <div className="content">
        <h1 className="tittle">{t(title.toLowerCase())}</h1>
        <span className="subtittle">{t("shop_now")}</span>
      </div>
    </div>
  );
}

export default withRouter(MenuItem);
