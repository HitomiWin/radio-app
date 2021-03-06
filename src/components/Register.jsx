import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Login.module.css";
import { Container, Form, Button, Card } from "react-bootstrap";
const Register = () => {
  const { register, setShowLogin } = useContext(UserContext); //register is function to register
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [inputDefault, setInputDefault] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (confirmPassword === "") {
      setInputDefault(true);
    } else {
      setInputDefault(false);
      if (confirmPassword.length >= 4 && password === confirmPassword) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [password, confirmPassword]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const checkPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userInfo = {
      userName,
      email,
      password,
    };
    if (isValid) {
      let result = await register(userInfo);
      if (result.success) {
        setShowLogin(true);
      } else {
        setError(result.error);
      }
    } else {
      console.log("not valid");
    }
  };
  return (
    <div>
      <Container className="mt-5">
        <Card>
          <Card.Header as="h4" className="text-center">
            Register
          </Card.Header>
          <Card.Body>
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <p
                className={`${styles.errorBox} ${
                  error ? styles.active : styles.inactive
                }`}
              >
                {" "}
                {error}
              </p>
              <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  onChange={handleUserNameChange}
                  type="text"
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Please enter more than 4 characters"
                  minLength="4"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm the password</Form.Label>
                <Form.Control
                  className={
                    inputDefault ? "" : isValid ? "is-valid" : "is-invalid"
                  }
                  onChange={checkPassword}
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
              <Container className="text-center">
                <Button
                  className={styles.singInButton}
                  variant="secondary"
                  type="submit"
                >
                  Create Account
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default Register;
