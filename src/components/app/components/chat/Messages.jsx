import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAvatar } from '../../../layouts/Avatar'

export function RenderChat(props) {
	return(
		<div className='messages mb-2'>
			<div className='user p-2'>
				<UserAvatar 
					name={props.user.full_name} 
					avatar={props.user.avatar}
					size={40}
				/>
				<NavLink
					to={`/profile/${props.user.initials}/${props.user.tag}`}>
					<span className='name'>{props.user.full_name 
						? props.user.full_name 
						: <InitialsTag user={props.user}/>}
					</span>
				</NavLink>
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

export function RenderChats(props) {
	return (
		<div className={'user-chat' + (props.selected === props.user.id ? ' active' : '')} id={props.user.id} onClick={props.selectChat}>
			<div className={'user-box p-2 '}>
				<UserAvatar 
					name={props.user.full_name} 
					avatar={props.user.avatar}
					size={55}
				/>
				<div className='row'>
					<div className='col-12 d-none d-md-block user'>{props.user.full_name 
						? props.user.name
						: <InitialsTag user={props.user}/>}</div>
					<small className='d-none d-md-block message'>{props.message.message.substring(0,props.chatsLength)}{props.message.message.length > props.chatsLength && '...'}</small>
				</div>
			</div>
		</div>
	);
}

export function InitialsTag(props) {
	return(
		<>
			{props.user.initials}<small>#{props.user.tag}</small>
		</>
	)
}