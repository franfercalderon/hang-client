import { useContext, useState } from "react";
import BtnPrimary from "../components/BtnPrimary/BtnPrimary";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import MainInput from "../components/MainInput/MainInput";


export default function Master () {

    //STATE
    const [ value, setValue ] = useState('')

    //ROUTER
    const navigate = useNavigate()

    //CONTEXT
    const { setMasterToken } = useContext( AppContext )

    //FUNCTION
    const handleChange = ( e ) => {
        const { value } = e.target
        setValue( value )
    }

    const submitCode = ( e ) => {
        e.preventDefault()
        setMasterToken( value )
        navigate('/login')
    }



    return(
        <div className="view-container ">
            <div className="section-container">
                <MainInput name={ 'tokenValue' } value={ value } handleChange={ handleChange } label={'Enter Master Token'}/>
                <BtnPrimary action={ ( e ) => submitCode( e ) } displayText={ 'Submit' } submit={ true } enabled={ value.length === 6 ? true : false  }/>
            </div>
        </div>
    )
}