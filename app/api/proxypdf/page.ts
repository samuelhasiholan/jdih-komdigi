// pages/api/proxyPdf.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.status(200).json({ message: 'Hello, World!' })
}

// export default async function handler(req: NextApiRequest, res: NextApiRequest) {
//     const pdfUrl =
//         'https://jdih.kominfo.go.id/storage/files/1710316679-Salinan_PM_Kominfo_Nomor_3_Tahun_2024_tanpa_paraf_TTE.pdf'

//     if (!pdfUrl) {
//         return res.status(400).json({ error: 'URL parameter is required' })
//     }

//     try {
//         const response = await fetch(pdfUrl)

//         if (!response.ok) {
//             return res
//                 .status(response.status)
//                 .json({ error: `Failed to fetch PDF: ${response.statusText}` })
//         }

//         // Set headers for PDF response
//         res.setHeader('Content-Type', 'application/pdf')
//         res.setHeader('Content-Disposition', 'inline')

//         // Stream the PDF data from the fetch response to the Next.js response
//         const reader = response.body?.getReader()

//         if (reader) {
//             const decoder = new TextDecoder()

//             // Read and write the data in chunks
//             while (true) {
//                 const { done, value } = await reader.read()
//                 if (done) break
//                 if (value) res.write(value)
//             }

//             // End the response once all chunks have been written
//             res.end()
//         } else {
//             res.status(500).json({ error: 'Failed to get PDF stream' })
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.message })
//     }
// }
