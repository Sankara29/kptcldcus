import React from 'react'
import { Spinner } from 'reactstrap'

const Loader = () => {
    return (
        <div style={{ height: '674px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color="primary" />
        </div>
    )
}

export default Loader
