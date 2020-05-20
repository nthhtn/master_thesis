import React, { Component } from 'react';
import swal from 'sweetalert2';

import { getCustomerDetails, updateCustomer, deleteCustomer } from '../actions/Customer';
import { createTicket } from '../actions/Ticket';
import { listTicketSector } from '../actions/TicketSector';
import { listIssue } from '../actions/Issue';
import { toDateString } from '../helpers';

let self;

const statusClass = { new: 'secondary', open: 'primary', inprogress: 'warning', resolved: 'success', closed: 'danger' };
const severityClass = { normal: 'primary', high: 'warning', low: 'success', urgent: 'danger' };

class TicketItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick() {
		this.props.history.push(`/tickets/${this.props._id}`);
	}

	render() {
		const { _id, title, message, createdAt, sector, issue, status, severity } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#5c80d1', fontWeight: 600 }}>
					{title}
				</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{message}
				</td>
				<td style={{ width: '8%' }}><span className={'badge badge-' + statusClass[status]}>{status}</span></td>
				<td style={{ width: '8%' }}><span className={'badge badge-' + severityClass[severity]}>{severity}</span></td>
				<td className="d-none d-sm-table-cell font-w600" style={{ color: sector ? sector.color : 'black', width: '8%' }}>
					{sector ? sector.name : ''}
				</td>
				<td className="d-none d-sm-table-cell font-w600" style={{ color: issue ? issue.color : 'black', width: '8%' }}>
					{issue ? issue.name : ''}
				</td>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '8%' }}>Assignee</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '10%' }}>
					<em>{toDateString(createdAt)}</em>
				</td>
			</tr>
		);
	}

}

export default class CustomerDetails extends Component {

	constructor(props) {
		super(props);
		this.state = { customerId: this.props.match.params.id };
		self = this;
	}

	async componentDidMount() {
		const { customerId } = this.state;
		await this.props.dispatch(getCustomerDetails(customerId));
		const { current } = this.props.customer;
		const { fullName, email, phone, address, note } = current;
		$('#update-customer-name').val(fullName);
		$('#update-customer-email').val(email);
		$('#update-customer-phone').val(phone);
		$('#update-customer-address').val(address);
		$('#update-customer-note').val(note);
		this.props.ticketSector.list.length == 0 && await this.props.dispatch(listTicketSector());
		this.props.issue.list.length == 0 && await this.props.dispatch(listIssue());
	}

	async updateCustomer() {
		const { customerId } = self.state;
		const fullName = $('#update-customer-name').val();
		const email = $('#update-customer-email').val();
		const phone = $('#update-customer-phone').val();
		const address = $('#update-customer-address').val();
		const note = $('#update-customer-note').val();
		if (!fullName) {
			$('#update-customer-error').text('Missing required field(s)!');
			return;
		}
		await self.props.dispatch(updateCustomer(customerId, { fullName, email, phone, address, note }));
		$('#update-customer-error').text('');
		swal.fire({
			html: 'Successful update!',
			timer: 2000
		});
	}

	async deleteCustomer() {
		const { customerId } = self.state;
		const fullName = $('#update-customer-name').val();
		swal.fire({
			title: 'Are you sure?',
			html: "All customer-related info and tickets will be lost!<br/>You <strong>WON'T</strong> be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if (result.value) {
				await self.props.dispatch(deleteCustomer(customerId));
				await swal.fire({
					title: 'Deleted!',
					html: `Customer <strong>"${fullName}"</strong> has been deleted.`,
					timer: 2000
				});
				window.location.href = '/customers';
			}
		});
	}

	async createTicket() {
		const title = $('#create-ticket-title').val();
		const message = $('#create-ticket-message').val();
		const status = $('#create-ticket-status').val();
		const severity = $('#create-ticket-severity').val();
		const sectorId = $('#create-ticket-sector').val() == 0 ? '' : $('#create-ticket-sector').val();
		if (!title || !message || status == 0) {
			$('#create-ticket-error').text('Missing required field(s)');
			return;
		}
		const data = { title, message, ownerId: self.state.customerId, status, severity, sectorId };
		await self.props.dispatch(createTicket(data));
		$('#create-ticket-error').text('');
		$('#modal-create-ticket input').val('');
		$('#modal-create-ticket textarea').val('');
		$('#modal-create-ticket').modal('hide');
	}

	render() {
		const list = this.props.ticket.list;
		const listSector = this.props.ticketSector.list;
		const listIssue = this.props.issue.list;
		const { current } = this.props.customer;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">{current.fullName}</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="row">
						<div className="col-md-5 col-xl-3">
							<div id="one-inbox-side-nav" className="d-none d-md-block push">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Customer Info</h3>
										<div className="block-options">
											<button type="button" className="btn btn-danger" onClick={this.deleteCustomer}>
												<i className="fa fa-trash-alt"></i>
											</button>
										</div>
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
												<label htmlFor="update-customer-note">Note</label>
												<input type="text" className="form-control" id="update-customer-note" />
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
															<div className="form-group col-sm-6">
																<label htmlFor="create-ticket-status">Status*</label>
																<select className="form-control" id="create-ticket-status">
																	<option value="0">Please select</option>
																	<option value="open">Open</option>
																	<option value="new">New</option>
																	<option value="inprogress">In Progress</option>
																	<option value="resolved">Resolved</option>
																	<option value="closed">Closed</option>
																</select>
															</div>
															<div className="form-group col-sm-6">
																<label htmlFor="create-ticket-severity">Severity*</label>
																<select className="form-control" id="create-ticket-severity">
																	<option value="0">Please select</option>
																	<option value="low">Low</option>
																	<option value="normal">Normal</option>
																	<option value="high">High</option>
																	<option value="urgent">Urgent</option>
																</select>
															</div>
															<div className="form-group col-sm-6">
																<label htmlFor="create-ticket-sector">Sector</label>
																<select className="form-control" id="create-ticket-sector">
																	<option value="0">Please select</option>
																	{listSector.map((sector) =>
																		(<option key={sector._id} value={sector._id} style={{ color: sector.color }}>{sector.name}</option>))
																	}
																</select>
															</div>
															<div className="form-group col-sm-6">
																<label htmlFor="create-ticket-issue">Issue</label>
																<select className="form-control" id="create-ticket-issue">
																	<option value="0">Please select</option>
																	{listIssue.map((issue) =>
																		(<option key={issue._id} value={issue._id} style={{ color: issue.color }}>{issue.name}</option>))
																	}
																</select>
															</div>
															<div className="form-group col-sm-6">
																<label htmlFor="create-ticket-assignee">Assignee</label>
																<select className="form-control" id="create-ticket-assignee">
																	<option value="0">Please select</option>
																	<option value="open">Open</option>
																	<option value="new">New</option>
																	<option value="inprogress">In Progress</option>
																	<option value="resolved">Resolved</option>
																	<option value="closed">Closed</option>
																</select>
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
		);
	}

}