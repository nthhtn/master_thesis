import React, { Component } from 'react';

export default class Workgroup extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">Workgroup Title</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="row">
						<div className="col-md-5 col-xl-3">
							<div className="d-md-none push">
								<button type="button" className="btn btn-block btn-primary" data-toggle="class-toggle" data-target="#one-inbox-side-nav" data-className="d-none">
									Inbox Menu
                                </button>
							</div>
							<div id="one-inbox-side-nav" className="d-none d-md-block push">
								<div className="block">
									<div className="block-header block-header-default">
										<h3 className="block-title">Members</h3>
										<div className="block-options">
										</div>
									</div>
									<div className="block-content">
										<ul className="nav-items font-size-sm">
											<li>
												<a className="media py-2" href="javascript:void(0)">
													<div className="mr-3 ml-2 overlay-container overlay-bottom">
														<img className="img-avatar img-avatar48" src="assets/media/avatars/avatar3.jpg" alt="" />
														<span className="overlay-item item item-tiny item-circle border border-2x border-white bg-success"></span>
													</div>
													<div className="media-body">
														<div className="font-w600">Lori Grant</div>
														<div className="font-w400 text-muted">Web Designer</div>
													</div>
												</a>
											</li>
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
										<button type="button" className="btn-block-option js-tooltip-enabled" data-toggle="tooltip" data-placement="left" title="" data-original-title="Previous 15 Messages">
											<i className="si si-arrow-left"></i>
										</button>
										<button type="button" className="btn-block-option js-tooltip-enabled" data-toggle="tooltip" data-placement="left" title="" data-original-title="Next 15 Messages">
											<i className="si si-arrow-right"></i>
										</button>
										<button type="button" className="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
											<i className="si si-refresh"></i>
										</button>
										<button type="button" className="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"><i className="si si-size-fullscreen"></i></button>
									</div>
								</div>
								<div className="block-content">
									<div className="d-flex justify-content-between push">
									</div>
									<div className="pull-x">
										<table className="js-table-checkable table table-hover table-vcenter font-size-sm js-table-checkable-enabled">
											<tbody>
												<tr>
													<td className="text-center">
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="inbox-msg1" name="inbox-msg1" />
															<label className="custom-control-label font-w400" for="inbox-msg1"></label>
														</div>
													</td>
													<td className="d-none d-sm-table-cell font-w600">Melissa Rice</td>
													<td>
														<a className="font-w600" data-toggle="modal" data-target="#one-inbox-message" href="#">Huge Discount available!</a>
														<div className="text-muted mt-1">Due to the fact that you are a great..</div>
													</td>
													<td className="d-none d-xl-table-cell text-muted"></td>
													<td className="d-none d-xl-table-cell text-muted">
														<em>3 weeks ago</em>
													</td>
												</tr>
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