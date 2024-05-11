import {useNavigate, useOutletContext, useParams} from "react-router-dom";
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
        name_surname: "",
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
            credentials: 'include',
        }

        fetch(`/admin/add-user`, requestOptions)
            .then((res) => res.json())
            .then((data) => {

                setUser(u =>({
                    ...u,
                    id: parseInt(data.id),
                    name_surname: data.name_surname,
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
                        errorDiv={hasError("id") ? "text-danger" : "d-none"}
                        errorMsg={"id is required"}
                    />
                    <Input
                        title={"Name Surname"}
                        className={"form-control"}
                        type="text"
                        name="name_surname"
                        value={user.name_surname}
                        onChange={handleChange("name_surname")}
                        errorDiv={hasError("name_surname") ? "text-danger" : "d-none"}
                        errorMsg={"Name is required"}
                    />
                    <Input
                        title={"Email"}
                        className={"form-control"}
                        type="email"
                        name="email"
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