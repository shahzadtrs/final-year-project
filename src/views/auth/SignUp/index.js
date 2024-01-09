import React, { useState } from 'react'
import SignUpForm from './SignUpForm'

const SignUp = () => {
    const [displaySignInText, setDisplaySignInText] = useState(true)
    return (
        <>
            {displaySignInText && (
                <div className="mb-8">
                    <h3 className="mb-1">Sign Up</h3>
                    <p>And lets get started with your free trial</p>
                </div>
            )}
            <SignUpForm
                disableSubmit={false}
                setDisplaySignInText={setDisplaySignInText}
            />
        </>
    )
}

export default SignUp
