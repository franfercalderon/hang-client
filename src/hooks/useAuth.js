import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, getAuth, validatePassword } from 'firebase/auth'
import app from "../fb"
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function useAuth () {

    //STATE
    const [ confirmObject, setConfirmObject ] = useState('')

    //CONTEXT
    const { setPopulateUser } = useContext( AppContext )

    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()


    //FUNCTIONS
    const setUpRecaptcha = ( phoneNumber ) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {})
        recaptchaVerifier.render()
        return signInWithPhoneNumber( auth, phoneNumber, recaptchaVerifier )
    }

    const sendOtp = async ( phoneNumber ) => {
        try {
            const res = await setUpRecaptcha( phoneNumber )
            setConfirmObject( res );
             
        } catch ( error ) {
            return error
        }
    }

    const checkOtp = async ( otp ) => {
        try {
            const res = await confirmObject.confirm( otp )
            return res
        } catch ( error ) {
            return error
        }
    }

    const userLogin = async ( otp ) => {
        console.log('shega');

        try {
            const formattedOtp = otp.join('')
            const res = await checkOtp( formattedOtp )
            console.log(res);
            const newUser = res._tokenResponse.isNewUser
            navigate( newUser ? '/onboarding' : '/' )
            setPopulateUser( newUser ? false : true )

            
        } catch ( error ) {
            return error
        }
    }

    const handleOnboarding = async () => {
        try {
            //COMPLETE ONBOARDING WITH USER DATA

            //CREATE USER IN DB

            setPopulateUser( true )
        } catch ( error ) {
            return error
        }
    }


    return {
        sendOtp,
        userLogin,
        handleOnboarding,
        // setOtp

    }

}

export default useAuth