import {  getAuth, signOut } from 'firebase/auth'
import { app } from "../fb"
import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUsers from './useUsers'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

function useAuth () {

    //STATE
    const [ confirmObject, setConfirmObject ] = useState('')

    //CONTEXT
    const { setPopulateUser, globalUser, authToken } = useContext( AppContext )

    //HOOKS 
    const { createUser } = useUsers()

    //FIREBASE
    const auth = getAuth( app )

    //ROUTER
    const navigate = useNavigate()

    //FUNCTIONS
    const checkOtp = async ( otp ) => {
        try {
            const res = await confirmObject.confirm( otp )
            return res
        } catch ( error ) {
            throw new Error ( error )
        }
    }

    const userLogin = async ( otp ) => {

        try {
            const formattedOtp = otp.join('')
            const res = await checkOtp( formattedOtp )
            const newUser = res._tokenResponse.isNewUser
            console.log(res._tokenResponse);
            if( newUser ){
                console.log('va a ir a createUser');
                await createUser( res )
                console.log('va a ir a navigate /onboarding');
                navigate('/onboarding')
                
            } else {
                console.log('va a ir a setPopulateUser');
                setPopulateUser( true )
                console.log('va a ir a navigate /');
                navigate( '/' )
            }
            
        } catch ( error ) {
            throw error
        }
    }

    const signOutUser = async () => {
        try {
            await signOut( auth )
        } catch ( error ) {
            throw new Error ( error )
        }
    }

    const createInviteLink = useCallback (() => {
        if( globalUser ){
            const inviteUrl = `${process.env.REACT_APP_BASE_URL}/invite/${ globalUser.id }`
            return inviteUrl
        }
    }, [ globalUser ] )

    const getMasterToken = useCallback( async () => {
        try{
            //GETS FIXED SLOTS   
            const masterToken = await axios.get(`${process.env.REACT_APP_API_URL}/admin/masterToken`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`
                }
            })  
            return masterToken.data

        } catch ( error ) {
            throw error
        }    
    }, [ authToken ])

    return {
        userLogin,
        signOutUser,
        setConfirmObject,
        createInviteLink,
        getMasterToken
    }
}

export default useAuth