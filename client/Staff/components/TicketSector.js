import React, { Component, PureComponent } from 'react';

import { createTicketSector, listTicketSector, updateTicketSector } from '../actions/TicketSector';

let self;

class TicketSectorItem extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { name, description, _id, showModal } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={() => showModal({ _id, name, description })}>
				<td className="font-w600 font-size-sm">{name}</td>
				<td className="font-size-sm"><em className="text-muted">{description}</em></td>
			</tr>
		);
	}

}

export default class TicketSector extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async createTicketSector() {
		const name = $('#create-sector-name').val();
		const description = $('#create-sector-description').val();
		if (!name || !description) {
			$('#create-sector-error').text('All fields must not be empty!');
			return;
		}
		await self.props.dispatch(createTicketSector({ name, description }));
		$('#create-sector-error').text('');
		$('#modal-create-sector input').val('');
		$('#modal-create-sector textarea').val('');
		$('#modal-create-sector').modal('hide');
	}

	async componentDidMount() {
		this.props.dispatch(listTicketSector());
	}

	async updateTicketSector() {
		const _id = $('#update-sector-id').val();
		const name = $('#update-sector-name').val();
		const description = $('#update-sector-description').val();
		if (!_id || !name || !description) {
			$('#update-sector-error').text('All fields must not be empty!');
			return;
		}
		await self.props.dispatch(updateTicketSector(_id, { name, description }));
		$('#update-sector-error').text('');
		$('#modal-update-sector input').val('');
		$('#modal-update-sector textarea').val('');
		$('#modal-update-sector').modal('hide');
	}

	showUpdateModal({ _id, name, description }) {
		$('#update-sector-id').val(_id);
		$('#update-sector-name').val(name);
		$('#update-sector-description').val(description);
		$('#modal-update-sector').modal('show');
	}

	render() {
		const listSector = this.props.ticketSector.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of Ticket Sectors</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title"></h3>
							<div className="block-options">
								<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-sector">
									<i className="fa fa-plus mr-1"></i> New
								</button>
							</div>
						</div>
						<div className="block-content">
							<div className="modal fade" id="modal-create-sector" tabIndex="-1" role="dialog" aria-labelledby="modal-create-sector" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New Ticket Sector</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-sector-name">Name*</label>
														<input type="text" className="form-control" id="create-sector-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-sector-email">Description*</label>
														<textarea row="4" className="form-control" id="create-sector-description" />
													</div>
													<div className="form-group col-sm-12">
														<label id="create-sector-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createTicketSector}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal fade" id="modal-update-sector" tabIndex="-1" role="dialog" aria-labelledby="modal-update-sector" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Update Ticket Sector</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12" hidden>
														<label htmlFor="update-sector-id">ID*</label>
														<input type="text" className="form-control" id="update-sector-id" disabled />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-sector-name">Name*</label>
														<input type="text" className="form-control" id="update-sector-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-sector-email">Description*</label>
														<textarea row="4" className="form-control" id="update-sector-description" />
													</div>
													<div className="form-group col-sm-12">
														<label id="update-sector-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.updateTicketSector}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th>Sector name</th>
											<th>Description</th>
										</tr>
									</thead>
									<tbody>
										{
											listSector.map((item) => {
												const { _id } = item;
												return (<TicketSectorItem key={_id} {...item} showModal={this.showUpdateModal} />);
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