import * as mustache from "mustache"
import * as moment from 'moment'
import * as _ from 'lodash'
import * as models from '../api/models'
import * as client from './client'

var SECOND = 1000,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
  WEEK = 7 * DAY,
  YEAR = DAY * 365,
  MONTH = YEAR / 12,
  FORMATS = {
    "en": [
      [0.7 * MINUTE, 'just now'],
      [1.5 * MINUTE, 'a minute ago'],
      [60 * MINUTE, 'minutes ago', MINUTE],
      [1.5 * HOUR, 'an hour ago'],
      [DAY, 'hours ago', HOUR],
      [2 * DAY, 'yesterday'],
      [7 * DAY, 'days ago', DAY],
      [1.5 * WEEK, 'a week ago'],
      [MONTH, 'weeks ago', WEEK],
      [1.5 * MONTH, 'a month ago'],
      [YEAR, 'months ago', MONTH],
      [1.5 * YEAR, 'a year ago'],
      [Number.MAX_VALUE, 'years ago', YEAR]
    ],
    "zh-cn": [
      [0.7 * MINUTE, '当前'],
      [1.5 * MINUTE, '分钟前'],
      [60 * MINUTE, '分钟前', MINUTE],
      [1.5 * HOUR, '小时前'],
      [DAY, '小时前', HOUR],
      [2 * DAY, '昨天'],
      [7 * DAY, '天前', DAY],
      [1.5 * WEEK, '上周'],
      [MONTH, '周前', WEEK],
      [1.5 * MONTH, '1月前'],
      [YEAR, '月前', MONTH],
      [1.5 * YEAR, '1年前'],
      [Number.MAX_VALUE, '年前', YEAR]
    ]
  }

var MAP: Object = null
var LOCALE: string = 'en'

function getUrl(jsonName: string): string {
  return "/assets/locales/" + LOCALE + "/" + jsonName
}

function getLocale(locale: string): string {
  var retval = locale === 'zh' ? 'zh-cn' : locale
  retval = (retval || 'en').toLowerCase()
  if (['en', 'zh-cn'].indexOf(retval) !== -1) {
    return retval
  }
  return 'en'
}

export class Language {
  constructor(public locale: string, public shortName: string, public longName: string, public current: boolean) { }

  static LOCALE_EN = 'en'
  static LOCALE_ZH_CN = 'zh-cn'

  static getLanguages(): Array<Language> {
    return [
      new Language(Language.LOCALE_EN, 'EN', 'English', LOCALE === Language.LOCALE_EN),
      new Language(Language.LOCALE_ZH_CN, '简', '简体中文', LOCALE === Language.LOCALE_ZH_CN)
    ]
  }

  static dashboard = "dashboard.json"
  static forgetpassword = "forgetpassword.json"
  static list = "list.json"
  static login = "login.json"
  static desktop = "desktop.json"
  static app = "app.json"
  static signup = "signup.json"

  static index = "index.json"
}

export function init(localeOrigin: string, jsonName: string, callback: Function) {
  //LOCALE = getLocale(localeOrigin)

  //if (LOCALE !== Language.LOCALE_EN) {
  //    client.request.request('GET', getUrl(jsonName), null, (err: models.Error, res: string) => {
  //        if (!err) MAP = JSON.parse(res)
  //        callback()
  //    })
  //} else {
  //    callback()
  //}
  callback()
}

export function locale() {
  return LOCALE
}

export function get(msg: string, data?: Object): string {
  if (MAP && MAP[msg]) {
    msg = MAP[msg]
  }
  if (data) {
    msg = mustache.render(msg, data)
  }
  return msg
}

export class Format {
  static relativeDate(inputDate: Date, referenceDate?: Date): string {
    !referenceDate && (referenceDate = new Date())

    var input = inputDate.getTime()
    var reference = referenceDate.getTime()

    var delta = reference - input,
      format, i, len

    var formats = FORMATS[LOCALE]
    for (i = -1, len = formats.length; ++i < len;) {
      format = formats[i]
      if (delta < format[0]) {
        return format[2] == undefined ? format[1] : Math.round(delta / format[2]) + ' ' + format[1]
      }
    }
  }
}
