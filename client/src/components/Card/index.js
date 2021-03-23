import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import TransitionsModal from '../../components/Modal'

export function MediaCard({ product, addToUser }) {
	return (
		<div className="wrapper">
			<div className="card">
				<img
					src={product.image[0]} alt="" />
				<div className="info">
					<h1>{product.productName}</h1>
					<p>{product.description}</p>
					<h4 className="float-right">${product.price}</h4>
					<TransitionsModal addToUser={addToUser} product={product._id}>
					</TransitionsModal>
					<Link to={"/product/" + product._id}><button className="more"><i className="fa fa-info" aria-hidden="true" /> More Info</button></Link>
				</div>
			</div>
		</div>
	);
}