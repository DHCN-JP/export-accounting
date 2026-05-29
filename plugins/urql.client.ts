import { createClient, provideClient, fetchExchange } from '@urql/vue'

export default defineNuxtPlugin(() => {
  // You can use different endpoints based on environment
  const graphqlUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-graphql-endpoint.com/graphql'
    : 'http://localhost:4000/graphql'

  const client = createClient({
    url: graphqlUrl,
    exchanges: [fetchExchange],
    // Add authentication if needed
    fetchOptions: () => {
      // Get auth token from Supabase user session
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()
      
      return {
        headers: {
          authorization: user.value ? `Bearer ${user.value.access_token}` : '',
          'Content-Type': 'application/json',
        },
      }
    },
  })

  provideClient(client)
})