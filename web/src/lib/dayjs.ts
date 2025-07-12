import lib from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

lib.extend(relativeTime)
lib.locale('pt-br')

export const dayjs = lib
