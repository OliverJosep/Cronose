import Wallet from '../components/app/components/Wallet';
import Market from '../components/global/Market';
import Chat from '../components/app/components/Chat';
import MyWorks from '../components/app/components/MyWorks';
import Profile from '../components/app/components/Profile';
import Home from '../components/homepage/components/Home';
import Login from '../components/homepage/components/Login';
import Register from '../components/homepage/components/Register';
import WorkDetail from '../components/global/WorkDetail';
import NewOffer from '../components/app/components/NewOffer';
import ResetPassword from '../components/global/ResetPassword';
import UserValidator from '../components/global/UserValidator';
import Reset from '../components/homepage/components/Reset';

import { IoIosChatbubbles } from 'react-icons/io';
import { FaStore } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { MdWork } from 'react-icons/md';
import { GoPerson } from 'react-icons/go';

export default [
	{
		name: 'app',
		basename: 'app',
		routes: [
			{
				title: 'Market',
				path: '/market',
				component: Market,
				exact: true,
				icon: FaStore,
			},
			{
				title: 'Work Details',
				path: '/work/:initials/:tag/:specialization',
				component: WorkDetail,
				show: false,
			},
			{
				title: 'New Offer',
				path: '/newoffer',
				component: NewOffer,
				show: false,
			},
			{
				title: 'Wallet',
				path: '/wallet',
				component: Wallet,
				icon: GiTwoCoins,
			},
			{
				title: 'Chat',
				path: '/chat',
				component: Chat,
				icon: IoIosChatbubbles,
			},
			{
				title: 'My Works',
				path: '/my/works',
				component: MyWorks,
				icon: MdWork,
			},
			{
				title: 'Profile',
				path: '/me',
				component: Profile,
				icon: GoPerson,
			},
			{
				title: 'Home',
				path: '/home',
				component: Home,
				exact: true,
				show: false,
			},
			{
				title: 'About Us',
				path: '/#about',
				component: Home,
				show: false,
			},
			{
				title: 'How It Works',
				path: '/#HowItWorks',
				component: Home,
				show: false,
			},
			{
				title: 'Contact',
				path: '/#contact',
				component: Home,
				show: false,
			},
			{
				title: 'Reset Password',
				path: '/resetPassword',
				component: ResetPassword,
				show: false,
			},
			{
				title: 'User Validator',
				path: '/userValidator',
				component: UserValidator,
				show: false,
			},
		],
	},
	{
		name: 'root',
		basename: '',
		routes: [
			{
				title: 'Home',
				path: '/',
				component: Home,
				exact: true,
			},
			{
				title: 'How It Works',
				path: '/#HowItWorks',
				component: Home,
			},
			{
				title: 'About Us',
				path: '/#about',
				component: Home,
			},
			{
				title: 'Contact',
				path: '/#contact',
				component: Home,
			},
			{
				title: 'Market',
				path: '/market',
				component: Market,
			},
			{
				title: 'Work Details',
				path: '/work/:initials/:tag/:specialization',
				component: WorkDetail,
				show: false,
			},
			{
				title: 'Login',
				path: '/login',
				component: Login,
			},
			{
				title: 'Register',
				path: '/register',
				component: Register,
			},
			{
				title: 'Reset Password',
				path: '/resetPassword',
				component: ResetPassword,
				show: false,
			},
			{
				title: 'reset',
				path: '/reset',
				component: Reset,
				show: false,
			},
			{
				title: 'User Validator',
				path: '/userValidator',
				component: UserValidator,
				show: false,
			},
		],
	},
];