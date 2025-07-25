import "./Footer.css";

function Footer() {
    return (
        <div className="FooterContainer">
            <div className="FooterText">
                © 2025 SRM University AP. All rights reserved.
            </div>
            <div className="FooterLinks">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
            </div>
        </div>
    );
}

export default Footer;