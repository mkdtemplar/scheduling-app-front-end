import {Link, Outlet, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Alert from "./components/Alert";

function App() {

    const [jwtToken, setJwtToken] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClassName, setAlertClassName] = useState("d-none");
    const navigate = useNavigate();

    const [tickInterval, setTickInterval] = useState();

    const logOut = () => {
       const requestOptions = {
           method: "GET",
           credentials: 'include',
       }
       fetch(`/logout`, requestOptions)
           .catch(error => {
               console.log("error logging out", error)
           })
           .finally(() => {
               setJwtToken("")
               toogleRefresh(false)
           })
        navigate("/login")
    }

    const toogleRefresh = useCallback( (status) => {
        if (status) {
            let i = setInterval(() => {
                const requestOptions = {
                    method: "GET",
                    credentials: 'include',
                }
                fetch(`/refresh`, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.access_token) {
                            setJwtToken(data.access_token)
                            toogleRefresh(true)
                        }
                    })
                    .catch(error => {
                        console.log("user not logged in", error.json())
                    })
            }, 600000)
            setTickInterval(i)
        } else {
            setTickInterval(null)
            clearInterval(tickInterval)
        }
    }, [tickInterval])

    useEffect(() => {
        if (jwtToken === "") {
            const requestOptions = {
                method: "GET",
                credentials: 'include',
            }
            fetch(`/refresh`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        setJwtToken(data.access_token)
                        toogleRefresh(true)
                    }
                })
                .catch(error => {
                    console.log("user not logged in", error)
                })
        }
    }, [jwtToken, toogleRefresh]);

  return (
    <div className="container">
        <div className="row">
            <div className="col">
              <h1 className="mt-3 text-center">Scheduling application</h1>
            </div>
            <div className="col text-end mt-1">
                {jwtToken === ""
                    ? <Link to="/login" ><span className="btn btn-success">Login</span></Link>
                    : <a href="#!" onClick={logOut}><span className="btn btn-danger">Logout</span></a>
                }

            </div>
            <hr className="mb-3" />
        </div>
        <div className="row">
            <div className="col-md-2">
                <nav>
                    <div className="list-group">
                        <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                        <Link to="/schedules" className="list-group-item list-group-item-action">Schedules</Link>
                        <Link to="/schedule/:id" className="list-group-item list-group-item-action">Schedule</Link>
                        <Link to="/admin/position/all-positions" className="list-group-item list-group-item-action">Positions</Link>
                        <Link to="/annual-leave-request" className="list-group-item list-group-item-action">Annual Leave Request</Link>
                        <Link to="/login" className="list-group-item list-group-item-action">Login</Link>
                        {
                            jwtToken !== "" &&
                            <>
                                <Link to="/admin/add-position" className="list-group-item list-group-item-action">Add position</Link>
                                <Link to="/admin" className="list-group-item list-group-item-action">Manage Schedule</Link>
                                <Link to="/admin/add-employees" className="list-group-item list-group-item-action">Add employees</Link>
                            </>
                        }

                    </div>

                </nav>
            </div>
            <div className="col-md-10">
                <Alert
                    message={alertMessage}
                    className={alertClassName}
                />
                <Outlet context={{
                    jwtToken,
                    setJwtToken,
                    setAlertMessage,
                    setAlertClassName,
                    toogleRefresh,
                }}/>
            </div>
        </div>
    </div>
  );
}

export default App;
