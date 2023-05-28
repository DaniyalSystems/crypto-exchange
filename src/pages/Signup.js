import {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Container} from 'react-bootstrap';
import {toast} from "react-toastify";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [cnic, setCnic] = useState("");
    const [validated, setValidated] = useState(false);
    const [users, setUsers] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity()) {
            const newUser = {
                name: name,
                email: email,
                password: password,
                address: address,
                cnic: cnic,
                loginAttempts: 0
            };

            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            navigate('/login');

            toast.success("User Registered Successfully! Please login now.")
        }

        setValidated(true);
    };

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h1 className="text-center mb-4 mt-4">Signup</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <div className="position-relative">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mb-3"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

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

                        <Form.Group controlId="formAddress">
                            <div className="position-relative">
                                <Form.Control
                                    as="textarea"
                                    name="address"
                                    placeholder="Enter Home Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mb-3"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your home address.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formCNIC">
                            <div className="position-relative">
                                <Form.Control
                                    type="file"
                                    name="cnic"
                                    accept="application/pdf"
                                    onChange={(e) => setCnic(e.target.files[0])}
                                    className="mb-3"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please upload your CNIC document in PDF format.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Signup
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;
