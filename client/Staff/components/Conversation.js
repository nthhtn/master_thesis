import React, { Component } from 'react';

class Comment extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<tr>
				<td className="d-none d-sm-table-cell text-center" style={{ 'width': '140px' }}>
					<p><img className="img-avatar" src="/assets/oneui/media/avatars/avatar7.jpg" alt="" /></p>
					<p className="font-size-sm">Julian Green</p>
				</td>
				<td>
					<em>16:15 01.07.2019 </em>
					<p>Potenti elit lectus augue eget iaculis vitae etiam, ullamcorper etiam bibendum ad feugiat magna accumsan dolor, nibh molestie cras hac ac ad massa, fusce ante convallis ante urna molestie vulputate bibendum tempus ante justo arcu erat accumsan adipiscing risus, libero condimentum venenatis sit nisl nisi ultricies sed, fames aliquet consectetur consequat nostra molestie neque nullam scelerisque neque commodo turpis quisque etiam egestas vulputate massa, curabitur tellus massa venenatis congue dolor enim integer luctus, nisi suscipit gravida fames quis vulputate nisi viverra luctus id leo dictum lorem, inceptos nibh orci.</p>
				</td>
			</tr>
		);
	}

}

export default class Conversation extends Component {

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
							<h1 className="flex-sm-fill h3 my-2">CONVERSATION</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<table className="table table-borderless">
								<tbody>
									<tr>
										<td className="d-none d-sm-table-cell text-center" style={{ 'width': '140px' }}>
											<p><img className="img-avatar" src="/assets/oneui/media/avatars/avatar7.jpg" alt="" /></p>
											<p className="font-size-sm">Julian Green</p>
										</td>
										<td>
											<em>16:15 01.07.2019 </em>
											<p>Potenti elit lectus augue eget iaculis vitae etiam, ullamcorper etiam bibendum ad feugiat magna accumsan dolor, nibh molestie cras hac ac ad massa, fusce ante convallis ante urna molestie vulputate bibendum tempus ante justo arcu erat accumsan adipiscing risus, libero condimentum venenatis sit nisl nisi ultricies sed, fames aliquet consectetur consequat nostra molestie neque nullam scelerisque neque commodo turpis quisque etiam egestas vulputate massa, curabitur tellus massa venenatis congue dolor enim integer luctus, nisi suscipit gravida fames quis vulputate nisi viverra luctus id leo dictum lorem, inceptos nibh orci.</p>
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
									{[1, 2].map((item) => <Comment key={item} />)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
