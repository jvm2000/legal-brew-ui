<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const router = useRouter()
const route = useRoute()

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
};
</script>

<template>
  <div class="max-w-xl w-full space-y-6">
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
          <ClientResourceMaterials />
        </TabPanel>

        <TabPanel>
          <ClientMenuServices />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>