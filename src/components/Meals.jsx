import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    try {
        useEffect(() => {
            async function loadMeals() {
                const response = await fetch("http://localhost:3000/meals");

                if (!response.ok) {
                    // ....
                }
                const meals = await response.json();
                setLoadedMeals(meals);
            }

            loadMeals();
        }, []);
    } catch (error) {
        console.error(error);
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                    image={meal.image}
                />
            ))}
        </ul>
    );
}