'use client'

import { SearchIcon } from '@/components/icons'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useEffect, useRef, useState } from 'react'
import SelectInput from '@/components/select'
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface TableHeaderWrapperProps {
    initSearch: string | number
    onSearch?: (value: any) => void
    onExtra?: any
    onExtraTwo?: any
    onExtraChange?: (value: any) => void
    onExtraTwoChange?: (value: any) => void
    onExtraTitle?: string
    onExtraTwoTitle?: string
    onSubmit?: () => void
    formRef?: any
}

export default function TableHeaderWrapper({
    initSearch,
    onSearch,
    onExtra,
    onExtraChange,
    onExtraTwo,
    onExtraTwoChange,
    onExtraTitle,
    onExtraTwoTitle,
    onSubmit,
}: TableHeaderWrapperProps) {
    const [search, setSearch] = useState<any>(initSearch || '')
    const [layoutName, setLayoutName] = useState<string>('default')
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [selection, setSelection] = useState<number | null>()
    const inputRef = useRef<HTMLInputElement>(null)
    const keyboardRef = useRef<KeyboardReactInterface | null>(null)

    const onKeyPress = (button: any) => {
        if (button === '{shift}') {
            setLayoutName(layoutName === 'shift' ? 'default' : 'shift')
        } else if (button === '{lock}') {
            setLayoutName(layoutName === 'caps' ? 'default' : 'caps')
        }
    }

    const onClear = () => {
        setSearch('')
        setSelection(null)
        keyboardRef.current?.setInput('')
        onSearch && onSearch('')
    }

    const onChange = (input: any) => {
        setSearch(input)
        setSelection(keyboardRef.current?.getCaretPosition())
        onSearch && onSearch(input)
    }

    const onChangeInput = (event: any) => {
        const input = event.target.value
        setSearch(input)
        onSearch && onSearch(input)
        keyboardRef.current?.setInput(input)
    }

    useEffect(() => {
        if (!selection) return
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(selection, selection)
    }, [selection])

    useEffect(() => {
        if (!initSearch) return
        setSearch(initSearch)
        keyboardRef.current?.setInput(initSearch.toString())
    }, [initSearch])

    return (
        <div className="flex flex-wrap items-center justify-between relative gap-4">
            <form
                className="flex items-center w-full rounded-xl overflow-hidden mb-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit && onSubmit()
                }}
            >
                <div className="grid grid-cols-5 items-center w-full">
                    {onSearch && (
                        <div className="col-span-2">
                            <Input
                                ref={inputRef}
                                className="w-full"
                                radius="none"
                                size="md"
                                placeholder="Masukan Kata Pencarian"
                                isClearable
                                onClear={onClear}
                                onFocus={() => setShowKeyboard(true)}
                                onBlur={() => setShowKeyboard(false)}
                                value={search}
                                onChange={onChangeInput}
                            />
                        </div>
                    )}
                    {onExtra && (
                        <div className="col-span-2">
                            <SelectInput
                                key={`select-1`}
                                placeholder={onExtraTitle}
                                labelPlacement="outside"
                                items={onExtra}
                                itemLabel="category_name"
                                itemValue="id"
                                selectInputIndex={1}
                                onChange={(e) => {
                                    const value = e.target.value
                                    onExtraChange && onExtraChange(value)
                                }}
                                children={[]}
                            />
                        </div>
                    )}
                    {onExtraTwo && (
                        <div>
                            <SelectInput
                                key={`select-2`}
                                placeholder={onExtraTwoTitle}
                                labelPlacement="outside"
                                items={onExtraTwo}
                                itemLabel="label"
                                itemValue="value"
                                selectInputIndex={2}
                                onChange={(e) => {
                                    const value = e.target.value
                                    onExtraTwoChange && onExtraTwoChange(value)
                                }}
                                children={[]}
                            />
                        </div>
                    )}
                </div>
                <div style={{ alignSelf: 'stretch' }}>
                    {onSearch && (
                        <Button
                            disableRipple
                            isIconOnly
                            size="sm"
                            variant="flat"
                            radius="none"
                            className="active:scale-75 h-full w-10"
                            style={{ backgroundColor: '#F9AB00' }}
                            type="submit"
                        >
                            <SearchIcon fill="white" size={16} />
                        </Button>
                    )}
                </div>
            </form>
            <div
                className={`${showKeyboard ? '' : 'hidden'} w-full absolute z-10`}
                style={{ top: '40px' }}
            >
                <Keyboard
                    keyboardRef={(r) => (keyboardRef.current = r)}
                    layoutName={layoutName}
                    layout={{
                        default: [
                            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                            '{tab} q w e r t y u i o p [ ] \\',
                            "{lock} a s d f g h j k l ; ' {enter}",
                            '{shift} z x c v b n m , . / {shift}',
                            '{space}',
                        ],
                        shift: [
                            '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                            '{tab} Q W E R T Y U I O P { } |',
                            '{lock} A S D F G H J K L : " {enter}',
                            '{shift} Z X C V B N M < > ? {shift}',
                            '{space}',
                        ],
                        caps: [
                            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                            '{tab} Q W E R T Y U I O P [ ] \\',
                            "{lock} A S D F G H J K L ; ' {enter}",
                            '{shift} Z X C V B N M , . / {shift}',
                            '{space}',
                        ],
                    }}
                    display={{
                        '{tab}': 'tab ⇥',
                        '{bksp}': 'backspace ⌫',
                        '{enter}': 'enter ↵',
                        '{lock}': 'caps ⇪',
                        '{shift}': 'shift ⇧',
                        '{space}': ' ',
                    }}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    preventMouseDownDefault={true}
                />
            </div>
        </div>
    )
}
