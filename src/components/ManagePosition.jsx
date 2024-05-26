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

    return (
        <div>
            <h2>Positions</h2>
            <hr/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Position Name</th>
                    <th>Name/Surname</th>
                    <th>Email</th>
                    <th>Shifts/Coverage</th>
                </tr>
                </thead>
                <tbody>
                {position.map((m) => (
                    <tr key={m.id}>
                        <td>
                            <Link to={`/admin/positions/${m.id}`}>
                                {m.position_name}
                            </Link>
                        </td>

                        <td>
                            {m.users !== undefined ?
                                m.users?.map((user) => (
                                    <tr>{user.name_surname}</tr>
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
                            {m.shifts !== undefined ?
                                m.shifts?.map((user) => (
                                    <tr>{user.name + " : " + user.start_time + " - " + user.end_time}</tr>
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