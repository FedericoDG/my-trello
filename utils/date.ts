import {formatDistanceToNowStrict} from 'date-fns'
import {es} from 'date-fns/locale'

const getFormatDistanceToNow = (date: number) => {
  const formNow = formatDistanceToNowStrict(date, {locale: es})

  return `hace ${formNow}`
}

export default getFormatDistanceToNow
