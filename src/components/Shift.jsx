import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";

const Shift = () => {
    const [shift, setShift] = useState([]);
    let {id} = useParams();
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()

    useEffect(() => {

        if (jwtToken === "") {
            nav("/login")
        }

        const header = new Headers()
        header.append('Content-Type', 'application/json')
        header.append("Authorization", "Bearer " + jwtToken);
        const requestOptions = {
            method: "GET",
            headers: header,
            credentials: "include"
        }

        fetch(`/get-shift/${id}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setShift(data)
            })
            .catch(err => console.log(err));

    }, [jwtToken, id, nav]);

    return (
        <div>
            <h2>Administrator</h2>
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

                <tr key={shift.id}>
                    <td>
                        {shift.name !== undefined ?

                            <tr>{shift.name}</tr>

                            : <td></td>
                        }
                    </td>
                    <td>
                        {shift.start_time !== undefined ?

                            <tr>{shift.start_time}</tr>

                            : <td></td>
                        }
                    </td>
                    <td>
                        {shift.end_time !== undefined ?

                            <tr>{shift.end_time}</tr>

                            : <td></td>
                        }
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Shift