import { useQuery } from "@tanstack/react-query";
import { axiosKP, axiosKPList } from "shared/lib/axios.ts";
import { AxiosResponse } from "axios";
import { MovieDocsResponseDtoV13, MovieDtoV13, ShortImage } from "@openmoviedb/kinopoiskdev_client";

export type MovieType = MovieDtoV13 & { lists: string[] }
export type ListType = {
  category: string,
  name: string,
  slug: string,
  moviesCount: number,
  cover: {
    url: string,
    previewUrl: string
  },
  createdAt: string,
  updatedAt: string,
  id: string
}

const staleTime = 1000 * 60 * 60; // 1hr cache

export const GetMovieById = (id?: number) => useQuery({
  queryKey: ['moviesByLists', id],
  queryFn: async () => {
    const { data }: AxiosResponse<MovieType> = await axiosKP.get(`/${id}`);
    return data;
  },
  refetchOnWindowFocus: false,
  staleTime
});

export const GetItemByName = (name: string) => useQuery({
  queryKey: ['getByName', name],
  queryFn: ({ signal }) => axiosKP.get('search', {
    params: {
      page: '1',
      limit: '20',
      query: name
    }, signal
  }).then(({ data }: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  enabled: false,
});

export const GetPopularSeries = () => useQuery({
  queryKey: ['getPopularSeries'],
  queryFn: ({ signal }) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
      type: 'tv-series',
      lists: 'popular-series',
    }, signal
  }).then(({ data }: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  staleTime
})

export const GetNewMovies = () => useQuery({
  queryKey: ['getNewMovies'],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
      type: 'movie',
      year: ['2023', '2024']
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  staleTime
})

export const GetSameListItems = (lists?: string[]) => useQuery({
  queryKey: ['getSameListItems', lists],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
      lists: lists ? lists[1] || lists[0] : 'popular-films'
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  refetchOnWindowFocus: false,
  staleTime
})

export const GetSequelsMovies = (ids? : number[]) => useQuery({
  queryKey: ['getSequelsMovies', ids],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      id: ids,
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  enabled: !!ids && ids.length > 0,
  refetchOnWindowFocus: false,
  staleTime
})

export const GetSimilarMovies = (ids? : number[]) => useQuery({
  queryKey: ['getSimilarMovies', ids],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      id: ids,
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
    }, signal
  })
  .then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  enabled: !!ids && ids.length > 0,
  refetchOnWindowFocus: false,
  staleTime
})

export const GetRecSysMoviesByIds = (ids?: number[]) => useQuery({
  queryKey: ['getRecSysMoviesByIds', ids],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      id: ids,
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  enabled: !!ids && ids.length > 0,
  refetchOnWindowFocus: false,
  staleTime
})

export const GetRewatchMoviesByIds = (ids?: number[]) => useQuery({
  queryKey: ['getRewatchMoviesByIds', ids],
  queryFn: ({signal}) => axiosKP.get('', {
    params: {
      page: '1',
      limit: '250',
      id: ids,
      notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
    }, signal
  }).then(({data}: AxiosResponse<MovieDocsResponseDtoV13>) => data.docs),
  enabled: !!ids && ids.length > 0,
  refetchOnWindowFocus: false,
  staleTime
});


export const GetMoviesByLists = (category: 'Сериалы' | 'Фильмы') => useQuery({
  queryKey: ['moviesByLists', category],
  queryFn: async ({ signal }) => {
    const { data: lists }: AxiosResponse<{ docs: ListType[] }> = await axiosKPList.get('', {
      params: {
        page: '1',
        limit: '250',
        category,
        selectFields: ['name', 'slug'],
        moviesCount: '1-500'
      }, signal
    });

    const objectList = lists.docs.reduce((previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.slug]: currentValue.name
    }), {} as Record<string, string>);

    const { data }: AxiosResponse<{ docs: MovieType[] }> = await axiosKP.get('', {
      params: {
        page: '1',
        limit: '250',
        notNullFields: ['description', 'shortDescription', 'rating.kp', 'name', 'genres.name', 'poster.url', 'logo.url', 'backdrop.url'],
        lists: Object.keys(objectList),
        selectFields: ['lists', 'id', 'poster', 'name']
      },
    });

    const formattedList = data.docs.reduce((previousValue, currentValue) => {
      for (const list of currentValue.lists) {
        if (previousValue[list]) {
          previousValue[list].push({
            id: currentValue.id,
            poster: currentValue.poster,
            name: currentValue.name
          })
        } else {
          previousValue[list] = [{ id: currentValue.id, poster: currentValue.poster, name: currentValue.name }]
        }
      }

      return previousValue;
    }, {} as Record<string, { id: number, poster: ShortImage | undefined , name: string | undefined}[]>);

    return ({ list: formattedList, keys: objectList });
  },
  refetchOnWindowFocus: false,
  staleTime
});