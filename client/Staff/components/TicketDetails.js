import React, { Component } from 'react';
import swal from 'sweetalert2';

import { getTicketDetails, getTicketDetailsSuccess, addTicketComment, listTicketComment, updateTicket } from '../actions/Ticket';
import { listTicketSector } from '../actions/TicketSector';
import { listIssue } from '../actions/Issue';
import { toDateString } from '../helpers';

let self;

const statusClass = { new: 'secondary', open: 'primary', inprogress: 'warning', resolved: 'success', closed: 'danger' };
const severityClass = { normal: 'primary', high: 'warning', low: 'success', urgent: 'danger' };

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
					<em>{toDateString(createdAt)}</em>
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
		let ticket = this.props.ticket.list.find((item) => item._id === ticketId);
		if (!ticket) {
			await this.props.dispatch(getTicketDetails(ticketId));
			ticket = this.props.ticket.current;
		} else {
			await this.props.dispatch(getTicketDetailsSuccess(ticket));
		}
		await this.props.dispatch(listTicketComment(ticketId));
		this.props.ticketSector.list.length == 0 && await this.props.dispatch(listTicketSector());
		this.props.issue.list.length == 0 && await this.props.dispatch(listIssue());
		$('#update-ticket-status').val(ticket.status);
		$('#update-ticket-severity').val(ticket.severity);
		$('#update-ticket-sector').val(ticket.sectorId || 0);
		$('#update-ticket-issue').val(ticket.issueId || 0);
	}

	async addComment() {
		if ($('#comment-input').val().trim() === '') { return; }
		const text = $('#comment-input').val();
		const { ticketId } = self.state;
		const { _id, firstName, lastName } = self.props.user.me;
		await self.props.dispatch(addTicketComment(ticketId, { text }, { _id, firstName, lastName }));
		$('#comment-input').val('');
	}

	async updateTicket() {
		const status = $('#update-ticket-status').val();
		const severity = $('#update-ticket-severity').val();
		const sectorId = $('#update-ticket-sector').val() == 0 ? '' : $('#update-ticket-sector').val();
		const issueId = $('#update-ticket-issue').val() == 0 ? '' : $('#update-ticket-issue').val();
		await self.props.dispatch(updateTicket(self.state.ticketId, { status, severity, sectorId, issueId }));
		swal.fire({
			html: 'Successful update!',
			timer: 2000
		});
	}

	render() {
		const { comments, current } = this.props.ticket;
		const { owner, title, message, status, severity, sector, issue, createdAt } = current;
		const { firstName, lastName } = this.props.user.me;
		const listSector = this.props.ticketSector.list;
		const listIssue = this.props.issue.list;
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
											<p>{owner.fullName}</p>
										</td>
										<td>
											<em>{toDateString(createdAt)}</em>
											<div style={{ whiteSpace: 'pre-wrap' }}>{message}</div>
											<hr />
											<div className="row">
												<div className="form-group col-sm-2">
													<label htmlFor="update-ticket-status">Status&nbsp;
													<span className={'badge badge-' + statusClass[status]}>{status}</span>
													</label>
													<select className="form-control" id="update-ticket-status">
														<option value="open">Open</option>
														<option value="new">New</option>
														<option value="inprogress">In Progress</option>
														<option value="resolved">Resolved</option>
														<option value="closed">Closed</option>
													</select>
												</div>
												<div className="form-group col-sm-2">
													<label htmlFor="update-ticket-severity">Severity&nbsp;
													<span className={'badge badge-' + severityClass[severity]}>{severity}</span>
													</label>
													<select className="form-control" id="update-ticket-severity">
														<option value="low">Low</option>
														<option value="normal">Normal</option>
														<option value="high">High</option>
														<option value="urgent">Urgent</option>
													</select>
												</div>
												<div className="form-group col-sm-2">
													<label htmlFor="update-ticket-sector">Sector&nbsp;
													<span className='badge badge-info' style={{ backgroundColor: sector ? sector.color : 'transparent' }}>
															{sector ? sector.name : ''}
														</span>
													</label>
													<select className="form-control" id="update-ticket-sector">
														<option value="0">None</option>
														{listSector.map((sector) =>
															(<option key={sector._id} value={sector._id} style={{ color: sector.color }}>{sector.name}</option>))
														}
													</select>
												</div>
												<div className="form-group col-sm-2">
													<label htmlFor="update-ticket-issue">Issue&nbsp;
													<span className='badge badge-info' style={{ backgroundColor: issue ? issue.color : 'transparent' }}>
															{issue ? issue.name : ''}
														</span>
													</label>
													<select className="form-control" id="update-ticket-issue">
														<option value="0">None</option>
														{listIssue.map((issue) =>
															(<option key={issue._id} value={issue._id} style={{ color: issue.color }}>{issue.name}</option>))
														}
													</select>
												</div>
												<div className="form-group col-sm-2">
													<button type="button" className="btn btn-sm btn-primary" style={{ position: 'absolute', bottom: 0 }} onClick={this.updateTicket}>
														<i className="fa fa-check"></i> Save
													</button>
												</div>
											</div>
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
											<p>{firstName + ' ' + lastName}</p>
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