import React, { useEffect, useRef, useState } from 'react'
import './codeVerificationPopup.css'
import { Button } from 'components/ui'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const CodeVerificationPopup = ({
    isOpen,
    setIsOpen,
    verificationCode,
    setVerificationCode,
    verificationCallback,
    invalidCodeErr,
    heading,
    description,
}) => {
    const [showInvalidCodeErr, setShowInvalidCodeErr] = useState(false)
    const loading = useSelector((state) => state?.loader?.api?.loading)
    const inputsRef = useRef([])

    useEffect(() => {
        // Set focus on the first input when the component mounts
        if (isOpen) {
            inputsRef.current[0].focus()
        }
    }, [isOpen, showInvalidCodeErr])

    const handleInputChange = (index, value) => {
        // Auto-navigation logic
        if (value.length === 1) {
            if (index < verificationCode.length - 1) {
                inputsRef.current[index + 1].focus()
            }
        } else if (value.length === 0 && index > 0) {
            inputsRef.current[index - 1].focus()
        }

        const newVerificationCode = [...verificationCode]
        newVerificationCode[index] = value
        setVerificationCode(newVerificationCode)
    }

    const handlePaste = (e) => {
        // Handle pasting a complete 6-digit code
        const pastedCode = e.clipboardData.getData('text/plain').slice(0, 6)
        if (pastedCode.length === 6) {
            setVerificationCode(pastedCode.split(''))
        }
    }

    const closePopup = () => {
        setIsOpen(false)
    }

    return (
        <div>
            {isOpen && (
                <div id="popupOverlay">
                    <div id="popupContent">
                        {showInvalidCodeErr && (
                            <span className="error">{invalidCodeErr}</span>
                        )}
                        <span className="close" onClick={closePopup}>
                            &times;
                        </span>
                        <h2>{heading}</h2>
                        <p>{description}</p>
                        <div className="verification-fields">
                            {verificationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    ref={(el) =>
                                        (inputsRef.current[index] = el)
                                    }
                                    onPaste={handlePaste}
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                />
                            ))}
                        </div>
                        <div className="button-container">
                            <Button
                                variant="solid"
                                onClick={() =>
                                    verificationCallback(
                                        closePopup,
                                        setShowInvalidCodeErr
                                    )
                                }
                            >
                                {loading ? 'Loading...' : 'Verify'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

CodeVerificationPopup.defaultProps = {
    invalidCodeErr: 'You can only enter 6 digits',
    heading: 'Enter verification code',
    description: 'Please enter the 6-digit verification code',
}

CodeVerificationPopup.propTypes = {
    invalidCodeErr: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
}

export default CodeVerificationPopup
