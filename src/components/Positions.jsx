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

        fetch(`http://localhost:8080/admin/position/all-positions`, requestOptions)
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
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Position Name</th>
                    <th>Employes</th>
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
                        {m.employees !== null ?
                            m.employees.flatMap(employee => (
                                    <tr key={employee.id}>{employee}</tr>
                                ))
                            : <td></td>
                        }
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Positions;