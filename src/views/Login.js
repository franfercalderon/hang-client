import { useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import BtnSecondary from "../components/BtnSecondary/BtnSecondary";
// import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'
// import app from '../fb'
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Divider from "../components/Divider/Divider";
import OTPInput from "../components/OtpContainer/OtpContainer";
import Alert from "../components/Alert/Alert";
import Swal from "sweetalert2";


export default function Login () {

    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState(Array(6).fill( "" ))
    const [ showOtp, setShowOtp ] = useState( false )
    // const [ confirmObject, setConfirmObject ] = useState('')

    //ROUTER
    const navigate = useNavigate()

    //HOOKS
    const { userLogin, sendOtp } = useAuth()

    //FUNCTIONS
    const handleSendOtp = async ( e ) => {
        e.preventDefault()
        try {
            if( phoneNumber !== "" && phoneNumber !== undefined ){
                await sendOtp( phoneNumber )
                setShowOtp( true )
            }
            
        } catch ( error ) {

        }
    }

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        try {
            await userLogin( otp )
        } catch  ( error ) {
            console.log('por aca');
            return (
                <Alert title={'Error'} text={ error.message } icon={'error'} confirmBtn={'Ok'} showDenyBtn={ false } />
            )
            // Swal
            // .fire({
            //     title: 'asa',
            //     text: 'text',
            //     icon: 'icon',
            //     confirmButtonText: 'confirmBtn',
            //     showDenyButton: false,
            //     denyButtonText: 'denyBtn',
            //     buttonsStyling: false,
            //     customClass: {
            //         popup: 'hang-alert-container',
            //         icon: 'alert-icon',
            //         confirmButton: 'confirm-btn btn order2',
            //         denyButton: 'deny-btn btn order1',
            //     }
            // })
        }
    }


    return(
        <div className="view-container onboarding">
            <div className="section-container topbar-title">
                Welcome Back
            </div>
            <div className="section-container">
                <form>
                    { !showOtp ?
                        <>
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
                            <div id="recaptcha-container" className="captcha-container"></div>
                            <BtnPrimary displayText={'Continue'} action={ ( e ) => handleSendOtp( e ) } id='send-otp-btn'/>
                        </>
                        :
                        <>
                            <label>Enter Code</label>
                            <OTPInput otp={ otp } setOtp={ setOtp } />
                            <BtnPrimary displayText={'Log In'} action={ ( e ) => handleLogin( e, otp ) }/>
                        </>
                    }
                </form>
            </div>
            <div className="section-container bottom-container">
                <Divider/>
                <BtnSecondary displayText={'Sign Up'} action={ () => navigate('/singup') }/>
            </div>
        </div>
    )
}