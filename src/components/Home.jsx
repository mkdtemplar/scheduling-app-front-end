import Ticket from './../images/cover.png'

const Home = () => {
    return (
        <>
            <div className="text-center">
                <h2>Wellcome to Scheduling Appication</h2>
                <hr/>
                <img src={Ticket} alt="cover"/>
            </div>
        </>
    )
}

export default Home;