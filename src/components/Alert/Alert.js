import { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Alert({ title, text, icon, confirmBtn, showDenyBtn, denyBtn }) {

    useEffect(() => {
        Swal
            .fire({
                title: title,
                text: text,
                icon: icon,
                confirmButtonText: confirmBtn,
                showDenyButton: showDenyBtn,
                denyButtonText: denyBtn,
                buttonsStyling: false,
                customClass: {
                    popup: 'hang-alert-container',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
    }, [ title, text, icon, confirmBtn, showDenyBtn, denyBtn ] )
    return null 
    // return(
    //     Swal
    //         .fire({
    //             title: title,
    //             text: text,
    //             icon: icon,
    //             confirmButtonText: confirmBtn,
    //             showDenyButton: showDenyBtn,
    //             denyButtonText: denyBtn,
    //             buttonsStyling: false,
    //             customClass: {
    //                 popup: 'hang-alert-container',
    //                 icon: 'alert-icon',
    //                 confirmButton: 'confirm-btn btn order2',
    //                 denyButton: 'deny-btn btn order1',
    //             }
    //         })
    // )
}