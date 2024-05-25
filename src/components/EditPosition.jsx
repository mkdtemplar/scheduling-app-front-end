import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Checkbox from "./form/Checkbox";
import Swal from "sweetalert2";


const EditPosition = () => {
    let {id} = useParams();
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [position, setPosition] = useState({
        id: "",
        position_name: "",
    });


    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setPosition({
            ...position,
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

        fetch(`/position/${id}`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code: " + response.status)
                }
                return response.json()
            })
            .then((data) => {
                setPosition(data)
            })

    }, [id, nav, jwtToken]);

    const handleSubmitUpdatePosition = (event) => {
        event.preventDefault();

        let errors = []

        let required = [
            {field: position.id, name: "id"},
            {field: position.position_name, name: "position_name"},
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


        const requestBody = position;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }

        fetch(`/admin/update-position/${position.id}`, requestOptions)
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

    const confirmDelete = () => {
        Swal.fire({
            title: 'Delete position?',
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

                fetch(`/admin/delete-position/${position.id}`, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.error) {
                            console.log(data.error);
                        } else {
                            nav("/positions");
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
                    <h2>Edit Position</h2>
                    <hr/>
                    <form onSubmit={handleSubmitUpdatePosition}>
                        <Input
                            title={"Position ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={position.id}
                            onChange={handleChange("id")}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />
                        <Input
                            title={"Position Name"}
                            className={"form-control"}
                            type="text"
                            name="position_name"
                            required={"name_surname"}
                            value={position.position_name}
                            onChange={handleChange("position_name")}
                            errorDiv={hasError("position_name") ? "text-danger" : "d-none"}
                            errorMsg={"position_name is required"}
                        />
                        <hr/>
                        <button className="btn btn-primary">Update Position</button>
                        <a href="#!" className="btn btn-danger ms-5 " onClick={confirmDelete}>Delete Position</a>
                    </form>
                </div>
            </>
        )
    }
}

export default EditPosition;