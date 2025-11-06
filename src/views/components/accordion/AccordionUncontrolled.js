// ** Reactstrap Imports
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import React, { Fragment, useState } from 'react';

const AccordionUncontrolled = () => {
  const [accordion1Submitted, setAccordion1Submitted] = useState(false);
  const [accordion2Submitted, setAccordion2Submitted] = useState(false);
  const [accordion3Submitted, setAccordion3Submitted] = useState(false);

  function handleAccordion1Submit() {
    setAccordion1Submitted(true);
  }

  function handleAccordion2Submit() {
    if (accordion1Submitted) {
      setAccordion2Submitted(true);
    } else {
      alert('Please submit the previous accordion first!');
    }
  }

  function handleAccordion3Submit() {
    if (accordion2Submitted) {
      setAccordion3Submitted(true);
    } else {
      alert('Please submit the previous accordion first!');
    }
  }
        
  return (
    <UncontrolledAccordion defaultOpen='1'>
      <AccordionItem onSubmit={handleAccordion1Submit} >
        <AccordionHeader targetId='1'>Accordion Item 1</AccordionHeader>
        <AccordionBody accordionId='1'>
          <strong>This is the first item's accordion body.</strong> You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
          <code>&lt;AccordionBody&gt;</code>, though the transition does limit overflow.
        </AccordionBody>
      </AccordionItem>
      <AccordionItem onSubmit={handleAccordion2Submit} >
        <AccordionHeader targetId='2'>Accordion Item 2</AccordionHeader>
        <AccordionBody accordionId='2'>
          <strong>This is the second item's accordion body.</strong> You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
          <code>&lt;AccordionBody&gt;</code>, though the transition does limit overflow.
        
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='3'>Accordion Item 3</AccordionHeader>
        <AccordionBody accordionId='3'>
          <strong>This is the third item's accordion body.</strong> You can modify any of this with custom CSS or
          overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
          <code>&lt;AccordionBody&gt;</code>, though the transition does limit overflow.
        </AccordionBody>
      </AccordionItem>
    </UncontrolledAccordion>
  )
}

export default AccordionUncontrolled
