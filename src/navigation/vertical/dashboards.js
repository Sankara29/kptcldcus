// ** Icons Import
import { Home, Zap, Circle, Monitor, PieChart, Calendar, UserCheck, CreditCard, Menu, BarChart, DollarSign, User, CheckSquare, Settings, Droplet, Clock, Dribbble, CloudDrizzle, Target, Clipboard, Activity } from 'react-feather'

export default [
  // {
  //   header:"Home pages",
  //   icon: <Menu size={12} />,
  // },



  //Front desk Tab
  // {
  //   id: 'ifsurvey',
  //   title: 'Dashboard',
  //   icon: <Monitor size={12} />,
  //   navLink: '/dashboard/Dcu'
  // },
  // {
  //   id: "gettimet",
  //   title: "gettime-dcu",
  //   icon: <Circle size={12} />,
  //   navLink: "/dashboard/gettimes-dcu"
  // },
  // {
  //   id: "nodelist",
  //   title: "nodelist",
  //   icon: <Circle size={12} />,
  //   navLink: "/dashboard/node_list"
  // }, 
  {
    id: "customer",
    title: "IPP Consumers",
    icon: <Circle size={12} />,
    navLink: "/dashboard/customer"
  },
  {
    id: "ondemandlist",
    title: "ON-Demand Commands",
    icon: <Circle size={12} />,
    navLink: "/dashboard/ondemandlist"
  },
  {
    id: 'ConfigDcu',
    title: 'Config DCU',
    icon: <Settings size={12} />,
    children: [
      {
        id: "adddcu",
        title: "addgendcu",
        icon: <Circle size={12} />,
        navLink: "/dashboard/addgendcu"
      }
      , {
        id: "addport",
        title: "addport",
        icon: <Circle size={12} />,
        navLink: "/dashboard/addport"
      }]
  }, {
    id: 'dcu Versions',
    title: 'DCU Versions',
    icon: <Activity size={12} />,
    children: [
      {
        id: "dcu",
        title: "gendcuV1-007",
        icon: <Circle size={12} />,
        navLink: "/dashboard/gendcu"
      }
      , {
        id: "dcu",
        title: "gendcuV2-004",
        icon: <Circle size={12} />,
        navLink: "/dashboard/gendcuV2"
      }, {
        id: "dcu",
        title: "NSDCU-009",
        icon: <Circle size={12} />,
        navLink: "/dashboard/gendcuV3"
      },
    ]
  }





]