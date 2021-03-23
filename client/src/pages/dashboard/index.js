import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import { Grid, Container } from '@material-ui/core/';
import BudgetForm from '../../components/BudgetForm'
import BudgetInfo from '../../components/BudgetInfo'
import OrdersList from '../../components/ProductTable';
import WantedAdList from '../../components/WantedAdTable'
import UserAPI from '../../utils/UserAPI';
import GaugeChart from 'react-gauge-chart';

function Dashboard(props) {

    const [budget, setBudget] = useState(0)
    const [spent, setSpent] = useState(0)
    const [wishlist, setWishlist] = useState([])
    const [products, setProducts] = useState([])
    const [wantedAds, setWantedAds] = useState([])
    let inputBudget = ""

    useEffect(() => {
        getBudget()
    }, [])

    const getBudget = () => {
        UserAPI.getUser()
            .then(res => {
                setBudget(res.data.budget)
                setSpent(res.data.amountSpent)
                setWishlist(res.data.wishList)
                setProducts(res.data.products)
                setWantedAds(res.data.wantedPosts)
            }).then()
            .catch(err => console.log(err.message))
    }

    const updateUser = (budget) => {
        UserAPI.updateUser({ "budget": parseInt(budget) })
    }

    const handleInputChange = (event) => {
        inputBudget = event.target.value
    };

    const handleFormSubmit = async () => {
        await updateUser(inputBudget)
        getBudget()
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={6} lg={4} style={{ paddingRight: "50px" }}>
                    {budget === 0 ?
                        <BudgetForm
                            onClick={handleFormSubmit}
                            onChange={handleInputChange}
                        />
                        :
                        <Paper align="center">
                            <GaugeChart
                                id="gauge-chart5"
                                percent={((spent / budget) - 1) * -1}
                                textColor="black"
                                nrOfLevels={5}
                                colors={['#EA4228', '#F5CD19', '#5BE12C']}
                            />
                            <BudgetInfo
                                budget={budget}
                                spent={spent}
                                remaining={budget - spent}
                            />
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12} md={12} sm={6} lg={8} style={{ paddingRight: "50px" }}>
                    <Paper>
                        {wishlist ? <OrdersList wishlist={wishlist} title={"Your Wishlist"} /> : <h1>You have no items on your wishlist</h1>}
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={8} lg={8} style={{ paddingRight: "50px" }}>
                    <Paper>
                        {products ? <OrdersList wishlist={products} title={"Your Products For Sale"} /> : ""}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} sm={4} lg={4} style={{ paddingRight: "50px" }}>
                    <Paper>
                        {products ? <WantedAdList wantedAd={wantedAds} title={"Your Wanted Ads"} /> : ""}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;
