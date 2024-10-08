import {Link, Outlet, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Alert from "./components/Alert";

function App() {

    const [jwtToken, setJwtToken] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [alertClassName, setAlertClassName] = useState("d-none")

    const [tickInterval, setTickInterval] = useState()

    const navigator = useNavigate()

    const logOut = () => {
        const requestOptions = {
            method: "GET",
            credentials: "include",
        }
        fetch(`/logout`, requestOptions)
            .catch(error =>{
                console.log("error logging out ", error)
            })
            .finally(() => {
                setJwtToken("")
                toggleRefresh(false)
            })
        navigator("/login")
    }

    const toggleRefresh = useCallback( (status) => {
        if (status) {

            let i = setInterval(() =>{
                const requestOptions = {
                    method: "GET",
                    credentials: "include",
                }
                fetch(`/refresh`, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.access_token) {
                            setJwtToken(data.access_token)
                        }
                    })
                    .catch(error => {
                        console.log("user not logged in")
                    })
            }, 600000);
            setTickInterval(i);
        } else {
            setTickInterval(null)
            clearInterval(tickInterval)
        }
    }, [tickInterval]);

    useEffect(() => {
        if (jwtToken === "") {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            }
            fetch(`/refresh`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        setJwtToken(data.access_token)
                        toggleRefresh(true)
                    }
                })
                .catch(error => {
                    console.log("user not logged in", error)
                })
        }
    }, [jwtToken, toggleRefresh]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="mt-3">Scheduling Application</h1>
                </div>
                <div className="col text-end">
                    {
                        jwtToken === ""
                            ? <Link to="login"><span className="btn btn-info mt-1">Login</span></Link>
                            : <a href="#!" onClick={logOut}><span className="btn btn-danger mt-1">Logout</span></a>
                    }

                </div>
                <hr className="mb-3"/>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <nav>
                        <div className="list-group">
                            <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                            <Link to="/schedules" className="list-group-item list-group-item-action">Schedules</Link>
                            <Link to="/schedule/:id" className="list-group-item list-group-item-action">Daily assignments</Link>
                            <Link to="/annual-leave-request" className="list-group-item list-group-item-action">Annual Leave Request</Link>
                            <Link to="/login" className="list-group-item list-group-item-action">Login</Link>
                            <Link to="/positions" className="list-group-item list-group-item-action">Positions</Link>
                            <Link to="/all-employees" className="list-group-item list-group-item-action">All Employees</Link>
                            <Link to="/all-shifts" className="list-group-item list-group-item-action">All Shifts</Link>
                            {jwtToken !== "" &&
                                <>
                                    <Link to="/admin/add-employees" className="list-group-item list-group-item-action">Add employees</Link>
                                    <Link to="/admin/add-position" className="list-group-item list-group-item-action">Add Position</Link>
                                    <Link to="/admin/manage-position" className="list-group-item list-group-item-action">Manage positions</Link>
                                    <Link to="/admin/edit-employees" className="list-group-item list-group-item-action">Manage Employees</Link>
                                    <Link to="/admin/add-admin" className="list-group-item list-group-item-action">Add Admin</Link>
                                    <Link to="/admin/edit-admin" className="list-group-item list-group-item-action">Manage Admin</Link>
                                    <Link to="/admin/add-shift" className="list-group-item list-group-item-action">Add Shift</Link>
                                    <Link to="/admin/add-daily-schedule" className="list-group-item list-group-item-action">Create Daily Schedule</Link>
                                </>
                            }
                            <Link to="/admin/all-daily-schedules" className="list-group-item list-group-item-action">Daily Schedules</Link>

                        </div>
                    </nav>
                </div>
                <div className="col-md-10">
                    <Alert
                        message={alertMessage}
                        className={alertClassName}
                    />
                    <Outlet context={{
                        jwtToken, setJwtToken,
                        setAlertMessage, setAlertClassName,
                        toggleRefresh,
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default App;
