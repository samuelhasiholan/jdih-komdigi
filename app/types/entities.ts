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
    judulSeragam?: string
    tajukEntriUtama?: string
    nomor?: string
    categoryName?: string
    singkatan?: string
    tempatPenetapan?: string
    tanggalPenetapanPengundangan?: string
    sumber?: string
    jejakan?: string
    status?: string
    bahasa?: string
    lokasi?: string
    produkPasal?: Array<ProdukPasal>
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

export type ProdukPasal = {
    id?: string;
    label?: string;
    konten?: string;
  };