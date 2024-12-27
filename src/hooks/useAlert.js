import Swal from "sweetalert2"

function useAlert () {
    
    const alertInfo = ( text ) => {
        Swal.fire({
            html: text,
            icon: null,
            confirmButtonText: 'Ok',
            buttonsStyling: false,
            showConfirmButton: true,
            showCancelButton: false,
            customClass: {
                popup: 'hang-alert-container round-div div-shadow',
                icon: 'alert-icon',
                confirmButton: 'confirm-btn btn order2',
                denyButton: 'deny-btn btn order1',
            }
        })
    }

    return {
        alertInfo,
    
    }


}

export default useAlert