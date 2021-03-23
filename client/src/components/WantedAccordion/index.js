import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import './style.css'

export default function WantedAccordion({ wantedAds }) {

  return (
    <div id="contenedor">
      <h1 id="title"> ~  Wanted Ads  ~</h1>
      {wantedAds.map((wanteds, i) => {
        return (<div className="mb-2">
          <Accordion key={i} id="heading">
            <AccordionSummary
              aria-controls={"panel" + i + "a-content"}
              id={"panel" + i + "a-header"}
            >
              <div className="row">
                <div className="col-4">
                  <div className="ml-3 headers">
                    <h2> <b>{moment(wanteds.createdAt).format("MMM")}</b></h2>
                    <h1><b>{moment(wanteds.createdAt).format("DD")}</b></h1>
                  </div>
                </div>
                <div className="col-4">
                  <h3 id="ad">{wanteds.productName} </h3>
                </div>
                <div className="col-4">
                  <h4>
                    <button id="botones"
                      onMouseLeave={(e) => { e.target.style.background = "rgb(128, 141, 107)"; e.target.style.color = "black" }}
                      onMouseEnter={(e) => { e.target.style.background = "darkolivegreen"; e.target.style.color = "white" }}
                    >Contact The Owner</button>
                  </h4>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="ml-5">
                <b>
                  Max Price: $ {wanteds.price} <br />
                Category: {wanteds.category}<br />
                Description: {wanteds.notes}<br />
                </b>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>)
      })}
    </div>
  );
}