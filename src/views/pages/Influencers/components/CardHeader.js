import React, { Fragment } from 'react'

function CardHeader({
    imgSrc,
    headerImageClassName = undefined,
    headerImageAlt = undefined,
}) {
    console.log(imgSrc)
    return (
        <Fragment>
            <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                <img
                    className={headerImageClassName}
                    src={imgSrc}
                    alt={headerImageAlt}
                />
            </div>
        </Fragment>
    )
}

export default CardHeader
