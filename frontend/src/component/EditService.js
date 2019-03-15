import React from 'react';
import {xfetch} from '../commons/Commons';

type ESState = {
	service: object,
	nameService: string,
	value: string,
	updated: boolean,
    isLoading: boolean,
}

class EditService extends React.Component<{}, NCSState> {
	initialState: ESState
	constructor(props) {
		super(props);
		this.initialState = {
			service: {},
			nameService: '',
			value: '',
			updated: false,
            isLoading: false,
		};
		this.state = this.initialState;
	}

	componentDidMount() {
		this.setState({isLoading: true});
		xfetch('/service/'+this.props.match.params.serviceId, {}, 'get')
			.then(resp => resp.json())
			.then(data => 
			this.setState({
				service: data, 
				nameService: data.name,
				value: data.value,
				isLoading: false})); 
	}

    handleInputChange = (ev: SynteticEvent<>) => {
		let target = ev.target;
        this.setState({
			[target.name]: target.value,
			updated: false
			});
	}

	handleSubmit = (e: SynteticEvent<>) => {
		e.preventDefault();
		const data = {
            serviceId: Number.parseInt(this.props.match.params.serviceId),
            name: this.state.nameService,
            value: this.state.value,
		};

        // TODO fazer o envio do formulario para o servidor
		xfetch('/service/'+this.props.match.params.serviceId, data, 'put')
			.then(resp => resp.json())
			.then(data => this.setState({service: data, updated: true}));
	}

    render() {
        let {service, nameService, value, isLoading, updated} = this.state;
		let resp = <div/>;
		if (updated) {
			resp = (
				<div id="idUpdate" className='col-12 text-center'> 
					<label className='alert alert-success'>
						Serviço alterado com sucesso
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
				{resp}
				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="col-12">
							<input
                                name="nameService"
								type="text"
								className="form-control"
								value={nameService}
                                onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
								name="value"
                                type="text"
								className="form-control"
								value={value}
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

export default EditService;
