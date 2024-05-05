import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Select from "./form/Select";

const EditPosition = () => {
    const navigate = useNavigate();
    const { jwtToken} = useOutletContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [position, setPosition] = useState({
        id: "",
        position_name: "",
        users: [],
        shifts: [],
    });

    const users = [
        {id: "1", value: "Thor Thunderbolt"},
        {id: "2", value: "Admin Administrator"},
    ]

    let {id} = useParams();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login")

        }
    }, [jwtToken, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setPosition({
            ...position,
            [name]: value,
        })

    }

    return (
        <div>
            <h2>Add/Edit Position</h2>
            <hr/>
            <pre>{JSON.stringify(position, null, 3)}</pre>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" id="id" value={position.id}/>
                <Input
                    title={"Position Name"}
                    className={"form-control"}
                    type="text"
                    name="position_name"
                    value={position.position_name}
                    onChange={handleChange("position_name")}
                    errorDiv = {hasError("position_name") ? "alert alert-danger" : "d-none"}
                    errorMsg={"Position Name is required"}
                />
                <Select
                    title={"users"}
                    name={"users"}
                    options={users}
                    onChange={handleChange("users")}
                    placeholder={"Choose employees"}
                    errorMsg={"Employees is required"}
                    errorDiv={hasError("employees") ? "alert alert-danger" : "d-none"}
                />

            </form>
        </div>
    )
}

export default EditPosition;