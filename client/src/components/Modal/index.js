import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'darkolivegreen',
    border: '2px solid #000',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '15px',
    color: 'white'
  },
}));

export default function TransitionsModal({ addToUser, product }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    addToUser(product)
    setOpen(true);
    setTimeout(() => handleClose(), 700)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="cart" onClick={handleOpen}><i className="fa fa-shopping-cart" aria-hidden="true" />
						Add to cart
					</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            Item Added to Wishlist
          </div>
        </Fade>
      </Modal>
    </div>
  );
}