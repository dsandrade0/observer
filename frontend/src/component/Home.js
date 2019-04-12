import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'
import {xfetch} from "../commons/Commons";
class Home extends Component<> {
	constructor(props) {
		super(props);
		this.state = {
			servidores: [],
			msg: '',
		};
	}

	componentDidMount() {
		//TODO pega os dados do servidor

		xfetch('/api/servidores')
			.then(res => res.json())
			.then(data => this.setState({servidores: data}));
		/*let servers = [
			{id: '1', nome: 'Mysql', endereco: '172.23.7.116', porta: '3306', estado: true},
			{id: '2', nome: 'Tomcat Portal', endereco: '172.23.7.48', porta: '8080', estado: false},
			{id: '3', nome: 'Tomcat Concurso', endereco: '172.23.7.48', porta: '8085', estado: false}
		];

		this.setState({servidores: servers});*/
	}

	ping = (i) => {
		let servs = new Array();
		let servidor = {};
		xfetch('/api/ping?id='+i.target.value)
			.then(res => res.json())
			.then(data => {
				servidor = data;

				const {servidores} = this.state;
				servidores.map( (s, k) => {
					if (s.id == servidor.id) {
						servs.push(servidor);
					} else {
						servs.push(s);
					}
				});
				this.setState({servidores: servs});

			});
	}

	check = (el) => {
		const id = el.target.value;
		xfetch('/api/curl?id='+id)
			.then(res => res.json())
			.then(data => this.setState({msg: data.msg}));

	}

	render() {
		const {servidores, msg} = this.state;
    return (
			<div>
				<div className="col-12 text-center">
					<div>		
							<h3 className="alert alert-info"> {msg} </h3>
					</div>
				</div>
				<div className="col-12 text-center">
					<div> <hr/> </div>

					<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Servidor</Table.HeaderCell>
									<Table.HeaderCell>Estado</Table.HeaderCell>
									<Table.HeaderCell>Ação</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>

									{servidores.map((v, k) => {
										return (
											<Table.Row key={k}>
												<Table.Cell>
													{v.endereco + ':' + v.porta + ' ( ' + v.nome + ' )' }
												</Table.Cell>
												<Table.Cell>
													<Icon name="certificate" color={(v.estado) ? 'green' : 'red'}/>
												</Table.Cell>
												<Table.Cell>
													<Button color="blue" value={v.id} onClick={this.check}> Checar serviço web </Button>
													<Button color="red"> Derrubar </Button>
													<Button color="yellow" value={v.id} onClick={this.ping}>
														Ping
													</Button>
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

export default Home;
