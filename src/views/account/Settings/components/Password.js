import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import {
    Input,
    Button,
    Tag,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import isLastChild from 'utils/isLastChild'
import {
    HiOutlineDesktopComputer,
    HiOutlineDeviceMobile,
    HiOutlineDeviceTablet,
} from 'react-icons/hi'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import CodeVerificationPopup from 'components/ui/Popup/CodeVerification/codeVerificationPopup'
import { App } from 'realm-web'
import CodeVerification from 'components/ui/Popup'
import { setLoading } from 'store/loader/loaderSlice'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const app = new App({ id: 'fyp-backend-huovw' })

const LoginHistoryIcon = ({ type }) => {
    switch (type) {
        case 'Desktop':
            return <HiOutlineDesktopComputer />
        case 'Mobile':
            return <HiOutlineDeviceMobile />
        case 'Tablet':
            return <HiOutlineDeviceTablet />
        default:
            return <HiOutlineDesktopComputer />
    }
}

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password Required'),
})

const Password = ({ data }) => {
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
    const [verificationSuccessful, setVerificationSuccessful] = useState(false)

    const user = useSelector((state) => state.auth.user)

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFormSubmit = async (values, setSubmitting) => {
        const { password } = values
        console.log(user.email)
        const email = user.email
        console.log('email', email)
        console.log('password', password)
        try {
            const res = await app.emailPasswordAuth.callResetPasswordFunction(
                {
                    email,
                    password, // We are not setting password here, so it will be auto-generated
                    currentPassword: password,
                },
                false,
                true
            )
            if (res === undefined) {
                setIsOpen(true)
                setEmail(email)
            }

            setSubmitting(false)
        } catch (err) {
            console.log('Please enter your current password')
            toast.push(
                <Notification
                    title={'Please enter your current password!!'}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
            setSubmitting(false)
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
                    navigate(`/reset-passwords`, {
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
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="Password"
                                    desc="Enter your current & new password to reset your password"
                                />
                                <FormRow
                                    name="password"
                                    label="Current Password"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Current Password"
                                        component={Input}
                                    />
                                </FormRow>

                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Updating'
                                            : 'Update Password'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            <div className="mt-6">
                <FormDesription
                    title="Where you're signed in"
                    desc="You're signed in to your account on these devices."
                />
                {data && (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600 mt-6">
                        {data.map((log, index) => (
                            <div
                                key={log.deviceName}
                                className={classNames(
                                    'flex items-center px-4 py-6',
                                    !isLastChild(data, index) &&
                                        'border-b border-gray-200 dark:border-gray-600'
                                )}
                            >
                                <div className="flex items-center">
                                    <div className="text-3xl">
                                        <LoginHistoryIcon type={log.type} />
                                    </div>
                                    <div className="ml-3 rtl:mr-3">
                                        <div className="flex items-center">
                                            <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                {log.deviceName}
                                            </div>
                                            {index === 0 && (
                                                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 rounded-md border-0 mx-2">
                                                    <span className="capitalize">
                                                        {' '}
                                                        Current{' '}
                                                    </span>
                                                </Tag>
                                            )}
                                        </div>
                                        <span>
                                            {log.location} •{' '}
                                            {dayjs
                                                .unix(log.time)
                                                .format('DD-MMM-YYYY, hh:mm A')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Password
