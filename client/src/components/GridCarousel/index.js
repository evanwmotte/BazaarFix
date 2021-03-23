import React, { useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { MediaCard } from "../Card";
import "./style.css";

const Arrow = ({ text, className }) => {
	return (<div className={className}>
		{text}
	</div>)
}

const ArrowLeft = Arrow({ text: <i className="fa fa-arrow-circle-left fa-3x" />, className: "arrow-prev" })
const ArrowRight = Arrow({ text: <i className="fa fa-arrow-circle-right fa-3x" />, className: "arrow-next" })

export const GridCarousel = ({ items, addToUser, categoryName }) => {
	let [selectedState, setSelectedState] = useState(selected)
	const selected = (items[0] || { name: 'item0' }).name
	const Grid = (items, selected) => {
		return items.map((item, index) => {
			return (<MediaCard key={index} product={item} addToUser={addToUser} />)
		});
	}

	const onSelect = (key) => {
		setSelectedState(key)
	}

	return (<>
		<div className="grid-carousel"  >
			<h1 style={{ color: "black", textShadow: "5px 5px 10px darkolivegreen", paddingLeft: "3%" }}>{categoryName}</h1>
			<ScrollMenu
				data={Grid(items, selectedState)}
				arrowLeft={ArrowLeft}
				arrowRight={ArrowRight}
				selected={selectedState}
				onSelect={onSelect}
				translate={-2}
				wheel={false}
			/>
		</div>
	</>);
}