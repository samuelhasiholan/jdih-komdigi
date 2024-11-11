interface WebViewProps {
    title: string
    linkUrl: string | undefined
}
export default function Webview(props: WebViewProps) {
    return (
        <div className="webview-card">
            <div className="webview-card-body">
                <iframe
                    className="iframe-placeholder"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    frameBorder="0"
                    height="100%"
                    src={props.linkUrl}
                    title={props.title}
                    width="100%"
                />
            </div>
        </div>
    )
}
