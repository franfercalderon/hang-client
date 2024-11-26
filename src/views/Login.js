import { useCallback, useEffect, useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import OTPInput from "../components/OtpContainer/OtpContainer";
import InlineAlert from "../components/InlineAlert/InlineAlert";
import Loader from "../components/Loader/Loader";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'
import app from "../fb";


export default function Login () {

    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState(Array(6).fill( "" ))
    const [ showOtp, setShowOtp ] = useState( false )
    const [ displayError, setDisplayError ] = useState('')
    const [ isLoading, setIsLoading ] = useState( false )
    // const [ captchaToken, setCaptchaToken ] = useState( null )

    //HOOKS
    const { userLogin, sendOtp } = useAuth()

    //AUTH
    const auth = getAuth( app )
    // const appVerifier = window.recaptchaVerifier
    // console.log(appVerifier);
    // window.recaptchaVerifier = new RecaptchaVerifier( auth, 'recaptcha-container', {} );

    // const appVerifier = window.recaptchaVerifier


    //FUNCTIONS
    const handleSendOtp = async ( e ) => {
        e.preventDefault()
        // setIsLoading( true )
        try {
            if( phoneNumber !== "" && phoneNumber !== undefined ){
                // const appVerifier = await window.recaptchaVerifier
                // await sendOtp( phoneNumber, appVerifier )
                // console.log(appVerifier);
                // setUpRecaptcha()
                const appVerifier = new RecaptchaVerifier( auth, 'recaptcha-container', {} )
                // const result = 
                // const appVerifier = await window.recaptchaVerifier
                // const confirmationResult = await
                // console.log(captchaToken);
                const res = await signInWithPhoneNumber( auth, phoneNumber, appVerifier )
                console.log(res);
                setIsLoading( false )
                setShowOtp( true )
            }
        } catch ( error ) {
            setIsLoading( false )
            setDisplayError( error.message )
            console.log(error);
            // if ( window.recaptchaVerifier ) {
            //     console.log('errorazo');
            //     window.recaptchaVerifier.clear()
            // }
          
        }
    }

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        setIsLoading( true )
        try {
            await userLogin( otp )
        } catch  ( error ) {
            setIsLoading( false )
            setDisplayError( error.message )
            setOtp(Array(6).fill( "" ))
        }
    }

    // const setUpRecaptcha = useCallback( () => {
    //     if( !window.recaptchaVerifier ){
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    //         // const res = await window.recaptchaVerifier.verify()
    //         // setCaptchaToken(res);

    //     }


    //     // window.recaptchaVerifier = new RecaptchaVerifier( auth, 'recaptcha-container', {
    //     //     size: 'invisible',

    //     // })
    //     // window.recaptchaVerifier.verify()
    // }, [ auth ])

    // useEffect(() => {
    //     setUpRecaptcha()
    // }, [ setUpRecaptcha ])
    // useEffect(() => {

    //     if (!window.recaptchaVerifier) {
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //             size: 'normal', // Visible reCAPTCHA
    //             callback: (response) => {
    //                 console.log('reCAPTCHA solved:', response);
    //             }
    //         });
    //     }
    // }, [auth])

    return(
        <div className="view-container onboarding">
            {   
                isLoading ?

                <Loader/>
                :
                <>
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
                </>
            }
        </div>
    )
}