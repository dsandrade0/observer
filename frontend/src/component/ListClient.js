import React from 'react';
import {Link} from 'react-router-dom';
import {xfetch} from '../commons/Commons';
import {Table, Label, Icon} from 'semantic-ui-react';

type LCState = {
	clients: Array,
	isLoading: boolean,
	deleted: boolean,
}

class ListClient extends React.Component<{}, LCState> {
	initialState: LCState
	constructor(props) {
		super(props);
		this.initialState = {
			clients: [],
			isLoading: false,
			delete: false,
		};
		this.state = this.initialState;
	}

	fetchClients = () => {
		this.setState({isLoading: true});
		xfetch('/clients', {}, 'get')
			.then(res => res.json())
			.then(data => this.setState({clients: data, isLoading: false}));
	}

	componentDidMount() {
		this.fetchClients();
	}

	delete = (e: HTMLElement<>) => {
		const id = e.target.id;
		const res = 
			window.confirm("Deseja realmente excluir o cliente?");

		if (res) {
			xfetch('/client/'+id, {}, 'delete')
				.then(data => {
					//this.setState({deleted: true});
					this.fetchClients();
				})
			.catch(function(error) {
				alert('Não foi possivel apagar o cliente');
			});
		}
	}

	render() {
		const {clients, isLoading} = this.state;

		if(isLoading) {
			return <div> Carregando <i className="fa fa-spinner fa-spin"/> </div>;
		}

		return (
			<div className="col-12 text-center">
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Nome</Table.HeaderCell>
							<Table.HeaderCell>Telefone</Table.HeaderCell>
							<Table.HeaderCell>Carro</Table.HeaderCell>
							<Table.HeaderCell>Acao</Table.HeaderCell>
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
									<Table.Cell>
										<Link to={'/wash/'+v.id}> 
											<span title='Novo Servico' className="fa fa-plus"/>
										</Link>
										&nbsp;|&nbsp;
										<Link to={'/edit/'+v.id}> 
											<span title='Alterar' className="fa fa-edit"/>
										</Link>
										&nbsp;|&nbsp;
										<Link to={'/detail/'+v.id}> 
											<span title='Informações' className="fa fa-info"/>
										</Link>
										&nbsp;|&nbsp;
										<Icon color="red" id={v.id} onClick={this.delete} name='times' />
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}

export default ListClient;
