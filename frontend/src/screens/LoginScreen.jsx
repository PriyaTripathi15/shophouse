import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login successful!");
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
      {/* Overlay */}
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

      <div style={{ position: "relative", zIndex: 2, paddingTop: "40px" }}>
        {/* Top Heading */}
        <h1 className="text-center fw-bold" style={{ color: "#000", fontSize: "3rem" }}>
          Log In
        </h1>

        {/* Form Container */}
        <Container
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ minHeight: "75vh" }}
        >
          <div
            className="p-4 rounded shadow bg-white bg-opacity-100"
            style={{ width: "100%", maxWidth: "420px", zIndex: 2 }}
          >
            <h4 className="text-center mb-4 fw-bold">Welcome Back</h4>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="fw-semibold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 fw-semibold"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Sign In"}
              </Button>
            </Form>

            <Row className="py-3">
              <Col className="text-center">
                New Customer?{" "}
                <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                  Register
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LoginScreen;
