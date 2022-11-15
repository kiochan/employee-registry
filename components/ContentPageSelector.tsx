import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

export interface ContentPageSelectorProps {
  current: number
  min?: number
  max: number
  onChange: (page: number) => void
}

function ContentPageSelector(props: ContentPageSelectorProps): JSX.Element {
  const current = props.current ?? 1
  const min = props.min ?? 1
  const max = props.max

  if (min > max || current > max || current < min) throw new RangeError('bad input values')

  const howMuchPages = 5

  const pages = Array.from(new Array(max - min + 1).keys())
    .map((v) => v + min)
    .filter((v) =>
      Math.abs(current - min) < howMuchPages / 2
        ? v < min + howMuchPages
        : Math.abs(current - max) < howMuchPages / 2
        ? v > max - howMuchPages
        : Math.abs(v - current) < howMuchPages / 2,
    )
    .filter((v) => v <= max && v >= min)

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {
        <Button
          variant='text'
          size='small'
          sx={{ minWidth: '2rem' }}
          onClick={() => {
            props?.onChange(current - 1)
          }}
          disabled={!(current > min)}
        >
          <NavigateBeforeIcon fontSize='small' />
        </Button>
      }
      {current > min + howMuchPages / 2 ? (
        <>
          <Button
            variant={'text'}
            size='small'
            sx={{ minWidth: '2rem' }}
            onClick={() => {
              props?.onChange(min)
            }}
          >
            {min}
          </Button>
          ...
        </>
      ) : null}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === current ? 'outlined' : 'text'}
          size='small'
          sx={{ minWidth: '2rem' }}
          onClick={() => {
            props?.onChange(page)
          }}
        >
          {page}
        </Button>
      ))}
      {current < max - howMuchPages / 2 ? (
        <>
          ...
          <Button
            variant={'text'}
            size='small'
            sx={{ minWidth: '2rem' }}
            onClick={() => {
              props?.onChange(max)
            }}
          >
            {max}
          </Button>
        </>
      ) : null}
      {
        <Button
          variant='text'
          size='small'
          sx={{ minWidth: '2rem' }}
          onClick={() => {
            props?.onChange(current + 1)
          }}
          disabled={!(current < max)}
        >
          <NavigateNextIcon fontSize='small' />
        </Button>
      }
    </Box>
  )
}

export default ContentPageSelector
