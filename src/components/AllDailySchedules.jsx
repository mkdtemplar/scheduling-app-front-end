import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const AllDailySchedules = () => {
    const [allDailySchedules, setAllDailySchedules] = useState([]);

    useEffect(() => {
        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }

        fetch(`/all-daily-schedules`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setAllDailySchedules(data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Positions</h2>
            <hr/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Positions</th>
                    <th>Employees</th>
                    <th>Shifts/Coverage</th>
                </tr>
                </thead>
                <tbody>
                {allDailySchedules.map((m) => (
                    <tr key={m.id}>
                        <td>
                            <Link to={`/admin/daily-schedule/${m.id}`}>
                                {m.start_date}
                            </Link>
                        </td>

                        <td>
                            {m.positions_names !== undefined ?
                                m.positions_names?.map((posName) => (
                                    <tr>{posName}</tr>
                                ))
                                : <td></td>
                            }
                        </td>

                        <td>
                            {m.employees !== undefined ?
                                m.employees?.map((user) => (
                                    <tr>{user}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.shifts !== undefined ?
                                m.shifts?.map((shift) => (
                                    <tr>{shift}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllDailySchedules;