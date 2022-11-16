/**
 * convert csv string into json object
 * @param csv csv string
 * @returns json obj
 */
export const parseCsv = (csv: string): Array<Record<string, string>> => {
  const lines = csv.split('\n')
  const headLine = lines.shift() ?? ''
  const header = headLine.split(';')

  return lines.map((line: string) => {
    const bits = line.split(';')
    const obj: Record<string, string> = {}
    for (let i = 0; i < header.length; i++) {
      const key = header[i]
      const value = bits[i]
      obj[key] = value
    }
    return obj
  })
}
