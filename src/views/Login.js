import { useCallback, useContext, useEffect, useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import PhoneInput from 'react-phone-number-input'
import useAuth from "../hooks/useAuth";
import OTPInput from "../components/OtpContainer/OtpContainer";
import InlineAlert from "../components/InlineAlert/InlineAlert";
import Loader from "../components/Loader/Loader";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { app } from "../fb";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function Login () {
    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState(Array(6).fill(""))
    const [ showOtp, setShowOtp ] = useState(false)
    const [ displayError, setDisplayError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ enablePhoneCta, setEnablePhoneCta ] = useState(false)
    const [ ctaLoading, setCtaLoading ] = useState(false)

    //HOOKS
    const { userLogin, setConfirmObject } = useAuth()

    //AUTH
    const auth = getAuth(app)

    // Initialize reCAPTCHA verifier
    useEffect(() => {
        const initRecaptcha = () => {
            try {
                if (!window.recaptchaVerifier) {
                    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                        size: 'invisible',
                        callback: () => {
                            console.log('reCAPTCHA verified')
                        },
                        'expired-callback': () => {
                            setDisplayError('Security check expired. Please try again.')
                            setCtaLoading(false)
                        }
                    });
                }
            } catch (error) {
                console.error('Error initializing reCAPTCHA:', error);
            }
        };

        initRecaptcha();

        // Cleanup
        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, [auth]);

    const handlePhoneInput = (number) => {
        setPhoneNumber(number)
    }

    const handleSendOtp = async (e) => {
        e.preventDefault()
        setEnablePhoneCta(false)
        setCtaLoading(true)
        try {
            if (phoneNumber) {
                // Format phone number to E.164 format
                let e164PhoneNumber = phoneNumber
                if (!phoneNumber.startsWith('+1')) {
                    // If number doesn't start with +1, add it
                    e164PhoneNumber = `+1${phoneNumber.replace(/\D/g, '')}`
                }
                
                if (!window.recaptchaVerifier) {
                    throw new Error('Security verification not initialized. Please refresh the page.')
                }

                const res = await signInWithPhoneNumber(auth, e164PhoneNumber, window.recaptchaVerifier)
                setConfirmObject(res)
                setShowOtp(true)
                setCtaLoading(false)
                setDisplayError('')
            } else {
                throw new Error('Please enter a valid phone number.')
            }
        } catch (error) {
            setCtaLoading(false)
            console.error('Error in handleSendOtp:', error)
            setDisplayError(error.message || 'Error sending verification code. Please try again.')
            
            // Reset reCAPTCHA on error
            if (window.recaptchaVerifier) {
                await window.recaptchaVerifier.clear()
                window.recaptchaVerifier = null
            }
        }
    }

    const handleLogin = async (e, otp) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await userLogin(otp)
        } catch (error) {
            setIsLoading(false)
            setDisplayError(error.response?.data || error.message)
            setOtp(Array(6).fill(""))
        }
    }

    // Phone number validation effect
    useEffect(() => {
        // For US numbers in E.164 format (+1XXXXXXXXXX), valid length is 12
        // For US numbers without +1, valid length is 10
        const isValidLength = phoneNumber?.length === 12 || phoneNumber?.replace(/\D/g, '').length === 10
        setEnablePhoneCta(isValidLength)
    }, [phoneNumber])

    return(
        <ViewContainer className="onboarding">
            <>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="section-container topbar-title">
                            {'Welcome'}
                        </div>
                        <div className="view-body">
                            <div className="section-container">
                                <form>
                                    {!showOtp ? (
                                        <>
                                            <label>Phone Number 🪐</label>
                                            <div className="phone-number-container">
                                                <img src="/images/us-flag.jpg" alt="US Flag" className="us-phone-flag" />
                                                <p className="us-char">+1</p>
                                                <PhoneInput
                                                    defaultCountry="US"
                                                    placeholder="( 555 )  555 - 5555"
                                                    value={phoneNumber}
                                                    onChange={handlePhoneInput}
                                                />
                                            </div>
                                            {/* Add recaptcha container */}
                                            <div id="recaptcha-container"></div>
                                            {displayError && <InlineAlert text={displayError} />}
                                            <BtnPrimary
                                                displayText="Continue"
                                                action={(e) => handleSendOtp(e)}
                                                id="send-otp-btn"
                                                enabled={enablePhoneCta}
                                                btnLoading={ctaLoading}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label>Enter Code</label>
                                            <OTPInput otp={otp} setOtp={setOtp} />
                                            {displayError && <InlineAlert text={displayError} />}
                                            <BtnPrimary
                                                displayText="Log In"
                                                action={(e) => handleLogin(e, otp)}
                                                enabled={otp.join('').length === 6}
                                            />
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </>
        </ViewContainer>
    )
}