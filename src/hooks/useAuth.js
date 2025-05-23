import {  getAuth, signOut } from 'firebase/auth'
import { app } from "../fb"
import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUsers from './useUsers'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import useLogs from './useLogs'

function useAuth () {

    //STATE
    const [ confirmObject, setConfirmObject ] = useState('')

    //CONTEXT
    const { setPopulateUser, globalUser, authToken, setPendingInvitation } = useContext( AppContext )

    //HOOKS 
    const { createUser } = useUsers()
    const { postLog } = useLogs()

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
            await postLog( 'useAuth', 'checkOtp', error.message )
            throw new Error ( error )
        }
    }

    const userLogin = async ( otp ) => {

        try {
            const formattedOtp = otp.join('')
            const res = await checkOtp( formattedOtp )
            const newUser = res._tokenResponse.isNewUser
            if( newUser ){
                await createUser( res )
                //DELETE INVITE ID
                setPendingInvitation( null )
                navigate('/onboarding')
                
            } else {
                setPopulateUser( true )
                navigate( '/' )
            }
            
        } catch ( error ) {
            await postLog( 'useAuth', 'userLogin', error.message )
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
            
            const userName = globalUser.name && globalUser.lastname ? `${ globalUser.name } ${ globalUser.lastname }`: 'Your friend'
            const inviteUrl = `${process.env.REACT_APP_BASE_URL}/invite/${ globalUser.id }?name=${ encodeURIComponent( userName )}`
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
            await postLog( 'useAuth', 'getMasterToken', error.message )
            throw error
        }    
    }, [ authToken, postLog ])

    return {
        userLogin,
        signOutUser,
        setConfirmObject,
        createInviteLink,
        getMasterToken
    }
}

export default useAuth