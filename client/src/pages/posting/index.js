import React, { useState } from "react";
import axios from 'axios';
import { saveProduct } from '../../utils/ProductAPI';
import { Alert, Fade } from "reactstrap";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./style.css"
import { Redirect } from 'react-router-dom';

export const Posting = () => {

	const [productPost, setProductPost] = useState({
		productName: "",
		description: "",
		price: "",
		category: "",
		image: []
	});

	const [messages, setMessages] = useState([]);
	// Uploaded Images State
	const [uploadedImages, setUploadedImages] = useState([])
	// State to track when submit has fired
	const [submitted, setSubmitted] = useState(false)


	const config = {
		headers: { "X-Requested-With": "XMLHttpRequest" }
	}
	const [imageSelected, setImageSelected] = useState("")

	const uploadImage = (req, res, files) => {
		const formData = new FormData()
		formData.append("file", imageSelected)
		formData.append("upload_preset", "bazaarimages")
		setUploadedImages([
			...uploadedImages,
			imageSelected.name
		])

		console.log(imageSelected)
		try {
			axios.post(`https://api.cloudinary.com/v1_1/bazaar6/image/upload`, formData, config)
				.then(function (response) {
					let newObject = productPost
					newObject.image.push(response.data.url)
					setProductPost(newObject)
				})
		} catch {
			res.status(400).send({ message: { content: "Please upload a valid image" } })
		}
	}

	const messagesView = messages.map((message) => (
		<Fade>
			<Alert color={message.type === "error" ? "secondary" : "primary"}>
				{message.prompt}
			</Alert>
		</Fade>
	))

	const uploadedImagesView = uploadedImages.map(item => <li className="imageList">{item}</li>)

	const resetMessages = () => setTimeout(() => setMessages([]), 5000)

	const handleSubmit = async () => {
		const response = await saveProduct(productPost)
		setMessages([{
			prompt: response.data.message.content
		}])
		resetMessages()
		setProductPost({ productName: "", description: "", price: "", category: "", image: [] })
		setUploadedImages([])
		setImageSelected('')
		setTimeout(() => setSubmitted(true), 1500)
	}

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{submitted ? <Redirect to="/dashboard" /> : ""}
			<div id="cont">
				<h1 id="title"> Post a Product to Sell </h1>
				<h4><b>Make Da' Money</b></h4>
				<div className="formbox">
					<Form>
						{messagesView}
						<FormGroup row>
							<Label>Product Name:</Label><br />
							<Input
								type="text"
								className="input"
								value={productPost.productName}
								onChange={e => setProductPost({ ...productPost, productName: e.target.value })}
							/>
						</FormGroup>
						<FormGroup row>
							<Label>Selling Price:</Label><br />
							<Input
								type="text"
								className="input"
								value={productPost.price}
								onChange={e => setProductPost({ ...productPost, price: e.target.value })}
							/>
						</FormGroup>
						<FormGroup row>
							<Label>Product Category:</Label><br />
							<Input
								type="select"
								className="input"
								value={productPost.category}
								onChange={e => setProductPost({ ...productPost, category: e.target.value })}
							>
								<option selected value="select-category">Select Category</option>
								<option value="electronics">Electronics</option>
								<option value="appliances">Appliances</option>
								<option value="lawn-and-garden">Lawn and Garden</option>
								<option value="furniture">Furniture</option>
								<option value="auto-parts">Auto Parts</option>
								<option value="tools">Tools</option>
								<option value="video-games">Video Games</option>
								<option value="sports">Sports</option>
								<option value="industrial">Industrial</option>
								<option value="baby">Baby</option>
								<option value="clothing">Clothing</option>
							</Input>
						</FormGroup>
						<FormGroup row>
							<Label>Product Description:</Label><br />
							<Input
								type="textarea"
								className="input"
								value={productPost.notes}
								onChange={e => setProductPost({ ...productPost, description: e.target.value })}
							/>
						</FormGroup>
						<FormGroup row>

							<input
								type="file"
								onChange={(event) => {
									setImageSelected(event.target.files[0])
								}}
							/>
							<Button className="botonupload" onClick={uploadImage}>Upload Image</Button>

						</FormGroup>
						<FormGroup row>
							<div>
								{uploadedImagesView}
							</div>
						</FormGroup>
						<FormGroup row style={{ marginTop: "30px" }}>
							<Button className="botonesubmit" style={{ width: "100%" }} onClick={handleSubmit}>Submit</Button>
						</FormGroup>
					</Form>
				</div>
			</div>
		</div>)
}