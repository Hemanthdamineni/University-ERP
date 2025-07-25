import "./LoginPage.css";
import Header from "./shared/Header.tsx";
import LoginForm from "./LoginForm";
import Footer from "./shared/Footer.tsx";

function LoginPage() {
    return (
        <div className="LoginPageContainer">
            <header>
                <Header />
            </header>
            <div className="LoginPageBodyContainer">
                <LoginForm />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default LoginPage;