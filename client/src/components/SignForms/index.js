import React from 'react';
import "./style.css"

export function Signin({ setisLoggingIn, handleFormChange, handleFinish }) {

    return (<div>
        <h4> Log Into your account</h4>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={(e) => handleFormChange(e.target.value, 'email')} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
				    else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => handleFormChange(e.target.value, 'password')} type="password" className="form-control" id="password" />
        </div>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
            <p className="float-right"> Don't have an account Yet? </p>
        </div>

        <button className="btn btn-dark"
            onClick={handleFinish}
            onMouseEnter={(e) => { e.target.style.background = "white"; e.target.style.color = "black" }}
            onMouseLeave={(e) => { e.target.style.background = "black"; e.target.style.color = "white" }}>
            Log in
        </button>
        <button className="btn btn-dark float-right"
            onClick={setisLoggingIn}
            onMouseEnter={(e) => { e.target.style.background = "white"; e.target.style.color = "black" }}
            onMouseLeave={(e) => { e.target.style.background = "black"; e.target.style.color = "white" }}>
            Sign up
        </button>
    </div>
    )
}
export function Signup({ setisLoggingIn, handleFormChange, handleFinish }) {

    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    const optionStates = states.map((state, i) => { return (<option key={i} value={state}> {state} </option>) })

    return (<div>
        <h4> Sign up and get the best of us </h4>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="firstname">First Name</label>
                <input onChange={(e) => handleFormChange(e.target.value, 'firstName')}
                    name="firstname" type="text" className="form-control" id="firstname"
                    aria-describedby="firstname" />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="lastname">Last Name</label>
                <input onChange={(e) => handleFormChange(e.target.value, 'lastName')} name="lastname" type="text" className="form-control" id="lastname" aria-describedby="lastname" />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={(e) => handleFormChange(e.target.value, 'email')} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => handleFormChange(e.target.value, 'password')} name="password" type="password" className="form-control" id="password" />
        </div>
        <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input onChange={(e) => handleFormChange(e.target.value, 'street')} name="inputAddress" type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input onChange={(e) => handleFormChange(e.target.value, 'idk')} name="inputAddress2" type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input onChange={(e) => handleFormChange(e.target.value, 'city')} name="inputCity" type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select onChange={(e) => handleFormChange(e.target.value, 'state')} name="inputState" id="inputState" className="form-control">
                    <option key="99" value="select">Select a State</option>
                    {optionStates}
                </select>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input onChange={(e) => handleFormChange(e.target.value, 'zip')} name="inputZip" type="text" className="form-control" id="inputZip" />
            </div>
        </div>
        <div className="form-row col-12">
            <div className="col-12">
                <p className="float-right"> Have an account already? </p>
            </div>
        </div>
        <button className="btn btn-dark"
            onClick={handleFinish}
            onMouseEnter={(e) => { e.target.style.background = "white"; e.target.style.color = "black" }}
            onMouseLeave={(e) => { e.target.style.background = "black"; e.target.style.color = "white" }}>
            Create Account
        </button>
        <button className="btn btn-dark float-right"
            onClick={setisLoggingIn}
            onMouseEnter={(e) => { e.target.style.background = "white"; e.target.style.color = "black" }}
            onMouseLeave={(e) => { e.target.style.background = "black"; e.target.style.color = "white" }}>
            Log in
        </button>
    </div>
    )
}