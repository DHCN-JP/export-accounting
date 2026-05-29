<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <div class="mb-4">
        <NuxtLink 
          to="/users" 
          class="text-blue-600 hover:text-blue-800"
        >
          ← Back to Users List
        </NuxtLink>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">User Details</h1>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Enter User ID:
          </label>
          <div class="flex gap-2">
            <input
              v-model="userId"
              type="text"
              placeholder="User ID"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="fetchUser"
              :disabled="!userId || fetching"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ fetching ? 'Loading...' : 'Fetch User' }}
            </button>
          </div>
        </div>

        <div v-if="fetching" class="text-center py-8">
          <div class="text-gray-500">Loading user...</div>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="text-red-700">Error: {{ error.message }}</div>
        </div>
        
        <div v-else-if="data?.user" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">ID:</label>
            <p class="text-gray-900">{{ data.user.id }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Full Name:</label>
            <p class="text-gray-900">{{ data.user.fullName || 'No name provided' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email:</label>
            <p class="text-gray-900">{{ data.user.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Created At:</label>
            <p class="text-gray-900">{{ formatDate(data.user.createdAt) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Updated At:</label>
            <p class="text-gray-900">{{ formatDate(data.user.updatedAt) }}</p>
          </div>
        </div>
        
        <div v-else-if="hasSearched" class="text-center py-8">
          <div class="text-gray-500">User not found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGetUserQuery } from '~/src/gql/generated'

const userId = ref('')
const hasSearched = ref(false)

// Initialize the query but pause it initially
const { data, fetching, error, executeQuery } = useGetUserQuery({
  pause: true
})

const fetchUser = async () => {
  if (!userId.value) return
  
  hasSearched.value = true
  
  // Execute the query with the user ID
  await executeQuery({ 
    id: userId.value,
    requestPolicy: 'network-only' // Always fetch fresh data
  })
}

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

// Set page title
useHead({
  title: 'User Details'
})
</script>