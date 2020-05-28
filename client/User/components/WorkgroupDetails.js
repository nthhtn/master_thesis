import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import swal from 'sweetalert2';

import { createConversation } from '../actions/Conversation';
import { createTask } from '../actions/Task';
import { getWorkgroupDetails, addWorkgroupMembers, removeWorkgroupMembers, updateWorkgroup } from '../actions/Workgroup';
import { toDateString } from '../helpers';

let self;

const statusClass = { todo: 'secondary', doing: 'primary', reviewing: 'warning', completed: 'success', canceled: 'danger' };
const priorityClass = { normal: 'primary', important: 'warning', low: 'success', critical: 'danger' };

class MemberItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, firstName, lastName, email, removeMember } = this.props;
		const removeButton = removeMember &&
			(<div>
				<button type="button" className="btn btn-sm btn-danger" onClick={() => removeMember({ _id, email, firstName, lastName })}>
					<i className="fa fa-fw fa-times"></i>
				</button>
			</div>);
		return (
			<li>
				<a className="media py-2" href={undefined}>
					<div className="mr-3 ml-2 overlay-container overlay-bottom">
						<img className="img-avatar img-avatar48" src="/assets/oneui/media/avatars/avatar3.jpg" alt="" />
					</div>
					<div className="media-body">
						<div className="font-w600">{firstName + ' ' + lastName}</div>
						<div className="font-w400 text-muted" style={{ wordBreak: 'break-all' }}>{email}</div>
					</div>
					{removeButton}
				</a>
			</li>
		);
	}

}

class ConversationItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, title, content, lastActivityAt, creator } = this.props;
		return (
			<tr>
				<td style={{ width: '20%' }}>
					<Link className="font-w600" to={`/conversations/${_id}`}>{title}</Link>
				</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{content}
				</td>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '15%' }}>{creator.firstName + ' ' + creator.lastName}</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '20%' }}>
					<em>{toDateString(lastActivityAt)}</em>
				</td>
			</tr>
		);
	}

}

class TaskItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, name, status, priority, assignee, dueAt } = this.props;
		return (
			<tr>
				<td style={{ width: '20%' }}>
					<Link className="font-w600" to={`/tasks/${_id}`}>{name}</Link>
				</td>
				<td style={{ width: '8%' }}><span className={'badge badge-' + statusClass[status]}>{status}</span></td>
				<td style={{ width: '8%' }}><span className={'badge badge-' + priorityClass[priority]}>{priority}</span></td>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '15%' }}>
					{assignee ? assignee.firstName + ' ' + assignee.lastName : 'Unassigned'}
				</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '20%' }}>
					<em>{toDateString(dueAt)}</em>
				</td>
			</tr>
		);
	}

}

