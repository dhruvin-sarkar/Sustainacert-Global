import type { ReactNode, ComponentPropsWithRef } from "react"
import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti"
import confetti from "canvas-confetti"

import { Button, ButtonProps } from "@/components/ui/button"

type Api = {
  fire: (options?: ConfettiOptions) => void
}

type Props = ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions
  globalOptions?: ConfettiGlobalOptions
  manualstart?: boolean
  children?: ReactNode
}

export type ConfettiRef = Api | null

const ConfettiContext = createContext<Api>({} as Api)

const Confetti = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props
  const instanceRef = useRef<ConfettiInstance | null>(null) // confetti instance

  const canvasRef = useCallback(
    // https://react.dev/reference/react-dom/components/common#ref-callback
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        // <canvas> is mounted => create the confetti instance
        if (instanceRef.current) return // if not already created
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        })
      } else {
        // <canvas> is unmounted => reset and destroy instanceRef
        if (instanceRef.current) {
          instanceRef.current.reset()
          instanceRef.current = null
        }
      }
    },
    [globalOptions],
  )

  // `fire` is a function that calls the instance() with `opts` merged with `options`
  const fire = useCallback(
    (opts = {}) => instanceRef.current?.({ ...options, ...opts }),
    [options],
  )

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire],
  )

  useImperativeHandle(ref, () => api, [api])

  useEffect(() => {
    if (!manualstart) {
      fire()
    }
  }, [manualstart, fire])

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  )
})

interface ConfettiButtonProps extends ButtonProps {
  options?: ConfettiOptions &
    ConfettiGlobalOptions & { canvas?: HTMLCanvasElement }
  children?: React.ReactNode
  disabled?: boolean
}

function ConfettiButton({ options, children, disabled, ...props }: ConfettiButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Only trigger confetti if not disabled and particleCount is set
    if (!disabled && options?.particleCount && options.particleCount > 0) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      confetti({
        particleCount: 50,
        spread: 360,
        colors: ['#1e3a8a', '#0f172a', '#334155', '#475569', '#64748b'],
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        ...options,
      })
    }
  }

  return (
    <Button onClick={handleClick} disabled={disabled} {...props}>
      {children}
    </Button>
  )
}

Confetti.displayName = "Confetti"

export { Confetti, ConfettiButton }