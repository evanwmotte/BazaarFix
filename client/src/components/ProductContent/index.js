import React from 'react';
import PictsSlideshow from "../PictsSlideshow"
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        padding: "0.6rem",
        outline: 'none',
        border: "none",
        borderRadius: "3px",
        background: "black",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.4s ease"
    },
    middlebottom: {
        position: "absolute",
        margin: "auto",
        left: -50,
        bottom: 0,
    }
}));

export default function ProductContent({ product, addToUser }) {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className="m-2 ml-2">
            <Grid item  >
                <PictsSlideshow image={product.image} />
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h3" color="textPrimary">
                            {product.productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {product.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <button className={classes.button}
                            onClick={() => { addToUser(product._id) }}
                            onMouseLeave={(e) => { e.target.style.background = "black"; e.target.style.color = "white" }}
                            onMouseEnter={(e) => { e.target.style.background = "darkolivegreen"; e.target.style.color = "white" }}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                             Add to cart
                        </button>
                    </Grid>
                </Grid>
                <Grid item xs={4} sm container className="position-relative">
                    <Grid item className={classes.middlebottom}>
                        <Typography variant="h6" >
                            Seller : { }
                        </Typography>
                        <button className={classes.button}
                            onMouseLeave={(e) => { e.target.style.background = "black"; e.target.style.color = "white" }}
                            onMouseEnter={(e) => { e.target.style.background = "darkolivegreen"; e.target.style.color = "white" }}>
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                             Contact Seller
                        </button>
                    </Grid>
                </Grid>
                <Grid item >
                    <Typography variant="h4" className="mr-2">
                        Price : ${product.price}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}