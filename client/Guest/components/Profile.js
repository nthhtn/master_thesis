import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { toDateString } from '../helpers';

let self;
const statusClass = { new: 'secondary', open: 'primary', inprogress: 'warning', resolved: 'success', closed: 'danger' };

class TicketItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick() {
		this.props.history.push(`/tickets/${this.props._id}`);
	}

	render() {
		const { _id, title, message, createdAt, status } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#5c80d1', fontWeight: 600 }}>
					{title}
				</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{message}
				</td>
				<td style={{ width: '10%' }}><span className={'badge badge-' + statusClass[status]}>{status}</span></td>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '10%' }}>Assignee</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '10%' }}>
					<em>{toDateString(createdAt)}</em>
				</td>
			</tr>
		);
	}

}

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async componentDidMount() {
		const { current } = this.props.customer;
		const { fullName, email, phone, address } = current;
		$('#update-customer-name').val(fullName);
		$('#update-customer-email').val(email);
		$('#update-customer-phone').val(phone);
		$('#update-customer-address').val(address);
	}

	render() {
		const list = this.props.ticket.list;
		const { me } = this.props.user;
		return (
			<div id="page-container">
				<main id="main-container">
					<div className="bg-body-light">
						<div className="content content-full">
							<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
								<h1 className="flex-sm-fill h3 my-2">Hello, {me.firstName + ' ' + me.lastName}</h1>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="row">
							<div className="col-md-5 col-xl-3">
								<div id="one-inbox-side-nav" className="d-none d-md-block push">
									<div className="block">
										<div className="block-header block-header-default">
											<h3 className="block-title">My Info</h3>
										</div>
										<div className="block-content font-size-sm">
											<div className="row">
												<div className="form-group col-sm-12">
													<label htmlFor="update-customer-name">Full Name*</label>
													<input type="text" className="form-control" id="update-customer-name" />
												</div>
												<div className="form-group col-sm-12">
													<label htmlFor="update-customer-email">Email</label>
													<input type="email" className="form-control" id="update-customer-email" disabled />
												</div>
												<div className="form-group col-sm-12">
													<label htmlFor="update-customer-phone">Phone</label>
													<input type="text" className="form-control" id="update-customer-phone" />
												</div>
												<div className="form-group col-sm-12">
													<label htmlFor="update-customer-address">Address</label>
													<input type="text" className="form-control" id="update-customer-address" />
												</div>
												<div className="form-group col-sm-12">
													<label id="update-customer-error" style={{ color: 'red' }}></label>
												</div>
												<div className="form-group col-sm-12 text-right">
													<button type="button" className="btn btn-sm btn-primary" onClick={this.updateCustomer}>
														<i className="fa fa-check"></i> Save
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-xl-9">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Tickets</h3>
										<div className="block-options">
											<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-ticket"><i className="fa fa-plus"></i></button>
										</div>
									</div>
									<div className="block-content">
										<div className="modal fade" id="modal-create-ticket" tabIndex="-1" role="dialog" aria-labelledby="modal-create-ticket" aria-modal="true" style={{ paddingRight: '15px' }}>
											<div className="modal-dialog modal-lg" role="document">
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
																	<label htmlFor="create-ticket-title">Title*</label>
																	<input type="text" className="form-control" id="create-ticket-title" />
																</div>
																<div className="form-group col-sm-12">
																	<label htmlFor="create-ticket-message">Message*</label>
																	<textarea rows="4" className="form-control" id="create-ticket-message" />
																</div>
																<div className="form-group col-sm-12">
																	<label id="create-ticket-error" style={{ color: 'red' }}></label>
																</div>
															</div>
														</div>
														<div className="block-content block-content-full text-right border-top">
															<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
															<button type="button" className="btn btn-sm btn-primary" onClick={this.createTicket}><i className="fa fa-check"></i> Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between push"></div>
										<div className="pull-x">
											<table className="js-table-checkable table table-hover table-vcenter font-size-sm js-table-checkable-enabled">
												<tbody>
													{list.map((item) => {
														return (<TicketItem key={item._id} {...item} history={self.props.history} />)
													})}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}

}