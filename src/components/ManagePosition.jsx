import {useEffect, useState} from "react";
import {Link, useNavigate, useOutletContext} from "react-router-dom";

const ManagePosition = () => {
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
            credentials: 'include',
        }

        fetch(`/positions`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setPosition(data)
            })
            .catch(err => console.log(err));

    }, [jwtToken, navigate]);

    if (position.users) {
        position.users = Object.values(position.users);
    } else {
        position.users = [];
    }

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
                            <Link to={`/position/${m.id}`}>
                                {m.position_name}
                            </Link>
                        </td>

                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.first_name}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.last_name}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.email}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.current_position}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.role}</tr>
                                ))
                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.shifts}</tr>
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

export default ManagePosition;