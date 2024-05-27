import TextArea from "./form/TextArea";

const DailyAssignments = () => {
    return (
            <div className="text-center">
                <h2>Daily assignments</h2>
                <hr/>
                <TextArea
                    title="Description"
                    name={"description"}
                    value={"Daily assignments are here"}
                    rows={"3"}
                    // onChange={handleChange("description")}
                    // errorMsg={"Please enter a description"}
                    // errorDiv={hasError("description") ? "text-danger" : "d-none"}
                />
            </div>
    )
}

export default DailyAssignments;