import { useCallback, useContext, useEffect, useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import OTPInput from "../components/OtpContainer/OtpContainer";
import InlineAlert from "../components/InlineAlert/InlineAlert";
import Loader from "../components/Loader/Loader";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'
import { app } from "../fb";
import { AppContext } from "../context/AppContext";


export default function Login () {

    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState(Array(6).fill( "" ))
    const [ showOtp, setShowOtp ] = useState( false )
    const [ displayError, setDisplayError ] = useState('')
    const [ isLoading, setIsLoading ] = useState( false )

    //HOOKS
    const { userLogin, setConfirmObject } = useAuth()

    //CONTEXT
    const { inviterId } = useContext( AppContext )

    //AUTH
    const auth = getAuth( app )

    //FUNCTIONS
    const handleSendOtp = async ( e ) => {
        e.preventDefault()
        try {
            if( phoneNumber !== "" && phoneNumber !== undefined ){

                const appVerifier = new RecaptchaVerifier( auth, 'recaptcha-container', {} )
                const res = await signInWithPhoneNumber( auth, phoneNumber, appVerifier )
                setConfirmObject( res );
                setShowOtp( true )
            }
        } catch ( error ) {
            setDisplayError( error.message )
        }
    }

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        setIsLoading( true )
        try {
            await userLogin( otp )
        } catch  ( error ) {
            setIsLoading( false )
            setDisplayError( error.response.data )
            setOtp(Array(6).fill( "" ))
        }
    }

    return(
        <div className="view-container onboarding">
            {   
                isLoading ?

                <Loader/>
                :
                <>
                <div className="section-container topbar-title">
                    { inviterId ?  'Create Your Account' : 'Welcome'}
                </div>
                <div className="view-body">
                    <div className="section-container">
                        <form>
                            { !showOtp ?
                                <>
                                    <label>Phone Number</label>
                                    <div className="phone-number-container">
                                        <img src="/images/us-flag.jpg" alt="US Flag" className="us-phone-flag"/>
                                        <p className="us-char">+54</p>
                                        <PhoneInput
                                            defaultCountry="AR"
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
                </>
            }
        </div>
    )
}