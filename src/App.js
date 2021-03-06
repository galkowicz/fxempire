import React, { Component } from 'react';
import './App.css';
import { Tab } from 'semantic-ui-react';
import { TIME_STAMP_LIST } from './constants';
import Chart from './components/chart';
import { getAppData } from './apService';


class App extends Component {
	constructor(props) {
		super(props);
		this.handleTabChange = this.handleTabChange.bind(this);
		this.state = {
			activeIndex: 0,
			error: null,
			isLoaded: false,
			content: []
		}
	}

	componentDidMount() {
		const params = `?time=${TIME_STAMP_LIST[this.state.activeIndex]}`;

		this.fetchData(params);
	}

	render() {
		const panes = TIME_STAMP_LIST.map((time) => {
			return { menuItem: time, render: () => this.renderTable(this.state.content) }
		});

		return (
			<div className='App'>
				<Tab menu={{ pointing: true }} panes={panes} onTabChange={this.handleTabChange}
				     activeIndex={this.state.activeIndex}/>
			</div>
		);
	}

	handleTabChange(e, data) {
		this.setState({ activeIndex: data.activeIndex }, () => {
			const params = `?time=${TIME_STAMP_LIST[this.state.activeIndex]}`;
			this.fetchData(params);
		});
	}

	renderTable(items = []) {
		return <Tab.Pane><Chart data={items}/></Tab.Pane>;
	}

	fetchData(params) {
		this.setState({ isLoaded: false });

		getAppData(params)
			.then(res => res.json())
			.then((result) => {
					this.setState({
						isLoaded: true,
						content: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}
}

export default App;
