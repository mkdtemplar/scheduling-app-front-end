import {useEffect, useState} from "react";
import {Link, useNavigate, useOutletContext} from "react-router-dom";

const EditPosition = () => {
    const [position, setPosition] = useState([]);
    const {jwtToken} = useOutletContext()
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login")
            return
        }
        const header = new Headers()
        header.append('Content-Type', 'application/json')
        header.append('Authorization', 'Bearer ' + jwtToken)

        const requestOptions = {
            method: "GET",
            headers: header,
        }

        fetch(`/admin/position/all-positions`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setPosition(data)
            })
            .catch(err => console.log(err));

    }, [jwtToken, navigate]);
    return (
        <div>
            <h2>Positions</h2>
            <hr/>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Position Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th> Current Position</th>
                    <th> Role</th>
                    <th>Shifts</th>
                </tr>
                </thead>
                <tbody>
                {position.map((m) => (
                    <tr key={m.id}>
                        <td>
                            <Link to={`/positions/${m.id}`}>
                                {m.position_name}
                            </Link>
                        </td>

                        <td>
                            {m.users !== null ?
                                m.users.map((user) => (
                                    user.first_name
                                ))
                                : null
                            }
                        </td>
                        <td>
                            {m.users.map((user) => (
                                user.last_name
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                user.email
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                user.current_position
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                user.role
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                user.shifts
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default EditPosition;