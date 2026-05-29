<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Users Management</h1>
      
      <!-- Create User Form -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Create New User</h2>
        <form @submit.prevent="createUser" class="flex gap-4">
          <input
            v-model="newUser.fullName"
            type="text"
            placeholder="Full Name"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="newUser.email"
            type="email"
            placeholder="Email"
            required
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            :disabled="createUserExecuting"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {{ createUserExecuting ? 'Creating...' : 'Create User' }}
          </button>
        </form>
      </div>

      <!-- Users List -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Users List</h2>
        </div>
        
        <div v-if="fetching" class="p-6">
          <div class="text-center text-gray-500">Loading users...</div>
        </div>
        
        <div v-else-if="error" class="p-6">
          <div class="text-red-600">Error: {{ error.message }}</div>
        </div>
        
        <div v-else-if="data?.users?.length === 0" class="p-6">
          <div class="text-center text-gray-500">No users found</div>
        </div>
        
        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="user in data?.users"
            :key="user.id"
            class="p-6 flex items-center justify-between"
          >
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ user.fullName || 'No name' }}</h3>
              <p class="text-gray-600">{{ user.email }}</p>
              <p class="text-sm text-gray-500">Created: {{ formatDate(user.createdAt) }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="editUser(user)"
                class="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                :disabled="deleteUserExecuting"
                class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 disabled:opacity-50"
              >
                {{ deleteUserExecuting ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '~/src/gql/generated'

// Fetch users query
const { data, fetching, error, executeQuery } = useGetUsersQuery()

// Create user mutation
const { executeMutation: executeCreateUser, fetching: createUserExecuting } = useCreateUserMutation()

// Update user mutation  
const { executeMutation: executeUpdateUser, fetching: updateUserExecuting } = useUpdateUserMutation()

// Delete user mutation
const { executeMutation: executeDeleteUser, fetching: deleteUserExecuting } = useDeleteUserMutation()

// Form data
const newUser = reactive({
  fullName: '',
  email: ''
})

// Create new user
const createUser = async () => {
  if (!newUser.email) return
  
  try {
    const result = await executeCreateUser({
      input: {
        fullName: newUser.fullName,
        email: newUser.email
      }
    })
    
    if (result.error) {
      console.error('Create user error:', result.error)
      alert('Error creating user: ' + result.error.message)
    } else {
      console.log('User created:', result.data?.createUser)
      // Clear form
      newUser.fullName = ''
      newUser.email = ''
      // Refetch users list
      executeQuery({ requestPolicy: 'network-only' })
    }
  } catch (error) {
    console.error('Create user error:', error)
  }
}

// Edit user (you can implement a modal or inline editing)
const editUser = (user) => {
  console.log('Edit user:', user)
  // Implement edit functionality
  alert(`Edit user: ${user.fullName} (${user.email})`)
}

// Delete user
const deleteUser = async (userId) => {
  if (!confirm('Are you sure you want to delete this user?')) return
  
  try {
    const result = await executeDeleteUser({ id: userId })
    
    if (result.error) {
      console.error('Delete user error:', result.error)
      alert('Error deleting user: ' + result.error.message)
    } else {
      console.log('User deleted')
      // Refetch users list
      executeQuery({ requestPolicy: 'network-only' })
    }
  } catch (error) {
    console.error('Delete user error:', error)
  }
}

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}
</script>