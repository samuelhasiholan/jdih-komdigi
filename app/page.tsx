'use client'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { title, subtitle } from '@/components/primitives'
import { SearchIcon } from '@/components/icons'
import { Image } from '@nextui-org/image'
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

export default function Home() {
    const [search, setSearch] = useState<string>('')
    const [showMainModal, setShowMainModal] = useState(false)
    const [modalAction, setModalAction] = useState('')
    const [modalSearch, setModalSearch] = useState('')
    const [modalTitle, setModalTitle] = useState('')

    const onCloseMainModal = () => {
        setModalAction('')
        setModalSearch('')
        setModalTitle('')
    }

    const openModal = (action: string, title: string, search: string = '') => {
        setModalAction(action)
        setModalSearch(search)
        setModalTitle(title)
        setShowMainModal(true)
    }

    return (
        <>
            <div>
                <SectionHeader openModal={openModal} />
                <SectionTemaPeraturan openModal={openModal} />
                <SectionProdukHukum />
                <SectionFitur />
                <SectionTv openModal={openModal} />
                <SectionBerita openModal={openModal} />
                <SectionInfografis openModal={openModal} />
                <SectionFooter openModal={openModal} />
            </div>
            <MainModal
                action={modalAction}
                search={modalSearch}
                title={modalTitle}
                isOpen={showMainModal}
                onOpenChange={(open) => setShowMainModal(open)}
                onClose={() => onCloseMainModal()}
            />
        </>
    )
}
