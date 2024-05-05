import {useEffect, useState} from "react";
import {Link, useNavigate, useOutletContext} from "react-router-dom";

const Positions = () => {
    const [position, setPosition] = useState([]);
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()

    useEffect(() => {
        if (jwtToken === "") {
            nav("/")
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

    }, [jwtToken, nav]);
    return (
        <div>
            <h2>Positions</h2>
            <hr/>
            <table className="table table-bordered table-hover">
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
                                        <tr>{user.first_name}</tr>
                                    ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.users.map((user) => (
                                <tr>{user.last_name}</tr>
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                <tr>{user.email}</tr>
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                <tr>{user.current_position}</tr>
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                <tr>{user.role}</tr>
                            ))}
                        </td>
                        <td>
                            {m.users.map((user) => (
                                <tr>{user.shifts}</tr>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Positions;