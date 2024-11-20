export default function MainInput({ handleChange, value, name, placeholder, label }) {
    return(
        <>
            <label htmlFor={ name }>{ label }</label>
            <input type="text" className="main-input" value={ value } id={ name } name={ name } onChange={ ( e ) => handleChange( e ) } placeholder={ placeholder }/>
        </>
    )
}