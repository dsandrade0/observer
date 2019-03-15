import React from 'react';
import {Table} from 'semantic-ui-react';
import {xfetch} from '../commons/Commons';
import {format} from 'date-fns';

type DCState = {
	services: Array,
	client: object,
	isLoading: boolean,
}

class DetailClient extends React.Component<{}, DCState> {
	initialState: DCState

	constructor(props) {
		super(props);
		this.initialState = {
			services: [], 
			client: '',
			isLoading: false,
		}
		this.state = this.initialState;
	}

	componentDidMount() {
		const {clientId} = this.props.match.params;
		this.setState({isLoading: true});
		xfetch('/client/'+clientId, {}, 'get')
			.then(res => res.json())
			.then(data => this.setState({client: data}));

		xfetch('/test/detail?clientId='+clientId, {}, 'get')
			.then(res => res.json())
			.then(data => this.setState({services: data, isLoading: false}));
	}

	render() {
		const {isLoading, client, services} = this.state;
		let mount = 0;

		if (isLoading) {
			return ( 
				<div className="text-center col-12">
					Carregando <i className="fa fa-spinner fa-spin"/> 
				</div>);
		}

		return (
			<div className="col-12 text-center">
				<div className="col-12"> 
					<h3> Serviços de <i>{client.name}</i> </h3>
				</div>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Data</Table.HeaderCell>
							<Table.HeaderCell>Servico</Table.HeaderCell>
							<Table.HeaderCell>Valor</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{services.map((v, k) => {
							mount += v.service.value;
							return (
								<Table.Row key={k}>
									<Table.Cell> {format(v.date, 'DD/MM/YYYY')} </Table.Cell>
									<Table.Cell> {v.service.name} </Table.Cell>
									<Table.Cell> R$ {v.service.value} </Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<div>
					Total de <b>R$ {mount}</b>
				</div>
			</div>
		);
	}
}

export default DetailClient;
