import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const errorPage = useRouteError()

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mt-3">Oops!</h1>
                    <p>Sorry unexpected error occurred</p>
                    <p>
                        <em>{errorPage.statusText || errorPage.message}</em>
                    </p>
                </div>
            </div>
        </div>
    )
}