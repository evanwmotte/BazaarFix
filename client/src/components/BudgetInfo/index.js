import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import './style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.grey[200]
    }
}));

export default function BudgetInfo({ remaining, spent, budget }) {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem alignItems="center " button>
                <li alignText="center">Remaining Left To Spend: ${remaining}</li>
            </ListItem>
            <Divider />
            <ListItem button divider>
                <li align="center">You Have Spent: ${spent}</li>
            </ListItem>
            <ListItem button>
                <li align="center">Your Total Budget: ${budget}</li>
            </ListItem>
        </List>
    );
}