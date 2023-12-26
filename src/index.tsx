import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import './index.css'

export type YiInfiniteLoadingProps = {
  children?: React.ReactNode
  loadMore?: () => void
  offset?: number | string // Positioning offset
  horization?: boolean // Load horizontally
  loading: boolean // Is loading ...
  finished: boolean // Is loading completed
  hideLoading?: boolean // Hide the default loading effect
  className?: string
  style?: any
}

export const YiInfiniteLoading:React.FC<YiInfiniteLoadingProps> = ( { style = '', className = '', children, loadMore, offset = 0, horization = false, finished = true, loading = false, hideLoading = false } ) => {
  const observerRef = useRef<HTMLSpanElement>(null)
  const viewport = useRef<number>(0)
  const observer = useRef<IntersectionObserver | undefined>(undefined)
  
  const observerStyle = useMemo(() => {
    if (typeof offset === 'number' || /^\d+$/.test(offset)) {
      return {
        transform: horization ? `translateX(-${offset}px)` : `translateY(-${offset}px)`
      }
    } else if (typeof offset === 'string' && /%$/.test(offset)) {
      const percent = parseFloat(offset.replace(/%/g, '')) / 100
      return {
        transform: horization ? `translateX(-${percent * viewport.current}px)` : `translateY(-${percent * viewport.current}px)`
      }
    } else {
      return {
        transform: horization ? `translateX(-${offset})` : `translateY(-${offset})`
      }
    }
  }, [offset, horization])
  
  const onLoadMore = useCallback(() => {
    if (loading || finished) return
    loadMore && loadMore()
  }, [loading, finished, loadMore])

  useEffect(() => {
    if (observerRef.current) {
      observer.current && observer.current.disconnect()
      const el = observerRef.current
      const screenView = window.visualViewport || window.screen
      viewport.current = horization ? screenView.width : screenView.height
      observer.current = new IntersectionObserver(entries => {
        if (entries[0] && entries[0].isIntersecting) {
          onLoadMore()
        }
      }, { threshold: [1.0] })
      observer.current.observe(el)
    }
    return () => {
      observer.current && observer.current.disconnect()
    }
  }, [observerRef, onLoadMore, viewport, horization])
  return (
    <div className={'yi-infinite-loading' + className} style={style || ''}>
      <span
        ref={observerRef}
        className="yi-infinite-loading-observer"
        style={observerStyle}
      ></span>
      {
        !hideLoading && loading ? (
          <div
            className="yi-loading"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : null
      }
      {hideLoading ? children : null}
    </div>
  )
}
export default YiInfiniteLoading
