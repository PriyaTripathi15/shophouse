import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") ? sp.get("redirect") : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        backgroundImage: 'url("/images/auth.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* White overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          zIndex: 1,
        }}
      />
  
      {/* Top Header */}
      <div style={{ position: "relative", zIndex: 2, paddingTop: "40px" }}>
        <h1 className="text-center fw-bold" style={{ color: "#000", fontSize: "3rem" }}>
          Sign Up
        </h1>
  
        <Container
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ minHeight: "75vh" }}
        >
          <div
            className="p-4 rounded shadow bg-white bg-opacity-100"
            style={{ width: "100%", maxWidth: "420px", zIndex: 2 }}
          >
            <h4 className="text-center mb-4 fw-bold">Create Your Account</h4>
            <Form onSubmit={submitHandler}>
              {/* Form Fields */}
              <Form.Group controlId="name">
                <Form.Label className="fw-semibold">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
  
              <Form.Group controlId="email" className="mt-3">
                <Form.Label className="fw-semibold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
  
              <Form.Group controlId="password" className="mt-3">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
  
              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
  
              <Button
                type="submit"
                variant="primary"
                className="mt-3 w-100 fw-semibold"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </Button>
            </Form>
  
            <Row className="py-3">
              <Col className="text-center">
                Already have an account?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Sign In
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
  
};

export default RegisterScreen;
