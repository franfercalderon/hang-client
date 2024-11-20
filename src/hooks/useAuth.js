import { RecaptchaVerifier, signInWithPhoneNumber, getAuth, signOut } from 'firebase/auth'
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

    //RECAPTCHA VERIFIER
    // let recaptchaVerifier

    //FUNCTIONS
    // const setUpRecaptcha = async ( phoneNumber ) => {

    //     window.recaptchaVerifier = new RecaptchaVerifier( auth, 'recaptcha-container', {} );


    //     // if( recaptchaVerifier ){
    //     //     recaptchaVerifier.clear()
    //     // }
    //     // recaptchaVerifier = new RecaptchaVerifier( auth, 'recaptcha-container', {} )
    //     // await recaptchaVerifier.render()
    //     return signInWithPhoneNumber( auth, phoneNumber, recaptchaVerifier )
    // }

    const sendOtp = async ( phoneNumber, appVerifier ) => {
        try {
            // const res = await setUpRecaptcha( phoneNumber )
            // setConfirmObject( res );
            // const appVerifier = window.recaptchaVerifier
            const res = await signInWithPhoneNumber( auth, phoneNumber, appVerifier )
            console.log(res);
            setConfirmObject( res )
            
             
        } catch ( error ) {
            throw new Error ( error )
        }
    }

    const checkOtp = async ( otp ) => {
        try {
            const res = await confirmObject.confirm( otp )
            return res
        } catch ( error ) {
            throw new Error ( error )
        }
    }

    const userLogin = async ( otp, phoneNumber ) => {

        try {
            // const res = await signInWithPhoneNumber( auth, phoneNumber, recaptchaVerifier )
            const formattedOtp = otp.join('')
            const res = await checkOtp( formattedOtp )
            const newUser = res._tokenResponse.isNewUser
            navigate( newUser ? '/onboarding' : '/' )
            setPopulateUser( newUser ? false : true )
            
        } catch ( error ) {
            throw new Error ( error )
        }
    }

    const handleOnboarding = async () => {
        try {
            //COMPLETE ONBOARDING WITH USER DATA

            //CREATE USER IN DB

            setPopulateUser( true )
        } catch ( error ) {
            throw new Error ( error )
        }
    }

    const signOutUser = async () => {
        try {
            await signOut( auth )
        } catch ( error ) {
            throw new Error ( error )
        }
    }


    return {
        sendOtp,
        userLogin,
        handleOnboarding,
        signOutUser,
        RecaptchaVerifier,
        auth
        // setOtp

    }

}

export default useAuth