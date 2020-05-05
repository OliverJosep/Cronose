import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

export default function Chat() {
	return (
		<>
			<h1 className='text-center mt-4'>Chat</h1>
			<div className='container-fluid '>
				<div className='row card-chat mb-4'>
					<div className='chats col-3 p-1'>
						<div className='bg'>
							<div className='user-chat'>
								<div className='active row p-2'>
									<img
										className='pr-2 m-md-0 m-auto'
										src='/assets/img/avatar-placeholder.png'
										height='55px'
										alt="avatar-placeholder"
									/>
									<div className='row '>
										<div className='col-12 d-none d-md-block'>Anastasio</div>
										<small className='d-none d-md-block'>Hola Anastasio</small>
									</div>
								</div>
							</div>
							<div className='user-chat'>
								<div className='row p-2'>
									<img
										className='pr-2 m-md-0 m-auto'
										src='/assets/img/avatar-placeholder.png'
										height='55px'
										alt="avatar-placeholder"
									/>
									<div className='row'>
										<div className='col-12 d-none d-md-block'>Username</div>
										<small className='d-none d-md-block'>
											Lorem ipsum sdklj klsafl klsfdkjl...
										</small>
									</div>
								</div>
							</div>
							<div className='user-chat'>
								<div className='row p-2'>
									<img
										className='pr-2 m-md-0 m-auto'
										src='/assets/img/avatar-placeholder.png'
										height='55px'
										alt="avatar-placeholder"
									/>
									<div className='row '>
										<div className='col-12 d-none d-md-block'>Username</div>
										<small className='d-none d-md-block'>
											Lorem ipsum sdklj klsafl klsfdkjl...
										</small>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='chat col-md-6 col-9 p-1'>
						<div className='messages mb-2'>
							<div className='user p-2'>
								<img
									className='pr-2'
									src='/assets/img/avatar-placeholder.png'
									height='40px'
									alt="avatar-placeholder"
								/>
								Anastasio
							</div>
							<div className='mt-1 scroll'>
								<div className='ml-3 mt-2 card bg-light rounded w-75'>
									<div className='card-body p-2'>
										<p className='card-text black-text'> Hola bernardo </p>
									</div>
								</div>
								<div className='mr-2 mt-2 card bg-primary rounded w-75 float-right'>
									<div className='card-body p-2'>
										<p className='card-text text-white'>Hola Anastasio</p>
									</div>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='pr-1 col-xl-10 col-8'>
								<input
									className='form-control'
									type='text'
									placeholder='Insert message here!'
									readOnly
								/>
							</div>
							<div className='pl-1 col-xl-2 col-4'>
								<input
									className='btn w-100 text-white'
									type='submit'
									value='Submit'
								/>
							</div>
						</div>
					</div>
					<div className='col-md-3 col-12 p-1 cards'>
						<div className='bg'>
							<h3 className='w-100 p-2 pt-3 m-0'>Cards</h3>
							<div className='row offer-card p-2'>
								<div className='col-6 text-center d-block d-md-none d-xl-block'>
									<img
										className='m-auto'
										src='/assets/img/img-work.jpg'
										width='auto'
										height='71px'
										alt="img-work"></img>
								</div>
								<div className='col-6 col-md-12 col-xl-6 text-md-center text-xl-left'>
									<div className='row'>
										<div className='col-12 title'>Job Title</div>
										<div className='col-12'>12/03/2020</div>
										<div className='col-12'>
											<strong>Status:</strong> Pending
										</div>
									</div>
								</div>
							</div>
							<div className='row offer-card p-2'>
								<div className='col-6 text-center d-block d-md-none d-xl-block'>
									<img
										className='m-auto'
										src='/assets/img/img-work.jpg'
										width='auto'
										height='71px'
										alt="img-work"></img>
								</div>
								<div className='col-6 col-md-12 col-xl-6 text-md-center text-xl-left'>
									<div className='row'>
										<div className='col-12 title'>Job Title</div>
										<div className='col-12'>08/03/2020</div>
										<div className='col-12'>
											<strong>Status:</strong> Accepted
										</div>
									</div>
								</div>
							</div>
							<div className='text-center mt-2'>
								<MdAddCircleOutline className='add' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
