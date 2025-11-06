import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BaseUrl='http://localhost:8000/api';
const WEATHERAPI= import.meta.env.VITE_WEATHER_API_KEY;
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:BaseUrl }),
  endpoints: (build) => ({
    getEnergyRecordsBysolarId: build.query({
      query: ({id,groupBy}) => `/energyRecords/solar-unit/${id}?groupBy=${groupBy}`,
    }),

    getWeatherByCity:build.query({
      query:({lat,lon})=>`https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI}&q=${lat},${lon}&api=no`
    })
  }),
})

export const { useGetEnergyRecordsBysolarIdQuery, useGetWeatherByCityQuery } = api;