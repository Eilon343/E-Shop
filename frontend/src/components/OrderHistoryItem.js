import React from 'react'
import { Card, Col, Row, ListGroup } from 'react-bootstrap'
import MessageBox from './MessageBox'
import { Link } from 'react-router-dom'

const OrderHistoryItem = ({order}) => {
  return (
    <Row>
    <Col md={12}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Order _Id: {order._id}</Card.Title>
          {order.isPaid ? (
            <MessageBox variant="success">
              Paid at {order.paidAt}
            </MessageBox>
          ) : (
            <MessageBox variant="danger">Not Paid</MessageBox>
          )}
          {order.isDelivered ? (
            <MessageBox variant="success">
              Delivered at {order.deliveredAt}
            </MessageBox>
          ) : (
            <MessageBox variant="danger">Not Delivered</MessageBox>
          )}
          <Card.Title>Products</Card.Title>
          <ListGroup variant="flush">
            {order.orderItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={6}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded img-thumbnail"
                    ></img>{' '}
                    <Link to={`/product/${item.token}`}>
                      {item.title}
                    </Link>
                  </Col>
                  <Col md={3}>
                    <span>{item.quantity}</span>
                  </Col>
                  <Col md={3}>${item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Title>Order Summary</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong> Order Total</strong>
                </Col>
                <Col>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  )
}

export default OrderHistoryItem