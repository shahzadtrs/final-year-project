import { useState, useEffect, useCallback } from 'react'

const useCountdown = (countdownIntervals = 30) => {
    const [countdownIntervalsIndex, setCountdownIntervalsIndex] = useState(0)

    // Handled both case intervals = [10,20,30] or interval = 60
    const intervals = Array.isArray(countdownIntervals)
        ? countdownIntervals
        : [countdownIntervals]
    const currentCountdownInterval = intervals[countdownIntervalsIndex]

    const [countdown, setCountdown] = useState(currentCountdownInterval)
    const [startCountdown, setStartCountdown] = useState(false)
    const [attempts, setAttempts] = useState(0)

    // hook to handle countdown
    useEffect(() => {
        let countdownInterval

        if (startCountdown && countdown > 0) {
            countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1) // countdown in seconds
            }, 1000) // 1s
        } else {
            clearInterval(countdownInterval)
            setCountdown(currentCountdownInterval) // Increase countdown on each attempt
            setStartCountdown(false)
        }

        return () => clearInterval(countdownInterval)
    }, [countdown, startCountdown, attempts, countdownIntervalsIndex])

    // If you have only one interval e.g interval = 20 the use this startCount function
    // If you have more than one intervals as an array e.g intervals = [10,100,1000], you want to iterate through all of them and increase time limit on each re-attempt failure then use this startCountdownWithNewInterval method

    const startCount = useCallback(() => {
        setStartCountdown(true)
        setCountdown(currentCountdownInterval) // Increase countdown on each attempt
    }, [])

    /* Intervals [10,20,30,40]
    1. We would call this function to iterate for all these intervals indexes one by one
    2. On first call it will take 0 index as a time interval
    3. On second call it will take 1 index as a time interval
    4. Next so on .... but this not automatically restarted after last interval 40
    5. If you want to reset countdown intervals then you can call resetCountdownIntervalsIndex function

    */
    const startCountdownWithNextInterval = () => {
        setStartCountdown(true) // set this to true to start countdown
        setAttempts((prevAttempts) => prevAttempts + 1) // set how many attempts user has made
        // Update countdownIntervalsIndex directly based on attempts
        // Udate Index will alway return the next index because this Math.min function will return the minimum value and will never exceeded from limit
        const updatedIndex = Math.min(
            countdownIntervalsIndex + 1,
            countdownIntervals.length - 1
        )
        setCountdownIntervalsIndex(updatedIndex) // Increase countdown on each attempt

        setCountdown(currentCountdownInterval) // Increase countdown on each attempt
    }

    // Reset countdown intervals index to 0 to restart countdown from start
    const resetCountdownIntervalsIndex = () => {
        setCountdownIntervalsIndex(0)
    }

    return {
        currentCountdownInterval,
        countdown,
        startCount,
        startCountdownWithNextInterval,
        resetCountdownIntervalsIndex,
    }
}

export default useCountdown
