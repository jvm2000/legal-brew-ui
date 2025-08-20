<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const router = useRouter()
const route = useRoute()
const { user: authUser } = useAuth()
const { getPosts, post } = usePost()
const page = ref(1)

const selectedTab = computed(() => {
  if (!route.query.tab) return 0

  const tab = {
    resource_materials: 0,
    menu_services: 1,
  }[route.query.tab as string]

  return tab || 0
});

function changeTab(index: number) {
  const tab = ['resource_materials', 'menu_services'][index]

  router.push({ path: "dashboard", query: { tab } })
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function loadPosts() {
  await delay(200)
  await getPosts(page.value)
  
  page.value++
}

async function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    await loadPosts()
  }
}

onMounted(async () => {
  await delay(200)
  await getPosts()

  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="max-w-xl w-full space-y-6">
    <div v-if="!authUser?.verified">
      <ClientVerify />
    </div>

    <div v-if="authUser?.verified">
      <TabGroup @change="changeTab" :selectedIndex="selectedTab">
        <TabList class="grid grid-cols-2">
          <Tab v-slot="{ selected }">
            <button 
              class="text-base text-custom-brown-500 w-full py-2 border-b-custom-brown-500 outline-none ring-0 focus:ring-0"
              :class="[selected ? 'border-b-2' : 'border-b']"
            >Resource Materials</button>
          </Tab>
          
          <Tab v-slot="{ selected }">
            <button 
              class="text-base text-custom-brown-500 w-full py-2 border-b-custom-brown-500 outline-none ring-0 focus:ring-0"
              :class="[selected ? 'border-b-2 font-medium' : 'border-b']"
            >Menu of Services</button>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ClientResourceMaterials :post />
          </TabPanel>

          <TabPanel>
            <div class="py-6">
              <ClientMenuServices />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>