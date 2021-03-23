import React, { useState, useEffect } from "react";
import { Signup, Signin } from '../../components/SignForms';
import Axios from 'axios'
import "./style.css"
import { createUser, login } from '../../services/http/authHttp';
import { Alert, Fade } from "reactstrap";
import { Redirect } from 'react-router-dom';

export default function Signing() {

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [messages, setMessages] = useState([])
    const [cookie, setCookie] = useState(false)

    useEffect(() => {
        checkCookie()
    }, [])

    const checkCookie = () => {
        return Axios.get('/checkcookie')
            .then(res => res.data ? setCookie(true) : "")
    }

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const [signUpForm, setSignUpForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        street: '',
        state: '',
        zip: '',
        city: ''
    });

    const resetMessages = () => setTimeout(() => setMessages([]), 5000)

    const formatData = ({ firstName, lastName, email, password, street, state, zip, city }) => {
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            location: {
                street: street,
                city: city,
                state: state,
                postcode: zip,
            }
        }
    }

    const onLoginFormChange = (value, key) => setLoginForm({ ...loginForm, [key]: value })
    const onSignUpFormChange = (value, key) => setSignUpForm({ ...signUpForm, [key]: value })

    const messagesView = messages.map((message) => (
        <Fade>
            <Alert color={message.type === "error" ? "secondary" : "primary"}>
                {message.prompt}
            </Alert>
        </Fade>
    ))

    const onLoginFinish = async () => {
        const response = await login(loginForm)
        if (!response.user) {
            setMessages([{
                prompt: response.message.content,
                type: "error"
            }])
            resetMessages()
        } else {
            setMessages([{
                prompt: "Logging in..."
            }])
            setTimeout(() => window.location.href = "/home", 1500)
            resetMessages()

        }
    }

    const onSignupFinish = async () => {
        const response = await createUser(formatData(signUpForm))
        if (response != null && response.message != null && response.message.error != null) {
            setMessages([{
                prompt: response.message.error,
                type: "error"
            }])
            resetMessages()
        } else {
            setMessages([{
                prompt: "Successfully created your user"
            }])
            setTimeout(() => window.location.href = "/home", 1500)
            resetMessages()
        }
    }

    return (
        <div style={{ width: "100%" }}>
            {cookie ? <Redirect to="/home" /> : ""}
            <div className="row">
                <div className="col-12 backbox">
                    <div className="forms">
                        <h1 className="align-center"> BAZAAR6</h1>
                        {messagesView}
                        {!isLoggingIn ?
                            <Signin
                                handleFinish={onLoginFinish}
                                handleFormChange={onLoginFormChange}
                                loginForm={loginForm}
                                setisLoggingIn={() => setIsLoggingIn(!isLoggingIn)} /> :
                            <Signup
                                handleFinish={onSignupFinish}
                                handleFormChange={onSignUpFormChange}
                                signUpForm={signUpForm}
                                setisLoggingIn={() => setIsLoggingIn(!isLoggingIn)} />}
                    </div>
                </div>
                <div className="col-2 right">
                    <img className=""
                        src="https://i.pinimg.com/originals/b0/63/e6/b063e69aec55ee699cf38c757cabaae3.jpg" />
                </div>
            </div>
        </div>
    )
}