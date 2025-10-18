import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { navigateTo } from "../../utils/helpers/navigate";

import { addItemToCart } from "../../store/cart/cart.reducer";

import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CategoryItem } from "../../store/category/category.types";

import css from "./product-card.module.css";
import empty from "../../assets/empty.gif";
import { generateProductPlaceholder } from "../../utils/helpers/product-image";

type ProductCardProps = {
  product: CategoryItem;
  isInWishList?: boolean;
  onRemoveFromWishlist?: () => void;
};

const ProductCard = ({
  product,
  isInWishList = false,
  onRemoveFromWishlist,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = navigateTo(navigate);

  const { name, price, thumbnailUrl, suited } = product;

  // Only use thumbnailUrl if it's a non-empty string
  const isValidUrl = typeof thumbnailUrl === 'string' && thumbnailUrl.trim() !== '';
  const imageSrc = isValidUrl ? thumbnailUrl : generateProductPlaceholder(name);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null; // prevent looping
    // Only replace if not already the SVG placeholder
    const svg = generateProductPlaceholder(name);
    if (!e.currentTarget.src.startsWith('data:image/svg+xml')) {
      e.currentTarget.src = svg;
    }
  };

  const addProductToCartHandler = () => dispatch(addItemToCart(product));

  const removeFromWishlistHandler = () => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist();
    }
  };

  return (
    <div className={`${css["product"]} product`}>
      <img
        className={css["product-image"]}
        src={imageSrc}
        alt={name}
        onError={handleImageError}
      />
      <div className={css["product-details"] + " product-details"}>
        <div className={css["product-details-title-price-group"]}>
          <h3
            onClick={() => handleNavigate(`/product/${product.id}`)}
            className={css["product-details-title"]}
          >
            {name}
          </h3>
          <span className={css["product-details-price"]}>${price}</span>
        </div>
        <p className={css["product-details-desc"]}>{suited}</p>
        {isInWishList ? (
          <Button
            buttonType={BUTTON_TYPE_CLASSES.underlinedWishlist}
            onClick={removeFromWishlistHandler}
          >
            Remove from wishlist
          </Button>
        ) : (
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={addProductToCartHandler}
          >
            ADD TO BAG
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
