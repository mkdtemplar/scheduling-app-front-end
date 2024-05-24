import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Positions = () => {
    const [position, setPosition] = useState([]);

    useEffect(() => {

        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }

        fetch(`/positions`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setPosition(data)
            })
            .catch(err => console.log(err));

    }, []);
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
                                    <tr>{user.name}</tr>
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

export default Positions;