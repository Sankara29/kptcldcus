import { lazy } from "react";

const DCUDASH = lazy(() => import('../../views/dashboard/DcuDash/index.js'));
const Meters = lazy(() => import('../../views/dashboard/Meters/index.jsx'));
const NodeList = lazy(() => import("../../views/dashboard/NodeList/index.js"))
const NodeListMeter = lazy(() => import("../../views/dashboard/NodeListMeter/index.js"))
const Gettime = lazy(() => import("../../views/dashboard/Gettime/index.js"))
const AddGendcu = lazy(() => import("../../views/dashboard/AddDCU/index.js"))
const Gendcu = lazy(() => import("../../views/dashboard/gendcu/index.js"))
const GendcuV2 = lazy(() => import("../../views/dashboard/gendcuV2/index.js"))
const GendcuV3 = lazy(() => import("../../views/dashboard/gendcuV3/index.js"))
const AddDCUPort = lazy(() => import("../../views/dashboard/AddPort/index.jsx"))
const Customer = lazy(() => import("../../views/dashboard/Customer/index.jsx"))
const OnDemand = lazy(() => import("../../views/dashboard/Customer/Ondemandlist.js"))
//Nayana
const DashboardRoutes = [

  {
    path: "/dashboard/Dcu",
    element: <DCUDASH />,
  },
  {
    path: "/dashboard/Meters",
    element: <Meters />,
  },
  {
    path: "/dashboard/node_list",
    element: <NodeList />
  },
  {
    path: '/dashboard/node_list_meter',
    element: <NodeListMeter />
  },
  {
    path: "/dashboard/gettimes-dcu",
    element: <Gettime />
  },
  {
    path: "/dashboard/gendcu",
    element: <Gendcu />
  },
  {
    path: "/dashboard/gendcuV2",
    element: <GendcuV2 />
  },
  {
    path: "/dashboard/gendcuV3",
    element: <GendcuV3 />
  },
  {
    path: "/dashboard/addgendcu",
    element: <AddGendcu />
  },
  {
    path: "/dashboard/addport",
    element: <AddDCUPort />
  }, {
    path: "/dashboard/customer",
    element: <Customer />
  }, {
    path: "/dashboard/ondemandlist",
    element: <OnDemand />
  }
];

export default DashboardRoutes;
