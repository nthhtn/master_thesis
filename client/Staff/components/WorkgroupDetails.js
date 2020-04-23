import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import swal from 'sweetalert2';

import { createConversation } from '../actions/Conversation';
import { getWorkgroupDetails, addWorkgroupMembers, removeWorkgroupMembers } from '../actions/Workgroup';
import { toDateString } from '../helpers';

let self;

class MemberItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, firstName, lastName, email, removeMember } = this.props;
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
					<div>
						<button type="button" className="btn btn-sm btn-danger" onClick={() => removeMember({ _id, email, firstName, lastName })}>
							<i className="fa fa-fw fa-times"></i>
						</button>
					</div>
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
		const { _id, title, content, createdAt, creator } = this.props;
		return (
			<tr>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '15%' }}>{creator.firstName + ' ' + creator.lastName}</td>
				<td style={{ width: '20%' }}>
					<Link className="font-w600" to={`/conversations/${_id}`}>{title}</Link>
				</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{content}
				</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '20%' }}>
					<em>{toDateString(createdAt)}</em>
				</td>
				<td className="text-center" style={{ width: '5%' }}>
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id={'btn-conv-' + _id} />
						<label className="custom-control-label font-w400" htmlFor={'btn-conv-' + _id}></label>
					</div>
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
			allowNew: false,
			isLoading: false,
			multiple: true,
			options: [],
			selected: []
		};
		self = this;
	}

	async componentDidMount() {
		const { workgroupId } = this.state;
		await this.props.dispatch(getWorkgroupDetails(workgroupId));
	}

	async createConversation() {
		const { workgroupId } = self.state;
		const title = $('#create-conversation-title').val();
		const content = $('#create-conversation-content').val();
		if (!title || !content) {
			$('#create-conversation-error').text('All fields must not be empty!');
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
		self.setState({ isLoading: true });
		const response = await fetch(`/api/users/search?q=${query}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		const result = responseJson.result;
		self.setState({ isLoading: false, options: result });
	}

	async addMember() {
		if (self.state.selected.length === 0) { return; }
		await self.props.dispatch(addWorkgroupMembers(self.state.workgroupId, self.state.selected));
		$('#modal-add-member').modal('hide');
		self.refs.searchUserRef.clear();
	}

	handleAddChange(selected) {
		self.setState({ selected });
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

	render() {
		const { current } = this.props.workgroup;
		const { name, members } = current;
		const listConversation = this.props.conversation.list;
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
											<button type="button" className="btn btn-sm btn-success mr-2" data-toggle="modal" data-target="#modal-add-member">
												<i className="fa fa-plus"></i> New
											</button>
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
																		{...this.state}
																		id="add-member"
																		labelKey="email"
																		placeholder="Type to search"
																		multiple
																		onSearch={this.searchUser}
																		onChange={this.handleAddChange}
																		ref='searchUserRef'
																	/>
																</div>
															</div>
														</div>
														<div className="block-content block-content-full text-right border-top">
															<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
															<button type="button" className="btn btn-sm btn-primary" onClick={this.addMember}><i className="fa fa-check"></i>Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<ul className="nav-items font-size-sm">
											{members.map((item) => <MemberItem key={item._id} {...item} removeMember={this.removeMember} />)}
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-7 col-xl-9">
							<div className="block">
								<div className="block-header block-header-default">
									<h3 className="block-title">Conversations</h3>
									<div className="block-options">
										<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-conversation">
											<i className="fa fa-plus"></i> New
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
														<button type="button" className="btn btn-sm btn-primary" onClick={this.createConversation}><i className="fa fa-check"></i>Ok</button>
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
					</div>
				</div>
			</main>
		);
	}

}