import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { listConversation, createConversation } from '../actions/Conversation';

let self;

class MemberItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<li>
				<a className="media py-2" href={undefined}>
					<div className="mr-3 ml-2 overlay-container overlay-bottom">
						<img className="img-avatar img-avatar48" src="/assets/oneui/media/avatars/avatar3.jpg" alt="" />
						<span className="overlay-item item item-tiny item-circle border border-2x border-white bg-success"></span>
					</div>
					<div className="media-body">
						<div className="font-w600">Lori Grant</div>
						<div className="font-w400 text-muted">Web Designer</div>
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
		return (
			<tr>
				<td className="text-center">
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id="inbox-msg1" name="inbox-msg1" />
						<label className="custom-control-label font-w400" htmlFor="inbox-msg1"></label>
					</div>
				</td>
				<td className="d-none d-sm-table-cell font-w600">Melissa Rice</td>
				<td>
					<Link className="font-w600" to={`/conversations/${this.props.conversationId}`}>{this.props.conversationTitle}</Link>
				</td>
				<td className="d-none d-xl-table-cell text-muted"></td>
				<td className="d-none d-xl-table-cell text-muted">
					<em>{this.props.conversationCreatedAt}</em>
				</td>
			</tr>
		);
	}

}

export default class Workgroup extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	componentDidMount() {
		this.props.dispatch(listConversation());
	}

	async createConversation() {
		const title = $('#create-conversation-title').val().trim();
		const content = $('#create-conversation-content').val().trim();
		self.props.dispatch(createConversation({ title, content }));
	}

	render() {
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">Workgroup</h1>
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
															<button type="button" className="btn btn-sm btn-primary" data-dismiss="modal" onClick={this.createConversation}><i className="fa fa-check mr-1"></i>Ok</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<ul className="nav-items font-size-sm">
											{[1, 2, 3, 4, 5].map((item) => <MemberItem key={item} />)}
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-7 col-xl-9">
							<div className="block">
								<div className="block-header block-header-default">
									<h3 className="block-title">List of Conversations</h3>
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
																<label htmlFor="create-conversation-title">Title</label>
																<input type="text" className="form-control" id="create-conversation-title" />
															</div>
															<div className="form-group col-sm-12">
																<label htmlFor="create-conversation-content">Content</label>
																<textarea rows="4" className="form-control" id="create-conversation-content" />
															</div>
														</div>
													</div>
													<div className="block-content block-content-full text-right border-top">
														<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
														<button type="button" className="btn btn-sm btn-primary" data-dismiss="modal" onClick={this.createConversation}><i className="fa fa-check mr-1"></i>Ok</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="d-flex justify-content-between push">
									</div>
									<div className="pull-x">
										<table className="js-table-checkable table table-hover table-vcenter font-size-sm js-table-checkable-enabled">
											<tbody>
												{this.props.conversation.listConversation.map((item) =>
													<ConversationItem key={item._id} conversationId={item._id}
														conversationTitle={item.title} conversationContent={item.content} conversationCreatedAt={item.createdAt} />
												)}
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