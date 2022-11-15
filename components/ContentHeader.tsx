import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useCallback, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

const searchBarLabel = 'Search'

interface ContentHeaderWithSearchProps {
  enableSearch: true
  searchValue: string
  onSearchChange: (search: string) => void
  onSearchSubmit: (search: string) => void
  children: string
}

interface ContentHeaderProps {
  children: string
}

function ContentHeader(props: ContentHeaderProps): JSX.Element
function ContentHeader(props: ContentHeaderWithSearchProps): JSX.Element
function ContentHeader(props: ContentHeaderProps | ContentHeaderWithSearchProps): JSX.Element {
  const [search, setSearch] = useState('')

  const headerText = props?.children ?? ''

  let SearchBar: JSX.Element | null = null

  if ('enableSearch' in props && props.enableSearch) {
    const _props: ContentHeaderWithSearchProps = props

    const value = _props.searchValue ?? ''

    const onchange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        _props.onSearchChange(event.target.value)
        setSearch(event.target.value)
      },
      [_props.onSearchChange],
    )

    const onClick = useCallback(() => {
      _props.onSearchSubmit(search)
    }, [_props.onSearchSubmit, search])

    const onKeyPress = useCallback(
      (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Enter') {
          onClick()
        }
      },
      [onClick],
    )

    SearchBar = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          width: { xs: '100%', md: '20rem' },
          transition: 'all 1s',
        }}
      >
        <TextField
          label={searchBarLabel}
          id='search-content'
          variant='standard'
          size='small'
          value={value}
          onChange={onchange}
          sx={{ flex: 1 }}
          onKeyPress={onKeyPress}
        />
        <IconButton
          type='submit'
          sx={{}}
          aria-label='search'
          onClick={onClick}
          disabled={search === ''}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
        alignItems: 'baseline',
      }}
    >
      <Typography sx={{ flex: 1 }}>{headerText}</Typography>
      {SearchBar}
    </Box>
  )
}

export default ContentHeader
