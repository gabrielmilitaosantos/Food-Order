import logo from "../assets/logo.jpg";

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Reactfood logo" />
                <h1>Reactfood</h1>
            </div>
            <nav>
                {/* Component Button */}
                <button>Cart (0)</button>
            </nav>
        </header>
    );
}