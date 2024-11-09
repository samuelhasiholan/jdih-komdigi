'use client'
import { useState } from 'react'
import MainModal from '@/components/modal'
import SectionProdukHukum from '@/components/main/section-produk-hukum'
import SectionTemaPeraturan from '@/components/main/section-tema-peraturan'
import SectionFitur from '@/components/main/section-fitur'
import SectionTv from '@/components/main/section-tv'
import SectionBerita from '@/components/main/section-berita'
import SectionInfografis from '@/components/main/section-infografis'
import SectionFooter from '@/components/main/section-footer'
import SectionHeader from '@/components/main/section-header'
import { Video } from './types/entities'

export default function Home() {
    const [search, setSearch] = useState<string>('')
    const [showMainModal, setShowMainModal] = useState(false)
    const [modalAction, setModalAction] = useState('')
    const [modalSearch, setModalSearch] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalVideo, setModalVideo] = useState<Video | null>(null)

    const onCloseMainModal = () => {
        setModalAction('')
        setModalSearch('')
        setModalTitle('')
        setModalVideo(null)
    }

    const openModal = (
        action: string,
        title: string,
        search: string = '',
        video: Video | null = null,
    ) => {
        setModalAction(action)
        setModalSearch(search)
        setModalTitle(title)
        setShowMainModal(true)
        setModalVideo(video)
    }

    return (
        <>
            <div>
                <SectionHeader openModal={openModal} />
                <SectionTemaPeraturan openModal={openModal} />
                <SectionProdukHukum />
                <SectionFitur />
                <SectionTv openModal={openModal} openModalVideo={openModal} />
                <SectionBerita openModal={openModal} />
                <SectionInfografis openModal={openModal} />
                <SectionFooter openModal={openModal} />
            </div>
            <MainModal
                action={modalAction}
                search={modalSearch}
                title={modalTitle}
                video={modalVideo}
                isOpen={showMainModal}
                onOpenChange={(open) => setShowMainModal(open)}
                onClose={() => onCloseMainModal()}
            />
        </>
    )
}
