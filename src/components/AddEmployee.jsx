import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";

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
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        current_position: "",
        role: "",
        position_id: "",
        shifts: []
    })


    useEffect(() => {
        if (jwtToken === "") {
            nav("/login")
        }

        const header = new Headers()
        header.append('Content-Type', 'application/json')
        header.append("Authorization", "Bearer " + jwtToken);

        const requestOptions = {
            method: "PUT",
            headers: header,
            // credentials: 'include',
        }

        fetch(`/admin/add-user`, requestOptions)
            .then((response) => response.json())
            .then((data) => {

                setUser(u =>({
                    ...u,
                    id: parseInt(data.id),
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    current_position: data.current_position,
                    role: data.role,
                    position_id: parseInt(data.position_id),
                }))
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

        // let errors = []

        let required = [
            {field: user.id, name: "id"},
            {field: user.first_name, name: "first_name"},
            {field: user.last_name, name: "last_name"},
            {field: user.email, name: "email"},
            {field: user.password, name: "password"},
            {field: user.role, name: "role"},
            {field: user.current_position, name: "current_position"},
            {field: user.position_id, name: "position_id"},

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

        return (
            <>
                <div>
                    <h2>Add Employee</h2>
                    <hr/>
                    <pre>{JSON.stringify(user, null, 3)}</pre>
                    <form onSubmit={handleSubmitUser}>
                        <Input
                            title={"Employee ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={user.id}
                            onChange={handleChange("id")}
                            required={"id"}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />
                        <Input
                            title={"First Name"}
                            className={"form-control"}
                            type="text"
                            name="first_name"
                            required={"first_name"}
                            value={user.first_name}
                            onChange={handleChange("first_name")}
                            errorDiv={hasError("first_name") ? "text-danger" : "d-none"}
                            errorMsg={"First Name is required"}
                        />
                        <Input
                            title={"Last Name"}
                            className={"form-control"}
                            type="text"
                            name="last_name"
                            required={"last_name"}
                            value={user.last_name}
                            onChange={handleChange("last_name")}
                            errorDiv={hasError("last_name") ? "text-danger" : "d-none"}
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
                        <Input
                            title={"Role"}
                            className={"form-control"}
                            type="role"
                            name="role"
                            required={"role"}
                            value={user.role}
                            onChange={handleChange("role")}
                            errorDiv={hasError("role") ? "text-danger" : "d-none"}
                            errorMsg={"role is required"}
                        />
                        <Input
                            title={"Current position"}
                            className={"form-control"}
                            type="text"
                            name="current_position"
                            required={"current_position"}
                            value={user.current_position}
                            onChange={handleChange("current_position")}
                            errorDiv={hasError("current_position") ? "text-danger" : "d-none"}
                            errorMsg={"Current position is required"}
                        />
                        <Input
                            title={"Position ID"}
                            className={"form-control"}
                            type="number"
                            name="position_id"
                            required={"position_id"}
                            value={user.position_id}
                            onChange={handleChange("position_id")}
                            errorDiv={hasError("position_id") ? "text-danger" : "d-none"}
                            errorMsg={"position_id is required"}
                        />

                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>

                </div>
            </>
        )
}

export default AddEmployee;