import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import swal from 'sweetalert2';

import { getTaskDetails, updateTask } from '../actions/Task';
import { toDateString } from '../helpers';

let self;

export default class TaskDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			taskId: this.props.match.params.id,
			userAllowNew: false,
			userIsLoading: false,
			userOptions: [],
			userSelected: [],
			taskAllowNew: false,
			taskIsLoading: false,
			taskOptions: [],
			taskSelected: []
		};
		self = this;
	}

	async componentDidMount() {
		const { taskId } = this.state;
		$('#update-task-due').datetimepicker({ minDate: new Date(), disabledDates: [new Date()] });
		await this.props.dispatch(getTaskDetails(taskId));
		const { current } = this.props.task;
		const { name, description, status, priority, assignee, dueAt, parent } = current;
		$('#update-task-name').val(name);
		$('#update-task-description').val(description);
		$('#update-task-status').val(status);
		$('#update-task-priority').val(priority);
		$('#update-task-due').val(moment(dueAt).format('MM/DD/YYYY hh:mm A'));
		if (assignee) {
			this.setState({ userSelected: [assignee] });
		}
		if (parent) {
			this.setState({ taskSelected: [parent] });
		}
	}

	async searchUser(query) {
		self.setState({ userIsLoading: true });
		const { current } = self.props.task;
		const response = await fetch(`/api/users/search?q=${query}&workgroupId=${current.workgroupId}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ userIsLoading: false, userOptions: result });
	}

	handleUserChange(selected) {
		self.setState({ userSelected: selected });
	}

	async updateTask() {
		const { taskId } = self.state;
		const name = $('#update-task-name').val();
		const description = $('#update-task-description').val();
		const status = $('#update-task-status').val();
		const priority = $('#update-task-priority').val();
		const dueAt = $('#update-task-due').val();
		if (!name || !description || !dueAt) {
			$('#update-task-error').text('Missing required field(s)!');
			return;
		}
		await self.props.dispatch(updateTask(taskId, { name, description, status, priority, dueAt: Date.parse(new Date(dueAt)) }));
		swal.fire({
			html: 'Successful update!',
			timer: 2000
		});
	}

	async searchTask(query) {
		self.setState({ taskIsLoading: true });
		const { current } = self.props.task;
		const response = await fetch(`/api/tasks/search?q=${query}&workgroupId=${current.workgroupId}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ taskIsLoading: false, taskOptions: result });
	}

	handleTaskChange(selected) {
		self.setState({ taskSelected: selected });
	}

	async updateParentTask() {
		const { taskId } = self.state;
		const parentId = self.state.taskSelected.length > 0 ? self.state.taskSelected[0]._id : null;
		await self.props.dispatch(updateTask(taskId, { parentId }));
		swal.fire({
			html: 'Successful update!',
			timer: 2000
		});
	}

	render() {
		const { current } = this.props.task;
		const { name, workgroup } = current;
		const searchUserState = {
			allowNew: this.state.userAllowNew,
			isLoading: this.state.userIsLoading,
			options: this.state.userOptions,
			selected: this.state.userSelected
		};
		const searchTaskState = {
			allowNew: this.state.taskAllowNew,
			isLoading: this.state.taskIsLoading,
			options: this.state.taskOptions,
			selected: this.state.taskSelected
		};
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">{name}</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="row">
						<div className="col-sm-6">
							<div className="block">
								<div className="block-content">
									<div className="row">
										<div className="form-group col-sm-12">
											<label htmlFor="update-task-name">Task Name*</label>
											<input type="text" className="form-control" id="update-task-name" />
										</div>
										<div className="form-group col-sm-12">
											<label htmlFor="update-task-description">Description*</label>
											<textarea rows="3" className="form-control" id="update-task-description" />
										</div>
										<div className="form-group col-sm-6">
											<label htmlFor="update-task-status">Status*</label>
											<select className="form-control" id="update-task-status">
												<option value="todo">Todo</option>
												<option value="doing">Doing</option>
												<option value="reviewing">Reviewing</option>
												<option value="completed">Completed</option>
												<option value="canceled">Canceled</option>
											</select>
										</div>
										<div className="form-group col-sm-6">
											<label htmlFor="update-task-priority">Priority*</label>
											<select className="form-control" id="update-task-priority">
												<option value="low">Low</option>
												<option value="normal">Normal</option>
												<option value="important">Important</option>
												<option value="critical">Critical</option>
											</select>
										</div>
										<div className="form-group col-sm-6">
											<label htmlFor="update-task-assignee">Assignee</label>
											<AsyncTypeahead
												{...searchUserState}
												id="update-task-assignee"
												labelKey="email"
												placeholder="Type to search a user to assign"
												onSearch={this.searchUser}
												onChange={this.handleUserChange}
												ref='searchUserRef'
											/>
										</div>
										<div className="form-group col-sm-6">
											<label htmlFor="update-task-due">Due date*</label>
											<input type="text" className="form-control" id="update-task-due" />
										</div>
										<div className="form-group col-sm-12">
											<label id="update-task-error" style={{ color: 'red' }}></label>
										</div>
										<div className="form-group col-sm-12 text-right">
											<button type="button" className="btn btn-sm btn-primary" onClick={this.updateTask}>
												<i className="fa fa-check"></i> Save
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="block">
								<div className="block-content">
									<div className="row">
										<div className="form-group col-sm-12">
											<label>Workgroup: <Link to={`/workgroups/${workgroup._id}`}>{workgroup.name}</Link></label>
										</div>
										<div className="form-group col-sm-12">
											<label htmlFor="update-task-parent">Parent task</label>
											<div className="input-group">
												<AsyncTypeahead
													{...searchTaskState}
													id="update-task-parent"
													labelKey="name"
													placeholder="Type to search a task in this workgroup"
													onSearch={this.searchTask}
													onChange={this.handleTaskChange}
													ref='searchTaskRef'
												/>
												<div className="input-group-append">
													<button type="button" className="btn btn-primary" onClick={this.updateParentTask}>
														<i className="fa fa-check"></i>
													</button>
												</div>
											</div>
										</div>
										<div className="form-group col-sm-12">
											<label>Children tasks:</label> 0
										</div>
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