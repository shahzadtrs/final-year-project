import { Card } from 'components/ui'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

function AboutUs() {
    const { t } = useTranslation()
    return (
        <Fragment>
            <Card className=" mb-20 mt-20">
                <section className="our-mission flex flex-col justify-center items-center gap-6 py-10">
                    <div className="om">
                        <h1>About Us</h1>
                    </div>
                    <hr />
                    <h6>
                        Welcome to our website, where we curate and showcase the
                        pinnacle of excellence in the world of brands and
                        influencers. We are the founder and curator behind this
                        platform, driven by an unyielding passion for
                        celebrating and connecting people with the top-ranked
                        brands and influencers globally.
                    </h6>
                </section>
            </Card>
        </Fragment>
    )
}

export default AboutUs
