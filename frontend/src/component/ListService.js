import React from 'react';
import {Link} from 'react-router-dom';
import {xfetch} from '../commons/Commons';
import {Icon} from 'semantic-ui-react';

type LSState = {
	services: Array,
	isLoading: boolean,
}

class ListService extends React.Component<{}, LSState> {
	initialState: LSState
	constructor(props) {
		super(props);
		this.initialState = {
			services: [],
			isLoading: false,
		};
		this.state = this.initialState;
	}

	fetchServices = () => {
		this.setState({isLoading: true});
		xfetch('/services', {}, 'get')
			.then(res => res.json())
			.then(data => this.setState({services: data, isLoading: false}));
	}

	componentDidMount() {
		this.fetchServices();
	}

	delete = (e: HTMLElement<>) => {
		const id = e.target.id;
		const res = 
			window.confirm("Deseja realmente excluir esse serviço?");

		if (res) {
			xfetch('/service/'+id, {}, 'delete')
				.then(data => {
					//this.setState({deleted: true});
					this.fetchServices();
				})
			.catch(function(error) {
				alert('Não foi possivel apagar o cliente');
			});
		}
	}

	render() {
		const {services, isLoading} = this.state;

		if(isLoading) {
			return <div> Carregando <i className="fa fa-spinner fa-spin"/> </div>;
		}

		return (
			<div className="col-12 text-center">
				<table className="table table-hover">
					<thead>
						<tr>
							<th> Nome </th>
							<th> Valor </th>
							<th> Acao </th>
						</tr>
					</thead>
					<tbody>
						{services.map((v, k) => {
							return (
								<tr key={k}>
									<td> {v.name} </td>
									<td> R$ {v.value} </td>
									<td>
										<Link to={'/service/edit/'+v.id}> 
											<i className="fa fa-edit"/> 
										</Link>
										&nbsp;|&nbsp;
										<Link to={'/service/'+v.id}> 
											<i className="fa fa-info"/> 
										</Link>
										&nbsp;|&nbsp;
										<Icon color="red" id={v.id} onClick={this.delete} name='times' />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ListService;
