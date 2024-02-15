// import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
// import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
// import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
// import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
// import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
// import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
// import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
// import RocketRoundedIcon from '@mui/icons-material/RocketRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

export const items2 = [
  {
    title: 'Home',
    path: 'shop/pshop',
    icon: (
      <SvgIcon fontSize="small">
        <HomeRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Merchant Support',
    path: 'customers',
    icon: (
      <SvgIcon fontSize="small">
        <SupportAgentRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Categories',
    path: 'shop/pshop/categories',
    icon: (
      <SvgIcon fontSize="small">
        <CategoryRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Offers',
    path: 'shop/pshop/deals',
    icon: (
      <SvgIcon fontSize="small">
        <LocalOfferRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Wallet',
    path: 'balance',
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalanceWalletRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cart',
    path: 'shop/pshop/cart',
    icon: (
      <SvgIcon fontSize="small">
        <LocalGroceryStoreRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Compare',
    path: 'shop/pshop/compare',
    icon: (
      <SvgIcon fontSize="small">
        <CompareArrowsRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: 'account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: 'settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
];
