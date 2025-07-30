function Logo() {
    return (
        <img
            src="src/assets/FullSrmLogo.png"
            alt="Logo of SRM University Ap"
            className="w-32 h-12 m-2 object-contain"
        />
    );
}

function HeaderButtons(props: { text: string }) {
    const text = props.text;
    if (!text) { return null; }
    const base = "px-4 py-2 rounded font-medium transition-colors duration-150";
    if (text === "Login") {
        return (
            <a href={`/${text}`} className={base + " bg-blue-600 text-white hover:bg-blue-700 ml-2"}>
                {text}
            </a>
        );
    } else {
        return (
            <a href={`/${text}`} className={base + " text-gray-700 hover:bg-gray-100 ml-2"}>
                {text}
            </a>
        );
    }
}

function Header() {
    const buttons = ['Home', 'Newstand', 'Login'];
    return (
        <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
            <div className="flex items-center">
                <Logo />
            </div>
            <div className="flex items-center">
                {buttons.map((buttonText) => (
                    <HeaderButtons key={buttonText} text={buttonText} />
                ))}
            </div>
        </header>
    );
}

export default Header;