import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Input from "./form/input";
import Select from "./form/Select";
import Checkbox from "./form/Checkbox";

const EditPosition = () => {
    let {id} = useParams();
    const {jwtToken} = useOutletContext()
    const nav = useNavigate()

    let userForSelect =  [
        {user: ""},
    ]

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1
    }

    const [users, setUsers] = useState([]);

    const [position, setPosition] = useState({
        id: "",
        position_name: "",
        users: [],
        users_array: [],
        shifts: [],
    });

    if (id === undefined) {
        id = 0
    }

    useEffect(() => {
        if (jwtToken === "") {
            nav("/login")

        }

        if (id === 0) {
            setPosition({
                id: "",
                position_name: "",
                users: [],
                users_array: [],
                shifts: [],
            })
            const header = new Headers()
            header.append('Content-Type', 'application/json')

            const requestOptions = {
                method: "GET",
                headers: header,
            }

            fetch(`/all-users`, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    const checks =  []

                    data.forEach((item) => {
                        checks.push({id: item.id, checked: false, user: item.first_name + " " + item.last_name})
                        userForSelect.push({user: item.first_name + " " + item.last_name})
                        console.log("user for select: ", userForSelect)
                    })
                    setPosition(p =>({
                        ...p,
                        users: checks,
                        users_array: [],
                    }))
                })
                .catch(err => console.log(err));
        } else {
            // editing a position
        }

    }, [jwtToken, nav, id]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleChange = () => (event) => {
        let value = event.target.value ;
        let name = [event.target.name];
        setPosition({
            ...position,
            [name]: value,
        })

    }

    const handleCheck = (event, pos) => {
        console.log("handleCheck called");
        console.log("value in handleCheck: ", event.target.value)
        console.log("checked is: ", event.target.checked)
        console.log("position is: ", position)

        let tempApp = []
        tempApp = position.users
        console.log(tempApp)
        tempApp[pos].checked = !tempApp[pos].checked

        let tmpIDs = position.users_array

        if (!event.target.checked) {
            tmpIDs.splice(tmpIDs.indexOf(event.target.value))
        } else {
            tmpIDs.push(parseInt(event.target.value, 10))
        }

        setPosition({
            ...position,
            users_array: tmpIDs
        })
    }

    return (
        <div>
            <h2>Add/Edit Position</h2>
            <hr/>
            <pre>{JSON.stringify(position, null, 3)}</pre>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" id="id" value={position.id}/>
                <Input
                    title={"Position Name"}
                    className={"form-control"}
                    type="text"
                    name="position_name"
                    value={position.position_name}
                    onChange={handleChange("position_name")}
                    errorDiv = {hasError("position_name") ? "alert alert-danger" : "d-none"}
                    errorMsg={"Position Name is required"}
                />
                {position.users && position.users.length > 1 &&
                    <>
                        {/*<Select*/}
                        {/*    title={"user"}*/}
                        {/*    name={"user"}*/}
                        {/*    options={userForSelect}*/}
                        {/*    onChange={handleChange("user")}*/}
                        {/*    placeholder={"Choose employees"}*/}
                        {/*    errorMsg={"Employees is required"}*/}
                        {/*    errorDiv={hasError("employees") ? "alert alert-danger" : "d-none"}*/}
                        {/*/>*/}
                    </>
                }

                <h3>Users</h3>
                {position.users && position.users.length > 1 &&

                    <>
                        {Array.from(position.users).map((u, index) =>
                            <Checkbox
                                title={u.user}
                                name={"user"}
                                key={index}
                                id={"user" + index}
                            onChange={(event) => handleCheck(event, index)}
                            value={u.id}
                            checked={position.users[index].checked}
                        />

                    )}
                    </>
                }

            </form>
        </div>
    )
}

export default EditPosition;