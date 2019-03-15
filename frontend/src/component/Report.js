import React from 'react';
import {Button, Table, Label} from 'semantic-ui-react'
import {xfetch} from '../commons/Commons';
import format from 'date-fns/format';

type RState = {
	start: string,
	end: string,
	services: Array,
	isLoading: boolean,
}

class Report extends React.Component<{}, RState> {
	initialState: RState

	constructor(props) {
		super(props);
		this.initialState = {
			start: '',
			end: '',
			services: [],
			isLoading: false,
		}
		this.state = this.initialState;
	}

	handleSubmit = (e: SynteticEvent<>) => {
		e.preventDefault();
		const {start, end} = this.state;
		this.setState({isLoading: true});
		xfetch('/report?start='+start+'&end='+end, {}, 'get')
			.then(res => res.json())
			.then(data => this.setState({services: data, isLoading: false}));
	}

	handleUpdate = (e: SynteticEvent<>) => {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const {services, start, end, isLoading} = this.state;
		let amount = 0.0;
		let disabled = 
			(start.length > 0 && end.length > 0) ? false : true;
		if(isLoading) {
			return <div className="text-center col-12"> Carregando <i className="fa fa-spinner fa-spin"/> </div>;
		}
		return (
			<div className="col-12 text-center">
				<h3>Relatório por datas</h3>
				<form onSubmit={this.handleSubmit}>
					<input 
						className="col-4"
						type="date"
						value={start}
						onChange={this.handleUpdate}
						name="start"/>
					<input 
						className="col-4"
						type="date"
						value={end}
						onChange={this.handleUpdate}
						name="end"/>
					<Button disabled={disabled} color="green" style={({margin: "15px"})}>
						Buscar
					</Button>
				</form>
				<div className="row">
					<div className="col-12">
						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Cliente</Table.HeaderCell>
									<Table.HeaderCell>Data</Table.HeaderCell>
									<Table.HeaderCell>Servico</Table.HeaderCell>
									<Table.HeaderCell>Valor</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{services.map((v, k) => {
									amount += v.service.value;
									let date = new Date(v.date);
									return (
										<Table.Row key={k}>
											<Table.Cell>
												<Label ribbon>{v.client.name}</Label>
											</Table.Cell>
											<Table.Cell>
												{format(date, 'DD/MM/YYYY')}
											</Table.Cell>
											<Table.Cell>{v.service.name}</Table.Cell>
											<Table.Cell>R$ {v.service.value.toFixed(2)}</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
						<div className="text-center col-12">

							<h3>
								TOTAL - 
								<i> R$ {amount.toFixed(2)} </i> 
							</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Report;
