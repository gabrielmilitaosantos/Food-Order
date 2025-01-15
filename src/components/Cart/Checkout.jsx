import { use, useActionState } from "react";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";

export default function Checkout() {
    const { items } = use(CartContext);
    const progressCtx = use(UserProgressContext);

    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleClose() {
        progressCtx.hideCheckout();
    }

    function submitAction(prevValue, formData) {
        const fullName = formData.get("full-name");
        const email = formData.get("email");
        const street = formData.get("street");
        const postalCode = formData.get("postal-code");
        const city = formData.get("city");

        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order: {
                    items: items,
                    customer: {
                        name: fullName,
                        email,
                        street,
                        "postal-code": postalCode,
                        city,
                    }
                }
            })
        });
        
    }

    const [formState, formAction, pending] = useActionState(submitAction, { data: null });

    return (
        <Modal open={progressCtx.progress === "checkout"} onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="full-name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}