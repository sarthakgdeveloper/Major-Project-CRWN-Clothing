import React, { useRef, useState } from "react";
import Loader from "../loader/loader";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { uploadNewProduct } from "../../firebase/firebase.utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./selleraddproduct.scss";

function SellerAddProduct({ currentUser }) {
  const [productCategory, setProductCategory] = useState("");
  const { t } = useTranslation();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState("");
  const [uploaded, isUploaded] = useState(false);
  const [loading, isLoading] = useState(false);

  const uploadingImageLabel = useRef();
  const container = useRef();
  const imageContainer = useRef();

  const categoriesArr = [
    {
      key: "Handicraft",
      value: t("handicraft"),
    },
    {
      key: "Artist",
      value: t("artist"),
    },
    {
      key: "Sculpture",
      value: t("sculpture"),
    },
    {
      key: "Florist",
      value: t("florist"),
    },
    {
      key: "Instrument",
      value: t("instrument"),
    },
  ];

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const onFileInputChange = async (e) => {
    Array.from(e.target.files).forEach(async (file) => {
      setProductImages((images) => [...images, file]);
      let imageUrl = URL.createObjectURL(file);
      const preview = await createImage(imageUrl);
      const previewDiv = document.createElement("figure");
      uploadingImageLabel.current.classList.add("hidden");
      imageContainer.current.classList.remove("hidden");
      previewDiv.classList.add("item");
      previewDiv.appendChild(preview);
      container.current.appendChild(previewDiv);
    });
  };

  const onProductSubmit = async (e) => {
    e.preventDefault();
    isUploaded(false);
    isLoading(true);
    await uploadNewProduct(
      productImages,
      productCategory?.key,
      productName,
      productPrice,
      currentUser,
      isUploaded,
      isLoading
    );
  };

  const handleProductCategory = (e) => {
    return setProductCategory(e);
  };
  const handleProductName = (e) => {
    return setProductName(e.target.value);
  };
  const handleProductPrice = (e) => {
    return setProductPrice(e.target.value);
  };

  return currentUser?.user === "Karigar" && !uploaded ? (
    <div className="relative max-h-screen flex items-center justify-center py-12 px-4 bg-no-repeat bg-cover relative items-center sm:px-6 lg:px-8 min-h-screen">
      {loading && <Loader />}
      <div className="absolute opacity-30 inset-0 z-0"></div>
      <div className="w-full p-10 bg-white rounded-xl z-10 sm:max-w-lg">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            {t("add_new_product")}
          </h2>
        </div>
        <form className="mt-8 space-y-3" onSubmit={onProductSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <div class="dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {productCategory?.value || t("select_category")}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {categoriesArr.map((eCat) => (
                  <li key={eCat.key}>
                    <button
                      class="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProductCategory(eCat);
                      }}
                    >
                      {eCat.value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              {t("product_name")}
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              required="required"
              name="name"
              onChange={handleProductName}
              value={productName}
            />
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              {t("product_price")}
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="number"
              required="required"
              name="price"
              onChange={handleProductPrice}
              value={productPrice}
            />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              {t("select_image")}
            </label>
            <div className="flex items-center justify-center w-full">
              <div
                className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 group text-center hidden"
                id="image__container"
                ref={imageContainer}
              >
                <div className="container" id="container" ref={container}></div>
              </div>
              <label
                className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center"
                id="uploadingImage__label"
                htmlFor="uploading__images"
                ref={uploadingImageLabel}
              >
                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                  <div className="flex flex-auto max-h-48 mx-auto -mt-10 w-2/5">
                    <LazyLoadImage
                      className="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&amp;ext=jpg"
                      alt="freepik image"
                      effect="blur"
                    />
                  </div>
                  <p className="pointer-none text-gray-500">
                    {t("image_para")}
                  </p>
                </div>
              </label>
            </div>
            <input
              className="hidden"
              type="file"
              accept=".jpeg,.jpg,.png"
              id="uploading__images"
              name="files"
              multiple="multiple"
              required="required"
              onChange={onFileInputChange}
            />
          </div>
          <p className="text-sm text-dark-300">
            <span>{t("file_type")}</span>
          </p>
          <div>
            <button
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 focus:outline-none focus:shadow-outline hover:bg-blue-600"
              type="submit"
            >
              {t("product_upload")}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SellerAddProduct);
