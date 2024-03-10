import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
import { message } from "antd";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);


    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevstate => ({
            ...prevstate,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const format = {
                userEMAIL: formData.userEmail,
                userPASSWORD: formData.userPassword
            };
            dispatch(loginUser(format));
            navigate("/dashboard")
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className='text-center'>Login Page</h2>
                <Form onSubmit={handleSubmit} className='form-area'>
                    <FormGroup>
                        <Label for="email">userEmail :-</Label>
                        <Input type="text" name="userEmail" id="Name" placeholder="Enter your Email" value={formData.userEmail} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password :-</Label>
                        <Input type="password" name="userPassword" id="password" placeholder="Enter your password" value={formData.userPassword} onChange={handleChange} />
                    </FormGroup>
                    <div className="button-container">
                        <Button color="warning" type="submit" className="custom-button" disabled={loading}>Login</Button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </Form>
            </div>
        </div>
    )
}

export default Login;
