import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState([]);
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

        fetch(`/user/${id}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
            })
            .catch(err => console.log(err));

    }, [jwtToken, id, nav]);
    return (
        <div>
            <h2>User</h2>
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

                    <tr key={users.id}>
                        <td>
                            {users.first_name}
                        </td>

                        <td>
                            {users.last_name !== undefined ?

                                <tr>{users.last_name}</tr>

                                : <td></td>
                            }
                        </td>

                        <td>
                            {users.email !== undefined ?

                                <tr>{users.email}</tr>

                                : <td></td>
                            }
                        </td>
                        <td>
                            {users.position_name !== undefined ?

                                <tr>{users.position_name}</tr>

                                : <td></td>
                            }
                        </td>
                        <td>
                            {users.role !== undefined ?
                                <tr>{users.role}</tr>
                                : <td></td>
                            }
                        </td>
                        <td>
                            {users.users !== undefined ?
                                users.users?.map((user) => (
                                    <tr>{user.shifts}</tr>
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

export default User;