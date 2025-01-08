import { use } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

export default function MealItem({ id, name, description, price, image }) {
    const cartCtx = use(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem({
             id, name, description, price, image,
        });
    }

    return (
        <>
            <li key={id} className="meal-item">
                <article>
                    <img src={`http://localhost:3000/${image}`} alt={name} />
                    <div>
                        <h3>{name}</h3>
                        <p className="meal-item-description">{description}</p>
                        <p className="meal-item-price">{currencyFormatter.format(price)}</p>
                    </div>
                    <p className="meal-item-actions">
                        <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                    </p>
                </article>
            </li>

        </>
    );
}