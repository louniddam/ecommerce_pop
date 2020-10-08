import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Signup extends React.Component{
    render(){
        return(
            <div>
                <Form>

                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Reapeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Reapeat Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                
                </Form>
            </div>
        );
    }
}

export default Signup;
