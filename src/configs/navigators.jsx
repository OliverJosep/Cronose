import Profile from "../app/profile/Profile";
import EditProfile from "../app/profile/EditProfile";
import Wallet from "../app/wallet/Wallet";
import Market from "../app/market/Market";
import Chat from "../app/chat/Chat";
import MyOffers from "../app/offers/MyOffers";
import OfferDetails from "../app/offers/OfferDetails";
import NewOffer from "../app/offers/NewOffer";
import EditOffer from "../app/offers/EditOffer";
import Home from "../app/home/Home";
import Login from "../app/login/Login";
import Register from "../app/login/Register";
import ResetPassword from "../app/login/ResetPassword";
import UserValidator from "../app/login/UserValidator";
import Reset from "../app/login/Reset";
import notFound from "../app/components/404";

import { IoIosChatbubbles } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { GoPerson } from "react-icons/go";

export default [
  {
    name: "app",
    basename: "app",
    routes: [
      {
        title: "market",
        path: "/market",
        component: Market,
        exact: true,
        icon: FaStore,
      },
      {
        title: "Edit Work",
        path: "/offer/edit/:specialization",
        component: EditOffer,
        show: false,
      },
      {
        title: "Offer Details",
        path: "/offer/:initials/:tag/:specialization",
        component: OfferDetails,
        show: false,
      },
      {
        title: "New Offer",
        path: "/newoffer",
        component: NewOffer,
        show: false,
      },
      {
        title: "wallet",
        path: "/wallet",
        component: Wallet,
        icon: GiTwoCoins,
      },
      {
        title: "chat",
        path: "/chat",
        component: Chat,
        icon: IoIosChatbubbles,
      },
      {
        title: "my-job-offers",
        path: "/my/offers",
        component: MyOffers,
        icon: MdWork,
      },
      {
        title: "edit_profile",
        path: "/me/edit",
        component: EditProfile,
        show: false,
      },
      {
        title: "profile",
        path: "/me",
        component: Profile,
        icon: GoPerson,
      },
      {
        title: "profile",
        path: "/profile/:initials/:tag",
        component: Profile,
        show: false,
      },
      {
        title: "Home",
        path: "/",
        component: Home,
        exact: true,
        show: false,
      },
      {
        title: "about_us",
        path: "/#about",
        component: Home,
        show: false,
      },
      {
        title: "How It Works",
        path: "/#HowItWorks",
        component: Home,
        show: false,
      },
      {
        title: "Contact",
        path: "/#contact",
        component: Home,
        show: false,
      },
      {
        title: "Reset Password",
        path: "/resetPassword",
        component: ResetPassword,
        show: false,
      },
      {
        title: "User Validator",
        path: "/userValidator",
        component: UserValidator,
        show: false,
      },
      {
        title: "not found",
        path: "*",
        component: notFound,
        show: false,
      },
    ],
  },
  {
    name: "root",
    basename: "",
    routes: [
      {
        title: "home",
        path: "/",
        component: Home,
        exact: true,
      },
      {
        title: "how-it-works",
        path: "/#HowItWorks",
        component: Home,
      },
      {
        title: "about-us",
        path: "/#about",
        component: Home,
      },
      {
        title: "contact",
        path: "/#contact",
        component: Home,
      },
      {
        title: "market",
        path: "/market",
        component: Market,
      },
      {
        title: "offer-details",
        path: "/offer/:initials/:tag/:specialization",
        component: OfferDetails,
        show: false,
      },
      {
        title: "login",
        path: "/login",
        component: Login,
      },
      {
        title: "register",
        path: "/register",
        component: Register,
      },
      {
        title: "Reset Password",
        path: "/resetPassword",
        component: ResetPassword,
        show: false,
      },
      {
        title: "Reset",
        path: "/reset",
        component: Reset,
        show: false,
      },
      {
        title: "User Validator",
        path: "/userValidator",
        component: UserValidator,
        show: false,
      },
      {
        title: "profile",
        path: "/profile/:initials/:tag",
        component: Profile,
        show: false,
      },
      {
        title: "not found",
        path: "*",
        component: notFound,
        show: false,
      },
    ],
  },
];
