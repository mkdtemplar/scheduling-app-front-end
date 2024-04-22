import Ticket from './../images/cover.png'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="text-center">
                <h2>Select schedule to view</h2>
                <hr/>
                <Link to="/schedules">
                <img src={Ticket} alt="cover"/>
                </Link>
            </div>
        </>
    )
}

export default Home;