

const AnnualLeaveRequest = () => {

    return (
        <>
            <div className="text-center">
                <h2>Annual leave request</h2>
                <hr/>
                <form action="" method="post" noValidate className="needs-validation">
                    <div className="row">
                        <div className="col">
                            <div className="row" id="reservation-date">
                                <div className="col-md-6">
                                    <label>
                                        <input required className="form-control" type="date" name="start"
                                               placeholder="Start date"/>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        <input required className="form-control" type="date" name="end"
                                               placeholder="End date"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <button type="submit" className="btn btn-primary">Search Availability</button>

                </form>
            </div>

        </>
    )

}

export default AnnualLeaveRequest;