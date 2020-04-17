import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

let self;

import { getCustomerDetails, updateCustomer, deleteCustomer } from '../actions/Customer';
import { createTicket, listTicket } from '../actions/Ticket';
import { toDateString } from '../helpers';

class TicketItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, title, message, createdAt } = this.props;
		return (
			<tr>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '15%' }}>The man</td>
				<td style={{ width: '20%' }}>
					<Link className="font-w600" to={`/tickets/:id`}>{title}</Link>
				</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{message}
				</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '20%' }}>
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
		const { fullname, email, phone, address, note } = current;
		$('#update-customer-name').val(fullname);
		$('#update-customer-email').val(email);
		$('#update-customer-phone').val(phone);
		$('#update-customer-address').val(address);
		$('#update-customer-note').val(note);
		await this.props.dispatch(listTicket());
	}

	async updateCustomer() {
		const { customerId } = self.state;
		const fullname = $('#update-customer-name').val();
		const email = $('#update-customer-email').val();
		const phone = $('#update-customer-phone').val();
		const address = $('#update-customer-address').val();
		const note = $('#update-customer-note').val();
		if (!fullname) {
			$('#update-customer-error').text('Customer name must not be empty!');
			return;
		}
		await self.props.dispatch(updateCustomer(customerId, { fullname, email, phone, address, note }));
		$('#update-customer-error').text('');
		Swal.fire({
			html: 'Successful update!',
			timer: 2000
		});
	}

	async deleteCustomer() {
		const { customerId } = self.state;
		const fullname = $('#update-customer-name').val();
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if (result.value) {
				await self.props.dispatch(deleteCustomer(customerId));
				await Swal.fire({
					title: 'Deleted!',
					html: `Customer <strong>"${fullname}"</strong> has been deleted.`,
					timer: 2000
				});
				window.location.href = '/customers';
			}
		})
	}

	async createTicket() {
		const title = $('#create-ticket-title').val();
		const message = $('#create-ticket-message').val();
		if (!title || !message) {
			$('#create-ticket-error').text('All fields must not be empty');
			return;
		}
		const data = { title, message, ownerId: self.state.customerId };
		await self.props.dispatch(createTicket(data));
		$('#create-ticket-error').text('');
		$('#modal-create-ticket input').val('');
		$('#modal-create-ticket textarea').val('');
		$('#modal-create-ticket').modal('hide');
	}

	render() {
		const list = this.props.ticket.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2"></h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="row">
						<div className="col-md-5 col-xl-3">
							<div id="one-inbox-side-nav" className="d-none d-md-block push">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Customer Details</h3>
									</div>
									<div className="block-content font-size-sm">
										<div className="row">
											<div className="form-group col-sm-12">
												<label htmlFor="update-customer-name">Full Name*</label>
												<input type="text" className="form-control" id="update-customer-name" />
											</div>
											<div className="form-group col-sm-12">
												<label htmlFor="update-customer-email">Email</label>
												<input type="email" className="form-control" id="update-customer-email" />
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
												<button type="button" className="btn btn-sm btn-danger" onClick={this.deleteCustomer}>Delete</button>
												<button type="button" className="btn btn-sm btn-info" onClick={this.updateCustomer}>Save</button>
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
										<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-ticket"><i className="fa fa-plus mr-1"></i> New Ticket</button>
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
														<button type="button" className="btn btn-sm btn-primary" onClick={this.createTicket}><i className="fa fa-check mr-1"></i>Ok</button>
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
													return (<TicketItem key={item._id} {...item} />)
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