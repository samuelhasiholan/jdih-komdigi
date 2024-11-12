import React from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

interface PdfViewerProps {
    pdfUrl: string
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => (
    <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    >
        <div style={{ height: '800px' }}>
            <Viewer fileUrl={pdfUrl} />
        </div>
    </Worker>
)

export default PdfViewer
