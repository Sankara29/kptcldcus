// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// // ** Steps
// import BasicDetails from "./basicDetailsGrid"
// import IDDetailData from "./idDetailsDatagrid"
// import MembershipDetailsData from "";
// import CardDetails from "./cardDetails"
// import AccountDetails from './steps/AccountDetails'

// ** Icons Imports
import { FileText, User, MapPin, Link } from 'react-feather'
import { Card } from 'reactstrap';

const WizardModern = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'basicDetailsGrid',
      title: 'Basic Details',
      subtitle: 'Enter Your Basic Details.',
      // icon: <FileText size={18} />,
      content: <BasicDetails stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'idDetailsDatagrid',
      title: 'ID Details',
      subtitle: 'View ID Details',
      // icon: <User size={18} />,
      content: <IDDetailData stepper={stepper} type='wizard-modern' />
    },
    {
      id: 'membershipDetailsDatagrid',
      title: 'Membership Details',
      subtitle: 'Enter Membership Details',
      // icon: <MapPin size={18} />,
      content: <MembershipDetailsData stepper={stepper} type='wizard-modern' />
    },
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