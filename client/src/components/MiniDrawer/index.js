import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BallotIcon from '@material-ui/icons/Ballot';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import QueueIcon from '@material-ui/icons/Queue';
import './style.css'
import { Link } from "react-router-dom";
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const drawerWidth = 240;

const links = [
	{
		name: "Homepage",
		icon: (<HomeIcon />),
		to: "/home"
	},
	{
		name: "Account",
		icon: (<AccountBoxIcon />),
		to: "/Dashboard"
	},
	{
		name: "Wanted Ads",
		icon: (<BallotIcon />),
		to: "/wanted"
	},
	{
		name: "Post Product",
		icon: (<QueueIcon />),
		to: "/post-product"
	},
	{
		name: "Post Wanted Ad",
		icon: (<PostAddIcon />),
		to: "/post-wanted"
	}
]

const useStyles = makeStyles((theme) => ({

	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,

	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	navrightmenu: {
		marginLeft: "auto",
		cursor: "pointer"
	},
	menucolor: {
		backgroundColor: "black",
	},
	bottomDrawer: {
		overflowX: "hidden",
		overflowY: "hidden",
		position: "relative",
		marginLeft: "-468px"
	},
	logo: {
		color: "white",
	}
}));

export default function MiniDrawer({ children }) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [toHome, setToHome] = React.useState(false)

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const logOut = () => {
		return Axios.get('/logout')
			.then(setTimeout(() => setToHome(true), 1500))
	}

	return (
		<div className={classes.root}>
			{toHome ? <Redirect to="/" /> : ""}
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar className={classes.menucolor}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Link to={"/home"} style={{ color: "white" }}>
						<Typography className={classes.logo} variant="h4" className="cursor-pointer">
							Bazaar6
					</Typography>
					</Link>

					<div className={classes.navrightmenu}>
						<h4 onClick={logOut}>Logout</h4>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List >
					{links.map(link => (
						<Link to={link.to}>
							<ListItem button key={link.name} onClick={handleDrawerClose}>
								<ListItemIcon>{link.icon}</ListItemIcon>
								<ListItemText style={{ color: 'forestgreen' }} primary={link.name} />
							</ListItem>
						</Link>
					))}
				</List>
				<div className={classes.bottomDrawer}>
					<img src="https://i.pinimg.com/originals/2f/0a/01/2f0a017d4e120c6fd8c3f062554c27ea.jpg" alt="" />
				</div>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
}