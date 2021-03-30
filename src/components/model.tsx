import * as React from 'react'
import { createPortal } from 'react-dom'

type ModalContextType = {
  onModalClose: () => void
}

type FocusableElements =
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLButtonElement
  | HTMLAnchorElement

const modalContext = React.createContext<ModalContextType>({
  onModalClose: () => {},
})

export default function Modal({ children, isOpen, onModalClose }) {
  React.useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode)
      return listener && listener(e)
    }
    document.addEventListener('keydown', keyListener)

    return () => document.removeEventListener('keydown', keyListener)
  })

  const modalRef = React.useRef<HTMLDivElement>()

  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    ) as NodeListOf<FocusableElements>

    const firstElement = focusableModalElements[0]
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1]

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus()
      return e.preventDefault()
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus()
      e.preventDefault()
    }
  }

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ])

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden', 'pr-[15px]')
    } else {
      document.body.classList.remove('overflow-hidden', 'pr-[15px]')
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-70 z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex flex-col items-start max-h-full p-4 border border-gray-400 rounded-md bg-white"
        ref={modalRef}
      >
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    document.body,
  )
}
