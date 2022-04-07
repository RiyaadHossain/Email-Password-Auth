import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailBlur = (event) => {
    setEmail(event.target.value);
  };
  const passwordBlur = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  const submitForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCrendential) => {
        const user = userCrendential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
    event.preventDefault();
  };
  return (
    <div className="container mt-5">
      <h1 className="text-info text-center">Please Submit the Form </h1>
      <div className="border py-5 px-3 rounded-3 border-2 shadow mt-4">
        <Form noValidate validated={validated} onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={emailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid E-mail.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={passwordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Agree on Our Terms and Condition" required/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
