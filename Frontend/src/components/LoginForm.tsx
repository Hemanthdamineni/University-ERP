// Make sure to run: npm install axios
import "./LoginForm.css"
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

function Title() {
    return (
        <div className="TitleContainer">
            <p className="TitleContainer-1">Welcome to Login</p>
            <p className="TitleContainer-2">This login is for SRM University AP Students</p>
        </div>
    );
}

function LoginForm() {
    const [form, setForm] = useState({ username: '', password: '', captcha: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [captchaUrl, setCaptchaUrl] = useState('/captcha.png');
    const [sessionId, setSessionId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCaptcha = async () => {
        setCaptchaUrl('/captcha.png?' + Date.now()); // bust cache
        try {
            const res = await axios.get('http://localhost:5000/api/captcha');
            setCaptchaUrl(res.data.captchaUrl);
            setSessionId(res.data.sessionId);
        } catch (err: any) {
            setMessage('Failed to fetch captcha');
        }
    };

    useEffect(() => { fetchCaptcha(); }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Logging in...');
        try {
            const res = await axios.post('http://localhost:5000/api/login', { ...form, sessionId });
            if (res.data.success) setMessage('Login & scraping successful!');
            else setMessage('Login failed: ' + res.data.error);
        } catch (err: any) {
            setMessage('Error: ' + (err.response?.data?.error || err.message));
        }
        setLoading(false);
    };

    return (
        <div className="LoginFormContainer">
            <Title />
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div className="FormGroup">
                    <label htmlFor="username">Username <span className="RequiredIcon">*</span></label>
                    <div className="InputsContainer">
                        <input 
                            type="text" id="username" name="username" className="FormInput"
                            placeholder="Enter Your Username" required value={form.username} onChange={handleChange}
                        />
                        <img src="src/assets/Icons/ProfileIcon.svg" alt="Profile Icon" className="Icon"/>
                    </div>
                </div>
                <div className="FormGroup">
                    <label htmlFor="password">Password <span className="RequiredIcon">*</span></label>
                    <div className="InputsContainer">
                        <input 
                            type={showPassword ? "text" : "password"} id="password" name="password" 
                            className="FormInput" placeholder="••••••••" required value={form.password} onChange={handleChange}
                        />
                        <img 
                            src={showPassword ? "src/assets/Icons/VisibilityIcon.svg" : "src/assets/Icons/VisibilityOffIcon.svg"}
                            alt="Visibility Icon" onClick={() => setShowPassword(!showPassword)}
                            className="Icon"
                        /> 
                    </div>
                </div>
                <label htmlFor="captcha">Captcha <span className="RequiredIcon">*</span></label>
                <div className="CaptchaContainer">
                    <img src={captchaUrl} alt="Captcha Image" className="CaptchaImage"/>
                    <img src="src/assets/Icons/ReloadIcon.svg" alt="Captcha Icon" className="CaptchaReloadIcon" onClick={fetchCaptcha} style={{ cursor: 'pointer' }}/>
                    <input type="text" name="captcha" placeholder="Enter Captcha" className="CaptchaInput" required value={form.captcha} onChange={handleChange}/>
                </div>
                <div className="AdditionalOptions">
                    <div className="RememberMe">
                        <input type="checkbox" id="RememberMe" className="RememberMeInput"/>
                        <label htmlFor="RememberMe">Remember me</label>
                    </div>
                    <a href="/ForgotPassword" className="ForgotPassword">Forgot Password?</a>       
                </div>
                <div style={{ marginTop: 10, color: message.includes('success') ? 'green' : 'red' }}>{message}</div>
                <button type="submit" className="SubmitButton" disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;