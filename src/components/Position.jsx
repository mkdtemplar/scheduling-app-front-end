import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const Position = () => {
    const [position, setPosition] = useState([]);
    let {id} = useParams();

    useEffect(() => {

        const header = new Headers()
        header.append('Content-Type', 'application/json')

        const requestOptions = {
            method: "GET",
            headers: header,
        }
        fetch(`/position/${id}`, requestOptions)
        .then((res) => res.json())
            .then((data) => {
                setPosition(data);
            })
            .catch(err => console.log(err));

    }, [id]);

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
                    <th>Name/Surname</th>
                    <th>Email</th>
                    <th>Shifts</th>
                </tr>
                </thead>
                <tbody>

                <tr key={position.id}>
                    <td>
                        {position.position_name}
                    </td>

                    <td>
                        {position.users !== undefined ?
                            position.users?.map((user) => (
                                <tr>{user.name_surname}</tr>
                            ))
                            : <td></td>
                        }
                    </td>

                    <td>
                        {position.users !== undefined ?
                            position.users?.map((user) => (
                                <tr>{user.email}</tr>
                            ))
                            : <td></td>
                        }
                    </td>
                    <td>
                        {position.shifts !== undefined ?
                            position.shifts?.map((user) => (
                                <tr>{user.name}</tr>
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

export default Position;