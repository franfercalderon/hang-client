import FeedCard from "../components/FeedCard/FeedCard";
import TopBarNav from "../components/TopBarNav/TopBarNav";

export default function Create (){
    return(
        <div className="view-container">
            <TopBarNav navigation={''} title={ 'New' }/>
            <div className="main-view-body">
                <div className="section-container">
                   <FeedCard title={'Available Now'} descritpion={'Let your friends know your are free'}/>
                   <FeedCard title={'Create a Hang'} descritpion={'Schedule for later'}/>
                </div>
            </div>
        </div>
    )
}