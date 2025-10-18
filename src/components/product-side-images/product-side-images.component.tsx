import InnerImageZoom from "react-inner-image-zoom";

import { CategoryItem } from "../../store/category/category.types";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import css from "./product-side-images.module.css";
import { generateProductPlaceholder } from "../../utils/helpers/product-image";

type ProductSideImagesProps = {
  product?: CategoryItem;
};

const ProductSideImages = ({ product }: ProductSideImagesProps) => {
  // Compose image sources: gallery, then thumbnailUrl, then SVG placeholder
  const gallery = product?.gallery && product.gallery.length > 0 ? product.gallery : [];
  const fallback = product?.thumbnailUrl || generateProductPlaceholder(product?.name);
  // If both gallery and thumbnailUrl are missing/empty, render nothing
  const isValidUrl = typeof product?.thumbnailUrl === 'string' && product?.thumbnailUrl.trim() !== '';
  const images = gallery.length > 0 ? gallery : (isValidUrl ? [fallback] : []);

  // react-inner-image-zoom does not support onError directly, so we use imgAttributes
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = generateProductPlaceholder(product?.name);
  };

  if (images.length === 0) return null;
  return (
    <div className={css["gallery-container"]}>
      {images.map((imageSource, i) => (
        <InnerImageZoom
          className={css["gallery-image"]}
          key={i}
          src={imageSource}
          imgAttributes={{
            alt: `${product?.name} image ${i}`,
            onError: handleImageError,
          }}
        />
      ))}
    </div>
  );
};

export default ProductSideImages;
