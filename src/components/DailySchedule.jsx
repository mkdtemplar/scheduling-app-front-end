import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const DailySchedule = () => {
    let {id} = useParams();
    const [dailySchedule, setDailySchedule] = useState([]);
    useEffect(() => {
        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }
        fetch(`/daily-schedule/${id}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setDailySchedule(data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div>
            <h2>Daily Schedule</h2>
            <hr/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Positions</th>
                    <th>Employees</th>
                    <th>Shifts</th>
                </tr>
                </thead>
                <tbody>

                <tr key={dailySchedule.id}>
                    <td>
                        {dailySchedule.start_date}
                    </td>

                    <td>
                        {dailySchedule.positions_names !== undefined ?
                            dailySchedule.positions_names?.map((pos_name) => (
                                <tr>{pos_name}</tr>
                            ))
                            : <td></td>
                        }
                    </td>

                    <td>
                        {dailySchedule.employees !== undefined ?
                            dailySchedule.employees?.map((employee) => (
                                <tr>{employee}</tr>
                            ))
                            : <td></td>
                        }
                    </td>
                    <td>
                        {dailySchedule.shifts !== undefined ?
                            dailySchedule.shifts?.map((shift) => (
                                <tr>{shift}</tr>
                            ))
                            : <td></td>
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DailySchedule;