import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Select from "./form/Select";

const AddEmployee = () => {
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [user, setUser] = useState({
        id: "",
        name_surname: "",
        email: "",
        password: "",
        position_name: "",
        user_id: "",
    })

    const [positionForUser, setPositionForUser] = useState([])

    let positionOptions = []


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
        }

        fetch(`/position-for-user`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code: " + response.status)
                }
                return response.json();
            })
            .then((data) => {
                setPositionForUser(data)

                setUser({
                    id: "",
                    name_surname: "",
                    email: "",
                    password: "",
                    position_name: "",
                    user_id: "",
                })

            })
            .catch(err => console.log(err));

    }, [jwtToken, nav]);

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setUser({
            ...user,
            [name]: value,
        })

    }

    const handleSubmitUser = (event) => {
        event.preventDefault();

        let errors = []

        let required = [
            {field: user.id, name: "id"},
            {field: user.name_surname, name: "name_surname"},
            {field: user.email, name: "email"},
            {field: user.password, name: "password"},
            {field: user.position_name, name: "position_name"},
            {field: user.user_id, name: "user_id"},
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


        const requestBody = user;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }
        // requestBody.id = parseInt(user.id)
        // requestBody.position_id = parseInt(user.position_id)

        fetch(`/admin/add-user`, requestOptions)
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

    positionForUser.map((pos) =>  (
        positionOptions.push({id : pos.position_name, value: pos.position_name})
    ))

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <>
                <div>
                    <h2>Add Employee</h2>
                    <hr/>
                    <pre>{JSON.stringify(user, null, 3)}</pre>
                    <hr/>
                    <pre>{JSON.stringify(positionForUser, null, 3)}</pre>
                    <form onSubmit={handleSubmitUser}>
                        <Input
                            title={"Employee ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={user.id}
                            onChange={handleChange("id")}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />
                        <Input
                            title={"Name And Surname"}
                            className={"form-control"}
                            type="text"
                            name="name_surname"
                            required={"name_surname"}
                            value={user.name_surname}
                            onChange={handleChange("name_surname")}
                            errorDiv={hasError("name_surname") ? "text-danger" : "d-none"}
                            errorMsg={"First Name is required"}
                        />
                        <Input
                            title={"Email"}
                            className={"form-control"}
                            type="email"
                            name="email"
                            required={"email"}
                            value={user.email}
                            onChange={handleChange("email")}
                            errorDiv={hasError("email") ? "text-danger" : "d-none"}
                            errorMsg={"email is required"}
                        />
                        <Input
                            title={"Password"}
                            className={"form-control"}
                            type="password"
                            name="password"
                            required={"password"}
                            value={user.password}
                            onChange={handleChange("password")}
                            errorDiv={hasError("password") ? "text-danger" : "d-none"}
                            errorMsg={"password is required"}
                        />
                        <Select
                            title={"Position"}
                            name={"position_name"}
                            options={positionOptions}
                            value={positionForUser.position_name}
                            onChange={handleChange("position_name")}
                            placeHolder={"Choose..."}
                            errorMsg={"Please choose position for user"}
                            errorDiv={hasError("position_name") ? "text-danger" : "d-none"}
                        />

                        <Input
                            title={"Position ID"}
                            className={"form-control"}
                            type="number"
                            name="user_id"
                            required={"user_id"}
                            value={positionForUser.id}
                            placeholder={positionForUser.id}
                            onChange={handleChange("user_id")}
                            errorDiv={hasError("position_id") ? "text-danger" : "d-none"}
                            errorMsg={"user_id is required"}
                        />

                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>

                </div>
            </>
        )
    }
}

export default AddEmployee;