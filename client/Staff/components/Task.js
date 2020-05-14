import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { createTask, listTask } from '../actions/Task';
import { toDateString } from '../helpers';

let self;

const statusClass = { todo: 'secondary', doing: 'primary', reviewing: 'warning', completed: 'success', canceled: 'danger' };
const priorityClass = { normal: 'primary', important: 'warning', low: 'success', critical: 'danger' };

class TaskItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick() {
		this.props.history.push(`/tasks/${this.props._id}`);
	}

	render() {
		const { _id, name, status, priority, assignee, workgroup, createdAt, dueAt } = this.props;
		return (
			<tr style={{ cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
				<td className="font-w600" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					<Link className="font-w600" to={`/tasks/${_id}`}>{name}</Link>
				</td>
				<td>{workgroup.name}</td>
				<td><span className={'badge badge-' + statusClass[status]}>{status}</span></td>
				<td><span className={'badge badge-' + priorityClass[priority]}>{priority}</span></td>
				<td>{assignee ? assignee.firstName + ' ' + assignee.lastName : ''}</td>
				<td>{toDateString(createdAt)}</td>
				<td>{toDateString(dueAt)}</td>
			</tr>
		);
	}

}

export default class Task extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userAllowNew: false,
			userIsLoading: false,
			userOptions: [],
			userSelected: [],
			groupAllowNew: false,
			groupIsLoading: false,
			groupOptions: [],
			groupSelected: []
		};
		self = this;
	}

	async createTask() {
		const name = $('#create-task-name').val();
		const description = $('#create-task-description').val();
		const status = $('#create-task-status').val();
		const priority = $('#create-task-priority').val();
		const dueAt = $('#create-task-due').val();
		const workgroupId = self.state.groupSelected.length === 0 ? '' : self.state.groupSelected[0]._id;
		const assigneeId = self.state.userSelected.length === 0 ? '' : self.state.userSelected[0]._id;
		if (!name || !description || status == 0 || priority == 0 || !workgroupId || !dueAt) {
			$('#create-task-error').text('Missing required field(s)');
			return;
		}
		const data = {
			name, description, status, priority, workgroupId, assigneeId,
			dueAt: Date.parse(new Date(dueAt))
		};
		await self.props.dispatch(createTask(data));
		$('#create-task-error').text('');
		$('#modal-create-task input').val('');
		$('#modal-create-task textarea').val('');
		$('#modal-create-task select').val(0);
		$('#modal-create-task').modal('hide');
	}

	async searchUser(query) {
		self.setState({ userIsLoading: true });
		const response = await fetch(`/api/users/search?q=${query}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ userIsLoading: false, userOptions: result });
	}

	handleUserChange(selected) {
		self.setState({ userSelected: selected });
	}

	async searchWorkgroup(query) {
		self.setState({ groupIsLoading: true });
		const response = await fetch(`/api/workgroups/search?q=${query}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ groupIsLoading: false, groupOptions: result });
	}

	handleWorkgroupChange(selected) {
		self.setState({ groupSelected: selected });
	}

	async componentDidMount() {
		$('#create-task-due').datetimepicker({ minDate: new Date(), disabledDates: [new Date()] });
		this.props.dispatch(listTask());
	}

	render() {
		const list = this.props.task.list;
		const searchUserState = {
			allowNew: this.state.userAllowNew,
			isLoading: this.state.userIsLoading,
			options: this.state.userOptions,
			selected: this.state.userSelected
		};
		const searchGroupState = {
			allowNew: this.state.groupAllowNew,
			isLoading: this.state.groupIsLoading,
			options: this.state.groupOptions,
			selected: this.state.groupSelected
		};
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
													<div className="form-group col-sm-6">
														<label htmlFor="create-task-name">Name*</label>
														<input type="text" className="form-control" id="create-task-name" />
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-task-due">Due date*</label>
														<input type="text" className="form-control" id="create-task-due" />
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
														<label htmlFor="create-task-priority">Priority*</label>
														<select className="form-control" id="create-task-priority">
															<option value="0">Please select</option>
															<option value="low">Low</option>
															<option value="normal">Normal</option>
															<option value="important">Important</option>
															<option value="critical">Critical</option>
														</select>
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-task-workgroup">Workgroup*</label>
														<AsyncTypeahead
															{...searchGroupState}
															id="create-task-workgroup"
															labelKey="name"
															placeholder="Type to search a workgroup, unchangeable"
															onSearch={this.searchWorkgroup}
															onChange={this.handleWorkgroupChange}
															ref='searchGroupRef'
														/>
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-task-assignee">Assignee</label>
														<AsyncTypeahead
															{...searchUserState}
															id="create-task-assignee"
															labelKey="email"
															placeholder="Type to search a user to assign"
															onSearch={this.searchUser}
															onChange={this.handleUserChange}
															ref='searchUserRef'
														/>
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
											<th style={{ width: '20%' }}>Task name</th>
											<th style={{ width: '10%' }}>Workgroup</th>
											<th style={{ width: '10%' }}>Status</th>
											<th style={{ width: '10%' }}>Priority</th>
											<th style={{ width: '10%' }}>Assignee</th>
											<th style={{ width: '10%' }}>Created at</th>
											<th style={{ width: '10%' }}>Due at</th>
										</tr>
									</thead>
									<tbody>
										{list.map((item) => (<TaskItem key={item._id} {...item} history={self.props.history} />))}
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