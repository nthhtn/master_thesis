import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createConversation } from '../actions/Conversation';
import { getWorkgroupDetails } from '../actions/Workgroup';

let self;

class MemberItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { memberName, memberEmail } = this.props;
		return (
			<li>
				<a className="media py-2" href={undefined}>
					<div className="mr-3 ml-2 overlay-container overlay-bottom">
						<img className="img-avatar img-avatar48" src="/assets/oneui/media/avatars/avatar3.jpg" alt="" />
					</div>
					<div className="media-body">
						<div className="font-w600">{memberName}</div>
						<div className="font-w400 text-muted" style={{ wordBreak: 'break-all' }}>{memberEmail}</div>
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
		const { conversationId, conversationTitle, conversationCreatedAt, conversationContent, conversationCreator } = this.props;
		const datetime = new Date(conversationCreatedAt);
		const date = datetime.getDate() < 10 ? '0' + datetime.getDate().toString() : datetime.getDate().toString();
		const month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1).toString() : (datetime.getMonth() + 1).toString();
		const year = datetime.getFullYear();
		const hour = datetime.getHours() < 10 ? '0' + datetime.getHours().toString() : datetime.getHours().toString();
		const min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes().toString() : datetime.getMinutes().toString();
		const datestring = `${date}/${month}/${year} ${hour}:${min}`;
		return (
			<tr>
				<td className="d-none d-sm-table-cell font-w600" style={{ width: '15%' }}>{conversationCreator}</td>
				<td style={{ width: '20%' }}>
					<Link className="font-w600" to={`/conversations/${conversationId}`}>{conversationTitle}</Link>
				</td>
				<td style={{ maxWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{conversationContent}
				</td>
				<td className="d-none d-xl-table-cell text-muted" style={{ width: '20%' }}>
					<em>{datestring}</em>
				</td>
				<td className="text-center" style={{ width: '5%' }}>
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id={'btn-conv-' + conversationId} />
						<label className="custom-control-label font-w400" htmlFor={'btn-conv-' + conversationId}></label>
					</div>
				</td>
			</tr>
		);
	}

}

export default class Workgroup extends Component {

	constructor(props) {
		super(props);
		this.state = { workgroupId: this.props.match.params.id };
		self = this;
	}

	async componentDidMount() {
		const { workgroupId } = this.state;
		this.props.dispatch(getWorkgroupDetails(workgroupId));
	}

	async createConversation() {
		const { workgroupId } = self.state;
		const title = $('#create-conversation-title').val();
		const content = $('#create-conversation-content').val();
		if (title === '' || content === '') {
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
											<button type="button" className="btn btn-sm btn-success mr-2" data-toggle="modal" data-target="#modal-add-member"><i className="fa fa-plus mr-1"></i></button>
										</div>
									</div>
									<div className="block-content">
										<div className="modal fade" id="modal-add-member" tabIndex="-1" role="dialog" aria-labelledby="modal-add-member" aria-modal="true" style={{ paddingRight: '15px' }}>
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="block block-themed block-transparent mb-0">
														<div className="block-header bg-primary-dark">
															<h3 className="block-title">Add member</h3>
															<div className="block-options">
																<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
																	<i className="fa fa-fw fa-times"></i>
																</button>
															</div>
														</div>
														<div className="block-content font-size-sm">
															<div className="row">
																<div className="form-group col-sm-12">
																	<label htmlFor="add-member">Member email</label>
																	<input type="text" className="form-control" id="add-member" />
																</div>
															</div>
														</div>
														<div className="block-content block-content-full text-right border-top">
															<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
															<button type="button" className="btn btn-sm btn-primary" data-dismiss="modal"><i className="fa fa-check mr-1"></i>Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<ul className="nav-items font-size-sm">
											{members.map((item) =>
												<MemberItem key={item._id} memberName={item.firstName + ' ' + item.lastName} memberEmail={item.email} />)
											}
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
										<button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#modal-create-conversation"><i className="fa fa-plus mr-1"></i> New Conversation</button>
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
																<label htmlFor="create-conversation-title">Title</label>
																<input type="text" className="form-control" id="create-conversation-title" />
															</div>
															<div className="form-group col-sm-12">
																<label htmlFor="create-conversation-content">Content</label>
																<textarea rows="4" className="form-control" id="create-conversation-content" />
															</div>
															<div className="form-group col-sm-12">
																<label id="create-conversation-error" style={{ color: 'red' }}></label>
															</div>
														</div>
													</div>
													<div className="block-content block-content-full text-right border-top">
														<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
														<button type="button" className="btn btn-sm btn-primary" onClick={this.createConversation}><i className="fa fa-check mr-1"></i>Ok</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="d-flex justify-content-between push"></div>
									<div className="pull-x">
										<table className="js-table-checkable table table-hover table-vcenter font-size-sm js-table-checkable-enabled">
											<tbody>
												{listConversation.map((item) => {
													const { _id, title, content, createdAt, creator } = item;
													const fullName = creator.firstName + ' ' + creator.lastName;
													return (<ConversationItem key={_id} conversationId={_id}
														conversationTitle={title} conversationContent={content}
														conversationCreatedAt={createdAt} conversationCreator={fullName} />);
												})}
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