import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BaseUrl='http://localhost:8000/api';
const WEATHERAPI= import.meta.env.VITE_WEATHER_API_KEY;
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:BaseUrl, prepareHeaders:async(headers)=>{
    const clerk= window.Clerk;
    if(clerk){
      const token=await clerk.session.getToken();
      console.log(token)
      if(token){
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    
    return headers;
  } }),
  endpoints: (build) => ({
    getEnergyRecordsBysolarId: build.query({
      query: ({id,groupBy,limit}) => `/energyRecords/solar-unit/${id}?groupBy=${groupBy}${limit?`&limit=${limit}`:""}`,
    }),

    getWeatherByCity:build.query({
      query:({lat,lon})=>`https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI}&q=${lat},${lon}&api=no`
    }),
    getSolarUnitforUser:build.query({
      query:()=> `/solar-units/me`
    }),
    getSolarUnits:build.query({
      query:()=>'/solar-units'
    }),
    getSolarUnitById:build.query({
      query:({id})=>`/solar-units/${id}`
    }),
    updateSolarUnit:build.mutation({
      query:({id,updateData})=>({
        url:`/solar-units/${id}`,
        method:'PUT',
        body:updateData
      })
    }),
    createSolarUnit:build.mutation({
      query:(data)=>({
        url:`/solar-units/`,
        method:'POST',
        body:data
      })
    }),
    getAllUsers:build.query({
      query:()=>`/users/`
    }),
    getAnomaliesBySolarUnitId: build.query({
      query: ({id,groupBy,limit}) => {
        let url = `/anomalies/solar-unit/${id}`;
        const params = [];
        if (groupBy) params.push(`groupBy=${groupBy}`);
        if (limit) params.push(`limit=${limit}`);
        if (params.length) url += '?' + params.join('&');
        return url;
      },
    }),
    getAnomalyResolveStatus: build.query({
      query: ({id}) => `/anomalies/solar-unit/${id}/status-counts`,
    }),
    getAnomalyCountByType: build.query({
      query: ({id, anomalyType}) => `/anomalies/solar-unit/${id}/${anomalyType}`,
    }),
  }),
})

export const { useGetEnergyRecordsBysolarIdQuery,
  useGetWeatherByCityQuery,
  useGetSolarUnitforUserQuery,
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useUpdateSolarUnitMutation,
  useCreateSolarUnitMutation,
  useGetAllUsersQuery,
  useGetAnomaliesBySolarUnitIdQuery,
  useGetAnomalyResolveStatusQuery,
  useGetAnomalyCountByTypeQuery
 } = api;