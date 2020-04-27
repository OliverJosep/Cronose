import Wallet from '../app/components/Wallet';
import Market from '../components/Market';
import Chat from '../app/components/Chat';
import MyWorks from '../app/components/MyWorks';
import Profile from '../app/components/Profile';
import Home from '../homepage/components/Home';
import HomePage from '../homepage/components/HomePage';
import Login from '../homepage/components/Login';
import SignIn from '../homepage/components/SignIn';
import WorkDetail from '../components/WorkDetail';
import NewOffer from '../app/components/NewOffer';
import ResetPassword from '../components/ResetPassword';
import UserValidator from '../components/UserValidator';
import Reset from '../homepage/components/Reset';

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
				component: HomePage,
				exact: true,
				show: false,
			},
			{
				title: 'About Us',
				path: '/#about',
				component: HomePage,
				show: false,
			},
			{
				title: 'How It Works',
				path: '/#HowItWorks',
				component: HomePage,
				show: false,
			},
			{
				title: 'Contact',
				path: '/#contact',
				component: HomePage,
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
				component: HomePage,
				exact: true,
			},
			{
				title: 'How It Works',
				path: '/#HowItWorks',
				component: HomePage,
			},
			{
				title: 'About Us',
				path: '/#about',
				component: HomePage,
			},
			{
				title: 'Contact',
				path: '/#contact',
				component: HomePage,
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
				component: SignIn,
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
