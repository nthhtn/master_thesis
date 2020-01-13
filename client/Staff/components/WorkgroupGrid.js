import React, { Component } from 'react';

class WorkgroupGridItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="col-sm-6 col-xl-4">
				<div className="block">
					<div className="block-header">
						<h3 className="block-title">Group 1</h3>
					</div>
					<div className="block-content block-content-full text-center">
						<img className="img-avatar img-avatar96 img-avatar-thumb" src="assets/oneui/media/avatars/avatar12.jpg" alt="" />
					</div>
					<div className="block-content font-size-sm">
						<p>Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum quis in sit varius lorem sit metus mi.</p>
					</div>
				</div>
			</div>
		);
	}

}

export default class WorkgroupGrid extends Component {

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
							<h1 className="flex-sm-fill h3 my-2">List of Workgroups</h1>
						</div>
					</div>
				</div>
				<div className="content content-boxed">
					<div className="row">
						{[1, 2, 3, 4, 5, 6].map((item) => <WorkgroupGridItem />)}
					</div>
				</div>
			</main>
		);
	}

}
