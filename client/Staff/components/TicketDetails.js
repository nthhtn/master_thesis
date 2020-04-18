import React, { Component } from 'react';

import { getTicketDetails, getTicketDetailsSuccess, addTicketComment, listTicketComment } from '../actions/Ticket';
import { toDateString } from '../helpers';

let self;

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
					<p className="font-size-sm">{commenter.firstName + " " + commenter.lastName}</p>
				</td>
				<td>
					<em>{toDateString(createdAt)}</em>
					<p>{text}</p>
				</td>
			</tr>
		);
	}

}

export default class Ticket extends Component {

	constructor(props) {
		super(props);
		this.state = { ticketId: this.props.match.params.id };
		self = this;
	}

	componentDidMount() {
		const { ticketId } = this.state;
		let ticket = this.props.ticket.list.find((item) => item._id === ticketId);
		ticket ? this.props.dispatch(getTicketDetailsSuccess(ticket))
			: this.props.dispatch(getTicketDetails(ticketId));
		this.props.dispatch(listTicketComment(ticketId));
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
		const { comments, current } = this.props.ticket;
		const { owner, title, message, status, sector, createdAt } = current;
		const { firstName, lastName } = this.props.user.me;
		const statusClass = { new: 'default', open: 'primary', inprogress: 'warning', resolved: 'success', closed: 'danger' };
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">{title}</h1>
							<div className="block-options">
								<a className="btn-block-option mr-2 js-scroll-to-enabled" href="#comment-input" data-toggle="scroll-to">
									<i className="fa fa-reply mr-1"></i> Reply
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
											<p className="font-size-sm">{owner.fullName}</p>
										</td>
										<td>
											<em>{toDateString(createdAt)}</em>
											<p>{message}</p>
											<hr />
											<p>
												<span className={'badge badge-' + statusClass[status]}>{status}</span>
												<span className='badge badge-info' style={{ backgroundColor: sector ? sector.color : 'transparent' }}>
													{sector ? sector.name : ''}
												</span>
											</p>
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
												<button onClick={this.addComment} className="btn btn-primary"><i className="fa fa-reply mr-1"></i> Reply</button>
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