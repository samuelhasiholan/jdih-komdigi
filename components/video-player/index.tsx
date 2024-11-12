import { VideoInterface as VideoProps } from '@/app/types/entities'

interface VideoPlayerProps {
    linkUrl: string | undefined
}
export default function VideoPlayer(video: VideoPlayerProps) {
    console.log(video.linkUrl)

    return (
        <div className="video-card">
            <div className="video-card-body">
                <video controls height="100%" width="100%" autoPlay={true}>
                    <source src={video.linkUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}
