import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import './index.css'
import { useSelector } from 'react-redux'

const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
    profile: { label: 'Profile', path: 'profile' },
    password: { label: 'Password', path: 'password' },
}

const Settings = () => {
    const [currentTab, setCurrentTab] = useState('profile')
    const [data, setData] = useState({})
    const lang = useSelector((state) => state.locale.currentLang)

    const navigate = useNavigate()

    const location = useLocation()

    const currentUser = useSelector((state) => state.auth.user)

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val) => {
        console.log(val)
        setCurrentTab(val)
        navigate(`/profile/${val}`)
    }

    const fetchData = async () => {
        // const response = await apiGetAccountSettingData()
        const testData = {
            profile: {
                name: currentUser?.name ? currentUser.name : 'pending',
                email: currentUser?.email ? currentUser.email : 'pending',
            },
        }
        setData(testData)
    }

    useEffect(() => {
        setCurrentTab(path)
        if (isEmpty(data)) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav
                                key={key}
                                value={key}
                                className={
                                    currentTab === key ? 'active-tab' : ''
                                }
                            >
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'profile' && (
                            <Profile data={data.profile} />
                        )}

                        {currentTab === 'password' && //Render this component when we reset user password through Run a password reset function method
                            process.env
                                .REACT_APP_RESET_PASSWORD_BY_RESET_LINK !==
                                'true' && <Password />}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings
