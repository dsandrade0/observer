import React from 'react';
import {xfetch} from '../commons/Commons';
import ListService from './ListService';

type NSState = {
	nameService: string,
	value: number,
}

class NewService extends React.Component<{}, NSState> {
	initialState: NSState
	constructor(props) {
		super(props);
		this.initialState = {
			nameService: '',
			value: '',
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
			name: this.state.nameService,
			value: this.state.value,
		};
		xfetch('/service', data, 'post')
			.then(res => res.json())
			.then(d => this.setState({inserted: true}));
	}

	render() {
		const {nameService, value, inserted} = this.state;
		let resp = <div/>;
		if (inserted) {
			resp = (
				<div className='col-12 text-center'> 
					<label className='alert alert-success'>
						Serviço inserido com sucesso
					</label>
				</div>
			);
		}
		return(
			<div className="col-12 text-center">
				{resp}
				<div className="col-12">
					<form onSubmit={this.handleSubmit}>
						<div className="form-row">
							<div className="col-12">
								<input
									name="nameService"
									type="text"
									className="form-control"
									placeholder="Nome"
									value={nameService}
									onChange={this.handleUpdate}/>

							</div>
							<div className="col-12">
								<input
									name='value'
									type="number"
									className="form-control"
									placeholder="Valor"
									value={value}
									onChange={this.handleUpdate}/>
							</div>
							<div className="col" style={({margin: '20px'})}>
								<button className="btn btn-success"> Cadastrar </button>
							</div>
						</div>
					</form>	
				</div>
				<div className='row'>
					<div className='col-12' style={({margin: '20px'})}>
						<ListService />
					</div>
				</div>
			</div>
		);
	}
}

export default NewService;
