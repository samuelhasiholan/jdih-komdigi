'use client'
import { useState } from 'react';
import MainModal from '@/components/modal';
import Review from '@/components/review';
import SectionProdukHukum from '@/components/main/section-produk-hukum';
import SectionTemaPeraturan from '@/components/main/section-tema-peraturan';
import SectionFitur from '@/components/main/section-fitur';
import SectionTv from '@/components/main/section-tv';
import SectionBerita from '@/components/main/section-berita';
import SectionInfografis from '@/components/main/section-infografis';
import SectionFooter from '@/components/main/section-footer';
import SectionHeader from '@/components/main/section-header';
import { Image } from "@nextui-org/image";
import { Video } from './types/entities';
import { CloseIcon2 } from '@/components/icons';

export default function Home() {
    const [search, setSearch] = useState<string>('');
    const [showMainModal, setShowMainModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewWindow, setShowReviewWindow] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [modalSearch, setModalSearch] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalVideo, setModalVideo] = useState<Video | null>(null);

    const onCloseModal = () => {
        setModalAction('');
        setModalSearch('');
        setModalTitle('');
        setModalVideo(null);
        setShowReviewWindow(false);
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
                <SectionProdukHukum openModal={openModal} />
                <SectionFitur openModal={openModal} />
                <SectionTv openModal={openModal} openModalVideo={openModal} />
                <SectionBerita openModal={openModal} />
                <SectionInfografis openModal={openModal} />
                <SectionFooter openModal={openModal} />
            </div>
            <div className={`${showReviewWindow ? "review-shown" : "review-hidden"} review-container select-none`}>
                <div className="review-card">
                    <div className="review-card-text text-lg font-bold">
                        Hello Sobat JDIH, bagaimana pengalaman<br/>
                        Anda menggunakan layanan kami?
                    </div>
                    <div className="review-card-action text-xl font-bold" onClick={() => setShowReviewModal(true)}>
                        Rating Sekarang
                    </div>
                </div>
                <div className="review-card-close" onClick={() => setShowReviewWindow(false)}>
                    <CloseIcon2 />
                </div>
            </div>
            <Image 
                removeWrapper 
                alt="review" 
                className={`${showReviewWindow ? "animate-spinOnce" : ""} review-button `} src="/assets/review_button.png" 
                onClick={() => setShowReviewWindow(true)} 
            />
            <MainModal
                action={modalAction}
                search={modalSearch}
                title={modalTitle}
                video={modalVideo}
                isOpen={showMainModal}
                onOpenChange={(open) => setShowMainModal(open)}
                onClose={() => onCloseModal()}
            />
            <Review
                isOpen={showReviewModal}
                onOpenChange={(open) => setShowReviewModal(open)}
                onClose={() => onCloseModal()}
            />
        </>
    )
}
