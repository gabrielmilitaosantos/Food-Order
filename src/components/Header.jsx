import { use } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
    const { items } = use(CartContext);
    const { showCart } = use(UserProgressContext);

    const totalCartItems = items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Reactfood logo" />
                <h1>Reactfood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}