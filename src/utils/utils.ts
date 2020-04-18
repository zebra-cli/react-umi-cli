import { parse } from 'querystring'
import pathRegexp from 'path-to-regexp'

const { NODE_ENV } = process.env

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true
  }
  return window.location.hostname === 'preview.pro.ant.design'
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  if (NODE_ENV === 'development') {
    return true
  }
  return isAntDesignPro()
}

export const setData = (data: { [key: string]: any }) =>
  Object.keys(data).map(id => ({ id, name: data[id] }))

export const getPageQuery = () => parse(window.location.href.split('?')[1])

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends { path: string }>(
  router: T[] = [],
  pathname: string
): T | undefined => {
  const authority = router.find(
    ({ path }) => path && pathRegexp(path).exec(pathname)
  )
  if (authority) return authority
  return undefined
}

export const defaultCopyright = `${new Date().getFullYear()} 光速斑马数据科技有限公司, All Rights Reserved |  京ICP备XXXXXX号`

export const BASE_URL = NODE_ENV === 'development' ? '/php' : ''
