import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'
class Home extends Component<> {

  render() {
    return (
			<div>
				<div className="col-12 text-center">
					<div>		
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
								<Table.Row>
									<Table.Cell>
										172.23.7.48:8080 ( PORTAL )
									</Table.Cell>
									<Table.Cell>
										<Icon name="certificate" color="green"/>
									</Table.Cell>
									<Table.Cell>
										<Button color="blue"> Checar </Button>
										<Button color="red"> Derrubar </Button>
										<Button color="yellow"> Ping </Button>
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>
										172.23.7.116 ( MYSQL )
									</Table.Cell>
									<Table.Cell>
										<Icon name="certificate" color="red"/>
									</Table.Cell>
									<Table.Cell>
										<Button color="blue"> Checar </Button>
										<Button color="red"> Derrubar </Button>
										<Button color="yellow"> Ping </Button>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>


				</div>
			</div>
    );
  }
}

export default Home;
