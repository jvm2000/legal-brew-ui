<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'aboutus',
  middleware: 'guest'
})
</script>

<template>
  <div class="flex flex-col items-center py-12 sm:xl:py-24">
    <div class="space-y-4 max-w-[920px] w-full px-8 sm:xl:px-0">
      <div class="flex items-center space-x-2 cursor-pointer" @click="navigateTo('/')">
        <ArrowLongLeftIcon class="w-6 h-6 stroke-custom-brown-500" />

        <p class="text-sm text-custom-brown-500 font-medium">Back</p>
      </div>

      <p class="text-2xl text-custom-brown-500 font-bold landing-login">Background</p>

      <div class="flex items-start space-x-10">
        <div class="flex flex-col items-start space-y-4 text-justify">
          <p class="text-sm text-custom-brown-500 indent-10">
            Atty. Ruth N. Restauro's passion for social justice began to take shape in 1994, when she volunteered to educate fisherfolks living on a very small island in Pandanon, Bohol. This allowed her to witness how difficult access to justice is for these marginalized people and their capacity to tap into their community power to overcome the gap, on the other hand. This sparked in her a lifelong commitment to narrowing the justice gap without undermining the power of the people. As a dedicated advocate and with a political science background as her foundation, Atty. Restauro worked with various non-governmental organizations (NGOs) in Cebu, taking on roles such as technical writer, education facilitator, women labor organizer focusing on promoting inclusive development, community resilience, and protecting children and women from commercial sexual exploitation. Eventually, she decided to pursue her studies in law. In addition to her NGO work, Atty. Restauro has also taught political science subjects at the University of San Jose-Recoletos and the University of Southern Philippines Foundation. After becoming a member of the Bar in 2015, she decided to focus on her law practice, partnering with fellow law school batchmates to establish Pareja Panugaling Restauro and Associates Law Firm, where she became its senior partner.
          </p>

          <div>
            <p class="text-sm text-custom-brown-500 indent-10">
              Atty. Restauro also served as a legislative consultant in the Office of Cebu Provincial Board Member Horacio V. Franco, and legal consultant to barangays and cooperative organizations. Her unique blend of social development experience and legal expertise enabled her to craft a distinctive approach to developmental legal practice.
            </p>

            <p class="text-sm text-custom-brown-500 indent-10">
              Inevitably, she became part of the establishment of The Center for Initiatives on Developmental Law Inc. --- an NGO working to narrow down the justice gap through the practice of developmental law.
            </p>
          </div>

          <div class="pt-8">
            <p class="text-sm text-custom-brown-500">ATTY. RUTH N. RESTAURO</p>
            <p class="text-sm text-custom-brown-500">"The good of the people is the greatest law."</p>
          </div>
        </div>

        <img src="/images/attorney.svg" alt="" class="hidden sm:xl:block">
      </div>
    </div>
  </div>
</template>

<style>
.landing-login {
  font-family: 'Merriweather', serif;
}
</style>