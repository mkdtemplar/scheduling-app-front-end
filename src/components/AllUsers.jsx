import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }

        fetch(`/all-users`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
            })
            .catch(err => console.log(err));

    }, []);
    return (
        <div>
            <h2>Users</h2>
            <hr/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th> Current Position</th>
                    <th> Role</th>
                    <th>Shifts</th>
                </tr>
                </thead>
                <tbody>
                {users.map((m) => (
                    <tr key={m.id}>
                        <td>
                            <Link to={`/user/${m.id}`}>
                                {m.first_name}
                            </Link>
                        </td>

                        <td>
                            {m.last_name !== undefined ?

                                <tr>{m.last_name}</tr>

                                : <td></td>
                            }
                        </td>

                        <td>
                            {m.email !== undefined ?

                                <tr>{m.email}</tr>

                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.position_name !== undefined ?

                                <tr>{m.position_name}</tr>

                                : <td></td>
                            }
                        </td>
                        <td>
                            {m.role !== undefined ?
                                <tr>{m.role}</tr>
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

export default AllUsers;