export default class WorkgroupDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			workgroupId: this.props.match.params.id,
			memberIsLoading: false,
			memberOptions: [],
			memberSelected: [],
			assigneeSelected: [],
			parentSelected: []
		};
		self = this;
	}

	async componentDidMount() {
		const { workgroupId } = this.state;
		$('#create-task-due').datetimepicker({ minDate: new Date(), disabledDates: [new Date()] });
		await this.props.dispatch(getWorkgroupDetails(workgroupId));
		const { current } = this.props.workgroup;
		$('#update-workgroup-name').val(current.name);
		$('#update-workgroup-description').val(current.description);
	}

	async updateWorkgroup() {
		const { workgroupId } = self.state;
		const name = $('#update-workgroup-name').val();
		const description = $('#update-workgroup-description').val();
		if (!name || !description) {
			$('#update-workgroup-error').text('Missing required field(s)!');
			return;
		}
		await self.props.dispatch(updateWorkgroup(workgroupId, { name, description }));
		$('#update-workgroup-error').text('');
		swal.fire({
			html: 'Successful update!',
			timer: 2000
		});
	}

	async createConversation() {
		const { workgroupId } = self.state;
		const title = $('#create-conversation-title').val();
		const content = $('#create-conversation-content').val();
		if (!title || !content) {
			$('#create-conversation-error').text('Missing required field(s)!');
			return;
		}
		$('#create-conversation-error').text('');
		const { _id, firstName, lastName } = self.props.user.me;
		await self.props.dispatch(createConversation({ title, content, workgroupId }, { _id, firstName, lastName }));
		$('#modal-create-conversation input').val('');
		$('#modal-create-conversation textarea').val('');
		$('#modal-create-conversation').modal('hide');
	}

	async searchUser(query) {
		self.setState({ memberIsLoading: true });
		const response = await fetch(`/api/users/search?q=${query}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ memberIsLoading: false, memberOptions: result });
	}

	handleAddChange(selected) {
		self.setState({ memberSelected: selected });
	}

	async addMember() {
		if (self.state.memberSelected.length === 0) { return; }
		await self.props.dispatch(addWorkgroupMembers(self.state.workgroupId, self.state.memberSelected));
		$('#modal-add-member').modal('hide');
		self.refs.searchMemberRef.clear();
	}

	removeMember({ _id, email, firstName, lastName }) {
		swal.fire({
			title: 'Are you sure?',
			html: `Remove <strong>${email}</strong> from this workgroup?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, remove them!'
		}).then(async (result) => {
			if (result.value) {
				await self.props.dispatch(removeWorkgroupMembers(self.state.workgroupId, [{ _id, email, firstName, lastName }]));
				await swal.fire({
					title: 'Removed!',
					html: `<strong>${email}</strong> has been removed from workgroup.`,
					timer: 2000
				});
			}
		});
	}

	handleAssigneeChange(selected) {
		self.setState({ assigneeSelected: selected });
	}

	handleParentChange(selected) {
		self.setState({ parentSelected: selected });
	}

	async createTask() {
		const name = $('#create-task-name').val();
		const description = $('#create-task-description').val();
		const status = $('#create-task-status').val();
		const priority = $('#create-task-priority').val();
		const dueAt = $('#create-task-due').val();
		const { workgroupId } = self.state;
		const assigneeId = self.state.assigneeSelected.length > 0 ? self.state.assigneeSelected[0]._id : null;
		const assignee = assignee ? self.state.assigneeSelected[0] : null;
		if (!name || !description || status == 0 || priority == 0 || !workgroupId || !dueAt) {
			$('#create-task-error').text('Missing required field(s)');
			return;
		}
		const data = {
			name, description, status, priority, workgroupId, assigneeId,
			dueAt: Date.parse(new Date(dueAt))
		};
		await self.props.dispatch(createTask(data, assignee));
		$('#create-task-error').text('');
		$('#modal-create-task input').val('');
		$('#modal-create-task textarea').val('');
		$('#modal-create-task select').val(0);
		$('#modal-create-task').modal('hide');
		self.refs.searchAssigneeRef.clear();
	}

	render() {
		const { current } = this.props.workgroup;
		const { name, members, creatorId } = current;
		const { me } = self.props.user;
		const listConversation = this.props.conversation.list;
		const listTask = this.props.task.list;
		const searchMemberState = {
			isLoading: this.state.memberIsLoading,
			multiple: true,
			options: this.state.memberOptions,
			selected: this.state.memberSelected
		};
		const searchAssigneeState = {
			options: members,
			selected: this.state.assigneeSelected
		};
		const searchParentState = {
			options: listTask,
			selected: this.state.parentSelected
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
						<div className="col-md-5 col-xl-3">
							<div id="one-inbox-side-nav" className="d-none d-md-block push">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Members</h3>
										<div className="block-options">
											{members.map((item) => (item._id)).indexOf(me._id) > -1 &&
												<button type="button" className="btn btn-sm btn-success mr-2" data-toggle="modal" data-target="#modal-add-member">
													<i className="fa fa-plus"></i>
												</button>
											}
										</div>
									</div>
									<div className="block-content">
										<div className="modal fade" id="modal-add-member" tabIndex="-1" role="dialog" aria-labelledby="modal-add-member" aria-modal="true" style={{ paddingRight: '15px' }}>
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="block block-themed block-transparent mb-0">
														<div className="block-header bg-primary-dark">
															<h3 className="block-title">Add members</h3>
															<div className="block-options">
																<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
																	<i className="fa fa-fw fa-times"></i>
																</button>
															</div>
														</div>
														<div className="block-content font-size-sm">
															<div className="row">
																<div className="form-group col-sm-12">
																	<label htmlFor="add-member">Member email*</label>
																	<AsyncTypeahead
																		{...searchMemberState}
																		id="add-member"
																		labelKey="email"
																		placeholder="Type to search"
																		multiple
																		onSearch={this.searchUser}
																		onChange={this.handleAddChange}
																		ref='searchMemberRef'
																	/>
																</div>
															</div>
														</div>
														<div className="block-content block-content-full text-right border-top">
															<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
															<button type="button" className="btn btn-sm btn-primary" onClick={this.addMember}><i className="fa fa-check"></i> Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<ul className="nav-items font-size-sm">
											{members.map((item) => <MemberItem key={item._id} {...item}
												removeMember={me._id === creatorId && me._id !== item._id ? this.removeMember : undefined} />)}
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-7 col-xl-9">
							<div className="block">
								<div className="block-header block-header-default">
									<h3 className="block-title">Workgroup Info</h3>
									<div className="block-options">
										{creatorId === me._id &&
											<button type="button" className="btn btn-sm btn-primary" onClick={this.updateWorkgroup}>
												<i className="fa fa-check"></i> Save
											</button>
										}
									</div>
								</div>
								<div className="block-content font-size-sm">
									<div className="row">
										<div className="form-group col-sm-12">
											<label htmlFor="update-workgroup-name">Name*</label>
											<input type="text" className="form-control" id="update-workgroup-name" disabled={creatorId !== me._id} />
										</div>
										<div className="form-group col-sm-12">
											<label htmlFor="update-customer-name">Description*</label>
											<textarea rows="4" className="form-control" id="update-workgroup-description" disabled={creatorId !== me._id} />
										</div>
										<div className="form-group col-sm-12">
											<label id="update-workgroup-error" style={{ color: 'red' }}></label>
										</div>
									</div>
								</div>
							</div>
						</div>
						{members.map((item) => (item._id)).indexOf(me._id) > -1 &&
							<div className="col-md-6 col-xl-6">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Conversations</h3>
										<div className="block-options">
											<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-conversation">
												<i className="fa fa-plus"></i>
											</button>
										</div>
									</div>
									<div className="block-content">
										<div className="modal fade" id="modal-create-conversation" tabIndex="-1" role="dialog" aria-labelledby="modal-create-conversation" aria-modal="true" style={{ paddingRight: '15px' }}>
											<div className="modal-dialog modal-lg" role="document">
												<div className="modal-content">
													<div className="block block-themed block-transparent mb-0">
														<div className="block-header bg-primary-dark">
															<h3 className="block-title">New Conversation</h3>
															<div className="block-options">
																<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
																	<i className="fa fa-fw fa-times"></i>
																</button>
															</div>
														</div>
														<div className="block-content font-size-sm">
															<div className="row">
																<div className="form-group col-sm-12">
																	<label htmlFor="create-conversation-title">Title*</label>
																	<input type="text" className="form-control" id="create-conversation-title" />
																</div>
																<div className="form-group col-sm-12">
																	<label htmlFor="create-conversation-content">Content*</label>
																	<textarea rows="4" className="form-control" id="create-conversation-content" />
																</div>
																<div className="form-group col-sm-12">
																	<label id="create-conversation-error" style={{ color: 'red' }}></label>
																</div>
															</div>
														</div>
														<div className="block-content block-content-full text-right border-top">
															<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
															<button type="button" className="btn btn-sm btn-primary" onClick={this.createConversation}><i className="fa fa-check"></i> Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between push"></div>
										<div className="pull-x">
											<table className="js-table-checkable table table-hover table-vcenter font-size-sm js-table-checkable-enabled">
												<tbody>
													{listConversation.map((item) => <ConversationItem key={item._id} {...item} />)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						}
						{members.map((item) => (item._id)).indexOf(me._id) > -1 &&
							<div className="col-md-6 col-xl-6">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Tasks</h3>
										<div className="block-options">
											<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-task">
												<i className="fa fa-plus"></i>
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
																	<label htmlFor="create-task-assignee">Assignee</label>
																	<Typeahead
																		{...searchAssigneeState}
																		id="create-task-assignee"
																		labelKey="email"
																		placeholder="Type to search a user to assign"
																		ref='searchAssigneeRef'
																		onChange={this.handleAssigneeChange}
																	/>
																</div>
																<div className="form-group col-sm-6">
																	<label htmlFor="create-task-parent">Parent Task</label>
																	<Typeahead
																		{...searchParentState}
																		id="create-task-parent"
																		labelKey="name"
																		placeholder="Type to search a task as parent to this task"
																		ref='searchParentRef'
																		onChange={this.handleParentChange}
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
										<div className="d-flex justify-content-between push"></div>
										<div className="pull-x">
											<table className="js-table-checkable table table-hover table-vcenter font-size-sm js-table-checkable-enabled">
												<tbody>
													{listTask.map((item) => <TaskItem key={item._id} {...item} />)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</main>
		);
	}

}