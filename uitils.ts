import { GetNextPageParamFunction } from "react-query"
import { MovieResponse, TVResponse } from "./type"

export const makeImgPath =
  (url: string, width: string | number = 'w500'): string => {
    const WIDTH = typeof width === 'string' ? width : `w${width}`
    return `http://image.tmdb.org/t/p/${WIDTH}${url}`
  }

export const getNextPage: GetNextPageParamFunction<TVResponse | MovieResponse> = (currentPage) => {
  const nextPage = currentPage.page + 1;
  return nextPage > currentPage.total_pages ? null : nextPage;
}
