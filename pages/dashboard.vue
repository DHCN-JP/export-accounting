<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Export Accounting</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Welcome, {{ user?.user_metadata?.full_name || user?.email }}</span>
            <button
              @click="signOut"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p class="text-gray-600">Welcome to your Export Accounting dashboard!</p>
            <div class="mt-4 text-sm text-gray-500">
              <p>User ID: {{ user?.id }}</p>
              <p>Email: {{ user?.email }}</p>
              <p>Created: {{ new Date(user?.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// This page requires authentication
definePageMeta({
  middleware: 'auth'
})

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>