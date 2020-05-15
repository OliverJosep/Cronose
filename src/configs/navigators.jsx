import Wallet from "../components/app/components/Wallet";
import Market from "../components/global/Market";
import Chat from "../components/app/components/chat/Chat";
import MyOffers from "../components/app/components/MyOffers";
import Profile from "../components/app/components/Profile";
import EditProfile from "../components/app/components/EditProfile";
import EditOffer from "../components/app/components/EditOffer";
import Home from "../components/homepage/components/Home";
import Login from "../components/homepage/components/Login";
import Register from "../components/homepage/components/Register";
import OfferDetails from "../components/global/OfferDetails";
import NewOffer from "../components/app/components/NewOffer";
import ResetPassword from "../components/global/ResetPassword";
import UserValidator from "../components/global/UserValidator";
import Reset from "../components/homepage/components/Reset";
import notFound from "../components/global/404";

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
