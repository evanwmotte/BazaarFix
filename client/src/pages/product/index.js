import React, { useEffect, useState } from "react";
import ProductContent from '../../components/ProductContent'
import { getProduct } from "../../utils/ProductAPI"
import { useParams } from "react-router-dom"
import UserAPI from "../../utils/UserAPI"
import "./style.css"

export default function Product() {

    const [product, setProduct] = useState({})
    const { id } = useParams()
    
    useEffect(() => {
        getProduct(id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [])

    const addToUser = (id) => {
        UserAPI.updateUser({ "wishList": id })
        alert("This item has been added to your cart")
    }
    return (
        <div className="m-5 d-flex productcard">
            {product.image ? <ProductContent product={product} addToUser={addToUser} /> : ""}
            <div className="bgcard">
                <img className=""
                    src="https://i.pinimg.com/originals/b0/63/e6/b063e69aec55ee699cf38c757cabaae3.jpg" />
            </div>
        </div>
    )
}