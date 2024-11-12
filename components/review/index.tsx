'use client'
import { button as buttonStyles } from '@nextui-org/theme'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Input, Textarea } from '@nextui-org/input'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal'
import { CloseIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { DashboardState } from '@/store/slice/dashboard'
import { useEffect, useRef, useState } from 'react'
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'
import toast from 'react-hot-toast'
import { useHttp } from '@/app/hooks/useHttp'
import { Snippet } from '@nextui-org/snippet'

interface ReviewProps {
    isOpen: boolean
    onOpenChange?: (open: boolean) => void
    onClose?: () => void
}

export default function Review({
    isOpen = false,
    onOpenChange,
    onClose,
}: ReviewProps) {
    const { loading, error }: DashboardState = useAppSelector(
        (state) => state.dashboard,
    )
    const { post } = useHttp()

    const [rating, setRating] = useState<number>(0)
    const [nama, setNama] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [saran, setSaran] = useState<string>('')
    const [err, setErr] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        if (error) {
            toast.dismiss()
            toast.error(error)
        }
        clear()
    }, [error])

    const clear = () => {
        setRating(0)
        setNama('')
        setEmail('')
        setSaran('')
        setErr(null)
        setIsSuccess(false)
    }

    const handleSubmit = async () => {
        if (rating === 0) {
            return setErr('Silahkan isi rating terlebih dahulu')
        }
        if (nama === '') {
            return setErr('Nama tidak boleh kosong')
        }
        if (email === '') {
            return setErr('Email tidak boleh kosong')
        }
        // validate email
        const re = /\S+@\S+\.\S+/
        if (!re.test(email)) {
            return setErr('Email tidak valid')
        }
        if (saran === '') {
            return setErr('Saran tidak boleh kosong')
        }

        try {
            const response: any = await post('/site/save-ikm', {
                rating,
                nama,
                email,
                saran,
            })

            if (response.status === 200) {
                setIsSuccess(true)
                return
            }

            clear()
            onClose && onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            backdrop="blur"
            onOpenChange={onOpenChange}
            onClose={() => {
                clear()
                onClose && onClose()
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
                <ModalHeader
                    className="flex flex-col items-center"
                    style={{
                        backgroundColor: '#006defcc',
                        borderRadius: '14px 14px 0 0',
                        paddingBottom: 0,
                    }}
                >
                    <span
                        className="text-3xl font-bold"
                        style={{ color: '#fff' }}
                    >
                        Berikan Kami Ulasan
                    </span>
                    <Image
                        src="/assets/review_avatar.png"
                        alt="image"
                        className=""
                        removeWrapper
                    />
                </ModalHeader>
                <ModalBody style={{ padding: '56px 88px' }}>
                    {isSuccess && (
                        <div className="mb-3">
                            <p
                                className="mb-2 text-lg"
                                style={{
                                    color: '#949494',
                                    textAlign: 'center',
                                    fontSize: '24px',
                                }}
                            >
                                Terima Kasih Atas Ulasan Anda
                            </p>
                        </div>
                    )}
                    {!isSuccess && (
                        <>
                            {err && (
                                <Snippet
                                    color="danger"
                                    hideCopyButton
                                    hideSymbol
                                    style={{ padding: '11px 16px' }}
                                >
                                    {err}
                                </Snippet>
                            )}

                            <div className="mb-3">
                                <p
                                    className="mb-2 text-lg"
                                    style={{ color: '#949494' }}
                                >
                                    Masukan Nama Anda
                                </p>
                                <Input
                                    autoFocus
                                    placeholder=" "
                                    size="lg"
                                    variant="bordered"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <p
                                    className="mb-2 text-lg"
                                    style={{ color: '#949494' }}
                                >
                                    Masukan Email Anda
                                </p>
                                <Input
                                    placeholder=" "
                                    size="lg"
                                    type="email"
                                    variant="bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <p
                                    className="mb-2 text-lg"
                                    style={{ color: '#949494' }}
                                >
                                    Masukan Saran Anda
                                </p>
                                <Textarea
                                    placeholder=""
                                    size="lg"
                                    variant="bordered"
                                    value={saran}
                                    onChange={(e) => setSaran(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <p
                                    className="mb-2 text-lg"
                                    style={{ color: '#949494' }}
                                >
                                    Berikan Rating Anda
                                </p>
                                <div className="flex justify-center gap-6">
                                    {Array.from({ length: 5 }, (_, index) => {
                                        if (index + 1 <= rating) {
                                            return (
                                                <BsStarFill
                                                    size={34}
                                                    onClick={() =>
                                                        setRating(index + 1)
                                                    }
                                                    key={index}
                                                />
                                            )
                                        } else {
                                            return (
                                                <BsStar
                                                    size={34}
                                                    onClick={() =>
                                                        setRating(index + 1)
                                                    }
                                                    key={index}
                                                />
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <div>
                                <Button
                                    className="w-full cursor-pointer flex-shrink-0 font-bold bg-primary text-primary-foreground"
                                    size="lg"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Kirim
                                </Button>
                            </div>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
