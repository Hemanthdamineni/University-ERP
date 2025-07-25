import './Header.css';

function Logo(){
    return (
        <>
            <img 
                src="src/assets/SrmLogo.png" 
                alt="Logo of SRM University Ap" 
                className = "Logo"
            />
        </>
    );
}

function HeaderButtons(props: { text: string }) {
    const text = props.text;
    if (!text) { return null; }
    else {
        if (text === "Login") {
            return (
                <>
                    <a href={`/${text}`} className="LoginButton">
                        {text}
                    </a>
                </>
            );
        }
        else {
            return (
                <>
                    <a href={`/${text}`} className="HeaderButton">
                        {text}
                    </a>
                </>
            );
        }
    }
}

function Header() {
    const buttons =  ['Home', 'Newstand', 'Login'];
    return (
        <div className='HeaderContainer'>
            <div className='LeftSection'>
                <Logo></Logo>
            </div>
            <div className='RightSection'>
                {
                    buttons.map(
                        (buttonText) => (
                            <HeaderButtons 
                                key={buttonText} 
                                text={buttonText}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default Header;