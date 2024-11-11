export interface ProdukHukum {
    id: number
    productName: string
    descr: string
    filePath: string
    thumbnail: string
    bidangHukum: 
    title?: string
    content?: string
    uploadDate?: string
}

export interface Berita {
    id: number
    judul: string
    excerpt: string
    content: string
    thumbnail: string
    penulis: string
    dateCreated: string
}

export interface Infografis {
    id: number
    judul: string
    konten: string
    thumbnail: string
    dateCreated: string
}

export interface Video {
    id: number
    judul: string
    filePath: string
    linkUrl: string
    createdAt: string
    orders: number
    previewPath: string
}
