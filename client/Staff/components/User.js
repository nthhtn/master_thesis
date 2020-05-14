import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createUser, listUser } from '../actions/User';

let self;

class UserItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, firstName, lastName, email, phone, address, userType } = this.props;
		const typeClass = { staff: 'primary', manager: 'danger' };
		return (
			<tr style={{ cursor: 'pointer' }}>
				<td className="font-w600" style={{ color: '#5c80d1' }}>{firstName + ' ' + lastName}</td>
				<td><em className="text-muted">{email}</em></td>
				<td>{phone}</td>
				<td>{address}</td>
				<td><span className={'badge badge-' + typeClass[userType]}>{userType}</span></td>
			</tr>
		);
	}

}

export default class User extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async createUser() {
		const firstName = $('#create-user-firstname').val();
		const lastName = $('#create-user-lastname').val();
		const userType = $('#create-user-type').val();
		if (!firstName || !lastName || userType == 0) {
			$('#create-user-error').text('Missing required field(s)');
			return;
		}
		// await self.props.dispatch(createUser({ firstName, lastName, userType, sectorId }));
		$('#create-user-error').text('');
		$('#modal-create-user input').val('');
		$('#modal-create-user textarea').val('');
		$('#modal-create-user select').val(0);
		$('#modal-create-user').modal('hide');
	}

	async componentDidMount() {
		this.props.dispatch(listUser());
	}

	render() {
		const list = this.props.user.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of users</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title"></h3>
							<div className="block-options">
								<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-user">
									<i className="fa fa-plus"></i> New
								</button>
							</div>
						</div>
						<div className="block-content">
							<div className="modal fade" id="modal-create-user" tabIndex="-1" role="dialog" aria-labelledby="modal-create-user" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New User</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-6">
														<label htmlFor="create-user-firstname">First name*</label>
														<input type="text" className="form-control" id="create-user-firstname" />
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-user-lastname">Last name*</label>
														<input type="text" className="form-control" id="create-user-lastname" />
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-user-type">Role*</label>
														<select className="form-control" id="create-user-type">
															<option value="0">Please select</option>
															<option value="staff">Staff</option>
															<option value="manager">Manager</option>
														</select>
													</div>
													<div className="form-group col-sm-12">
														<label id="create-user-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createUser}><i className="fa fa-check"></i> Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th style={{ width: '15%' }}>Full name</th>
											<th style={{ width: '15%' }}>Email</th>
											<th style={{ width: '15%' }}>Phone</th>
											<th style={{ width: '30%' }}>Address</th>
											<th style={{ width: '15%' }}>User Role</th>
										</tr>
									</thead>
									<tbody>
										{list.map((item) => (<UserItem key={item._id} {...item} />))}
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