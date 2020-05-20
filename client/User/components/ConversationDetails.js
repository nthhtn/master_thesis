import React, { Component } from 'react';

import { getConversationDetails, listConversationComment, addConversationComment }
	from '../actions/Conversation';
import { toDateString } from '../helpers';

let self;

class CommentItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { text, commenter, createdAt } = this.props;
		return (
			<tr>
				<td className="d-none d-sm-table-cell text-center" style={{ 'width': '140px' }}>
					<p><img className="img-avatar" src="/assets/oneui/media/avatars/avatar7.jpg" alt="" /></p>
					<p className="font-size-sm">{commenter.firstName + ' ' + commenter.lastName}</p>
				</td>
				<td>
					<em>{toDateString(createdAt)}</em>
					<div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>
				</td>
			</tr>
		);
	}

}

export default class Conversation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			conversationId: this.props.match.params.id,
			title: '',
			content: '',
			createdAt: null
		};
		self = this;
	}

	componentDidMount() {
		const { conversationId } = this.state;
		this.props.dispatch(getConversationDetails(conversationId));
		this.props.dispatch(listConversationComment(conversationId));
	}

	async addComment() {
		if ($('#comment-input').val().trim() === '') { return; }
		const text = $('#comment-input').val();
		const { conversationId } = self.state;
		const { _id, firstName, lastName } = self.props.user.me;
		await self.props.dispatch(addConversationComment(conversationId, { text }, { _id, firstName, lastName }));
		$('#comment-input').val('');
	}

	render() {
		const { comments, current } = this.props.conversation;
		const { title, content, createdAt, creator } = current;
		const { firstName, lastName } = this.props.user.me;
		const datetime = new Date(createdAt);
		const date = datetime.getDate() < 10 ? '0' + datetime.getDate().toString() : datetime.getDate().toString();
		const month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1).toString() : (datetime.getMonth() + 1).toString();
		const year = datetime.getFullYear();
		const hour = datetime.getHours() < 10 ? '0' + datetime.getHours().toString() : datetime.getHours().toString();
		const min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes().toString() : datetime.getMinutes().toString();
		const datestring = `${date}/${month}/${year} ${hour}:${min}`;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">{title}</h1>
							<div className="block-options">
								<a className="btn-block-option mr-2 js-scroll-to-enabled" href="#comment-input" data-toggle="scroll-to">
									<i className="fa fa-reply"></i> Reply
                                </a>
							</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<table className="table table-borderless">
								<tbody>
									<tr>
										<td className="d-none d-sm-table-cell text-center" style={{ width: '140px' }}>
											<p><img className="img-avatar" src="/assets/oneui/media/avatars/avatar7.jpg" alt="" /></p>
											<p className="font-size-sm">{creator.firstName + ' ' + creator.lastName}</p>
										</td>
										<td>
											<em>{datestring}</em>
											<div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="block">
						<div className="block-header block-header-default">
							<h3 className="block-title">Comments</h3>
						</div>
						<div className="block-content">
							<table className="table table-borderless">
								<tbody>
									{comments.map((item) => {
										const { _id } = item;
										return (<CommentItem key={_id} {...item} />);
									})}
									<tr>
										<td className="d-none d-sm-table-cell text-center" style={{ 'width': '140px' }}>
											<p><img className="img-avatar" src="/assets/oneui/media/avatars/avatar7.jpg" alt="" /></p>
											<p className="font-size-sm">{firstName + ' ' + lastName}</p>
										</td>
										<td>
											<div className="form-group">
												<textarea className="form-control" id="comment-input" rows="4" placeholder="Reply with your comment here..."></textarea>
											</div>
											<div className="form-group">
												<button onClick={this.addComment} className="btn btn-primary"><i className="fa fa-reply"></i> Reply</button>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
