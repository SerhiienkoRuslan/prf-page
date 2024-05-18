import { FC, memo, useContext, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { GlobalContext } from '../../../../../context/GlobalContext'
import useTheme from '../../../../../hooks/useTheme'
import GalleryModal from '../../../../../components/GalleryModal'

import styles from './styles.module.scss'

type ProjectCarouselType = {
  gallery: string[]
  name: string
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

const ProjectCarousel: FC<ProjectCarouselType> = ({ gallery, name }) => {
  const { theme } = useContext(GlobalContext)
  const { addTheme } = useTheme(theme, styles.light)
  const [modalUrl, setModalUrl] = useState('')

  const handleSetModalUrl = (url: string) => {
    setModalUrl(url)
  }

  return (
    <>
      <Carousel responsive={responsive}>
        {gallery.map((galleryUrl) => (
          <div
            key={galleryUrl}
            className={addTheme(styles.galleryItem)}
            role='button'
            onClick={() => {
              handleSetModalUrl(galleryUrl)
            }}
          >
            <img className='carouselImage' src={galleryUrl} alt='Project img' />
          </div>
        ))}
      </Carousel>

      {modalUrl && (
        <GalleryModal name={name} modalUrl={modalUrl} setModalUrl={(url) => setModalUrl(url)} gallery={gallery} />
      )}
    </>
  )
}

export default memo(ProjectCarousel)
