import {useNavigate, useOutletContext} from "react-router-dom";
import {useState} from "react";

const EditPosition = () => {
    const navigate = useNavigate();
    const { jwtToken} = useOutletContext();

    const [error, setError] = useState(null);

    return (
        <div>
            <h2>Edit Position</h2>
            <hr/>
        </div>
    )
}

export default EditPosition;