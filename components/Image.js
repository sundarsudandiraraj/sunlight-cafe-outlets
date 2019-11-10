import React, { Component } from 'react';
import styled from 'styled-components';

export default class Image extends Component {
	render(){
		const {
			status
		  } = this.props;
		  let isStock = true;
		  if (status == 'Out of Stock'){
			  isStock = false
		  }
		return(
			<Boxdiv>
				<ImageComponent src={this.props.source} alt={this.props.text} />
				{!isStock && (
                <OverlayOS>
					<span>{this.props.status}</span>
				</OverlayOS>
                )}
			</Boxdiv>
		)
	}
}

const ImageComponent = styled.img`
	width: 100%;
	height: 100%;
`;

const Boxdiv = styled.div`
	position: relative;
`;

const OverlayOS = styled.div`
	transform: rotate(-25deg);
	position: absolute;
	z-index: 999;
	margin: 0 auto;
	left: 0;
	right: 0;
	text-align: center;
	top: 40%;
	background: rgba(0, 0, 0, 0.57);
	font-family: Arial,sans-serif;
	font-size: x-large;
	color: #f72121 !important;
	width: 80%;
`;