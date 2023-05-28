import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Button, Container} from 'react-bootstrap';
import {toast} from "react-toastify";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity()) {
            const storedUsers = JSON.parse(localStorage.getItem('users'));
            const loggedInUser = storedUsers.find(user => user.email === email && user.password === password);
            if (loggedInUser) {
                localStorage.setItem("login", true);
                navigate('/dashboard');
                toast.success("Login successfully!");
            } else {
                const user = storedUsers.find(user => user.email === email);
                if (user) {
                    let loginAttempts = user.loginAttempts || 0;
                    loginAttempts++;
                    user.loginAttempts = loginAttempts;
                    localStorage.setItem("users", JSON.stringify(storedUsers));
                    if (loginAttempts >= 3) {
                        const updatedUsers = storedUsers.filter(
                            (user) => user.email !== email && user.password !== password
                        );
                        localStorage.setItem("users", JSON.stringify(updatedUsers));
                        toast.error(`${user.name} blocked!`);
                    }
                }
                toast.error("Invalid Credentials");
            }
        }

        setValidated(true);
    };

    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h1 className="text-center mb-4 mt-4">Login</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <div className="position-relative">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mb-3"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email address.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <div className="position-relative">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mb-3"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100 mb-4">
                            Login
                        </Button>

                        <span>Don't have an account? <Link to="/signup">Register here</Link></span>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;
