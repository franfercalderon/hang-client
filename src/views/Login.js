import { useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import BtnSecondary from "../components/BtnSecondary/BtnSecondary";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'
import app from '../fb'
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Divider from "../components/Divider/Divider";


export default function Login () {

    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState('')
    const [ showOtp, setShowOtp ] = useState( false )
    // const [ confirmObject, setConfirmObject ] = useState('')

    //ROUTER
    const navigate = useNavigate()

    //HOOKS
    const { checkOtp, sendOtp } = useAuth()

    //FUNCTIONS
    const handleSendOtp = async ( e ) => {
        e.preventDefault()
        try {
            if( phoneNumber !== "" && phoneNumber !== undefined ){
                await sendOtp( phoneNumber )
            }
            
        } catch (error) {
            
        }
    }

      
    return(
        <div className="view-container onboarding">
            <div className="section-container topbar-title">
                Welcome Back
            </div>
            <div className="section-container">
                <form>
                    <label>Phone Number</label>
                    <div className="phone-number-container">
                        <img src="/images/us-flag.jpg" alt="US Flag" className="us-phone-flag"/>
                        <p className="us-char">+1</p>
                        <PhoneInput
                            defaultCountry="US"
                            placeholder="( 555 )  555 - 5555"
                            value={ phoneNumber }
                            onChange={ setPhoneNumber }
                        />
                    </div>
                    <BtnPrimary displayText={'Continue'} action={ ( e ) => handleSendOtp( e ) } id='send-otp-btn'/>
                </form>
            </div>
            <div className="section-container bottom-container">
                <Divider/>
                <BtnSecondary displayText={'Sign Up'} action={ () => navigate('/singup') }/>
            </div>
        </div>
    )
}