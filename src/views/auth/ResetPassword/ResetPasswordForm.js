import React, { useEffect, useState } from 'react'
import {
    Button,
    FormItem,
    FormContainer,
    Alert,
    Notification,
    toast,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
// import { apiResetPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedOut } from 'store/auth/userSlice'
import { App } from 'realm-web'
const app = new App({ id: 'fyp-backend-huovw' })

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Please enter your password')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Please enter your required password')
        .oneOf([Yup.ref('password'), null], 'Your passwords do not match'),
})

const ResetPasswordForm = (props) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.auth.user)

    const searchParams = new URLSearchParams(location.search)

    const token = searchParams.get('token')
    const tokenId = searchParams.get('tokenId')

    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    useEffect(() => {
        // Display a notification if the user is redirected from the verification page
        location?.state?.redirect === 'verification-successful' &&
            openNotification(
                'info',
                'top-start',
                'Hey, please update your password as soon as possible'
            )
    }, [])

    /*
    1. Send email reset ** digit code to user's email address.
    2. Verify the code and reset the password.
    */

    const resetPasswordByVerificationCode = async (app, email, password) => {
        const res = await app.emailPasswordAuth.callResetPasswordFunction({
            email,
            password, // We are not setting password here, so it will be auto-generated
        })
        if (res === undefined) {
            return true
        }
    }

    //  Send email reset link to user's email address.
    const resetPasswordByEmailResetLink = async (
        app,
        password,
        token,
        tokenId
    ) => {
        await app.emailPasswordAuth.resetPassword({
            password,
            token,
            tokenId,
        })
    }

    const onSubmit = async (values, setSubmitting) => {
        const { password } = values
        setSubmitting(true)
        try {
            const response = await resetPasswordByVerificationCode(
                app,
                location?.state?.email,
                password
            )
            if (response) {
                setSubmitting(false)
                setResetComplete(true)
            }
        } catch (errors) {
            setMessage(errors?.response?.data?.message || errors.toString())
            setSubmitting(false)
        }
    }

    const onContinue = () => {
        dispatch(userLoggedOut())

        navigate(`/sign-in`)
    }

    const openNotification = (type, placement, message) => {
        toast.push(<Notification type={`${type}`} title={`${message}`} />, {
            placement: placement,
        })
    }

    return (
        <div className={className}>
            <div className="mb-6">
                {resetComplete ? (
                    <>
                        <h3 className="mb-1">Reset done</h3>
                        <p>Your password has been successfully reset</p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1">Set new password</h3>
                        <p>
                            Your new password must different to previos password
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSubmit(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            {!resetComplete ? (
                                <>
                                    <FormItem
                                        label="Password"
                                        invalid={
                                            errors.password && touched.password
                                        }
                                        errorMessage={errors.password}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Confirm Password"
                                        invalid={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                        }
                                        errorMessage={errors.confirmPassword}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Submiting...'
                                            : 'Submit'}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    block
                                    variant="solid"
                                    type="button"
                                    onClick={onContinue}
                                >
                                    Continue
                                </Button>
                            )}

                            <div className="mt-4 text-center">
                                <span>Back to </span>
                                {!app?.currentUser?.customData?.uuid && (
                                    <ActionLink to={signInUrl}>
                                        Sign in
                                    </ActionLink>
                                )}
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ResetPasswordForm
