

import { rootApi } from "../slices/rootApi";

export const eventsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchEvents: builder.query({
            query: () => `/events/`,
            providesTags: ['Event']
        }),
        getEventId: builder.query({
            query: (eventId) => `/events/${eventId}`,
            providesTags: ['Event']
        }),

        addEvent: builder.mutation({
            query: ({  data }) => ({
                url: `/events/addImage`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),

        

    })
});

export const { useFetchEventsQuery, useAddEventMutation, useGetEventIdQuery  } = eventsApi;
