import {Link, Outlet} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
              <h1 className="mt-3 text-center">Scheduling application</h1>
            </div>
            <div className="col text-end mt-1">
                <Link to="/login" ><span className="btn btn-success">Login</span></Link>
            </div>
            <hr className="mb-3" />
        </div>
        <div className="row">
            <div className="col-md-2">
                <nav>
                    <div className="list-group">
                        <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                        <Link to="/schedules" className="list-group-item list-group-item-action">Schedules</Link>
                        <Link to="/positions" className="list-group-item list-group-item-action">Positions</Link>
                        <Link to="/annual-leave-request" className="list-group-item list-group-item-action">Annual Leave Request</Link>
                        <Link to="/admin/add-position" className="list-group-item list-group-item-action">Add position</Link>
                        <Link to="/admin" className="list-group-item list-group-item-action">Manage Schedule</Link>
                        <Link to="/admin/add-employees" className="list-group-item list-group-item-action">Add employees</Link>
                    </div>

                </nav>
            </div>
            <div className="col-md-10">
                <Outlet/>
            </div>
        </div>
    </div>
  );
}

export default App;
