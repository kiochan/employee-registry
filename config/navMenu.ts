import words from './words'
import links from './links'

export const loginOptions = [
  {
    link: links.login,
    name: words.site.titles.login,
  },
  {
    link: links.register,
    name: words.site.titles.register,
  },
]

export const userSettings = [
  {
    link: links.myself,
    name: words.site.titles.myself,
  },
  {
    link: links.logout,
    name: words.site.titles.logout,
  },
]

export const pages = [
  {
    link: links.home,
    name: words.site.titles.home,
  },
  {
    link: links.employees,
    name: words.site.titles.employees,
  },
  {
    link: links.addNew,
    name: words.site.nav.addNew,
  },
]
