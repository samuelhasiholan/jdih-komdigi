export interface ProdukHukum {
    id: number
    productName: string
    descr: string
    filePath: string
    thumbnail: string
    bidangHukum: string
}

export interface Berita {
    id: number
    judul: string
    excerpt: string
    content: string
    thumbnail: string
    date_created: string
}
