import React from 'react';
import {xfetch} from '../commons/Commons';
import {Table, Label, Icon} from 'semantic-ui-react'; 

type BCState = {
	clients: Array,
	isLoading: boolean,
}

class BestClients extends React.Component<{}, BCState> {
	initialState: BCState

	constructor(props) {
		super(props);
		this.initialState = {
			clients: [],
			isLoading: false,
		}
		this.state = this.initialState;
	}

	componentDidMount() {
		this.setState({isLoading: true});
		xfetch('/bestClients', {}, 'get')
			.then(res => res.json())
			.then(json => this.setState({clients: json, isLoading: false}));
	}

	render() {
		const {isLoading, clients} = this.state;
		let firstMount = false; 

		if (isLoading) {
			return <div className="text-center"> Carregando ...</div>;
		}

		return (
			<div className="col-12 text-center">
				<h3> Melhores clientes </h3>
				<hr/>

				<div className="col-12">
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Nome</Table.HeaderCell>
							<Table.HeaderCell>Telefone</Table.HeaderCell>
							<Table.HeaderCell>Carro</Table.HeaderCell>
							<Table.HeaderCell>Valor Acumulado</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{clients.map((v, k) => {
							return (
								<Table.Row key={k}>
									<Table.Cell>
										<Label ribbon>{v.name}</Label>
									</Table.Cell>
									<Table.Cell>{v.phone}</Table.Cell>
									<Table.Cell>{v.car}</Table.Cell>
									<Table.Cell textAlign="center">
										<Label color={(!firstMount) ? 'green' 
												: 'red' }>
											R$ {(v.amount) ? v.amount : 0}
										</Label>
										{firstMount = true}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				</div>
			</div>
		);
	}
}

export default BestClients;
