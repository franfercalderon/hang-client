import {  getAuth, signOut } from 'firebase/auth'
import { app } from "../fb"
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUsers from './useUsers'
import { AppContext } from '../context/AppContext'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

function useAuth () {

    //STATE
    const [ confirmObject, setConfirmObject ] = useState('')

    //CONTEXT
    const { setPopulateUser, globalUser } = useContext( AppContext )

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
            if( newUser ){
                await createUser( res )
                navigate('/onboarding')
                
            } else {
                setPopulateUser( true )
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

    const createInviteLink = () => {
        if( globalUser ){
            const inviteUrl = `${process.env.REACT_APP_BASE_URL}/invite/${ globalUser.id }`
            return inviteUrl
        }
    }

    return {
        userLogin,
        signOutUser,
        setConfirmObject,
        createInviteLink
    }
}

export default useAuth