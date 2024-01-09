import { Button } from 'components/ui'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

function CardFooter({ onClick, btnText, ...rest }) {
    const { t } = useTranslation()

    const handleClick = () => {
        onClick()
    }
    return (
        <Fragment>
            <div className="flex justify-end">
                {btnText && (
                    <Button {...rest} onClick={() => handleClick()}>
                        {t(btnText)}
                    </Button>
                )}
            </div>
        </Fragment>
    )
}

export default CardFooter
