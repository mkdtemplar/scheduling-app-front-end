import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";

const AddAdmin = () => {
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [admin, setAdmin] = useState({
        id: "",
        user_name: "",
        password: "",
    })

    useEffect(() => {
        if (jwtToken === "") {
            nav("/login")
        }

        const header = new Headers()
        header.append('Content-Type', 'application/json')
        header.append("Authorization", "Bearer " + jwtToken);

        setAdmin({
            id: "",
            user_name: "",
            password: "",
        })
    },[jwtToken, nav])

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setAdmin({
            ...admin,
            [name]: value,
        })

    }

    const handleSubmitAdmin = (event) => {
        event.preventDefault();
        let errors = []

        let required = [
            {field: admin.id, name: "id"},
            {field:admin.user_name, name: "user_name"},
            {field: admin.password, name: "password"},
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


        const requestBody = admin;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }

        requestBody.id = parseInt(admin.id)

        fetch(`/admin/create-admin`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    nav("/all-employees");
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
                    <h2>Create Admin</h2>
                    <hr/>
                    <pre>{JSON.stringify(admin, null, 3)}</pre>
                    <form onSubmit={handleSubmitAdmin}>
                        <Input
                            title={"Admin ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={admin.id}
                            onChange={handleChange("id")}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />

                        <Input
                            title={"Username"}
                            className={"form-control"}
                            type="email"
                            name="user_name"
                            required={"user_name"}
                            value={admin.user_name}
                            onChange={handleChange("user_name")}
                            errorDiv={hasError("user_name") ? "text-danger" : "d-none"}
                            errorMsg={"Username is required"}
                        />

                        <Input
                            title={"Password"}
                            className={"form-control"}
                            type="password"
                            name="password"
                            required={"password"}
                            value={admin.password}
                            onChange={handleChange("password")}
                            errorDiv={hasError("password") ? "text-danger" : "d-none"}
                            errorMsg={"password is required"}
                        />
                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>
                </div>
            </>
        )
    }
}

export default AddAdmin