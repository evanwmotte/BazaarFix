import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import WantedAccordion from "../../components/WantedAccordion"
import { getWanted } from '../../utils/WantedAPI'

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        alignItems: "center",
        height: "100%"
    }
}));

export function Wanted() {
    const classes = useStyles();

    const [wantedAds, setWantedAds] = useState({})

    useEffect(() => {
        getWantedAdds()
    }, [])

    function getWantedAdds() {
        getWanted()
            .then(res => {
                setWantedAds(res.data)
                console.log(res.data)
            }).then()
            .catch(err => console.log(err.message))
    }

    return (
        <div className="container-fluid" >
            <div className={classes.root}>
                {wantedAds.length >= 1 ? <WantedAccordion wantedAds={wantedAds} /> : <h1 style={{ textShadow: "2px 2px 15px darkolivegreen", textAlign: "center" }}><b>There are NOT Ads to Show </b> </h1>}
            </div>
        </div >
    )
}