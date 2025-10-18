import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CategoryItem } from "../../store/category/category.types";

import css from "./product-slider.module.css";
import { generateProductPlaceholder } from "../../utils/helpers/product-image";

const carouselSettings = {
  className: "center",
  centerMode: true,
  centerPadding: "60px",
  infinite: true,
  slidesToShow: 1,
  speed: 300,
  adaptiveHeight: true,
  dots: false,
};

export type ProductSliderProps = {
  product: CategoryItem | undefined;
};

const ProductSlider = ({ product }: ProductSliderProps) => {
  // Compose image sources: gallery, then thumbnailUrl, then SVG placeholder
  const gallery = product?.gallery && product.gallery.length > 0 ? product.gallery : [];
  // Only use thumbnailUrl if it's a non-empty string
  const isValidUrl = typeof product?.thumbnailUrl === 'string' && product?.thumbnailUrl.trim() !== '';
  const fallback = isValidUrl ? product?.thumbnailUrl : generateProductPlaceholder(product?.name);
  // If both gallery and thumbnailUrl are missing/empty, render nothing
  const images = gallery.length > 0 ? gallery : (isValidUrl ? [fallback] : []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    const svg = generateProductPlaceholder(product?.name);
    if (!e.currentTarget.src.startsWith('data:image/svg+xml')) {
      e.currentTarget.src = svg;
    }
  };

  if (images.length === 0) return null;
  return (
    <div className={`${css["item-visual"]}`}>
      <Slider {...carouselSettings}>
        {images.map((imageSource, i) => (
          <div className={css["item-image-container"]} key={i}>
            <img
              className={css["item-image"]}
              alt={product?.name}
              src={imageSource}
              onError={handleImageError}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
