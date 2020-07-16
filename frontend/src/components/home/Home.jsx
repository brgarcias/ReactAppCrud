import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Start"
        subtitle="Second Project of React chapter">
        <div className="h1 display-4">Welcome!
                {/* <Button color="info">Information!</Button> */}
        </div>
        <hr />
        <p className="mb-0 lead">System to exemplify a construction of
        a React Project!</p>
    </Main>