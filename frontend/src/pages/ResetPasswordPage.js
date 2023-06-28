import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet, getError, toast, useParams, axios, Link } from "../Imports";

const ResetPasswordPage = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/v1/users/reset-password/${id}/${token}`,
        { password }
      );
      toast.success(data.message + " you can sign in with your new password");
      setSuccess(true);
    } catch (err) {
      setError(true);
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <h1 className="my-3">Reset Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {error && (
          <div className="mb-3">
            {" "}
            <Link to={`/forget-password`}>Click here to create a new link</Link>
          </div>
        )}
        {success && (
          <div className="mb-3">
            <Link to={"/signin"}>Click here to sign in</Link>
          </div>
        )}
        <div className="mb-3">
          <Button type="submit">Submit</Button>
        </div>
        {/* {isLoading && <Loading />} */}
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
