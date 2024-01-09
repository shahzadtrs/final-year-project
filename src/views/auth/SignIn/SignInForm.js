/*global chrome*/
import React, { useEffect } from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setUser } from 'store/auth/userSlice'
import { App, Credentials } from 'realm-web'
const app = new App({ id: 'fyp-backend-huovw' })

// Form Validations
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .required('Please enter your email'),
    password: Yup.string()
        .required('Please enter your password')
        .min(6, 'Password must be at least 6 characters'),
    rememberMe: Yup.bool(),
})

// Global Variables

const SignInForm = (props) => {
    // Getting props as a parameters object

    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',

        // app,
    } = props

    const [message, setMessage] = useTimeOutMessage()
    // React hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    // Access token and tokenId from search params to confirm email/pass user
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')
    const tokenId = searchParams.get('tokenId')
    // Confirm user with token and tokenId when user will click on confirmation email
    const confirmEmailPassUser = async () => {
        if (token && tokenId) {
            try {
                await app.emailPasswordAuth.confirmUser({
                    token,
                    tokenId,
                })
            } catch (err) {
                alert('Something went wrong please try again')
            }
        }
    }

    // React hook to run this async func with array of dependencies
    /*
    1. [] means this useEffect will run very fist time whenever page will reload
    2. when token and tokenId will change this useEffect will re-render the function
    */
    useEffect(() => {
        if (token && tokenId) {
            confirmEmailPassUser()
        }
    }, [token, tokenId])

    // Sign In func that will run on when user will click on SignIn button
    const onSignIn = async (values, setSubmitting) => {
        const { email, password } = values
        setSubmitting(true)
        try {
            let emailPassCredentials = Credentials.emailPassword(
                email,
                password
            )

            await app.logIn(emailPassCredentials)

            const currentUser = app?.currentUser?.profile

            const payload = currentUser

            dispatch(setUser(payload))

            navigate(`/home`)
        } catch (err) {
            setMessage(err && 'Invalid credentials')

            setSubmitting(false)
        }
        setSubmitting(false)
    }

    // SIGN IN PAGE UI
    return (
        <>
            <div className={className}>
                {message && (
                    <Alert className="mb-4" type="danger" showIcon>
                        {message}
                    </Alert>
                )}
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        rememberMe: true,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!disableSubmit) {
                            onSignIn(values, setSubmitting)
                        } else {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="email"
                                        component={Input}
                                    />
                                </FormItem>
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
                                        placeholder="password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <div className="flex justify-between mb-6">
                                    <Field
                                        className="mb-0"
                                        name="rememberMe"
                                        component={Checkbox}
                                        children="Remember Me"
                                    />
                                    <ActionLink to={forgotPasswordUrl}>
                                        Forgot Password?
                                    </ActionLink>
                                </div>
                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                >
                                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                                </Button>

                                <div className="mt-4 text-center">
                                    <span>Don't have an account yet?</span>
                                    <ActionLink to={signUpUrl}>
                                        Sign up
                                    </ActionLink>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default SignInForm
