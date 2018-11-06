import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResult from './ImageResult';
import axios from 'axios';

export default class Search extends Component {
	state = {
		searchText: '',
		amount: 15,
		apiUrl: 'https://pixabay.com/api',
		apiKey: '10605253-1bfa2d3d07e70edeeffb44776',
		images: []
	}

	handleChangeText = (e) => {
		const val = e.target.value
		this.setState({
			[e.target.name] : val
		}, () => {
			if(val === '') {
				this.setState({
					images: []
				})
			} else {
				axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`).then(res => this.setState({
						images: res.data.hits
				}))
				.catch(err => console.log(err))
			}
				
			})
	}

	handleChangeAmount = (e, index, value) => {
		this.setState({
			amount: value
		})
	}

	render() {
		console.log(this.state.images)
		return (
			<div>
				<TextField 
					name="searchText"
					value={this.state.searchText}
					onChange={this.handleChangeText}
					floatingLabelText="search for Images"
					fullWidth={true}
				/>
				<br/>
				<SelectField
					name="amount"
					floatingLabelText="Amount"
					value={this.state.amount}
					onChange={this.handleChangeAmount}
					fullWidth={true}
				>
					<MenuItem value={5} primaryText="5" />
					<MenuItem value={10} primaryText="10" />
					<MenuItem value={15} primaryText="15" />
					<MenuItem value={20} primaryText="20" />
					<MenuItem value={25} primaryText="25" />
					<MenuItem value={30} primaryText="30" />
				</SelectField>
				<br/>
				{this.state.images.length > 0 ? (<ImageResult images={this.state.images}/>) : null}
			</div>
		);
	}
}
