import { Autocomplete } from '@react-google-maps/api'
import { useState, useRef, useEffect } from 'react'

export default function LocationInput({ handleChange, defaultValue }) {

    //STATE
    const [ inputValue, setInputValue ] = useState( '' )
    const [ dropdownVisible, setDropdownVisible ] = useState( false )
    
    //REFS
    const autocompleteRef = useRef( null )

    //FUNCTIONS
    const handlePlaceSelected = () => {
        const place = autocompleteRef.current.getPlace()
        if ( place ){
            // You can access place.place_id here if needed
            console.log('Place ID:', place.place_id)
            handleChange( place )
            setInputValue( place.formatted_address || '' )
            setDropdownVisible( false )
        }
    }

    const handleInputFocus = () => {
        if( inputValue.length > 0 ){
            setDropdownVisible( true )
        } 
    }

    const handleInputChange = ( e ) => {
        const value = e.target.value
        setInputValue( value )
        setDropdownVisible( value.length > 0 )
    }
    
    //EFFECTS
    useEffect(() => {
        if( inputValue === "" ){
            setDropdownVisible( false )
        }
    }, [ inputValue ])

    useEffect(() => {
        if ( defaultValue ) {
            setInputValue( defaultValue )
        }
    }, [ defaultValue ])
    
    
    return(
        <>
            <p>Location</p>
            <Autocomplete
                onLoad={( autocomplete ) => ( autocompleteRef.current = autocomplete )}
                onPlaceChanged={ handlePlaceSelected }
            >
                <input 
                    type="text" 
                    placeholder=''
                    autoComplete="off" 
                    value={ inputValue } 
                    className={`location-input ${ dropdownVisible ? 'active' : '' }`}
                    onFocus={ handleInputFocus }
                    id={ 'location-input' } 
                    name={ 'location-input' } 
                    onChange={ handleInputChange }
                />
            </Autocomplete>
        </>

    )
}
