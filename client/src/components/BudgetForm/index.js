import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import './style.css'

export default function BudgetForm(props) {

    return (
        <Paper align="center" style={{ height: 418 }}>
            <Typography id="description" align="center" variant="h6">Want to keep track of your spending? Set your budget below to avoid breaking the bank.</Typography>
            <div class="d-flex justify-content-center budgetForm">
                <input onChange={props.onChange} class="form-control form-control-lg" style={{ width: "50%" }} type="text" placeholder="Enter Your Monthly Budget"></input>
            </div>
            <div class="d-flex justify-content-center budgetForm">
                <button type="button" class="btn btn-dark" onClick={() => props.onClick()}>Set Your Budget</button>
            </div>
        </Paper>
    )
}