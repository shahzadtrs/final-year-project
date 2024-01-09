import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'influencers',
        path: '/influencers',
        title: 'Influencers',
        translateKey: 'nav.influencers',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'brands',
        path: '/brands',
        title: 'Brands',
        translateKey: 'nav.brands',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    /** Example purpose only, please remove */
]

export default navigationConfig
