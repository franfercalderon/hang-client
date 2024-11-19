import useAuth from "../hooks/useAuth"


export default function Feed () {

    const { signOutUser } = useAuth()

    return(
        <>
            <p>FEEF</p>
            <button onClick={signOutUser}>Sign Out</button>
        </>
    )
}