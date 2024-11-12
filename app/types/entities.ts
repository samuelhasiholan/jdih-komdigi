export interface ProdukHukumInterface {
    id?: number
    productName?: string
    descr?: string
    filePath?: string
    thumbnail?: string
    bidangHukum?: string
    title?: string
    content?: string
    uploadDate?: string
}

export interface BeritaInterface {
    id?: number
    judul?: string
    excerpt?: string
    content?: string
    thumbnail?: string
    penulis?: string
    dateCreated?: string
}

export interface InfografisInterface {
    id?: number
    judul?: string
    konten?: string
    thumbnail?: string
    penulis?: string
    dateCreated?: string
}

export interface VideoInterface {
    id?: number
    judul?: string
    filePath?: string
    linkUrl?: string
    createdAt?: string
    orders?: number
    previewPath?: string
}
