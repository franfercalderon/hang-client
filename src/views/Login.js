import { useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import BtnSecondary from "../components/BtnSecondary/BtnSecondary";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'
import app from '../fb'
import PhoneInput from 'react-phone-number-input'


export default function Login () {

    //STATE
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ otp, setOtp ] = useState('')
    const [ verificationId, setVerificationId ] = useState('')

    const auth = getAuth( app )

    const setUpRecaptcha = ( number ) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {})
        recaptchaVerifier.render()
    }

    const sendOtp = async ( e ) => {
        e.preventDefault()
        if( phoneNumber !== "" && phoneNumber !== undefined ){
            try {
                const res = await setUpRecaptcha( phoneNumber )
                console.log(res);
                
            } catch (error) {
                
            }
        }

    }

    
      
    return(
        <div className="view-container">
            <div className="section-container">
                {/* <img src="./images/logo.svg" alt="Hang"/> */}
            </div>
            <div className="section-container">
                {/* <BtnSecondary displayText={'Log In'}/> */}
                <form>
                    <div className="phone-number-container">
                        <img src="/images/us-flag.jpg" alt="US Flag" className="us-phone-flag"/>
                        <p className="us-char">+1</p>
                        <PhoneInput
                            defaultCountry="US"
                            placeholder="( 555 )  555 - 5555"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                        />
                    </div>
                    <div id="recaptcha-container"></div>
                    <BtnPrimary displayText={'Send Code'} action={sendOtp} submit={ true }/>

                </form>
                
            </div>

        </div>
    )
}