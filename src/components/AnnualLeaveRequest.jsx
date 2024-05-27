import {useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Select from "./form/Select";


const AnnualLeaveRequest = () => {
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [annualLeave, setAnnualLeave] = useState({
        email: "",
        position_name: "",
        start_date: "",
        end_date: ""
    })

    const [positionForAnnualLeave, setPositionForAnnualLeave] = useState([])

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
                setPositionForAnnualLeave(data)

                setAnnualLeave({
                    email: "",
                    position_name: "",
                    start_date: "",
                    end_date: ""
                })

            })
            .catch(err => console.log(err));
    }, [jwtToken, nav]);

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setAnnualLeave({
            ...annualLeave,
            [name]: value,
        })

    }

    const handleSubmitAnnualLeave = (event) => {
        event.preventDefault();

        let errors = []

        let required = [
            {field:annualLeave.email, name: "name_suremailname"},
            {field: annualLeave.position_name, name: "position_name"},
            {field: annualLeave.start_date, name: "start_date"},
            {field: annualLeave.end_date, name: "end_date"},
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
        // headers.append("Authorization", "Bearer " + jwtToken);

        let method = "PUT";


        const requestBody = annualLeave;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            // credentials: "include",
        }
        // requestBody.id = parseInt(user.id)
        // requestBody.position_id = parseInt(user.position_id)
        console.log(JSON.stringify(requestBody))

        fetch(`/create-annual-leave`, requestOptions)
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

    positionForAnnualLeave.map((pos) => (
        positionOptions.push({id: pos.position_name, value: pos.position_name})
    ))


    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <>
                <div>
                    <h2>Add Employee</h2>
                    <hr/>
                    <pre>{JSON.stringify(annualLeave, null, 3)}</pre>
                    <pre>{JSON.stringify(positionForAnnualLeave, null, 3)}</pre>
                    <form onSubmit={handleSubmitAnnualLeave}>
                        <Input
                            title={"Email"}
                            className={"form-control"}
                            type="email"
                            name="email"
                            value={annualLeave.email}
                            onChange={handleChange("email")}
                            errorDiv={hasError("email") ? "text-danger" : "d-none"}
                            errorMsg={"email is required"}
                        />
                        <Select
                            title={"Position"}
                            name={"position_name"}
                            options={positionOptions}
                            value={positionForAnnualLeave.position_name}
                            onChange={handleChange("position_name")}
                            placeHolder={"Choose..."}
                            errorMsg={"Please choose position for user"}
                            errorDiv={hasError("position_name") ? "text-danger" : "d-none"}
                        />
                        <Input
                            title={"Start Date"}
                            className={"form-control"}
                            type="date"
                            name="start_date"
                            required={"start_date"}
                            value={annualLeave.start_date}
                            onChange={handleChange("start_date")}
                            errorDiv={hasError("start_date") ? "text-danger" : "d-none"}
                            errorMsg={"start_date is required"}
                        />
                        <Input
                            title={"End Date"}
                            className={"form-control"}
                            type="date"
                            name="end_date"
                            required={"end_date"}
                            value={annualLeave.end_date}
                            onChange={handleChange("end_date")}
                            errorDiv={hasError("end_date") ? "text-danger" : "d-none"}
                            errorMsg={"end_date is required"}
                        />

                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>

                </div>
            </>
        )
    }

}

export default AnnualLeaveRequest;