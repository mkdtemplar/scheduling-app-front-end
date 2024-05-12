import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";

const EditUser = () => {
    let {id} = useParams();
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [userEdit, setUser] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        current_position: "",
        role: "",
        position_id: "",
        shifts: [],
        user_position_array: []
    })

    if (id === undefined) {
        id = 0;
    }

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setUser({
            ...userEdit,
            [name]: value,
        })

    }

    useEffect(() => {
        if (jwtToken === "") {
            nav("/login");
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwtToken);

        const requestOptions = {
            method: "GET",
            headers: headers,
            credentials: "include"
        }

        fetch(`/admin/user-edit/${id}`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code: " + response.status)
                }
                return response.json()
            })
            .then((data) => {
                setUser(data)
            })

    }, [id, nav, jwtToken]);

    const handleSubmitUpdateUser = (event) => {
        event.preventDefault();

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        // headers.append("Authorization", "Bearer " + jwtToken);

        let method = "PATCH";


        const requestBody = userEdit;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            // credentials: "include",
        }

        fetch(`/admin/edit-user/${userEdit.id}`, requestOptions)
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
                <h2>Edit Employee</h2>
                <hr/>
                <form onSubmit={handleSubmitUpdateUser}>
                    <Input
                        title={"Employee ID"}
                        className={"form-control"}
                        type="number"
                        name="id"
                        value={userEdit.id}
                        onChange={handleChange("id")}
                        errorDiv={hasError("id") ? "text-danger" : "d-none"}
                        errorMsg={"id is required"}
                    />
                    <Input
                        title={"First Name"}
                        className={"form-control"}
                        type="text"
                        name="first_name"
                        value={userEdit.first_name}
                        onChange={handleChange("first_name")}
                        errorDiv={hasError("first_name") ? "text-danger" : "d-none"}
                        errorMsg={"First Name is required"}
                    />
                    <Input
                        title={"Last Name"}
                        className={"form-control"}
                        type="text"
                        name="last_name"
                        value={userEdit.last_name}
                        onChange={handleChange("last_name")}
                        errorDiv={hasError("last_name") ? "text-danger" : "d-none"}
                        errorMsg={"First Name is required"}
                    />
                    <Input
                        title={"Email"}
                        className={"form-control"}
                        type="email"
                        name="email"
                        value={userEdit.email}
                        onChange={handleChange("email")}
                        errorDiv={hasError("email") ? "text-danger" : "d-none"}
                        errorMsg={"email is required"}
                    />
                    <Input
                        title={"Role"}
                        className={"form-control"}
                        type="role"
                        name="role"
                        value={userEdit.role}
                        onChange={handleChange("role")}
                        errorDiv={hasError("role") ? "text-danger" : "d-none"}
                        errorMsg={"role is required"}
                    />
                    <Input
                        title={"Current position"}
                        className={"form-control"}
                        type="text"
                        name="current_position"
                        value={userEdit.current_position}
                        onChange={handleChange("current_position")}
                        errorDiv={hasError("current_position") ? "text-danger" : "d-none"}
                        errorMsg={"Current position is required"}
                    />
                    <Input
                        title={"Position ID"}
                        className={"form-control"}
                        type="number"
                        name="position_id"
                        value={userEdit.position_id}
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

export default EditUser