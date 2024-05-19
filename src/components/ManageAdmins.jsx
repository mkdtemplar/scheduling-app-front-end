import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ManageAdmins = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {

        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }

        fetch(`/all-admins`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data)
            })
            .catch(err => console.log(err));

    }, []);
    return (
        <div>
            <h2>Administrators</h2>
            <hr/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {admins.map((m) => (
                    <tr key={m.id}>
                        <td>
                            <Link to={`/admin/edit-admin/${m.id}`}>
                                {m.user_name}
                            </Link>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageAdmins;