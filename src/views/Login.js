import { useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import OTPInput from "../components/OtpContainer/OtpContainer";
import InlineAlert from "../components/InlineAlert/InlineAlert";


export default function Login () {

    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState(Array(6).fill( "" ))
    const [ showOtp, setShowOtp ] = useState( false )
    const [ displayError, setDisplayError ] = useState('')

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
            setDisplayError( error.message )
        }
    }

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        try {
            await userLogin( otp )
        } catch  ( error ) {
            setDisplayError( error.message )
            setOtp(Array(6).fill( "" ))
        }
    }

    return(
        <div className="view-container onboarding">
            <div className="section-container topbar-title">
                Welcome
            </div>
            <div className="view-body">
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
                                <div className="captcha-container">
                                    <div id="recaptcha-container" ></div>
                                </div>
                                {
                                    displayError !== "" &&
                                    
                                    <InlineAlert text={ displayError }/>
                                }
                                <BtnPrimary displayText={'Continue'} action={ ( e ) => handleSendOtp( e ) } id='send-otp-btn' enabled={ phoneNumber !== "" ? true : false }/>
                            </>
                            :
                            <>
                                <label>Enter Code</label>
                                <OTPInput otp={ otp } setOtp={ setOtp } />
                                {
                                    displayError !== "" &&
                                    
                                    <InlineAlert text={ displayError }/>
                                }
                                <BtnPrimary displayText={'Log In'} action={ ( e ) => handleLogin( e, otp ) } enabled={ otp.length === 6 ? true : false }/>
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}