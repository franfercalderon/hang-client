import { useEffect, useState } from "react";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import MainInput from "../MainInput/MainInput";
import Loader from "../Loader/Loader";

export default function OnboardingForm({ updateUserInfo, userData, handleChange, isLoading }){

    //STATE
    const [ enableSubmit, setEnableSubmit ] = useState( false )

     //EFFECTS
     useEffect(() => {
        if( userData.email !== '' && userData.name !== '' && userData.lastname !== '' ){
            setEnableSubmit( true )
        } else {
            setEnableSubmit( false )
        }
    }, [ userData ])

    return(
        <>
        {
            isLoading ?
            <Loader/>
            :
            <form>
                <MainInput name={ 'name' } value={ userData.name } handleChange={ handleChange } label={'First Name'}/>
                <MainInput name={ 'lastname' } value={ userData.lastname } handleChange={ handleChange } label={'Lastname'}/>
                <MainInput name={ 'email' } value={ userData.email } handleChange={ handleChange } label={'Email'}/>
                <BtnPrimary action={ ( e ) => updateUserInfo( e ) } displayText={ 'Continue' } submit={ true } enabled={ enableSubmit }/>
            </form>

        }
        </>
    )
}