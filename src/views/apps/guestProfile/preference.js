// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// // ** Steps
// import GuestDetails from "./viewDetails"
// import Special from "./special"
// import MembershipDetailsData from "./membershipDetailsDatagrid";
// import CardDetails from "./cardDetails"
// import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link } from 'react-feather'
import { Card } from 'reactstrap';
// import API_URL from "../../../config";
const WizardModern = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    // {
    //   id: 'viewDetails',
    //   title: 'Guest Details',
    //   subtitle: 'Guest Details.',
    //   // icon: <FileText size={18} />,
    //   content: <GuestDetails stepper={stepper} type='wizard-modern' />
    // },
    {
      id: 'special',
      title: 'Preference',
      subtitle: ' Preference Details',
      // icon: <User size={18} />,
      content: <Special stepper={stepper} type='wizard-modern' />
    },
    // {
    //   id: 'membershipDetailsDatagrid',
    //   title: 'Membership Details',
    //   subtitle: 'Enter Membership Details',
    //   // icon: <MapPin size={18} />,
    //   content: <MembershipDetailsData stepper={stepper} type='wizard-modern' />
    // },
    // {
    //   id: 'cardDetails',
    //   title: 'Card Details',
    //   subtitle: 'Enter Card Details',
    //   // icon: <Link size={18} />,
    //   content: <CardDetails stepper={stepper} type='wizard-modern' />
    // }
  ]

  return (
    <div>
      <Card>
      <div className='modern-horizontal-wizard'>
      <Wizard
        type='modern-horizontal'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
      </Card>
    </div>
  )
}

export default WizardModern
