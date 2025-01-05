export default function Button({ children, textOnly, className, ...props }) {
    let cssClassees = textOnly ? "text-button" : "button";
    cssClassees += ' ' + className;

    return (
        <button className={cssClassees} {...props}>
            {children}
        </button>
    );
}