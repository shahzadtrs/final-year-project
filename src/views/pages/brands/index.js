import React, { Fragment, useRef, useState } from 'react'
import brands from './brands.json'
import { Card, Input } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Brand from './components/Brand'
import { HiOutlineSearch } from 'react-icons/hi'

function Brands() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [brandsData, setBrandsData] = useState(brands)
    const lang = useSelector((state) => state.locale.currentLang)
    const searchInput = useRef()

    const handleClick = (productId) => {
        navigate(`/brands-profile/${productId}`)
    }

    const onEdit = (e) => {
        const searchProducts = brands.filter((brand) => {
            console.log(brand.title, e.target.value)
            console.log(
                brand.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
            return brand.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        })
        setBrandsData(searchProducts)
    }

    return (
        <Fragment>
            <Card className="">
                <h1 className="flex justify-center items-center py-10">
                    Top Brands
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
                    {brandsData.map((brand, index) => {
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
                                btnText="Profile"
                            />
                        )
                    })}
                </div>
            </Card>
        </Fragment>
    )
}

export default Brands
