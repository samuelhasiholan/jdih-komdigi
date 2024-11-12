interface VideoPlayerProps {
    linkUrl: string | undefined
}
export default function VideoPlayer(video: VideoPlayerProps) {
    console.log(video.linkUrl)

    return (
        <div className="video-card">
            <div className="video-card-body" style={{ width: '100%' }}>
                <video
                    controls
                    autoPlay={true}
                    height="100%"
                    width="100%"
                    style={{ height: '100%', width: '100%' }}
                >
                    <source src={video.linkUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}
