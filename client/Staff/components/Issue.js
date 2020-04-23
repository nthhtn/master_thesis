import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createIssue, listIssue } from '../actions/Issue';
import { toDateString } from '../helpers';

let self;

class IssueItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, name, description } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }}>
				<td className="font-w600">
					{name}
				</td>
				<td>{description}</td>
				<td></td>
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
		const title = $('#create-issue-name').val();
		const message = $('#create-issue-description').val();
		const status = $('#create-issue-status').val();
		if (!title || !message || status == 0) {
			$('#create-issue-error').text('Invalid field(s)');
			return;
		}
		// await self.props.dispatch(createIssue({ title, message, status, sectorId }));
		$('#create-issue-error').text('');
		$('#modal-create-issue input').val('');
		$('#modal-create-issue textarea').val('');
		$('#modal-create-issue select').val(0);
		$('#modal-create-issue').modal('hide');
	}

	async componentDidMount() {
		// this.props.dispatch(listIssue());
	}

	render() {
		// const listIssue = this.props.issue.list;
		const list = [{ _id: '1', name: 'Issue 1', description: 'Test' }];
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
														<label id="create-issue-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createIssue}><i className="fa fa-check"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th>Name</th>
											<th>Description</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{list.map((item) => (<IssueItem key={item._id} {...item} />))}
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