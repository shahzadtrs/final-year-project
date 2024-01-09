import { Card } from 'components/ui'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
const Hero_Forground_Img =
    '/img/hero/medium-shot-woman-influencer-marketing.webp'
function Hero() {
    const [showImage, setShowImage] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        // Set showImage to true after a delay (you can adjust the delay as needed)
        const delay = 1000 // 1 second
        const timer = setTimeout(() => {
            setShowImage(true)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <Fragment>
            <Card
                className={` 
                }`}
            >
                <div
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1478301672914-6eba52f60d13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fHNvY2lhbCUyMGluZmx1ZW5jZXJzfGVufDB8fDB8fHww')",

                        width: '100%',
                        height: '500px',
                        position: 'relative',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        marginBottom: '20px',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        transition: 'transform 1000ms ease-in',
                    }}
                >
                    <div className="absolute top-0 left-0 right-0 rounded-[6px]  w-[100%] h-[100%] bg-gradient-to-r from-[#ffafcc] opacity-90 transition-all duration-300 "></div>
                    <div className="flex flex-col justify-center items-center gap-10 w-[100%] h-[100%] lg:flex-row xl:flex-row 2xl:flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <img
                            src={`${Hero_Forground_Img}`}
                            className={`w-[400px] h-[470px] transition-transform duration-1000 ease-in ${
                                showImage
                                    ? 'translate-x-0'
                                    : 'translate-x-[-800px]'
                            }`}
                        />
                        <div className="">
                            <h1 className="text-white">
                                Get in touch with your favourite <br />{' '}
                                <span className="mt-5">BRANDS</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

Hero.propTypes = {
    // add propTypes here
}

export default Hero
