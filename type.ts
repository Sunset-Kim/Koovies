import { QueryFunction, QueryMeta } from "react-query";

export interface MediaProps {
  id: number;
  posterPath: string | null;
  title: string;
  voteAverage?: number;
  overview?: string;
  releaseDate?: string;
  fullData: Movie | TV;
}

export interface BaseResponse {
  page: number
  total_results: number
  total_pages: number
}

export interface Movie {
  poster_path: string | null
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}
export interface TV {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number
  overview: string
  first_air_date: string
  origin_country: string[]
  genre_ids: number[]
  original_language: string
  vote_count: number
  name: string
  original_name: string
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

export interface TVDetails {
  backdrop_path: string;
  created_by: object;
  episode_run_time: object;
  first_air_date: string;
  genres: object;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: object;
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}


export interface TVResponse extends BaseResponse {
  results: TV[];
}
export interface MovieResponse extends BaseResponse {
  results: Movie[]
}

interface ReactQueryInfo {
  meta?: QueryMeta;
  pageParam?: number
  queryKey?: string[],
  signal: any
}
export interface TheMovieAPI {
  Movie_API: {
    getTrending: QueryFunction<MovieResponse>;
    getPopular: QueryFunction<MovieResponse>;
    getNowPlaying: QueryFunction<MovieResponse>;
    getUpcoming: QueryFunction<MovieResponse>;
    search: QueryFunction<MovieResponse>;
    detail: QueryFunction<MovieDetails>;
  }

  TV_API: {
    getTrending: QueryFunction<TVResponse>;
    getPopular: QueryFunction<TVResponse>;
    getAiringToday: QueryFunction<TVResponse>;
    getTopRate: QueryFunction<TVResponse>;
    search: QueryFunction<TVResponse>;
    detail: QueryFunction<TVDetails>;
  }
}