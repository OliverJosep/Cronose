import React from 'react';

export function RenderChat(props) {
	
	return(
		<div className='messages mb-2'>
			<div className='user p-2'>
				<img
					className='pr-2'
					src='/assets/img/avatar-placeholder.png'
					height='40px'
					alt="avatar-placeholder"
				/>
				{props.user.name}
			</div>
			<div className='mt-1 scroll' id='chat_box'>
				{props.messages ? props.messages.map((message, index) => (
					<Message sended={message.sended} message={message.message} data={message.sended_date} key={index}/>
				)) : 'Loading'}
			</div>
		</div>
	);
}

export function Message(props) {
	return (
		<div className={"ml-3 mb-2 card rounded w-75 " + (props.sended === '1' ? 'sender float-right': 'reciever float-left')}>
			<div className='card-body p-2'>
				<p className='card-text black-text message'> {props.message} </p>
				<div className='data'>{props.data.substring(11,16)}</div>
			</div>
		</div>
	);
}