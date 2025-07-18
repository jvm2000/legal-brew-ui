<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

</script>

<template>
  <div class="max-w-xl w-full space-y-6">
    <TabGroup>
      <TabList class="grid grid-cols-2">
        <Tab v-slot="{ selected }">
          <button 
            class="text-base text-custom-brown-500 w-full py-2 border-b-custom-brown-500 outline-none ring-0 focus:ring-0"
            :class="[selected ? 'border-b-2 font-medium' : 'border-b']"
          >Menu of Services</button>
        </Tab>

        <Tab v-slot="{ selected }">
          <button 
            class="text-base text-custom-brown-500 w-full py-2 border-b-custom-brown-500 outline-none ring-0 focus:ring-0"
            :class="[selected ? 'border-b-2' : 'border-b']"
          >Resource Materials</button>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ClientMenuServices />
        </TabPanel>

        <TabPanel>
          <ClientResourceMaterials />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>