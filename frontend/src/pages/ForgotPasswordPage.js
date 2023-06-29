import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet, Loading, axios, getError, toast } from "../Imports";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gotMail, setGotMail] = useState(false);

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/forgot-password", {
        email: email,
      });
      toast.success(data.message);
      setIsLoading(false);
      setGotMail(true);
    } catch (err) {
      toast.error(getError(err));
      setIsLoading(false);
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
        {gotMail && (
          <div className="mb-3">
            <button onClick={() => submitHandler}>
              If you haven't got mail, Click here to send mail again
            </button>
          </div>
        )}
        {isLoading && <Loading />}
      </Form>
    </Container>
  );
};

export default ForgotPasswordPage;
