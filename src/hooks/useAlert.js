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

    const handleInviteResponse = ( invite ) => {
        Swal.fire({
            title: null,
            text: `Do you want to accept ${ invite.user } invite? If you do, you will become friends in Hang.`,
            icon: "question",
            confirmButtonText: 'Accept',
            showDenyButton: true,
            denyButtonText: 'Reject',
            buttonsStyling: false,
            customClass: {
                popup: 'hang-alert-container round-div div-shadow',
                icon: 'alert-icon',
                confirmButton: 'confirm-btn btn order2',
                denyButton: 'deny-btn btn order1',
            }
        })
        .then( ( res ) => {
            if( res.isConfirmed ){
                //CONFIRM INVITE AND ADD BOTH AS FRIENDS
            } 
        })
    }

    return {
        alertInfo,
        handleInviteResponse
    }

}

export default useAlert