import React, { useState, useEffect, useCallback } from 'react'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Notification,
    toast,
} from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ActionLink } from 'components/shared'
// import { apiForgotPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { t } from 'i18next'
import { setLoading } from 'store/loader/loaderSlice'
import axios from 'axios'
import CodeVerification from 'components/ui/Popup'
import useCountdown from 'utils/hooks/useCountDown'
import FormatCountdown from 'components/ui/FormatCountdown'
import { App } from 'realm-web'
const app = new App({ id: 'fyp-backend-huovw' })

const validationSchema = Yup.object().shape({
    email: Yup.string().required(
        t('forgotPasswordForm:emailRequiredValidation')
    ),
})

const ForgotPasswordForm = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const lang=useSelector(state=>state.locale.currentLang)
    const { disableSubmit = false, className, signInUrl = `/sign-in` } = props

    const [emailSent, setEmailSent] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const countdownIntervals = [30, 60, 120, 3600, 86400] // Countdown intervals in seconds

    const {
        currentCountdownInterval,
        countdown,
        startCountdownWithNextInterval,
    } = useCountdown(countdownIntervals)

    // hook to display notification
    useEffect(() => {
        message &&
            toast.push(
                <Notification
                    duration={15000}
                    type={'info'}
                    title={
                        'If we find your email you will receive an email, please also check your spam, it expires in 10 mins.'
                    }
                />,
                {
                    placement: 'top-end',
                }
            )
    }, [message])

    /*
    1. Send email reset ** digit code to user's email address.
    2. Verify the code and reset the password.
    */

    const forgotPasswordByVerificationCode = async (app, email) => {
        const res = await app.emailPasswordAuth.callResetPasswordFunction(
            {
                email,
                password: '************', // We are not setting password here, so it will be auto-generated
            },
            true
        )
        if (res === undefined) {
            setEmail(email)
            setIsOpen(true)
        }
    }

    const onSendMail = async (values, setSubmitting) => {
        const { email } = values
        setSubmitting(true)
        try {
            await forgotPasswordByVerificationCode(app, email)

            setSubmitting(false)
            setEmailSent(true)
        } catch (errors) {
            if (errors.error.startsWith('failed to reset password for user')) {
                setEmail(email)
                setIsOpen(true)
            } else {
                startCountdownWithNextInterval()

                setMessage(
                    errors && 'err' // error message for user
                )
                setSubmitting(false) // set form submitting to false
            }
        }
    }

    let resetPassword = useCallback(
        async (closePopup, setShowInvalidCodeErr) => {
            try {
                // Transform the verificationCode array to a string when needed
                const joinedVerificationCode = verificationCode.join('')

                dispatch(setLoading(true))

                const res = await axios.post(
                    'https://ap-southeast-1.aws.data.mongodb-api.com/app/fyp-backend-huovw/endpoint/digits_verification',
                    {
                        email,
                        verificationCode: joinedVerificationCode,
                    }
                )

                if (res.data.status === 200) {
                    closePopup()
                    setVerificationCode(['', '', '', '', '', '']) // reset verification code input
                    navigate(`/reset-password`, {
                        state: {
                            email,
                            redirect: 'verification-successful',
                        },
                    })
                    dispatch(setLoading(false))
                } else {
                    setVerificationCode(['', '', '', '', '', '']) // reset verification code input
                    dispatch(setLoading(false)) // set loading state to false
                    setShowInvalidCodeErr(true) // Dispalay notification to user about error
                }
            } catch (error) {
                console.log(error)
                setVerificationCode(['', '', '', '', '', '']) // reset verification code input
                dispatch(setLoading(false))
                setShowInvalidCodeErr(true) // Dispalay notification to user about error
            }
        },
        [verificationCode]
    )

    return (
        <>
            <div className={className}>
                {isOpen && (
                    <CodeVerification
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        email={email}
                        verificationCode={verificationCode}
                        setVerificationCode={setVerificationCode}
                        verificationCallback={resetPassword}
                        invalidCodeErr={t(
                            'Something went wrong. Please try again.'
                        )}
                        heading={t('Email Verification')}
                        description={t(
                            'Enter the six-digit code sent to your phone number or email:'
                        )}
                    />
                )}
                <div className="mb-6">
                    {emailSent ? (
                        <>
                            <h3 className="mb-1">{t('Check your email')}</h3>
                            <p>
                                {t(
                                    'We have sent a password recovery instruction to your email'
                                )}
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-1">{t('Forgot Password')}</h3>
                            <p>{t('Please enter your email address')}</p>
                        </>
                    )}
                </div>

                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!disableSubmit) {
                            onSendMail(values, setSubmitting)
                        } else {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <div className={emailSent ? 'hidden' : ''}>
                                    <FormItem
                                        invalid={errors.email && touched.email}
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="email"
                                            placeholder={t(
                                                'Please enter your email'
                                            )}
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>

                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    disabled={
                                        countdown < currentCountdownInterval
                                    } // Disable the button during countdown
                                >
                                    {countdown !== currentCountdownInterval ? (
                                        <p>
                                            Resend email in{' '}
                                            <FormatCountdown
                                                seconds={countdown}
                                            />{' '}
                                        </p>
                                    ) : emailSent ? (
                                        t('Resend Email')
                                    ) : (
                                        t('Send Email')
                                    )}
                                </Button>
                                <div className="mt-4 text-center">
                                    <span> {t('Back to')} </span>
                                    {!app?.currentUser?.customData?.uuid && (
                                        <ActionLink to={signInUrl}>
                                            {' '}
                                            {t('Sign In')}
                                        </ActionLink>
                                    )}
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default ForgotPasswordForm
