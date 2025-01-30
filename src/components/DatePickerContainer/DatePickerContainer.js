import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerContainer({ selectedDate , setSelectedDate }){

    return(
        <div className='mt-1'>
            <label htmlFor={ 'datepicker' }>{ 'Date' }</label>
            <DatePicker 
                selected={selectedDate} 
                onChange={(date) => setSelectedDate(date)} 
                name={'datepicker'} 
                className="main-input datepicker pointer" 
                dateFormat={"MMMM do, yyyy"}
                customInput={<div className="custom-datepicker">{ selectedDate ? selectedDate.toLocaleDateString() : ""}</div>}
            />
            {/* <DatePicker selected={ selectedDate } readOnly={ true } onChange={ ( date ) => setSelectedDate( date ) } name={'datepicker'} className="main-input datepicker pointer" dateFormat={"MMMM do, yyyy"}/> */}
        </div> 
    )
}