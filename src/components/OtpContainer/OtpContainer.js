import { useRef } from "react";

const OTPInput = ( { otp, setOtp } ) => {

    const inputRefs = useRef( [] )

    const handleChange = ( e, index ) => {
        const value = e.target.value;

        if (/^\d?$/.test( value )) { 
            const newOtp = [ ...otp ]
            newOtp[ index ] = value
            setOtp( newOtp )

            if (value && index < 5) {
                inputRefs.current[ index + 1 ].focus()
            }
        }
    }

    const handleKeyDown = ( e, index ) => {
        if ( e.key === "Backspace" && !otp[index] && index > 0 ) {
            inputRefs.current[ index - 1 ].focus();
        }
    };

    const handlePaste = ( e ) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData( "text" ).slice( 0, 6 ).replace( /\D/g, "" )
        const newOtp = [ ...otp ]
        for ( let i = 0; i < pastedData.length; i++ ) {
            newOtp[ i ] = pastedData[ i ]
            if ( i < 5 ) inputRefs.current[ i + 1 ].focus()
        }
        setOtp( newOtp )
    };

  return (
    <div className="otp-container">
        { otp.map(( value, index ) => (
            <input
                key={ index }
                ref={( el ) => ( inputRefs.current[ index ] = el )} 
                type="text"
                maxLength="1"
                value={ value }
                onChange={( e ) => handleChange( e, index )}
                onKeyDown={( e ) => handleKeyDown( e, index )}
                onPaste={ handlePaste }
            />
        ))}
    </div>
  )
}

export default OTPInput
