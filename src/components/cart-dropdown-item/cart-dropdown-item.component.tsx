import css from "./cart-dropdown-item.module.css";
import { CartItem } from "../../store/cart/cart.types";
import { FC } from "react";
import empty from "../../assets/empty.gif";
import { generateProductPlaceholder } from "../../utils/helpers/product-image";

type CartItemProps = {
  cartItem: CartItem;
};

const CartDropdownItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, thumbnailUrl, price } = cartItem;

  const imageSrc = thumbnailUrl || generateProductPlaceholder(name) || empty;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = generateProductPlaceholder(name) || empty;
  };

  return (
    <div className={css["cart-item-container"]}>
      <img
        src={imageSrc}
        alt={name}
        className={css["cart-item-thumbnail"]}
        onError={handleImageError}
      />
      <div className={css["cart-item-details"]}>
        <h2 className={css["cart-item-title"]}>{name}</h2>
        <span className={css["cart-item-price-quantity"]}>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartDropdownItem;
