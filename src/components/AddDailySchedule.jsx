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
}