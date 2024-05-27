const Schedules = () => {
    let start = new Date("04/01/2024");
    let end = new Date("04/23/2024");
    let s =  new Date("04/01/2024");
    const dayNames = [];
    let days = []

    while(start <= end){

        let mm = ((start.getMonth() + 1) >= 10) ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1);
        let dd = ((start.getDate()) >= 10) ? (start.getDate()) : '0' + (start.getDate());
        let yyyy = start.getFullYear();
        let date = mm+"/"+dd+"/"+yyyy; //yyyy-mm-dd
        let newDate = new Date(date).toLocaleDateString("en-US", {"weekday": "short"});
        let shiftDays = dd + "/" + mm



        start = new Date(start.setDate(start.getDate() + 1)); //date increase by 1
        days.push(shiftDays);
        dayNames.push(newDate)
    }

    return (
            <div className="text-center">
                <h2>Schedules</h2>
                <hr/>
                <div className="text-center">
                    <h2>Schedule from {s.toLocaleDateString("en-US")} until {end.toLocaleDateString("en-US")}</h2>
                </div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>

                        </tr>
                        <tr>
                            <th scope="col">Position</th>
                            <th scope="col">Name</th>

                            {days.map(day => <th scope="col">{day}</th>)}
                        </tr>
                        <tr>
                            <th scope="row" className="table-success"></th>
                            <th scope="row" className="table-success"></th>
                            {dayNames.map(day => <th>{day}</th>)}
                        </tr>
                        <tr>
                            <td>Front Entrance</td>
                            <td>Person Name</td>
                            {/*<td className="text-center">D</td>*/}
                            {dayNames.map(day => day === "Sat" || day === "Sun" ? <td scope="row">{""}</td> :
                                <td scope="row">{"D"}</td>)}
                            {/*<td className="text-center">E</td>*/}
                        </tr>
                    </thead>
                </table>
            </div>
    )
}

export default Schedules;