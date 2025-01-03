import { currencyFormatter } from "../util/formatting";

export default function MealItem({ id, name, description, price, image }) {
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
                        <button>Add to Cart</button>
                    </p>
                </article>
            </li>

        </>
    );
}