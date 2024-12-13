export default function CopiedCard({ active }){
    return(
        <div className={`copied-message-card ${ active ? 'show' : '' }`}>Copied!</div>
    )
}