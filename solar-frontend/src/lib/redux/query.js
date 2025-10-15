import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BaseUrl='http://localhost:8000/api';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:BaseUrl }),
  endpoints: (build) => ({
    getEnergyRecordsBysolarId: build.query({
      query: ({id,groupBy}) => `/energyRecords/solar-unit/${id}?groupBy=${groupBy}`,
    }),
  }),
})

export const { useGetEnergyRecordsBysolarIdQuery } = api;