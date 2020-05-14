import React from 'react';
import { NavLink } from 'react-router-dom'

export default function notFound() {
  return <>
		<div className='user-val text-center'>
			<h1>Error 404, that page doesn't exists!</h1>
			<p>
			  Click on the following link to access the 
        <NavLink 
          to='/'>
          &nbsp;website.
        </NavLink>
				
			</p>
		</div>
  </>
}