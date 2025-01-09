export default function MainInput({ handleChange, value, name, placeholder, label, optional }) {
    return(
        <>
            <label htmlFor={ name }>{ label }{ optional && <span>{` (optional)`}</span>}</label>
            <input type="text" className="main-input" autoComplete="off" value={ value } id={ name } name={ name } onChange={ ( e ) => handleChange( e ) } placeholder={ placeholder }/>
        </>
    )
}