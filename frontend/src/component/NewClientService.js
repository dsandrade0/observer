import React from 'react';
import {Redirect} from 'react-router-dom';
import Commons, {xfetch} from '../commons/Commons';
import $ from 'jquery';

type NCSState = {
	services: Array,
	client: object,
	inserted: boolean,
	isLoading: boolean,
}

class NewClientService extends React.Component<{}, NCSState> {
	initialState: NCSState
	constructor(props: NCSProps) {
		super(props);
		this.initialState = {
			client: {},
			services: [],
			serviceSelected: '',
			inserted: false,
			isLoading: false,
		};
		this.state = this.initialState;
	}

	componentDidMount() {
		this.setState({isLoading: true});
		xfetch('/client/'+this.props.match.params.clientId, {}, 'get')
			.then(resp => resp.json())
			.then(data => this.setState({client: data, isLoading: false})); 

		xfetch('/services', {}, 'get')
			.then(resp => resp.json())
			.then(data => this.setState({services: data, isLoading: false})); 
	}

	handleSubmit = (e: SynteticEvent<>) => {
		e.preventDefault();
		const data = {
			clientId: Number.parseInt(this.props.match.params.clientId),
			serviceId: this.state.serviceSelected,
		};

		$.post('http://'+Commons.server+':'+Commons.port+'/wash/new', data, function(res) {
			this.setState({inserted: true});
		}.bind(this))
		.fail(function(r) { alert('Algo deu errado')});

	}

	handleChange = (e: SynteticEvent<>) => {
		console.log(e.target);
		this.setState({[e.target.name]: e.target.value})
	}

	render() {
		const {client, isLoading, services, inserted} = this.state;
		let resp = <div/>;
		if (inserted) {
			return <Redirect to={"/detail/"+this.props.match.params.clientId}/>;
		}
		if(isLoading) {
			return ( 
				<div className="text-center col-12"> 
					Carregando 
					<i className="fa fa-spinner fa-spin"/>
				</div>
			);
		}
		return (
			<div className="col-12 text-center">
				{resp}
				<div className="col-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-row">
							<div className="col-12">
								<label className="form-control"disabled>
									{client.name + ' - '+ client.car }
								</label>

							</div>
							<div className="col-12">
								<select name='serviceSelected' className="form-control" onChange={this.handleChange}>
									<option/>
									{services.map((v, k) => {
										return (
											<option value={v.id} key={k}> {v.name} </option>
										);
									})}
								</select>
							</div>
							<div className="col" style={({margin: '20px'})}>
								<button className="btn btn-success"> Cadastrar </button>
							</div>
						</div>
					</form>	
				</div>
			</div>
		);
	}
}

export default NewClientService;
