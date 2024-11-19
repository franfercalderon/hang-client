import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'
import app from "../fb"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useAuth () {

    //STATE
    const [ confirmObject, setConfirmObject ] = useState('')

    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()


    //FUNCTIONS
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

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        console.log('shega');

        try {
            const formattedOtp = otp.join('')
            const res = await checkOtp( formattedOtp )
            const newUser = res._tokenResponse.isNewUser
            console.log('vanavega');
            navigate( newUser ? '/onboarding' : '/' )
            
        } catch ( error ) {
            
        }
    }

    const sendOtp = async ( phoneNumber ) => {
        try {
            const res = await setUpRecaptcha( phoneNumber )
            setConfirmObject( res );
             
        } catch ( error ) {
            return error
        }
    }

    return {
        sendOtp,
        handleLogin
        // setPhoneNumber,
        // setOtp

    }

}

export default useAuth