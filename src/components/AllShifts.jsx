import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const AllShifts = () => {
    const [shifts, setShifts] = useState([]);

    useEffect(() => {

        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }

        fetch(`/all-shifts`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setShifts(data)
            })
            .catch(err => console.log(err));

    }, []);
    return (
        <div>
            <h2>Shifts</h2>
            <hr/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Shift Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
                </thead>
                <tbody>
                {shifts.map((m) => (
                    <tr key={m.id}>
                        <td>
                            <Link to={`/shift/${m.id}`}>
                                {m.name}
                            </Link>
                        </td>
                        <td>
                            {m.start_time !== undefined ?

                                <tr>{m.start_time}</tr>

                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.end_time !== undefined ?

                                <tr>{m.end_time}</tr>

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

export default AllShifts;