import React, { Component } from 'react';

import { getTicketDetails, addTicketComment, listTicketComment } from '../actions/Ticket';

class CommentItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { _id, text, createdAt, commenter } = this.props;
		return (
			<tr>
				<td className="d-none d-sm-table-cell text-center" style={{ 'width': '140px' }}>
					<p><img className="img-avatar" src="/assets/oneui/media/avatars/avatar7.jpg" alt="" /></p>
					<p>{commenter.firstName + " " + commenter.lastName}</p>
				</td>
				<td>
					<em>{createdAt}</em>
					<div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>
				</td>
			</tr>
		);
	}

}

export default class TicketDetails extends Component {

	constructor(props) {
		super(props);
		this.state = { ticketId: this.props.match.params.id };
		self = this;
	}

	async componentDidMount() {
		const { ticketId } = this.state;
		await this.props.dispatch(getTicketDetails(ticketId));
		const ticket = this.props.ticket.current;
		await this.props.dispatch(listTicketComment(ticketId));
		$('#update-ticket-status').val(ticket.status);
	}

	async addComment() {
		if ($('#comment-input').val().trim() === '') { return; }
		const text = $('#comment-input').val();
		const { ticketId } = self.state;
		const { _id, firstName, lastName } = self.props.user.me;
		await self.props.dispatch(addTicketComment(ticketId, { text }, { _id, firstName, lastName }));
		$('#comment-input').val('');
	}

	render() {
		console.log(this.props);
		const { comments, current } = this.props.ticket;
		const { title, message, createdAt } = current;
		const customer = this.props.customer.current;
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
											<p>{customer.fullName}</p>
										</td>
										<td>
											<em>{createdAt}</em>
											<div style={{ whiteSpace: 'pre-wrap' }}>{message}</div>
											<hr />
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
											<p>{customer.fullName}</p>
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