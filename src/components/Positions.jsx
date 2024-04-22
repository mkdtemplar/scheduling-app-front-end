import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Positions = () => {
    const [position, setPosition] = useState([]);

    useEffect(() => {
        let positionsListList = [
            {
                id: 1,
                positionName: "front entrance",
                employeeName: ["Person_1", "Person_2", "Person3"],
            },
            {
                id: 2,
                positionName: "vip entrance",
                employeeName: ["Person_4", "Person_5", "Person6"],
            },
            {
                id: 3,
                positionName: "warehouse entrance",
                employeeName: ["Person_7", "Person_8", "Person_9"],
            },
        ];
        setPosition(positionsListList);

    }, []);
    return (
            <div>
                <h2>Positions</h2>
                <hr/>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                    {position.map((p) => (
                        <tr key={p.id}>
                            <td>
                                <Link to={`/positions/${p.id}`}>{p.positionName}</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    )
}

export default Positions;