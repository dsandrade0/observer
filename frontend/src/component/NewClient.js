import React from 'react';
import {xfetch} from '../commons/Commons';

type NCState = {
	nameClient: string,
	email: string,
	phone: string,
	car: string,
	inserted: boolean,
}

class NewClient extends React.Component<{}, NCState> {
	initialState: NCState
	constructor(props) {
		super(props);
		this.initialState = {
			nameClient: '',
			email: '',
			phone: '',
			car: '',
			inserted: false,
		};
		this.state = this.initialState;
	}

	handleUpdate = (e: SynteticEvent<>) => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = (e: SynteticEvent<>) => {
		e.preventDefault();
		const data = {
			name: this.state.nameClient,
			email: this.state.email,
			phone: this.state.phone,
			car: this.state.car,
		};
		xfetch('/client', data, 'post')
			.then(res => res.json())
			.then(d => this.setState({
				nameClient: '',
				email: '',
				phone: '',
				car: '',
				inserted: true,
			}));
	}

	render() {
		const {nameClient, phone, email, car, inserted} = this.state;
		let resp = <div/>;
		if (inserted) {
			resp = (
				<div className='col-12 text-center'> 
					<label className='alert alert-success'>
						Cliente inserido com sucesso
					</label>
				</div>
			);
		}
		return(
			<div className="col-12 text-center">
				{resp}
				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="col-12" style={({margin: '10px'})}>
							<input
								name="nameClient"
								type="text"
								className="form-control"
								placeholder="Nome"
								value={nameClient}
								onChange={this.handleUpdate}/>

						</div>
						<div className="col-12" style={({margin: '10px'})}>
							<input
								name='email'
								type="text"
								className="form-control"
								placeholder="Email"
								value={email}
								onChange={this.handleUpdate}/>
						</div>
						<div className="col-12" style={({margin: '10px'})}>
							<input
								name='phone'
								type="text"
								className="form-control"
								placeholder="Telefone" 
								value={phone}
								onChange={this.handleUpdate}/>
						</div>
						<div className="col-12" style={({margin: '10px'})}>
							<input
								name='car'
								type="text"
								className="form-control"
								placeholder="Carro"
								value={car}
								onChange={this.handleUpdate}/>
						</div>
						<div className="col-12" style={({margin: '10px'})}>
							<button className="btn btn-success"> Cadastrar </button>
						</div>
					</div>
				</form>	
			</div>
		);
	}
}

export default NewClient;
