import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [registered, setRegistered] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nameBlur = (event) => {
    setName(event.target.value);
  };
  const emailBlur = (event) => {
    setEmail(event.target.value);
  };
  const passwordBlur = (event) => {
    setPassword(event.target.value);
  };
  const signedUp = (event) => {
    if (event.target.checked) {
      setRegistered(true);
      console.log(registered);
    } else {
      setRegistered(false);
    }
  };
  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("* Please input at least one Special character");
      return;
    } else {
      setError("");
    }

    setValidated(true);

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {
          const user = userCrendential.user;
          console.log(user);
          console.log(name);
        })
        .catch((error) => {
          const errorMsg = error.message;
          setError(errorMsg);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {
          const user = userCrendential.user;
          console.log(user);
          console.log(name);
        })
        .catch((error) => {
          const errorMsg = error.message;
          setError(errorMsg);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-info text-center">Please Submit the Form </h1>
      <div className="border py-5 px-3 rounded-3 border-2 shadow mt-4">
        <h2 className="text-center mb-3 text-success">
          {registered ? "Log In" : "Sign Up"}
        </h2>
        <Form noValidate validated={validated} onSubmit={submitForm}>
          {!registered ? (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Your Name</Form.Label>
              <Form.Control
                onBlur={nameBlur}
                type="text"
                placeholder="Enter Name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide Your Name.
              </Form.Control.Feedback>
            </Form.Group>
          ) : (
            ""
          )}
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
            <p className="text-danger"> {error}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onClick={signedUp}
              type="checkbox"
              label="Already Signed up"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered ? "Log In" : "Sign Up"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
