import createEmotionServer from '@emotion/server/create-instance'
import { cache } from '@emotion/css'

export const renderStatic = async (
  html: string,
): Promise<{
  html: string
  ids: string[]
  css: string
}> => {
  if (html === undefined) {
    throw new Error('Error: You need pass html string for renderToString?')
  }
  const { extractCritical } = createEmotionServer(cache)
  const { ids, css } = extractCritical(html)

  const res = { html, ids, css }
  return res
}
