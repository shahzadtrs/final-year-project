import { Card } from 'components/ui'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

function HowItWorks() {
    const { t } = useTranslation()
    return (
        <Fragment>
            <Card className="mb-20 py-12">
                <div>
                    <h1 className="mb-12 text-center">How it works</h1>
                    <div className="hw flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-center gap-10 ">
                        <div className="hw__content flex flex-col gap-2 text-center">
                            <h3 className="hw__content__heading">
                                Open the website
                            </h3>
                            <p className="hw__content__heading">
                                Open for free on Desktop. It’s quick and easy to
                                sign up to see your favourite stars
                            </p>
                        </div>
                        <div className="hw__content flex flex-col gap-2 text-center">
                            <h3 className="hw__content__heading">
                                Top Ranked Influencers
                            </h3>
                            <p className="hw__content__heading">
                                Engage with insights from influential figures
                                who have left an indelible mark on their
                                industries.
                            </p>
                        </div>
                        <div className="hw__content flex flex-col gap-2 text-center">
                            <h3 className="hw__content__heading">
                                Top Ranked Brands
                            </h3>
                            <p className="hw__content__heading">
                                Explore the cutting-edge innovations of
                                top-ranked brands, drawing inspiration for your
                                own endeavors
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default HowItWorks
