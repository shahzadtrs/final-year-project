import React, { Fragment, useRef, useState } from 'react'
import influencers from './influencers.json'
import { Card, Input } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiOutlineSearch } from 'react-icons/hi'
import Influencer from './components/Influencer'

function Influencers() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [influencersData, setInfluencersData] = useState(influencers)
    const lang = useSelector((state) => state.locale.currentLang)
    const searchInput = useRef()

    const handleClick = (productId) => {
        navigate(`/influencer-profile/${productId}`)
    }

    const onEdit = (e) => {
        const searchProducts = influencers.filter((influencer) => {
            console.log(influencer.title, e.target.value)
            console.log(
                influencer.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )
            return influencer.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        })
        setInfluencersData(searchProducts)
    }

    return (
        <Fragment>
            <Card className="">
                <h1 className="flex justify-center items-center py-10">
                    Top Influencers
                </h1>
                <Input
                    ref={searchInput}
                    className="lg:w-52 "
                    size="sm"
                    placeholder="Search"
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={onEdit}
                />
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                    {influencersData.map((influencer, index) => {
                        console.log(influencer.profile)
                        return (
                            <Influencer
                                key={index}
                                headerImageClassName="w-full h-[360px] transition-transform duration-300 transform hover:scale-105"
                                headerImageAlt={influencer.title}
                                imgSrc={influencer.profile}
                                title={influencer.title}
                                social={influencer.social}
                                onClick={() => handleClick(influencer.id)}
                                btnText="Profile"
                            />
                        )
                    })}
                </div>
            </Card>
        </Fragment>
    )
}

export default Influencers
