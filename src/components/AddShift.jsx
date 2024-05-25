import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Select from "./form/Select";

const AddShift = () => {
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [shift, setShift] = useState({
        id: "",
        name: "",
        start_time: "",
        end_time: "",
        position_id: "",
        user_id: ""
    })

    const [positionIdForShift, setPositionIdForShift] = useState([])
    const [user_idForShift, setUserIdForShift] = useState([])

    let positionIdOptions = []
    let user_idOptions = []

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
                setPositionIdForShift(data)
            })
            .catch(err => console.log(err));

        fetch(`/user-ids`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code: " + response.status)
                }
                return response.json();
            })
            .then((data) => {
                setUserIdForShift(data)
            })
            .catch(err => console.log(err));


    },[jwtToken, nav])

    user_idForShift.map((usrId) => (
        user_idOptions.push({id: usrId.id, value: usrId.name_surname})
    ))

    positionIdForShift.map((posId) => (
        positionIdOptions.push({id: posId.id, value: posId.position_name})
    ))

    console.log(positionIdOptions, user_idOptions)

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setShift({
            ...shift,
            [name]: value,
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let errors = []
        let required = [
            {field: shift.id, name: "id"},
            {field: shift.name, name: "name"},
            {field: shift.start_time, name: "start_time"},
            {field: shift.end_time, name: "end_time"},
            {field: shift.position_id, name: "position_id"},
            {field: shift.user_id, name: "user_id"},
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
        let requestBody = shift

        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }

        fetch(`/admin/create-shift`, requestOptions)
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
                    <h2>Add Shift</h2>
                    <hr/>
                    {/*<pre>{JSON.stringify(shift, null, 3)}</pre>*/}
                    {/*<hr/>*/}
                    {/*<pre>{JSON.stringify(positionIdForShift, null, 3)}</pre>*/}
                    <form onSubmit={handleSubmit}>
                        <Input
                            title={"Shift ID"}
                            className={"form-control"}
                            type="number"
                            name="id"
                            value={shift.id}
                            onChange={handleChange("id")}
                            errorDiv={hasError("id") ? "text-danger" : "d-none"}
                            errorMsg={"id is required"}
                        />
                        <Input
                            title={"Name"}
                            className={"form-control"}
                            type="text"
                            name="name"
                            required={"name"}
                            value={shift.name}
                            onChange={handleChange("name_surname")}
                            errorDiv={hasError("name_surname") ? "text-danger" : "d-none"}
                            errorMsg={"First Name is required"}
                        />
                        <Input
                            title={"Start Time"}
                            className={"form-control"}
                            type="time"
                            name="start_time"
                            required={"start_time"}
                            value={shift.start_time}
                            onChange={handleChange("start_time")}
                            errorDiv={hasError("start_time") ? "text-danger" : "d-none"}
                            errorMsg={"start_time is required"}
                        />
                        <Input
                            title={"End Time"}
                            className={"form-control"}
                            type="time"
                            name="end_time"
                            required={"end_time"}
                            value={shift.end_time}
                            onChange={handleChange("end_time")}
                            errorDiv={hasError("end_time") ? "text-danger" : "d-none"}
                            errorMsg={"end_time is required"}
                        />
                        <Select
                            title={"Position ID"}
                            name={"position_id"}
                            options={positionIdOptions}
                            value={positionIdForShift.position_name}
                            onChange={handleChange("position_id")}
                            placeHolder={"Choose..."}
                            errorMsg={"Please choose position_id for user"}
                            errorDiv={hasError("position_id") ? "text-danger" : "d-none"}
                        />

                        <Select
                            title={"User ID"}
                            name={"user_id"}
                            options={user_idOptions}
                            value={user_idForShift.name_surname}
                            onChange={handleChange("user_id")}
                            placeHolder={"Choose..."}
                            errorMsg={"Please choose user_id for user"}
                            errorDiv={hasError("user_id") ? "text-danger" : "d-none"}
                        />

                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>

                </div>
            </>
        )
    }
}

export default AddShift