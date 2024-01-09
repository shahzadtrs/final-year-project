import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { t } from 'i18next'
import { App } from 'realm-web'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .required('Please enter your email'),
    password: Yup.string()
        .required('Please enter your password')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ),
})

const SignUpForm = (props) => {
    const app = new App({ id: 'fyp-backend-huovw' })

    const {
        disableSubmit = false,
        className,
        signInUrl = `/sign-in`,
        setDisplaySignInText,
    } = props

    const [message, setMessage] = useTimeOutMessage()
    const [emailSent, setEmailSent] = useState(false)

    const onSignUp = async (values, setSubmitting) => {
        const { email, password } = values
        setSubmitting(true)

        try {
            await app.emailPasswordAuth.registerUser({
                email,
                password,
            })

            setDisplaySignInText(false)
            setEmailSent(true)
        } catch (err) {
            setEmailSent(false)
            setMessage(err && err.error.toString())
            setSubmitting(false)
        }

        setSubmitting(false)
    }
    return (
        <div className={className}>
            <div className="mb-6">
                {emailSent && (
                    <>
                        <h3 className="mb-1">Check your email</h3>
                        <p>
                            We have sent a confirmation email to your email
                            inbox
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
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
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
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
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
                            </div>
                            <Button
                                block
                                // loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {emailSent ? 'Resend Email' : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Already have an account?</span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
