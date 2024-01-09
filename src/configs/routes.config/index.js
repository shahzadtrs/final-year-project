import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/pages/home/index')),
        authority: [],
        meta: {
            layout: 'simple',
            pageContainerType: 'gutterless',
            footer: true,
        },
    },
    {
        key: 'profile',
        path: '/profile',
        component: React.lazy(() => import('views/account/Settings/index')),
        authority: [],
    },
    {
        key: 'profile-tab',
        path: '/profile/:tab',
        component: React.lazy(() => import('views/account/Settings/index')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-passwords`,
        component: React.lazy(() => import('views/auth/ResetPassword')),
        authority: [],
    },

    {
        key: 'brands',
        path: '/brands',
        component: React.lazy(() => import('views/pages/brands/index')),
        authority: [],
        meta: {
            layout: 'simple',
            pageContainerType: 'gutterless',
            footer: true,
        },
    },
    {
        key: 'brands/profiles',
        path: '/brands-profile/:id',
        component: React.lazy(() =>
            import('views/pages/brands/components/BrandsProfile')
        ),
        authority: [],
        meta: {
            layout: 'simple',
            pageContainerType: 'gutterless',
            footer: true,
        },
    },

    {
        key: 'influencers',
        path: '/influencers',
        component: React.lazy(() => import('views/pages/Influencers/index')),
        authority: [],
        meta: {
            layout: 'simple',
            pageContainerType: 'gutterless',
            footer: true,
        },
    },
    {
        key: 'influencers/profile',
        path: '/influencer-profile/:id',
        component: React.lazy(() =>
            import('views/pages/Influencers/components/InfluencerProfile')
        ),
        authority: [],
        meta: {
            layout: 'simple',
            pageContainerType: 'gutterless',
            footer: true,
        },
    },
]
