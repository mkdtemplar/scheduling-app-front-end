import {useState} from "react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className="text-center">
                <h2>Login</h2>
                <hr/>
            </div>
        </>
    )
}

export default Login;