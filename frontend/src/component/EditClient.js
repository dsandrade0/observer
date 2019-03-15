import React from 'react';
import {xfetch} from '../commons/Commons';

type ECState = {
	client: Object,
	nameClient: string,
	email: string,
	phone: string,
	car: string,
	updated: boolean,
	isLoading: boolean,
}

class EditClient extends React.Component<{}, ECState> {
	initialState: ECState
	constructor(props) {
		super(props);
		this.initialState = {
			client: {},
			nameClient: '',
			email: '',
			phone: '',
			car: '',
			updated: false,
			isLoading: false,
		};
		this.state = this.initialState;
	}

	componentDidMount() {
		this.setState({isLoading: true});
		xfetch('/client/'+this.props.match.params.clientId, {}, 'get')
			.then(resp => resp.json())
			.then(data => 
				this.setState({
					client: data, 
					nameClient: data.name,
					email: data.email,
					phone: data.phone,
					car: data.car,
					isLoading: false})); 
	}

	handleInputChange = (ev: SynteticEvent<>) => {
		const target = ev.target;
		this.setState({
			[target.name]: target.value,
			updated: false
		});
	}

	handleSubmit = (e: SynteticEvent<>) => {
		e.preventDefault();
		const data = {
			id: Number.parseInt(this.props.match.params.clientId),
			name: this.state.nameClient,
			email: this.state.email,
			phone: this.state.phone,
			car: this.state.car
		};
		//TODO fazer envio do formulario para o servidor
		xfetch('/client/'+this.props.match.params.clientId, data, 'put')
			.then(resp => resp.json())
			.then(data => this.setState({client: data, updated: true})); 
	}

	render() {
		const {client, nameClient, phone, email, car, isLoading, updated} = this.state;
		let resp = <div/>;
		if (updated) {
			resp = (
				<div id="idUpdate" className='col-12 text-center'> 
					<label className='alert alert-success'>
						Cliente alterado com sucesso
					</label>
				</div>
			);
		}
		if (isLoading) {
			return (
				<div className="col-12 text-center">
					<div className="col-12 text-center"> 
						Carregando 
						<i className="fa fa-spinner fa-spin"/> 
					</div>
				</div>
			);
		}
		return(
			<div className="col-12 text-center">
				<div className="col-12 text-center" style={({margin: "15px"})}>
					<h3> Alterar dados de {client.name} </h3>
				</div>
				{resp}
				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="col-12">
							<input
								name="nameClient"
								type="text"
								className="form-control"
								value={nameClient}
								onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
								name="email"
								type="text"
								className="form-control"
								value={email}
								onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
								name="phone"
								type="text"
								className="form-control"
								value={phone}
								onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
								name="car"
								type="text"
								className="form-control"
								value={car}
								onChange={this.handleInputChange}/>
						</div>
						<div className="col-12" style={({margin: '10px'})}>
							<button className="btn btn-success"> Alterar </button>
						</div>
					</div>
				</form>	
			</div>
		);
	}
}

export default EditClient;
