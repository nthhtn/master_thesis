import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createTicket, listTicket } from '../actions/Ticket';

let self;

class TicketItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick() {
		this.props.history.push(`/tickets/${this.props._id}`);
	}

	render() {
		const { _id, title, message, owner, assignee, createdAt } = this.props;
		const datetime = new Date(createdAt);
		const date = datetime.getDate() < 10 ? '0' + datetime.getDate().toString() : datetime.getDate().toString();
		const month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1).toString() : (datetime.getMonth() + 1).toString();
		const year = datetime.getFullYear();
		const hour = datetime.getHours() < 10 ? '0' + datetime.getHours().toString() : datetime.getHours().toString();
		const min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes().toString() : datetime.getMinutes().toString();
		const datestring = `${date}/${month}/${year} ${hour}:${min}`;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
				<td className="font-w600 font-size-sm">
					<Link className="font-w600" to={`/tickets/${_id}`}>{title}</Link>
				</td>
				<td className="font-size-sm">{message}</td>
				<td>{status}</td>
				<td>{owner.fullname}</td>
				<td>{assignee}</td>
				<td>{datestring}</td>
			</tr>
		);
	}

}

export default class Ticket extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async createTicket() {
		const fullname = $('#create-ticket-name').val();
		const email = $('#create-ticket-email').val();
		const phone = $('#create-ticket-phone').val();
		const address = $('#create-ticket-address').val();
		const note = $('#create-ticket-note').val();
		if (!fullname) {
			$('#create-ticket-error').text('Ticket name must not be empty!');
			return;
		}
		await self.props.dispatch(createTicket({ fullname, email, phone, address, note }));
		$('#create-ticket-error').text('');
		$('#modal-create-ticket input').val('');
		$('#modal-create-ticket').modal('hide');
	}

	async componentDidMount() {
		this.props.dispatch(listTicket());
	}

	render() {
		const listTicket = this.props.ticket.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of tickets</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title"></h3>
							<div className="block-options">
								<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-ticket">
									<i className="fa fa-plus mr-1"></i> New Ticket
								</button>
							</div>
						</div>
						<div className="block-content">
							<div className="modal fade" id="modal-create-ticket" tabIndex="-1" role="dialog" aria-labelledby="modal-create-ticket" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New Ticket</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-ticket-name">Full Name*</label>
														<input type="text" className="form-control" id="create-ticket-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-ticket-email">Email</label>
														<input type="email" className="form-control" id="create-ticket-email" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-ticket-phone">Phone</label>
														<input type="text" className="form-control" id="create-ticket-phone" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-ticket-address">Address</label>
														<input type="text" className="form-control" id="create-ticket-address" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-ticket-note">Note</label>
														<input type="text" className="form-control" id="create-ticket-note" />
													</div>
													<div className="form-group col-sm-12">
														<label id="create-ticket-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createTicket}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th style={{ width: '20%' }}>Title</th>
											<th style={{ width: '20%' }}>Message</th>
											<th style={{ width: '10%' }}>Status</th>
											<th style={{ width: '10%' }}>Customer</th>
											<th style={{ width: '10%' }}>Assignee</th>
											<th style={{ width: '10%' }}>Created at</th>
										</tr>
									</thead>
									<tbody>
										{
											listTicket.map((item) => {
												const { _id } = item;
												return (<TicketItem key={_id} {...item} history={self.props.history} />);
											})
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

}