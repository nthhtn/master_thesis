import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createCustomer, listCustomer } from '../actions/Customer';

let self;

class CustomerItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick() {
		this.props.history.push(`/customers/${this.props._id}`);
	}

	render() {
		const { fullName, email, phone, address, note, _id } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
				<td className="font-w600 font-size-sm">
					<Link className="font-w600" to={`/customers/${_id}`}>{fullName}</Link>
				</td>
				<td className="font-size-sm"><em className="text-muted">{email}</em></td>
				<td>{phone}</td>
				<td>{address}</td>
				<td>{note}</td>
			</tr>
		);
	}

}

export default class Customer extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async createCustomer() {
		const fullName = $('#create-customer-name').val();
		const email = $('#create-customer-email').val();
		const phone = $('#create-customer-phone').val();
		const address = $('#create-customer-address').val();
		const note = $('#create-customer-note').val();
		if (!fullName) {
			$('#create-customer-error').text('Customer name must not be empty!');
			return;
		}
		await self.props.dispatch(createCustomer({ fullName, email, phone, address, note }));
		$('#create-customer-error').text('');
		$('#modal-create-customer input').val('');
		$('#modal-create-customer').modal('hide');
	}

	async componentDidMount() {
		this.props.dispatch(listCustomer());
	}

	render() {
		const listCustomer = this.props.customer.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of customers</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title"></h3>
							<div className="block-options">
								<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-customer">
									<i className="fa fa-plus mr-1"></i> New Customer
								</button>
							</div>
						</div>
						<div className="block-content">
							<div className="modal fade" id="modal-create-customer" tabIndex="-1" role="dialog" aria-labelledby="modal-create-customer" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New Customer</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-customer-name">Full Name*</label>
														<input type="text" className="form-control" id="create-customer-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-customer-email">Email</label>
														<input type="email" className="form-control" id="create-customer-email" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-customer-phone">Phone</label>
														<input type="text" className="form-control" id="create-customer-phone" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-customer-address">Address</label>
														<input type="text" className="form-control" id="create-customer-address" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-customer-note">Note</label>
														<input type="text" className="form-control" id="create-customer-note" />
													</div>
													<div className="form-group col-sm-12">
														<label id="create-customer-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createCustomer}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th style={{ width: '20%' }}>Full name</th>
											<th style={{ width: '20%' }}>Email</th>
											<th style={{ width: '20%' }}>Phone</th>
											<th style={{ width: '20%' }}>Address</th>
											<th style={{ width: '20%' }}>Note</th>
										</tr>
									</thead>
									<tbody>
										{
											listCustomer.map((item) => {
												const { _id } = item;
												return (<CustomerItem key={_id} {...item} history={self.props.history} />);
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