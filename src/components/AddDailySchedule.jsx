import { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useOutletContext} from "react-router-dom";

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

        fetch(`/positions`, requestOptions)
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

    }, [jwtToken, nav])
}
export default AddDailySchedule