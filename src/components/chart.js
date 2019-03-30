import React, { PureComponent } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart } from 'recharts';

export default class Chart extends PureComponent {
	render() {
		const data = this.prepareDataFromProps(this.props.data);

		return (
			<LineChart
				width={700}
				height={300}
				data={data}
				margin={{
					top: 5, right: 30, left: 20, bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray='3 3'/>
				<XAxis dataKey='name'/>
				<YAxis domain={[ 1.12, 1.13 ]}/>
				<Tooltip content={<CustomTooltip active={true}/>}/>
				<Legend/>
				<Line type='monotone' dataKey='close' stroke='#8884d8'/>
				<Line type='monotone' dataKey='open' stroke='#82ca9d'/>
			</LineChart>
		);
	}

	prepareDataFromProps(data = []) {
		const parsedData = data.map((item) => {
			const { date, close, open, high, low } = item;
			const dateFromTimestamp = new Date(date);
			const day = dateFromTimestamp.getDate();
			const month = dateFromTimestamp.getMonth() + 1;
			const hour = dateFromTimestamp.getHours();
			const year = dateFromTimestamp.getFullYear();

			return { name: `${day}/${month}/${year}  ${hour}:00`, close, open, high, low };
		});

		return parsedData.reverse();
	}
}

const CustomTooltip = ({ active, payload }) => {
	if (active) {
		const high = payload[0] && payload[0].payload && payload[0].payload.high;
		const low = payload[0] && payload[0].payload && payload[0].payload.low;

		return (
			<div className="custom-tooltip">
				<p>high: {high}</p>
				<p>low: {low}</p>
			</div>
		);
	}

	return null;
};
