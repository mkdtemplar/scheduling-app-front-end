import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Swal from "sweetalert2";

const EditAdmin = () => {
    let {id} = useParams();
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [adminEdit, setAdmin] = useState({
        id: "",
        user_name: "",
        password: ""
    })

    if (id === undefined) {
        id = 0;
    }

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setAdmin({
            ...adminEdit,
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

        fetch(`/get-admin/${id}`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code: " + response.status)
                }
                return response.json()
            })
            .then((data) => {
                setAdmin(data)
            })

    }, [id, nav, jwtToken]);

    const handleSubmitUpdateAdmin = (event) => {
        event.preventDefault();

        let errors = []

        let required = [
            {field: adminEdit.id, name: "id"},
            {field: adminEdit.user_name, name: "user_name"},
            {field: adminEdit.password, name: "password"},
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

        let method = "PATCH";


        const requestBody = adminEdit;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }

        // requestBody.id = parseInt(userEdit.id)
        // requestBody.position_id = parseInt(userEdit.position_id)

        fetch(`/admin//update-admin/${adminEdit.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    nav("/admin/all-admins");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const confirmDelete = () => {
        Swal.fire({
            title: 'Delete movie?',
            text: "You cannot undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let headers = new Headers();
                headers.append("Authorization", "Bearer " + jwtToken)

                const requestOptions = {
                    method: "DELETE",
                    headers: headers,
                }

                fetch(`/admin/delete-admin/${adminEdit.id}`, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.error) {
                            console.log(data.error);
                        } else {
                            nav("/admin/edit-admin");
                        }
                    })
                    .catch(err => {console.log(err)});
            }
        })
    }
    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {

        return (
            <>
                <div>
                    <h2>Edit Admin</h2>
                    <hr/>
                    <form onSubmit={handleSubmitUpdateAdmin}>
                        <Input
                            title={"Admin ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={adminEdit.id}
                            onChange={handleChange("id")}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />
                        <Input
                            title={"Username"}
                            className={"form-control"}
                            type="text"
                            name="user_name"
                            required={"name_surname"}
                            value={adminEdit.user_name}
                            onChange={handleChange("user_name")}
                            errorDiv={hasError("user_name") ? "text-danger" : "d-none"}
                            errorMsg={"Username is required"}
                        />

                        <Input
                            title={"Password"}
                            className={"form-control"}
                            type="password"
                            name="password"
                            value={adminEdit.password}
                            onChange={handleChange("password")}
                            errorDiv={hasError("password") ? "text-danger" : "d-none"}
                            errorMsg={"password is required"}
                        />




                        <hr/>
                        <button className="btn btn-primary">Update Admin</button>
                        <a href="#!" className="btn btn-danger ms-5 " onClick={confirmDelete}>Delete Admin</a>
                    </form>

                </div>
            </>
        )
    }
}

export default EditAdmin