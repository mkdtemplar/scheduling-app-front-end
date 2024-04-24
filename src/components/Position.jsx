import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const Position = () => {
    const [position, setPosition] = useState({});
    let {id} = useParams();

    useEffect(() => {
        let myPosition =  {
                id: 1,
                positionName: "front entrance",
                employeeName: ["Person_1", "Person_2", "Person3"],
            }

        setPosition(myPosition)
    }, [id]);

    return (
        <>
            <div className="text-center">
                <h2>{position.positionName}</h2>
                <hr/>
                <em>
                    {position.employeeName}

                </em>
            </div>
        </>
    )
}

export default Position;