import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'
import app from "../fb"
import { useState } from 'react'

function useAuth () {

    //STATE
    // const [ phoneNumber, setPhoneNumber ] = useState('')
    // const [ otp, setOtp ] = useState('')
    const [ confirmObject, setConfirmObject ] = useState('')

    const auth = getAuth( app )

    const setUpRecaptcha = ( phoneNumber ) => {
        console.log('bueno 0');
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {})
        recaptchaVerifier.render()
        return signInWithPhoneNumber( auth, phoneNumber, recaptchaVerifier )
    }

    const checkOtp = async ( otp ) => {
        try {
            console.log(confirmObject);
            console.log(otp);
            const formattedOtp = otp.join('')
            console.log(formattedOtp);
            const res = await confirmObject.confirm( formattedOtp )
            console.log( res );
        } catch (error) {
            console.log(error);
        }
    }

    const sendOtp = async ( phoneNumber ) => {
        try {
            const res = await setUpRecaptcha( phoneNumber )
            setConfirmObject( res );

            console.log(res);
             
        } catch ( error ) {
            return error
        }
    }

    return {
        checkOtp,
        sendOtp,
        // setPhoneNumber,
        // setOtp

    }

}

export default useAuth