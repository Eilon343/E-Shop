import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet, axios, getError, toast } from "../Imports";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/forgot-password", {
        email: email,
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container mt-4">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <h1 className="my-3">Forgot Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Submit</Button>
        </div>
        {/* {isLoading && <Loading />} */}
      </Form>
    </Container>
  );
};

export default ForgotPasswordPage;
