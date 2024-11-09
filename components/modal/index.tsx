'use client'
import { button as buttonStyles } from '@nextui-org/theme'
import { Button } from '@nextui-org/button'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal'
import { BackIcon, CloseIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { DashboardState } from '@/store/slice/dashboard'
import { useEffect, useRef, useState } from 'react'
import Berita from '@/components/berita'
import Infografis from '@/components/infografis'
import Search from '@/components/search'
import Tema from '@/components/tema'
import TV from '@/components/tv'
import QR from '@/components/qr'
import toast from 'react-hot-toast'
import VideoPlayer from '../video-player'
import { Video } from '@/app/types/entities'

interface MainModalProps {
    action: string
    search?: string
    title: string
    isOpen: boolean
    video?: Video | null
    onOpenChange?: (open: boolean) => void
    onClose?: () => void
}

export default function MainModal({
    action,
    search,
    title,
    isOpen = false,
    video = null,
    onOpenChange,
    onClose,
}: MainModalProps) {
    const { isLoading, error }: DashboardState = useAppSelector(
        (state) => state.dashboard,
    )

    const [detail, setDetail] = useState<string>(search)

    useEffect(() => {
        if (search) {
            setDetail(search)
        }
    }, [search])

    useEffect(() => {
        if (error) {
            toast.dismiss()
            toast.error(error)
        }
    }, [error])

    return (
        <Modal
            size="4xl"
            isOpen={isOpen}
            backdrop="blur"
            onOpenChange={onOpenChange}
            onClose={() => {
                setDetail('')
                onClose()
            }}
            placement="center"
            scrollBehavior="inside"
            classNames={{
                closeButton: 'absolute top-3 right-3',
                backdrop: 'bg-black bg-opacity-50',
            }}
            closeButton={
                <div>
                    <CloseIcon />
                </div>
            }
        >
            <ModalContent>
                {action !== 'qr' && (
                    <ModalHeader className="flex flex-col gap-1">
                        <div className="modal-head flex">
                            {detail && (
                                <div
                                    className="mr-3"
                                    onClick={() => setDetail('')}
                                >
                                    <BackIcon />
                                </div>
                            )}
                            <span className="text-3xl font-bold">{title}</span>
                        </div>
                        <div className="long-bar"></div>
                    </ModalHeader>
                )}
                <ModalBody>
                    {action === 'berita' && (
                        <Berita
                            search={detail}
                            onOpen={(value) => setDetail(value)}
                        />
                    )}
                    {action === 'infografis' && <Infografis />}
                    {action === 'search' && <Search search={search} />}
                    {action === 'tema' && <Tema search={search} />}
                    {action === 'tv' && <TV />}
                    {action === 'qr' && <QR />}
                    {action === 'video' && (
                        <VideoPlayer linkUrl={video?.linkUrl} />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
