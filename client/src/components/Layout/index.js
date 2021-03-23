import React from "react";
import MiniDrawer from "../MiniDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	imgCarousel: {
		padding: theme.spacing(0),
		justifyContent: 'center',
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

export const Layout = ({ children }) => {

	const classes = useStyles()

	return (<>
		<MiniDrawer />

		<div className={classes.root} style={{ marginLeft: "100px" }}>
			<Grid container spacing={3}>
				{children}
			</Grid>
		</div>

	</>)

}
