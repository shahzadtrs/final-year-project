import { Button, Card } from 'components/ui'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import NumberFormat from 'react-number-format'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

function Brand(props) {
    const {
        headerImageClassName = undefined,
        headerImageAlt = undefined,
        type = undefined,
        btnVariant = undefined,
        form = undefined,
        onClick,
        btnText,
        title,
        imgSrc,
        social,
    } = props
    const { t } = useTranslation()

    return (
        <Fragment>
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={
                    <CardHeader
                        headerImageClassName={headerImageClassName}
                        headerImageAlt={headerImageAlt}
                        imgSrc={imgSrc}
                    />
                }
                footer={
                    <CardFooter
                        type={type}
                        btnvariant={btnVariant}
                        form={form}
                        onClick={onClick}
                        btnText={btnText}
                    />
                }
                headerClass="p-0 !w-full"
                footerBorder={false}
                headerBorder={false}
            >
                <h4 className="font-bold my-3">{title}</h4>
                <p>{social.instagram}</p>
            </Card>
        </Fragment>
    )
}

export default Brand
