import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let array = new Array(30);
		for (let i = 0; i < array.length; i++) {
			array[i] = i + 1;
		}
		const data = (canvas) => {
			const ctx = canvas.getContext("2d")
			const gradient = ctx.createLinearGradient(0, 0, 100, 0);
			return {
				backgroundColor: gradient,
				labels: array,
				datasets: [
					{
						data: array.map((item) => (Math.floor(Math.random() * 10) + 1)),
						label: "Sector 1",
						borderColor: "#3e95cd",
						backgroundColor: "#3e95cd",
						fill: 'start'
					},
					{
						data: array.map((item) => (Math.floor(Math.random() * 10) + 1)),
						label: "Sector 2",
						borderColor: "#8e5ea2",
						backgroundColor: "#8e5ea2",
						fill: '-1'
					},
					{
						data: array.map((item) => (Math.floor(Math.random() * 10) + 1)),
						label: "Sector 3",
						borderColor: "#3cba9f",
						backgroundColor: "#3cba9f",
						fill: 1
					}
				]
			};
		};
		const options = {
			title: {
				display: true,
				text: "Bug report by sector"
			},
			legend: {
				display: true,
				position: "bottom"
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						min: 0,
						max: 20
					}
				}]
			},
			plugins: {
				filler: {
					propagate: true
				}
			}
		};
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">This site is under construction</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="row">
						<div className="col-md-6 col-xl-6">
							<div className="block">
								<div className="block-header block-header-default">
									<h3 className="block-title">Line Chart</h3>
								</div>
								<div className="block-content">
									<Line data={data} options={options} />
								</div>
							</div>
						</div>
						<div className="col-md-6 col-xl-6">
							<div className="block">
								<div className="block-header block-header-default">
									<h3 className="block-title">Doughnut Chart</h3>
								</div>
								<div className="block-content">
									<Doughnut
										data={{
											labels: [
												"Issue 1",
												"Issue 2",
												"Issue 3",
												"Issue 4",
												"Issue 5"
											],
											datasets: [
												{
													label: "Ticket by issue this month",
													backgroundColor: [
														"#3e95cd",
														"#8e5ea2",
														"#3cba9f",
														"#e8c3b9",
														"#c45850"
													],
													data: [24, 52, 7, 8, 4]
												}
											]
										}}
										option={{
											title: {
												display: true,
												text: "Ticket by issue this month"
											}
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
