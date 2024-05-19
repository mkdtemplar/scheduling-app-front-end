import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";

const Admin = () => {
    const [admin, setAdmin] = useState([]);
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

        fetch(`/get-admin/${id}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setAdmin(data)
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
                    <th>Username</th>

                </tr>
                </thead>
                <tbody>

                <tr key={admin.id}>
                    <td>
                        {admin.user_name !== undefined ?

                            <tr>{admin.user_name}</tr>

                            : <td></td>
                        }
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Admin;