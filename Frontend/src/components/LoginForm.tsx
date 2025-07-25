import "./LoginForm.css"
import { useState } from "react";

function Title() {
    return (
        <div className="TitleContainer">
            <p className="TitleContainer-1">Welcome to Login</p>
            <p className="TitleContainer-2">This login is for SRM University AP Students</p>
        </div>
    );
}

function Inputs() {
    const [ ShowPassword, SetShowPassword ] = useState(false);
    const togglePasswordVisibility = () => {
        SetShowPassword(!ShowPassword);
    };
    
    return (
        <>
            <div className="FormGroup">
                <label htmlFor="username">Username <span className="RequiredIcon">*</span></label>
                <div className="InputsContainer">
                    <input 
                        type="text" id="username" name="username" className="FormInput"
                        placeholder="Enter Your Username" required
                    />
                    <img src="src/assets/Icons/ProfileIcon.svg" alt="Profile Icon" className="Icon"/>
                </div>
            </div>
            
            <div className="FormGroup">
                <label htmlFor="password">Password <span className="RequiredIcon">*</span></label>
                <div className="InputsContainer">
                    <input 
                        type={ShowPassword?"text":"password"} id="password" name="password" 
                        className="FormInput" placeholder="••••••••" required
                    />
                    <img 
                        src={
                            ShowPassword ?
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

function Captcha() {
    return (
        <>
            <label htmlFor="captcha">Captcha <span className="RequiredIcon">*</span></label>
            <div className="CaptchaContainer">
                <img src="src/assets/Captcha.png" alt="Captcha Image" className="CaptchaImage"/>
                <img src="src/assets/Icons/ReloadIcon.svg" alt="Captcha Icon" className="CaptchaReloadIcon" />
                <input type="text" placeholder="Enter Captcha" className="CaptchaInput"/>
            </div>       
        </>
    );
}

function AdditionalOptions(){
    return (
        <div className="AdditionalOptions">
            <div className="RememberMe">
                <input type="checkbox" id="RememberMe" className="RememberMeInput"/>
                <label htmlFor="RememberMe">Remember me</label>
            </div>
                
            <a href="/ForgotPassword" className="ForgotPassword">
                Forgot Password?
            </a>       
        </div>
    );
}

function LoginForm() {
    return (
        <div className="LoginFormContainer">
            <Title />
            <form action="" className="LoginForm">
                <Inputs />
                <Captcha/>
                <AdditionalOptions />
                <button type="submit" className="SubmitButton">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginForm;