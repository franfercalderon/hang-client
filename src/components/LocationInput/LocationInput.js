import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api'
import { useState, useRef, useEffect } from 'react'
const loadLibraries = [ 'places' ]

export default function LocationInput({ handleChange }) {

    //STATE
    const [ inputValue, setInputValue ] = useState( '' )
    const [ dropdownVisible, setDropdownVisible ] = useState( false )
    const [ isLoaded, setIsLoaded ] = useState( false )
    
    //REFS
    const autocompleteRef = useRef( null )

    // //VARIABLES
    // console.log(process.env.REACT_APP_MAPS_LOAD_LIBRARIES);

    //FUNCTIONS
    const handlePlaceSelected = () => {
        const place = autocompleteRef.current.getPlace()
        if ( place ){
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
    
    
    return(
        // <>
        //     <p>Location</p>
        //     <LoadScript
        //         googleMapsApiKey={ process.env.REACT_APP_MAPS_API_KEY }
        //         libraries={  loadLibraries }
        //         onLoad={() => setIsLoaded(true)}

        //     >   
        //     {
        //         isLoaded &&
        //         <Autocomplete
        //             onLoad={( autocomplete ) => ( autocompleteRef.current = autocomplete )}
        //             onPlaceChanged={ handlePlaceSelected }
        //         >
        //             <input 
        //                 type="text" 
        //                 placeholder=''
        //                 autoComplete="off" 
        //                 value={ inputValue } 
        //                 className={`location-input ${ dropdownVisible ? 'active' : '' }`}
        //                 onFocus={ handleInputFocus }
        //                 id={ 'location-input' } 
        //                 name={ 'location-input' } 
        //                 onChange={ handleInputChange }
        //             />
        //         </Autocomplete>
        //     }
        //     </LoadScript>
        // </>
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
