import React from 'react'

function FormatCountdown({ seconds }) {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    const formatSegment = (value, label) =>
        value > 0 ? `${value}${label} ` : ''

    return `${formatSegment(days, 'd')}${formatSegment(
        hours,
        'h'
    )}${formatSegment(minutes, 'm')}${remainingSeconds}s`
}

export default FormatCountdown
