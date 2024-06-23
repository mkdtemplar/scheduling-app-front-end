import { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import Input from "./form/input";
import Select from "./form/Select";

const AddDailySchedule = () => {
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()


    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [daily_schedule, setDailySchedule] = useState({
        id: "",
        start_date: "",
        positions_names: [],
        employees: [],
        shifts: [],
    })

    const [position_name, setPositionName] = useState([])
    const [employee, setEmployee] = useState([])
    const [shift, setShift] = useState([])

    let positionNamesOptions = []
    let employeesNamesOptions = []
    let shiftNamesOptions = []

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

        fetch(`/positions-daily-schedule`, requestOptions)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code: " + response.status)
            }
            return response.json();
        })
        .then((data => {
            setPositionName(data)
        }))
        .catch(err => console.log(err));

        fetch(`/all-users`, requestOptions)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code: " + response.status)
            }
            return response.json();
        })
        .then((data) => {
            setEmployee(data)
        })
        .catch(err => console.log(err));

        fetch(`/all-shifts`, requestOptions)
        .then((response) => {
            if (response.status !== 200) {
                setError("Invalid response code: " + response.status)
            }
            return response.json();
        })
        .then((data) => {
            setShift(data)
        })
        .catch(err => console.log(err));

        setDailySchedule({
            id: "",
            start_date: "",
            positions_names: [],
            employees: [],
            shifts: [],
        })

    }, [jwtToken, nav])

    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setDailySchedule({
            ...daily_schedule,
            [name]: value,
        })
    }

    position_name.map((pos) => (
        positionNamesOptions.push({id : pos.position_name, value: pos.position_name})
    ))

    employee.map((name) => (
        employeesNamesOptions.push({id: name.name_surname, value: name.name_surname})
    ))

    shift.map((s) => (
        shiftNamesOptions.push({id: s.name, value: s.name})
    ))

    const handlePositions = (selectedPositionName) => {
        setDailySchedule({
            ...daily_schedule,
            positions_names: [...daily_schedule.positions_names, selectedPositionName],
        })
    }

    const handleEmployees = (selectedEmployee) =>  {
        setDailySchedule({
            ...daily_schedule,
            employees: [...daily_schedule.employees, selectedEmployee],
        })
    }

    const handleShifts = (selectedShift)  => {
        setDailySchedule({
            ...daily_schedule,
            shifts: [...daily_schedule.shifts, selectedShift],
        })
    }

    const handleCreateDailySchedule = (event) => {
        event.preventDefault();

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwtToken);

        let method = "PUT";

        const requestBody = daily_schedule;
        let requestOptions = {
            body: JSON.stringify(requestBody),
            method: method,
            headers: headers,
            credentials: "include",
        }

        fetch(`/admin/create-daly-schedule`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    nav("/admin/all-daily-schedules");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div>
                <h2>Create Daily Schedule</h2>
                <hr/>
                <pre>{JSON.stringify(daily_schedule, null, 3)}</pre>
                {/*<pre>{JSON.stringify(positionForUser, null, 3)}</pre>*/}
                <form onSubmit={handleCreateDailySchedule}>
                    <Input
                        title={"Daily Schedule ID"}
                        className={"form-control"}
                        type="number"
                        name="id"
                        value={daily_schedule.id}
                        onChange={handleChange("id")}
                        errorDiv={hasError("id") ? "text-danger" : "d-none"}
                        errorMsg={"id is required"}
                    />
                    <Input
                        title={"Date of Daily Schedule"}
                        className={"form-control"}
                        type="date"
                        name="start_date"
                        required={"start_date"}
                        value={daily_schedule.start_date}
                        onChange={handleChange("start_date")}
                        errorDiv={hasError("start_date") ? "text-danger" : "d-none"}
                        errorMsg={"Start Date is required"}
                    />

                    <Select
                        title={"Position"}
                        name={"positions_names"}
                        options={positionNamesOptions}
                        value={daily_schedule.positions_names}
                        onChange={(e) => handlePositions(e.target.value)}
                        placeHolder={"Choose..."}
                        errorMsg={"Please choose position for user"}
                        errorDiv={hasError("position_name") ? "text-danger" : "d-none"}
                    />
                    <Select
                        title={"Employees"}
                        name={"employees"}
                        options={employeesNamesOptions}
                        value={daily_schedule.employees}
                        onChange={(e) => handleEmployees(e.target.value)}
                        placeHolder={"Choose..."}
                        errorMsg={"Please choose employee"}
                        errorDiv={hasError("employees") ? "text-danger" : "d-none"}
                    />
                    <Select
                        title={"Shifts"}
                        name={"shifts"}
                        options={shiftNamesOptions}
                        value={daily_schedule.shifts}
                        onChange={(e) => handleShifts(e.target.value)}
                        placeHolder={"Choose..."}
                        errorMsg={"Please choose shift"}
                        errorDiv={hasError("shifts") ? "text-danger" : "d-none"}
                    />

                    <hr/>
                    <button className="btn btn-primary">Save</button>
                </form>

            </div>
        </>
    )
}
export default AddDailySchedule