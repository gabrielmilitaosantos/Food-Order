import { use, useActionState } from "react";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Error from "../Error";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import useHttp from "../../hooks/useHttp";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    }
}

export default function Checkout() {
    const { items, clearCart } = use(CartContext);
    const progressCtx = use(UserProgressContext);

    const {
        data,
        error,
        sendRequest,
        clearData
    } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleClose() {
        progressCtx.hideCheckout();
    }

    function handleFinish() {
        progressCtx.hideCheckout();
        clearCart();
        clearData();
    }

    async function checkoutAction(prevValue, formData) {
        const customerData = Object.fromEntries(formData.entries());

        await sendRequest(
            JSON.stringify({
                order: {
                    items: items,
                    customer: customerData,
                }
            })
        );
    }

    const [formState, formAction, pending] = useActionState(checkoutAction, { data: null });

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (pending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={progressCtx.progress === "checkout"}
                onClose={handleClose}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }


    return (
        <Modal open={progressCtx.progress === "checkout"} onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}