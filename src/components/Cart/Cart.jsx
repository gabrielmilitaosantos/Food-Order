import { use } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button";
import { UserProgressContext } from "../../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const CartCtx = use(CartContext);
    const { progress, hideCart, showCheckout } = use(UserProgressContext);

    const cartTotal = CartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleCloseCart() {
        hideCart();
    }

    function handleOpenCheckout() {
        showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={progress === "cart"}
            onClose={progress === "cart" ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {CartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => CartCtx.addItem(item)}
                        onDecrease={() => CartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <div className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {CartCtx.items.length > 0 && (
                    <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
                )}
            </div>
        </Modal>
    );
}