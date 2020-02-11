import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { listWorkgroup, createWorkgroup } from '../actions/Workgroup';

let self;

class WorkgroupGridItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { workgroupId, workgroupName, workgroupDescription } = this.props;
		return (
			<div className="col-sm-6 col-xl-4">
				<div className="block">
					<div className="block-header">
						<Link to={`/workgroups/${workgroupId}`}><h3 className="block-title">{workgroupName}</h3></Link>
					</div>
					<div className="block-content block-content-full text-center">
						<img className="img-avatar img-avatar96 img-avatar-thumb" src="/assets/oneui/media/avatars/avatar12.jpg" alt="" />
					</div>
					<div className="block-content font-size-sm">
						<p>{workgroupDescription}</p>
					</div>
				</div>
			</div>
		);
	}

}

export default class WorkgroupGrid extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	componentDidMount() {
		this.props.dispatch(listWorkgroup());
	}

	async createWorkgroup() {
		const name = $('#create-workgroup-name').val().trim();
		const description = $('#create-workgroup-description').val().trim();
		self.props.dispatch(createWorkgroup({ name, description }));
	}

	render() {
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of Workgroups</h1>
							<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-workgroup"><i className="fa fa-plus mr-1"></i> New Workgroup</button>
							<div className="modal fade" id="modal-create-workgroup" tabIndex="-1" role="dialog" aria-labelledby="modal-create-workgroup" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Modal Title</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-workgroup-name">Name</label>
														<input type="text" className="form-control" id="create-workgroup-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-workgroup-description">Description</label>
														<textarea rows="4" className="form-control" id="create-workgroup-description" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-workgroup-members">Members</label>
														<input type="text" className="form-control" id="create-workgroup-members" />
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" data-dismiss="modal" onClick={this.createWorkgroup}><i className="fa fa-check mr-1"></i>Ok</button>
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
							<WorkgroupGridItem key={item._id} workgroupId={item._id}
								workgroupName={item.name} workgroupDescription={item.description} />
						)}
					</div>
				</div>
			</main>
		);
	}

}
