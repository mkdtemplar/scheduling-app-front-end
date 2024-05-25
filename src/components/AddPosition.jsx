import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Select from "./form/Select";

const AddPosition = () => {

    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [posiition, setPosiition] = useState({
        id: "",
        position_name: ""
    });

    useEffect(() => {
        if (jwtToken === "") {
            nav("/login")
        }

        const header = new Headers()
        header.append('Content-Type', 'application/json')
        header.append("Authorization", "Bearer " + jwtToken);
    }, [jwtToken, nav]);

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setPosiition({
            ...posiition,
            [name]: value,
        })

    }

    const handleSubmitPosition = (event) => {
        event.preventDefault()

        let errors = []
        let required = [
            {field: posiition.id, name: "id"},
            {field: posiition.position_name, name: "position_name"},
        ]

        required.forEach(function (obj) {
            if (obj.field === "") {
                errors.push(obj.name);
            }
        })

        setErrors(errors);

        if (errors.length > 0) {
            return false;
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwtToken);

        let method = "PUT";
        let requestBody = posiition

        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }

        fetch(`/admin/add-position`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    nav("/positions");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <>
                <div>
                    <h2>Add Position</h2>
                    <hr/>
                    {/*<pre>{JSON.stringify(shift, null, 3)}</pre>*/}
                    {/*<hr/>*/}
                    {/*<pre>{JSON.stringify(positionIdForShift, null, 3)}</pre>*/}
                    <form onSubmit={handleSubmitPosition}>
                        <Input
                            title={"Position ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={posiition.id}
                            onChange={handleChange("id")}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />
                        <Input
                            title={"Position Name"}
                            className={"form-control"}
                            type="text"
                            name="position_name"
                            required={"position_name"}
                            value={posiition.position_name}
                            onChange={handleChange("position_name")}
                            errorDiv={hasError("position_name") ? "text-danger" : "d-none"}
                            errorMsg={"position_name is required"}
                        />
                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>

                </div>
            </>
        )
    }
}

export default AddPosition;