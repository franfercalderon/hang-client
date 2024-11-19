import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth, validatePassword } from 'firebase/auth'
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
            const res = await confirmObject.confirm( otp )
            return res
        } catch ( error ) {
            console.log(error);
        }
    }

    const handleLogin = async ( e, otp ) => {
        e.preventDefault()
        console.log('shega');

        try {
            const formattedOtp = otp.join('')
            const res = await checkOtp( formattedOtp )
            console.log(res);
            const newUser = res._tokenResponse.isNewUser
            console.log(newUser);
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