import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Register = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);


    //Handle the form data....
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: ''
    });


    //Handle the input field to store in state...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(preState => ({
            ...preState,
            [name]: value
        }));
    };


    //Hit the APIs to pass the server...
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const format = {
                userNAME: formData.userName,
                userEMAIL: formData.userEmail,
                userPASSWORD: formData.userPassword
            };
            dispatch(registerUser(format));
            // Only navigate to login page if there's no error
            if (!error) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className='text-center'>Register Page</h2>
                <Form onSubmit={handleSubmit} className='form-area'>
                    <FormGroup>
                        <Label for="name">UserName :-</Label>
                        <Input type="text" name="userName" id="Name" placeholder="Enter your Name" value={formData.userName} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">userEmail :-</Label>
                        <Input type="text" name="userEmail" id="Name" placeholder="Enter your Email" value={formData.userEmail} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password :-</Label>
                        <Input type="password" name="userPassword" id="password" placeholder="Enter your password" value={formData.userPassword} onChange={handleChange} />
                    </FormGroup>
                    <div className="button-container">
                        <Button color="warning" type="submit" className="custom-button" disabled={loading}>Register</Button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </Form>
            </div>
        </div>
    );
};

export default Register;
