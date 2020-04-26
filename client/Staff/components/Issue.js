import React, { Component } from 'react';

import { createIssue, listIssue, updateIssue, deleteIssue } from '../actions/Issue';

let self;

class IssueItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, name, description, reproduction, resolution, color, showModal } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={() => showModal({ _id, name, description, reproduction, resolution, color })}>
				<td className="font-w600" style={{ width: '10%' }}>{name}</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{reproduction}</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{resolution}</td>
				<td style={{ backgroundColor: color, width: '10%' }}></td>
			</tr>
		);
	}

}

export default class Issue extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async createIssue() {
		const name = $('#create-issue-name').val();
		const description = $('#create-issue-description').val();
		const reproduction = $('#create-issue-reproduction').val();
		const resolution = $('#create-issue-resolution').val();
		const color = $('#create-issue-color').val();
		if (!name || !description || !reproduction || !resolution || !color) {
			$('#create-issue-error').text('Missing required field(s)!');
			return;
		}
		await self.props.dispatch(createIssue({ name, description, reproduction, resolution, color }));
		$('#create-issue-error').text('');
		$('#modal-create-issue input').val('');
		$('#modal-create-issue textarea').val('');
		$('#modal-create-issue select').val(0);
		$('#modal-create-issue').modal('hide');
	}

	componentDidMount() {
		this.props.dispatch(listIssue());
		jQuery(() => {
			One.helpers(['colorpicker']);
			$('#create-issue-color').colorpicker();
		});
	}

	async updateIssue() {
		const _id = $('#update-issue-id').val();
		const name = $('#update-issue-name').val();
		const description = $('#update-issue-description').val();
		const reproduction = $('#update-issue-reproduction').val();
		const resolution = $('#update-issue-resolution').val();
		const color = $('#update-issue-color').val();
		if (!_id || !name || !description || !reproduction || !resolution || !color) {
			$('#update-issue-error').text('Missing required field(s)!');
			return;
		}
		await self.props.dispatch(updateIssue(_id, { name, description, color }));
		$('#update-issue-error').text('');
		$('#modal-update-issue input').val('');
		$('#modal-update-issue textarea').val('');
		$('#modal-update-issue').modal('hide');
	}

	showUpdateModal({ _id, name, description, reproduction, resolution, color }) {
		$('#update-issue-id').val(_id);
		$('#update-issue-name').val(name);
		$('#update-issue-description').val(description);
		$('#update-issue-reproduction').val(reproduction);
		$('#update-issue-resolution').val(resolution);
		$('#update-issue-color').val(color);
		$('#modal-update-issue').modal('show');
	}

	render() {
		const list = this.props.issue.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of issues</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title"></h3>
							<div className="block-options">
								<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-issue">
									<i className="fa fa-plus"></i> New
								</button>
							</div>
						</div>
						<div className="block-content">
							<div className="modal fade" id="modal-create-issue" tabIndex="-1" role="dialog" aria-labelledby="modal-create-issue" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New Issue</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-issue-name">Name*</label>
														<input type="text" className="form-control" id="create-issue-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-issue-description">Description*</label>
														<textarea rows="4" className="form-control" id="create-issue-description" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-issue-reproduction">Reproduction*</label>
														<textarea rows="6" className="form-control" id="create-issue-reproduction" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-issue-resolution">Resolution*</label>
														<textarea rows="6" className="form-control" id="create-issue-resolution" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-issue-color">Label Color*</label>
														<input type="text" className="form-control" id="create-issue-color" />
													</div>
													<div className="form-group col-sm-12">
														<label id="create-issue-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createIssue}><i className="fa fa-check"></i> Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal fade" id="modal-update-issue" tabIndex="-1" role="dialog" aria-labelledby="modal-update-issue" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New Issue</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12" hidden>
														<label htmlFor="update-issue-id">ID*</label>
														<input type="text" className="form-control" id="update-issue-id" disabled />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-issue-name">Name*</label>
														<input type="text" className="form-control" id="update-issue-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-issue-description">Description*</label>
														<textarea rows="4" className="form-control" id="update-issue-description" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-issue-reproduction">Reproduction*</label>
														<textarea rows="6" className="form-control" id="update-issue-reproduction" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-issue-resolution">Resolution*</label>
														<textarea rows="6" className="form-control" id="update-issue-resolution" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-issue-color">Label Color*</label>
														<input type="text" className="form-control" id="update-issue-color" />
													</div>
													<div className="form-group col-sm-12">
														<label id="update-issue-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.updateIssue}><i className="fa fa-check"></i> Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th>Issue name</th>
											<th>Description</th>
											<th>Reproduction</th>
											<th>Resolution</th>
											<th>Label color</th>
										</tr>
									</thead>
									<tbody>
										{list.map((item) => (<IssueItem key={item._id} {...item} showModal={this.showUpdateModal} />))}
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