import React, { HTMLAttributes, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '@/context/GlobalContext'

interface StylesType {
  [key: string]: HTMLAttributes<HTMLDivElement>['style']
}

// TODO: types
function useEventListener(eventName: string, handler: any, element = document) {
  const savedHandler = useRef<any | null>(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) {
      return
    }

    const eventListener: EventListener = (event) => {
      savedHandler.current && savedHandler.current(event)
    }

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

const AnimatedCursorComponent = ({
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
}) => {
  const { theme } = useContext(GlobalContext)

  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [isActiveClickable, setIsActiveClickable] = useState(false)
  const endX = useRef(0)
  const endY = useRef(0)

  const onMouseMove = useCallback(({ clientX, clientY }: React.MouseEvent<HTMLElement>) => {
    setCoords({ x: clientX, y: clientY })
    cursorInnerRef.current!.style.top = clientY + 'px'
    cursorInnerRef.current!.style.left = clientX + 'px'
    endX.current = clientX
    endY.current = clientY
  }, [])

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8
        coords.y += (endY.current - coords.y) / 8
        cursorOuterRef.current!.style.top = coords.y + 'px'
        cursorOuterRef.current!.style.left = coords.x + 'px'
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    [requestRef]
  )

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor)
  }, [animateOuterCursor])

  const onMouseDown = useCallback(() => setIsActive(true), [])
  const onMouseUp = useCallback(() => setIsActive(false), [])
  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])

  useEventListener('mousemove', onMouseMove, document)
  useEventListener('mousedown', onMouseDown, document)
  useEventListener('mouseup', onMouseUp, document)
  useEventListener('mouseenter', onMouseEnter, document)
  useEventListener('mouseleave', onMouseLeave, document)

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current!.style.transform = `scale(${innerScale})`
      cursorOuterRef.current!.style.transform = `scale(${outerScale})`
      cursorOuterRef.current!.style.backgroundColor = `rgba(${color}, 0)`
    } else {
      cursorInnerRef.current!.style.transform = 'scale(1)'
      cursorOuterRef.current!.style.transform = 'scale(1)'
      cursorOuterRef.current!.style.backgroundColor = `rgba(${color}, ${outerAlpha})`
    }
  }, [innerScale, outerScale, isActive])

  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current!.style.transform = `scale(${innerScale * 1.3})`
      cursorOuterRef.current!.style.transform = `scale(${outerScale * 1.4})`
    }
  }, [innerScale, outerScale, isActiveClickable])

  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current!.style.opacity = '1'
      cursorOuterRef.current!.style.opacity = '1'
    } else {
      cursorInnerRef.current!.style.opacity = '0'
      cursorOuterRef.current!.style.opacity = '0'
    }
  }, [isVisible])

  useEffect(() => {
    const clickables = document.querySelectorAll<HTMLElement>(
      'a, input[type="submit"], input[type="image"], div[constants-atr="summary"], button[constants-atr="closeButton"], label[for], select, button, .link, .carouselImage'
    )
    clickables.forEach((el) => {
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive])

  const color = theme ? '12, 21, 29' : '255, 255, 255'

  const styles: StylesType = {
    cursor: {
      zIndex: 9999,
      position: 'fixed',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
    cursorInner: {
      zIndex: 9999,
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: `rgba(${color}, 1)`,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
    },
    cursorOuter: {
      zIndex: 9999,
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      border: `1px solid rgba(${color}, ${outerAlpha})`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
  }

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  )
}

const AnimatedCursor = () => {
  const isNotMobile = window.innerWidth >= 768

  if (isNotMobile) {
    return <AnimatedCursorComponent />
  }

  return null
}

export default AnimatedCursor
