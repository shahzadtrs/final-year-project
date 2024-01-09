import { Avatar, Card } from 'components/ui'
import influencers from '../influencers.json'
import { useParams } from 'react-router-dom'

const InfluencerProfile = () => {
    // Use useParams to get the parameters from the URL
    const { id } = useParams()
    const influencer = influencers.filter(
        (fluencer) => fluencer.id === parseInt(id)
    )
    const influencerProfile = influencer[0]

    const openProfile = (link) => {
        // Ensure the Instagram link is provided
        if (link) {
            // Open the Instagram profile in a new tab or window
            window.open(link, '_blank')
        } else {
            console.error('Instagram link not provided')
        }
    }

    return (
        <div className="flex justify-center items-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center">
                    <img
                        src={`${influencerProfile.profile}`}
                        alt="Profile Picture"
                        className="w-20 h-20 mx-auto rounded-full mb-4"
                    />
                    <h2 className="text-xl font-semibold">
                        {influencerProfile.title}
                    </h2>
                </div>
                <div className="">
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                            Social Links
                        </h3>
                        <ul className="flex flex-wrap">
                            {influencerProfile?.social?.instagram && (
                                <li
                                    className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2 cursor-pointer"
                                    onClick={() =>
                                        openProfile(
                                            `${influencerProfile?.social?.instagram}`
                                        )
                                    }
                                >
                                    Instagram
                                </li>
                            )}
                            {influencerProfile?.social?.website && (
                                <li
                                    className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2 cursor-pointer"
                                    onClick={() =>
                                        openProfile(
                                            `${influencerProfile?.social?.website}`
                                        )
                                    }
                                >
                                    Website
                                </li>
                            )}
                            {influencerProfile?.social?.facebook && (
                                <li
                                    className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2 cursor-pointer"
                                    onClick={() =>
                                        openProfile(
                                            openProfile(
                                                `${influencerProfile?.social?.facebook}`
                                            )
                                        )
                                    }
                                >
                                    Facebook
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">About Me</h3>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfluencerProfile
