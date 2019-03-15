import React, { Component } from 'react';
import {Grid, Header, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Top extends Component<{}, any> {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'home',
		};
	}

	handleItemClick = (e: SysteticEvent<>, {name, value}) => {
		this.setState({activeItem: name});
	}

  render() {
    return (
			<div>
				<Grid style={({margin: '15px'})} textAlign='center'>
					<Grid.Column width={16}>
						<Header as='h2' icon textAlign='center'>
							<Icon name='computer' circular />
							<Header.Content>
								Observer oO
							</Header.Content>
						</Header>
					</Grid.Column>
				</Grid>
				<div className='col-12 text-center' 
					style={({marginTop: '10px', marginBottom: '20px'})}>
					{ /*<Link to='/' style={({margin: '5px'})}> Home </Link>
					<Link to='/client/new' style={({margin: '5px'})}> Novo Cliente </Link>
					<Link to='/service/new' style={({margin: '5px'})}> Criar Serviço </Link>
					<Link to='/bestClients' style={({margin: '5px'})}> Melhores clientes </Link>
					<Link to='/report' style={({margin: '5px'})}> Relatório </Link> */}
				</div>
			</div>
    );
  }
}

export default Top;
