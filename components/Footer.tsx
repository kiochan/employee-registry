import type { StaticImageData } from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface HeroImage {
  image: StaticImageData | string
  link?: string
  alt?: string
}

export interface FooterProps {
  heroImages?: HeroImage[] | HeroImage
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  shortBanner?: boolean
}

const footerText = '© 2022 Employee Registry -- ALL RIGHTS RESERVED.'

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: {
          xs: '1rem',
          sm: '2rem',
          md: '2rem',
          lg: '2rem',
          xl: '2rem',
        },
        transition: 'all 0.5s',
      }}
    >
      <Typography
        variant='h1'
        sx={{
          fontSize:
            props.shortBanner !== undefined
              ? '3rem'
              : {
                  xs: '0.5rem',
                  sm: '1rem',
                  md: '1rem',
                  lg: '1rem',
                  xl: '1rem',
                },
          transition: 'all 0.5s',
        }}
      >
        {footerText}
      </Typography>
    </Box>
  )
}

export default Footer
