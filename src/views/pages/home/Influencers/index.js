import React, { Fragment } from 'react'
import brands from './brands.json'
import { Card } from 'components/ui'
import { useTranslation } from 'react-i18next'
import Product from './components/Brand'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Brand from './components/Brand'

function Influencers() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const lang = useSelector((state) => state.locale.currentLang)

    const handleClick = () => {
        navigate(`/influencers`)
    }

    return (
        <Fragment>
            <Card className="">
                <h1 className="flex justify-center items-center py-10">
                    Top Influencers
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                    {brands.map((brand, index) => {
                        console.log(brand.profile)
                        return (
                            <Brand
                                key={index}
                                headerImageClassName="w-full h-[360px] transition-transform duration-300 transform hover:scale-105"
                                headerImageAlt={brand.title}
                                imgSrc={brand.profile}
                                title={brand.title}
                                social={brand.social}
                                onClick={() => handleClick(brand.id)}
                                btnText="More.."
                            />
                        )
                    })}
                </div>
            </Card>
        </Fragment>
    )
}

export default Influencers
