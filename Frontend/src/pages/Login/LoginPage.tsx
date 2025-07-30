import "./LoginPage.css";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Title() {
    return (
        <div className="TitleContainer">
            <p className="TitleContainer-1">Welcome to Login</p>
            <p className="TitleContainer-2">This login is for SRM University AP Students</p>
        </div>
    );
}

type InputsProps = {
    showPassword: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePasswordVisibility: () => void;
};

function Inputs({ showPassword, handleChange, togglePasswordVisibility }: InputsProps) {
    return (
        <>
            <div className="FormGroup">
                <label htmlFor="username">Username <span className="RequiredIcon">*</span></label>
                <div className="InputsContainer">
                    <input
                        type="text" id="username" name="username" className="FormInput"
                        placeholder="Enter Your Username" required onChange={handleChange}
                    />
                    <img src="src/assets/Icons/ProfileIcon.svg" alt="Profile Icon" className="Icon" />
                </div>
            </div>

            <div className="FormGroup">
                <label htmlFor="password">Password <span className="RequiredIcon">*</span></label>
                <div className="InputsContainer">
                    <input
                        type={showPassword ? "text" : "password"} id="password" name="password"
                        className="FormInput" placeholder="••••••••" required onChange={handleChange}
                    />
                    <img
                        src={
                            showPassword ?
                                "src/assets/Icons/VisibilityIcon.svg"
                                :
                                "src/assets/Icons/VisibilityOffIcon.svg"
                        }
                        alt="Visibility Icon" onClick={togglePasswordVisibility}
                        className="Icon"
                    />
                </div>
            </div>
        </>
    );
}

type CaptchaProps = {
    captchaBase64: string;
    fetchCaptcha: MouseEventHandler<HTMLImageElement>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Captcha({ captchaBase64, fetchCaptcha, handleChange }: CaptchaProps) {
    return (
        <>
            <label htmlFor="captcha">
                Captcha
                <span className="RequiredIcon">*</span>
            </label>
            <div className="CaptchaContainer">
                <img
                    src={captchaBase64}
                    alt="Please Wait" className="CaptchaImage"
                />
                <img
                    src="src/assets/Icons/ReloadIcon.svg" alt="Captcha Icon"
                    className="CaptchaReloadIcon" onClick={fetchCaptcha}
                />
                <input
                    type="text" placeholder="Enter Captcha"
                    id="captcha" name="captcha"
                    className="CaptchaInput" onChange={handleChange}
                />
            </div>
        </>
    );
}

type AdditionalOptionsProps = {
    message: string;
}

function AdditionalOptions({ message }: AdditionalOptionsProps) {
    return (
        <>
            <div className="AdditionalOptions">
                <div className="RememberMe">
                    <input type="checkbox" id="RememberMe" className="RememberMeInput" />
                    <label htmlFor="RememberMe">Remember me</label>
                </div>

                <a href="/ForgotPassword" className="ForgotPassword">
                    Forgot Password?
                </a>
            </div>

            <div style={{ marginTop: 10, color: message.includes('success') ? 'green' : 'red' }}>{message}</div>
        </>

    );
}

function LoginForm() {
    const [form, setForm] = useState({ username: '', password: '', captcha: '' });
    const [sessionId, setSessionId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [captchaBase64, setcaptchaBase64] = useState('Please Wait');
    const [showPassword, setPasswordVisibility] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { fetchCaptcha(); }, []);

    const fetchCaptcha = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/captcha');
            setcaptchaBase64(res.data.captchaBase64);
            setSessionId(res.data.sessionId);
        } catch (err: any) {
            setMessage('Failed to fetch captcha');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!showPassword);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmition = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Logging in...');
        try {
            const res = await axios.post('http://localhost:5000/api/login', { ...form, sessionId });
            if (res.data.success) {
                localStorage.setItem("token", "dummy_token"); // Set a real token if you have one
                localStorage.setItem("sessionId", sessionId); // Store sessionId for scraping
                navigate("/dashboard");
            } else setMessage('Login failed: ' + res.data.error);
        } catch (err: any) {
            setMessage('Error: ' + (err.response?.data?.error || err.message));
        }
        setLoading(false);
    };

    return (
        <div className="LoginFormContainer">
            <Title />
            <form action="" className="LoginForm" onSubmit={handleSubmition}>
                <Inputs
                    showPassword={showPassword} handleChange={handleChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <Captcha captchaBase64={captchaBase64} handleChange={handleChange} fetchCaptcha={fetchCaptcha} />
                <AdditionalOptions
                    message={message}
                />

                <button type="submit" className="SubmitButton" disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

function LoginPage() {
    return (
        <div className="LoginPageContainer">
            {/* <header>
                <Header />
            </header> */}
            <div className="LoginPageBodyContainer">
                <LoginForm />
            </div>
            {/* <footer>
                <Footer />
            </footer> */}
        </div>
    );
}

export default LoginPage;

// Helper to get sessionId from localStorage
export function getSessionId() {
    return localStorage.getItem("sessionId") || '';
}