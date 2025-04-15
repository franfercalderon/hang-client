import TopBarNav from "../components/TopBarNav/TopBarNav";
import ManageFriendsContainer from "../components/ManageFriendsContainer/ManageFriendsContainer";
import { useCallback, useContext, useEffect, useState } from "react";
import useFriends from "../hooks/useFriends";
import Loader from "../components/Loader/Loader";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import useUsers from "../hooks/useUsers";
import ViewContainer from "../components/ViewContainer/ViewContainer";

export default function SettingsFriendsManage(){

    //STATE
    const [ userFriends, setUserFriends ] = useState( null )
    const [ isLoading, setIsLoading ] = useState( true )

    //CONTEXT
    const { mergeArraysById, getGlobalUser, globalUser, authToken} = useContext( AppContext )

    //HOOK
    const { getUserFriends } = useFriends()
    const { updateUserProperties } = useUsers()

    //FUNCTIONS
    const getFriends = useCallback( async () => {

        const res = await getUserFriends()
        const displayFriends = mergeArraysById( res, globalUser.friends )
        displayFriends.sort(( a, b ) => a.priority - b.priority )
        setUserFriends( displayFriends )

    }, [ mergeArraysById, getUserFriends, globalUser ] )

    const handleSave = async () => {
        try {
            setIsLoading( true )
            const data = {
                friends : userFriends
            }
            await updateUserProperties( data )
            await getGlobalUser()
            setIsLoading( false )

        } catch ( error ) {
            setIsLoading( false )
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                    popup: 'hang-alert-container round-div div-shadow',
                    icon: 'alert-icon',
                    confirmButton: 'confirm-btn btn order2',
                    denyButton: 'deny-btn btn order1',
                }
            })
        }
    }

    // EFFECTS
    useEffect(() => {

        if( globalUser && authToken ){
            getFriends()
        }
    }, [ getFriends, globalUser, authToken ] )

    useEffect(() => {
        setIsLoading( userFriends ? false : true )
    }, [ userFriends ])

    // const fakeFriends = [
    //     {
    //         name: "Franco",
    //         lastname: "Calderon",
    //         id: "FhxKp5K7sDNwVNJ7YYYIanivV1i2",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FIMG_9131.JPG5e53f5df-8233-43ba-859f-29e8e2301066?alt=media&token=8fc88f46-c74e-4e61-96b1-a6cb5670d0ad",
    //         priority: 1
    //     },
    //     {
    //         name: "Sarah",
    //         lastname: "Trosman",
    //         id: "fDuYptOqT1Pwh15D1seia5IyF3K3",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Ffemale1.pnge4601148-be0f-42c2-af96-3abbbfeb8039?alt=media&token=3cb6562c-0782-4de7-9a63-8c7b1abd9fa2",
    //         priority: 2
    //     },
    //     {
    //         name: "Darby III",
    //         lastname: "Rollins III",
    //         id: "V20Lf5TIOrN0LVRLkzUBPQVmXnM2",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FIMG_7100.jpeg2eca3869-3b9e-4353-9a59-c07925777611?alt=media&token=a5f2dd93-709f-43cf-a7c1-ae4c0d89b38b",
    //         priority: 3
    //     },
    //     {
    //         name: "Derrick",
    //         lastname: "Smith",
    //         id: "odAyzc7EJkUzmAzhMI95IBLfsOH2",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale1.png6433d34e-1953-4d7b-af83-0500060861fc?alt=media&token=74c14b4e-27db-4b4a-87fa-77bf01fb5f47",
    //         priority: 4
    //     },
    //     {
    //         name: "test",
    //         lastname: "test",
    //         id: "2qxUXylNRtbMf9FbcbMbYZMIKRA3",
    //         imgUrl: null,
    //         priority: 5
    //     },
    //     {
    //         name: "Loreen",
    //         lastname: "Dallas",
    //         id: "iuYmKKbSqMfWlARqIt4y2oTHytr1",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.55.29%E2%80%AFPM.pnga29486b2-7843-4501-a61f-97d2b50ac146?alt=media&token=f7ca5960-ad73-4e50-b2ba-67edf0f0d6bd",
    //         priority: 6
    //     },
    //     {
    //         name: "Harry",
    //         lastname: "Lutz",
    //         id: "0qUiTF0LIzWU11MqpivMs7H80Ag2",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2FScreenshot%202024-12-13%20at%203.56.53%E2%80%AFPM.png1b52c214-724f-4f5c-8625-564c74c00270?alt=media&token=01aff316-a1f6-4fd0-90cf-25c40fd55028",
    //         priority: 7
    //     },
    //     {
    //         name: "Franco",
    //         lastname: "Franco",
    //         id: "ixp8bkFbaqOOixYStRthmYnSwSD2",
    //         imgUrl: "https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/images%2FprofilePictures%2Fmale2.pnga5f23bb1-a0b7-480e-b76c-04acc1de5b1b?alt=media&token=39170ae3-e695-4289-a081-2a1ab2a199ee",
    //         priority: 8
    //     },
    //     {
    //         name: "feder",
    //         lastname: "test",
    //         id: "WDgw9EU8xCU89kQSdBYtZxW4mz82",
    //         imgUrl: null,
    //         priority: 9
    //     }
    // ]

    return(
        <ViewContainer className="friends">
            <TopBarNav navigation={'settings/friends'} title={'My Friends'} />
            <div className="main-view-body">
                {
                    ! userFriends ?
                    <Loader/>
                    :
                    <ManageFriendsContainer userFriends={ userFriends } isLoading={ isLoading } handleSave={ handleSave } setUserFriends={ setUserFriends } setIsLoading={ setIsLoading } getFriends={ getFriends }/>
                }
            </div>
        </ViewContainer>
    )
}



