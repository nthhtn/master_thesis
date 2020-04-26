import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createTask, listTask } from '../actions/Task';
import { toDateString } from '../helpers';

let self;

class TaskItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, name, description, status, assignee, workgroup, parent, createdAt, dueAt } = this.props;
		const statusClass = { todo: 'default', doing: 'primary', reviewing: 'warning', completed: 'success', canceled: 'danger' };
		return (
			<tr style={{ cursor: 'pointer' }}>
				<td className="font-w600">
					{name}
				</td>
				<td><span className={'badge badge-' + statusClass[status]}>{status}</span></td>
				<td>{assignee.firstName + ' ' + assignee.lastName}</td>
				<td>{assignee.firstName + ' ' + assignee.lastName}</td>
				<td>{workgroup.name}</td>
				<td>{toDateString(createdAt)}</td>
				<td>{toDateString(dueAt)}</td>
				<td>{parent.name}</td>
			</tr>
		);
	}

}

export default class Task extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async createTask() {
		const name = $('#create-task-name').val();
		const description = $('#create-task-description').val();
		const status = $('#create-task-status').val();
		if (!name || !description || status == 0) {
			$('#create-task-error').text('Missing required field(s)(s)');
			return;
		}
		// await self.props.dispatch(createTask({ name, description, status, sectorId }));
		$('#create-task-error').text('');
		$('#modal-create-task input').val('');
		$('#modal-create-task textarea').val('');
		$('#modal-create-task select').val(0);
		$('#modal-create-task').modal('hide');
	}

	async componentDidMount() {
		$('#create-task-due').datetimepicker();
		// this.props.dispatch(listTask());
	}

	render() {
		// const listTask = this.props.task.list;
		const list = [
			{
				_id: '1', name: 'Task 1', description: 'Test', status: 'completed',
				assignee: { firstName: 'Test', lastName: '1' },
				workgroup: { name: 'Group' },
				parent: { name: 'Parent' },
				createdAt: Date.now(), dueAt: Date.now()
			}
		];
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of tasks</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title"></h3>
							<div className="block-options">
								<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-task">
									<i className="fa fa-plus"></i> New
								</button>
							</div>
						</div>
						<div className="block-content">
							<div className="modal fade" id="modal-create-task" tabIndex="-1" role="dialog" aria-labelledby="modal-create-task" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">New Task</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-task-name">Name*</label>
														<input type="text" className="form-control" id="create-task-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-task-description">Description*</label>
														<textarea rows="4" className="form-control" id="create-task-description" />
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-task-status">Status*</label>
														<select className="form-control" id="create-task-status">
															<option value="0">Please select</option>
															<option value="todo">Todo</option>
															<option value="doing">Doing</option>
															<option value="reviewing">Reviewing</option>
															<option value="completed">Completed</option>
															<option value="canceled">Canceled</option>
														</select>
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-task-due">Due date*</label>
														<input type="text" className="form-control" id="create-task-due" />
													</div>
													<div className="form-group col-sm-12">
														<label id="create-task-error" style={{ color: 'red' }}></label>
													</div>
												</div>
											</div>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createTask}><i className="fa fa-check"></i> Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th style={{ width: '10%' }}>Name</th>
											<th style={{ width: '10%' }}>Status</th>
											<th style={{ width: '10%' }}>Creator</th>
											<th style={{ width: '10%' }}>Assignee</th>
											<th style={{ width: '10%' }}>Workgroup</th>
											<th style={{ width: '10%' }}>Created at</th>
											<th style={{ width: '10%' }}>Due at</th>
											<th style={{ width: '10%' }}>Parent task</th>
										</tr>
									</thead>
									<tbody>
										{list.map((item) => (<TaskItem key={item._id} {...item} />))}
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