import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { listWorkgroup, createWorkgroup } from '../actions/Workgroup';

let self;

class WorkgroupItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const titleStyle = {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		const textStyle = {
			...titleStyle,
			height: '87px',
			whiteSpace: 'pre-wrap'
		}
		const { workgroupId, workgroupName, workgroupDescription } = this.props;
		return (
			<div className="col-sm-6 col-xl-4">
				<div className="block">
					<div className="block-header">
						<Link to={`/workgroups/${workgroupId}`} style={titleStyle}>
							<h3 className="block-title">
								{workgroupName}
							</h3>
						</Link>
					</div>
					<div className="block-content block-content-full text-center">
						<img className="img-avatar img-avatar96 img-avatar-thumb" src="/assets/oneui/media/avatars/avatar12.jpg" alt="" />
					</div>
					<div className="block-content" style={textStyle}>
						{workgroupDescription}
					</div>
				</div>
			</div>
		);
	}

}

export default class Workgroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allowNew: false,
			isLoading: false,
			multiple: true,
			options: [],
			selected: []
		};
		self = this;
	}

	componentDidMount() {
		this.props.dispatch(listWorkgroup());
	}

	async createWorkgroup() {
		const name = $('#create-workgroup-name').val().trim();
		const description = $('#create-workgroup-description').val().trim();
		const members = self.state.selected.map((item) => (item._id)).concat([self.props.user.me._id]);
		if (!name || !description) {
			$('#create-workgroup-error').text('All fields must not be empty!');
			return;
		}
		self.props.dispatch(createWorkgroup({ name, description, members }));
		$('#create-workgroup-error').text('');
		$('#modal-create-workgroup').modal('hide');
		self.refs.searchUserRef.clear();
	}

	async searchUser(query) {
		self.setState({ isLoading: true });
		const response = await fetch(`/api/users/search?q=${query}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ isLoading: false, options: result });
	}

	handleAddChange(selected) {
		self.setState({ selected });
	}

	render() {
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of Workgroups</h1>
							<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-workgroup">
								<i className="fa fa-plus"></i> New
							</button>
							<div className="modal fade" id="modal-create-workgroup" tabIndex="-1" role="dialog" aria-labelledby="modal-create-workgroup" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Create Workgroup</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-workgroup-name">Name*</label>
														<input type="text" className="form-control" id="create-workgroup-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-workgroup-description">Description*</label>
														<textarea rows="4" className="form-control" id="create-workgroup-description" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-workgroup-members">Members*</label>
														<AsyncTypeahead
															{...this.state}
															id="create-workgroup-members"
															labelKey="email"
															placeholder="Type to search"
															multiple
															onSearch={this.searchUser}
															onChange={this.handleAddChange}
															ref='searchUserRef'
														/>
													</div>
													<div className="form-group col-sm-12">
														<label id="create-workgroup-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createWorkgroup}><i className="fa fa-check"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="content content-boxed">
					<div className="row">
						{this.props.workgroup.list.map((item) =>
							<WorkgroupItem key={item._id} workgroupId={item._id}
								workgroupName={item.name} workgroupDescription={item.description} />
						)}
					</div>
				</div>
			</main>
		);
	}

}
