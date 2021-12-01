import { TheMovieAPI } from "../../type";
import { API_KEY } from "./key";

const BASE_URL = 'https://api.themoviedb.org/3/';

const API: TheMovieAPI = {
  Movie_API: {
    getTrending: () => fetch(`${BASE_URL}trending/movie/week?region=KR&language=ko-KR&api_key=${API_KEY}&page=1`).then(response => response.json()),
    getPopular: ({ pageParam }) => fetch(`${BASE_URL}movie/popular?region=KR&language=ko-KR&api_key=${API_KEY}&page=${pageParam}`).then(response => response.json()),
    getNowPlaying: () => fetch(`${BASE_URL}movie/now_playing?region=KR&language=ko-KR&api_key=${API_KEY}&page=1`).then(response => response.json()),
    getUpcoming: ({ pageParam }) => fetch(`${BASE_URL}movie/upcoming?region=KR&language=ko-KR&api_key=${API_KEY}&page=${pageParam}`).then(response => response.json()),
    search: ({ queryKey }) => {
      const [_, query] = queryKey;
      return fetch(`${BASE_URL}search/movie/?region=KR&language=ko-KR&api_key=${API_KEY}&page=1&query=${query}`).then(response => response.json())
    },
    detail: ({ queryKey }) => {
      const [_, id] = queryKey;
      return fetch(`${BASE_URL}movie/${id}?language=ko-KR&api_key=${API_KEY}&append_to_response=videos,images`).then(response => response.json())
    },
  },

  TV_API: {
    getTrending: () => fetch(`${BASE_URL}trending/tv/week?region=KR&language=ko-KR&api_key=${API_KEY}&page=1`).then(response => response.json()),
    getPopular: () => fetch(`${BASE_URL}tv/popular?region=KR&language=ko-KR&api_key=${API_KEY}&page=1`).then(response => response.json()),
    getAiringToday: () => fetch(`${BASE_URL}tv/airing_today?region=KR&language=ko-KR&api_key=${API_KEY}&page=1`).then(response => response.json()),
    getTopRate: () => fetch(`${BASE_URL}tv/top_rated?region=KR&language=ko-KR&api_key=${API_KEY}&page=1`).then(response => response.json()),
    search: ({ queryKey }) => {
      const [_, query] = queryKey;
      return fetch(`${BASE_URL}search/tv/?region=KR&language=ko-KR&api_key=${API_KEY}&page=1&query=${query}`).then(response => response.json())
    },
    detail: ({ queryKey }) => {
      const [_, id] = queryKey;
      return fetch(`${BASE_URL}tv/${id}?language=ko-KR&api_key=${API_KEY}&append_to_response=videos,images`).then(response => response.json())
    },
  }
}

export const MovieAPI = API.Movie_API
export const TVAPI = API.TV_API