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
				title: 'market',
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
				title: 'wallet',
				path: '/wallet',
				component: Wallet,
				icon: GiTwoCoins,
			},
			{
				title: 'chat',
				path: '/chat',
				component: Chat,
				icon: IoIosChatbubbles,
			},
			{
				title: 'my-job-offers',
				path: '/my/works',
				component: MyWorks,
				icon: MdWork,
			},
			{
				title: 'profile',
				path: '/me',
				component: Profile,
				icon: GoPerson,
			},
			{
				title: 'profile',
				path: '/profile/:initials/:tag',
				component: Profile,
				show: false
			},
			{
				title: 'Home',
				path: '/',
				component: Home,
				exact: true,
				show: false,
			},
			{
				title: 'about_us',
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
				title: 'home',
				path: '/',
				component: Home,
				exact: true,
			},
			{
				title: 'how-it-works',
				path: '/#HowItWorks',
				component: Home,
			},
			{
				title: 'about-us',
				path: '/#about',
				component: Home,
			},
			{
				title: 'contact',
				path: '/#contact',
				component: Home,
			},
			{
				title: 'market',
				path: '/market',
				component: Market,
			},
			{
				title: 'work-details',
				path: '/work/:initials/:tag/:specialization',
				component: WorkDetail,
				show: false,
			},
			{
				title: 'login',
				path: '/login',
				component: Login,
			},
			{
				title: 'register',
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
				title: 'Reset',
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
			{
				title: 'profile',
				path: '/profile/:initials/:tag',
				component: Profile,
				show: false
			},
		],
	},
];
