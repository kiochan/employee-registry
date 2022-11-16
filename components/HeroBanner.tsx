import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export interface HeroImage {
  image: StaticImageData | string
  link?: string
  alt?: string
}

export interface HeroBannerProps {
  heroImages?: HeroImage[] | HeroImage
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  shortBanner?: boolean
}

const HeroBanner: React.FC<HeroBannerProps> = (props) => {
  const heroImage = props.heroImages instanceof Array ? props.heroImages[0] : props.heroImages

  return (
    <Box
      sx={{
        width: '100%',
        height: props.shortBanner !== undefined ? '15rem' : '100vh',
        display: 'flex',
        padding: '4rem 0 0 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {heroImage !== undefined ? (
        <Box
          sx={{
            width: '100%',
            height: props.shortBanner !== undefined ? '15rem' : '100vh',
            display: 'flex',
            position: 'absolute',
          }}
        >
          {heroImage.link !== undefined ? (
            <Link href={heroImage.link}>
              <a>
                <Image priority src={heroImage.image} alt={heroImage.alt ?? 'hero image'} />
              </a>
            </Link>
          ) : (
            <Image
              priority
              src={heroImage.image}
              alt={heroImage.alt ?? 'hero image'}
              objectFit='cover'
              layout='fill'
            />
          )}
        </Box>
      ) : null}
      <Box
        sx={{
          width: '100%',
          height: props.shortBanner !== undefined ? '15rem' : '100vh',
          display: 'flex',
          position: 'absolute',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            margin: {
              xs: '0',
              sm: '0',
              md: '0',
              lg: '0',
              xl: '0',
            },
            fontSize:
              props.shortBanner !== undefined
                ? '3rem'
                : {
                  xs: '3rem',
                  sm: '5rem',
                  md: '7rem',
                  lg: '9rem',
                  xl: '12rem',
                },
            transition: 'all 0.5s',
          }}
        >
          {props.title}
        </Typography>
        <Typography
          variant='subtitle2'
          component='h2'
          sx={{
            margin: '0 0 4rem 0',
            fontSize: {
              xs: '1.5rem',
              sm: '2.5rem',
              md: '3rem',
              lg: '4rem',
              xl: '4rem',
            },
            transition: 'font-size 0.2s',
          }}
        >
          {props.subtitle}
        </Typography>
        {props.buttonLink !== undefined ? (
          <Link href={props.buttonLink}>
            <Button variant='outlined' color='secondary'>
              {props.buttonText ?? 'Entry'}
            </Button>
          </Link>
        ) : null}
      </Box>
    </Box>
  )
}

export default HeroBanner
