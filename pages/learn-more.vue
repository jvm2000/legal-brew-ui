<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'landing',
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

      <p class="text-2xl text-custom-brown-500 font-bold">Background</p>

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

      <div class="flex flex-col items-start py-12 w-full space-y-4 text-justify">
        <p class="w-full text-2xl text-custom-brown-500 font-bold text-center">PEOPLE POWER: THE CONSTITUTIONAL PERSPECTIVE</p>

        <p class="text-sm text-custom-brown-500 indent-10">
          When we study the Constitution, it is important to note the context which paved the way to its
          formulation in order for us to fully appreciate it. The Philippine Government and Constitution is a subject
          that must be taken and studied by all students regardless of their courses because its content is the basis of
          all the other laws that govern or affect our daily living.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Yet, how much do we know of the contents of our current Constitution and the salient features
          that make it unique from all the Constitutions this country had already adopted? Political movements
          aimed at revising the 1987 Philippine Constitution had never ceased despite the many times its suffered
          setbacks since former President Fidel V. Ramos’ time. In fact in the recent news it is said that close to
          91% of the surveyed members of the influential Makati Business Club (MBC) are in favour of the
          initiation of amendments to the economic provisions of the Philippine Constitution. (RAPPLERCCOM, 03/20/2013)
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          What would be our stand then if indeed the Constitution will be opened? What provisions do we
          need to protect and safeguard from any tinkering?
        </p>

        <p class="text-sm text-custom-brown-500 font-bold">Historical Context:</p>

        <p class="text-sm text-custom-brown-500 indent-10">
          An important feature that must be appreciated about the 1987 Philippine Constitution is the fact
          that it was conceived and born out of the peaceful and historical uprising of the Filipino people against
          more than 20 years of dictatorship by the Former President Ferdinand E. Marcos.
          Wikipedia, describes the event as “widely seen as victory of the people against the 20-year
          running authoritarian, repressive regime of the President Ferdinand Marcos and made news headlines as
          the revolution that surprised the world.”
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          “The majority of the demonstrations took place on a long stretch of Epifanio de los Santos
          Avenue, more commonly known by its acronym EDSA, in Metropolitan Manila from February
          22-25, 1986 and involved over two million Filipino civilians as well as several political, military,
          and including religious groups led by Cardinal Jaime Sin, the Archbishop of Manila. The
          protests, fuelled by the resistance and opposition from years of corrupt governance by Marcos,
          culminared with the departure of the dictator from Malacañang Palace to the United States’ state
          of Hawaii. Corazon Aquino was proclaimed as the legitimate President of the Philippines after
          the revolution.” (Wikipedia, 2013)
          After her proclamation as the new President, Corazon C. Aquino issued Proclamation No. 9
          creating a Constitutional Commission with fifty members from various sectors and persuasions under the
          leadership of Justice Cecilia-Munoz-Palma, formerly of the Supreme Court. .the Commission was tasked
          to frame a new charter aimed at “correcting the shortcomings of the previous constitutions and
          eliminating all iniquitous vestiges of the past regime”. (Cruz, 2007)
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          A plebiscite on the proposed Constitution was conducted on February 2, 1987 and the result
          showed 76.29% of the electorates voting for the ratification of the Constitution and a minority of 22.74%
          who were against its ratification.
        </p>

        <p class="text-sm text-custom-brown-500 font-bold">People Power and the 1987 Constitution</p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Because the present Constitution is a product of the EDSA People Power I event, it thus reflects
          the nation’s belief in the power of the people to chart the direction of this country. In examining the
          whole document, one would find traces of the historic event’s influence in the form of words and
          statements that a student of the Constitution could only appreciate if he or she is endowed with
          knowledge of its immediate history.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The lengthy document which our Constitution contains provisions that not only prevent the
          recurrence of dictatorial leadership but institutionalizes as well, as the concept of ‘people power’ as a
          strategy to prevent or hinder the growth of authoritarian tendencies, several provisions were put in place
          by the framers of the Constitution to encourage and put into use the vast potentialities of the Filipino
          people, empowering them to participate at all levels and aspects of decision-making of government. In
          effect, these important provisions tell of a message that the running of the Philippine government is not
          wholly entrusted to the hands of the politicians but, it puts its trust to the power of the people to intervene
          in the acts of governing because the nation had learned that true change can only be achieved through
          their collective participation.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          To begin with, the preamble of the 1987 Philippine Constitution states:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          We, the sovereign Filipino people, imploring the aid of Almighty God,
          in order to build a just and humane society and establish a government
          that shall embody our ideal and aspiration, promote the common good,
          conserve and develop our patrimony, and secure to ourselves and our
          posterity the blessings of independence and democracy under the rule of
          Law and regime of truth, justice, freedom, love, equality and peace, do
          ordain and promulgate this Constitution.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Fr. Joaquin G. Bernas, S.J., constitution expert and member of the 1986 Constitutional
          Commission which drafted the present Philippine Constitution, wrote in his commentary that the
          “introduction of the word ‘love’ makes the Philippines the only nation to enshrine the word in its
          Constitution.” according to him, it “serves as a monument to the love that prevented bloodshed in the
          February Revolution of 1986.
          Another word that the Preamble contains, which tells of the immediate events that happened
          before its conception, is the presence of the word “truth.” According to Fr. Bernas, ‘the insertion of
          ‘truth’’ is a protest against the deception that characterized the Marcos regime.’
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Section 1 of its Article II provides that “The Philippines is a democratic and republican state” and
          that “Sovereignty resides in the people and all government authority emanates from them.”
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          In commenting on this section, Fr. Bernas noted:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          “The 1987 Constitution formulated before the euphoria of the February
          Revolution of 1986 had died down, did what the earlier Constitutional
          Convention chose not to do and added a new word to describe the state:
          democratic. The import of this addition, a monument to people power which re-
          won Democracy in EDSA (Epifanio de los Santos Avenue), is that the
          Philippines under the new Constitution is not just a representative government
          but also shares some aspects of direct democracy such, for instance, as the
          “Initiative and referendum” under Article VI, Section 32.” The powers of initiative and referendum that Fr. Bernas refers to as contained in Article VI, Section 32 provides:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 32. The Congress shall, as early as possible, provide for a system of
          initiative and referendum, and the exceptions therefrom, whereby the people can
          directly propose and enact laws of approve or reject any act or law or part thereof
          passed by the Congress or local legislative body after the registration of a petition
          therefor signed by at least ten per centum of the total number registered voters, of
          which every legislative district must be represented by at least three per centum
          of the registered voters therefor.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          To fully appreciate this provision, it must be linked with Article VI, Sec. 1 which provides:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 1. The legislative power shall be vested in the Congress of the Philippines
          which shall consist of a Senate and House of Representatives except to the extent
          reserved to the people by the provision on initiative and referendum.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Supposedly, because the Philippines is a republican country, the original legislative power
          belongs to the people who, through the Constitution, confer derivative legislative power on the
          legislature. But then again, because the present Constitution also possesses the features of direct
          democracy, the present legislative power, therefore, is no longer exclusively vested in Congress but is
          shared with the people. Again, this bears an imprint of the People Power event and the authoritative rule
          of former President Marcos. The power of initiative and referendum, being the power to directly propose
          and enact laws or approve or reject any act of law or part thereof passed by the Congress of local
          legislative body are powers which the people had reserved for themselves in addition to their constituent
          power to prevent legislative assemblies to use their power arbitrarily. The purpose is to institutionalize
          people by providing for an instrument which can be used should the legislature show itself
          indifferent to the needs of the people. (Bernas, 2003)
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The power of initiative and referendum can be exercised as well in amending the Constitution
          itself. Under Article XVII, Section 2 it is provided:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 2. Amendments to this Constitution may likewise be directly
          proposed by the people through initiative upon a petition of at
          least twelve per centum of the total number of registered voters,
          of which every legislative district must be represented by at least
          three per centum of the registered voters therein. No amendment
          under this section shall be authorized within five years following
          the ratification of this Constitution nor oftener than once every five
          years thereafter.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The Congress shall provide for the implementation of the exercise of the right.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          This provision is another attempt to institutionalize people power and put to application the democratic concept of the current Constitution.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Aside from the powers of initiative and referendum, aspects of direct democracy can also be found in Sec. 23, Article II which provides:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 23. The State shall encourage non-governmental, Community-based, or sectoral organization that promote the welfare of the nation.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          This provisions is expounded by Sections 116 of Article XIII which states:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 15. The State shall respect the role of the independent
          people’s organizations to enable the people to pursue and
          Protect, within the democratic framework, their legitimate
          and collective interests and aspirations through peaceful
          and lawful means.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          People’s organizations are bona fide associations
          of citizens with demonstrated capacity to promote the public
          interest and with identifiable leadership, membership, and
          structure.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The State shall by law, facilitate the establishment of adequate consultation mechanisms.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The above provisions recognize the direct role which the people have played and will play in
          setting the directions the nation will take by recognizing the role of people’s organizations as a principal
          means to pursue or protect in a peaceful manner, popular and social reforms. The State is also mandated
          to respect their independence as an autonomous body that could serve as checking mechanism to the
          exercise of State power.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The Constitution also recognizes the important role of women, youth, labor and the private sector
          as partners in nation-building. Thus, in Article II, Declaration of Principles and State Policies it
          specifically provides the following:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 13. The State recognizes the vital role of the youth in nation-building
          and shall promote and protect their physical, moral, spiritual, intellectual
          and social well-being. It shall nationalism, and encourage their involvement
          in public and civic affairs.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 14. The State recognizes the role of women in nation-building, and
          shall ensure the fundamental equality before the law of women and men.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 18. The State affirms labor as a primary social economic force. It
          shall protect the rights of workers and promote their welfare.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 20. The State recognizes the indispensable role of the private sector,
          encourages private enterprise, and provides incentives to needed investments.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Protecting and advancing the rights and welfare of the abovementioned sectors assure the State
          that in whatever challenges it may face, it can rely on the active participation of these sectors to make
          proper interventions in responding to such challenges.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          The provision for women in Section 14, Article II is a particularly new provision that can only be
          found in the present Constitution. It is a product of long-time struggle of Filipino women for equal
          recognition which finally found its way to a Constitutional provision after the first EDSA Revolution.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Further people power tool can be found in Section 3, Article X which provides:
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Sec. 3. The Congress shall enact a local government code which shall provide
          for a more responsive and accountable local government structure instituted through
          a system of decentralization with effective mechanism of recall, initiative and referendum xxx.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Recall is an instrument for affecting official accountability; a device or procedure by which a
          public official’s tenure may be terminated by popular vote on account of loss or confidence. In
          short, accompanying the power of the people to select their officials is the power to remove them
          if such official no longer serves the interest of the people. This power is fleshed out in Republic
          Act No. 7160, also known as the Local Government Code if 1991, as amended by R.A. 9244.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          These and more provisions were provided by the framers of our present Constitution to
          express their respect and faith to the capacity of ordinary Filipino people to come together to
          create meaningful political action to protect the nation from tyranny.. The Filipino people are
          bestowed by the Constitution with weapons and armours to fight back and wade off any invasion
          of greed and self-interest that would harm the general welfare.
        </p>

        <p class="text-sm text-custom-brown-500 font-bold">Conclusion</p>

        <p class="text-sm text-custom-brown-500 indent-10">
          When rumor circulated that another people power was at the offing during the time of
          former President Gloria Macapagal-Arroyo, some analysts reacted saying that people power is
          overused in the Philippines, and that Filipinos no longer respect the rule of law. Immediately
          what came to mind as a reaction to such statement is that those who say so do not understand that
          the current Constitution itself has empowered the people to intervene in crucial moments of our
          nation’s story. Reviewing the Constitution and many of its people in the perspective of what
          have been provided by the Constitution. Very few of the provisions mentioned above are actually
          exercised and put to practice by the Filipino people truly effect change that would alter the course
          of this nation from poverty toward progress and genuine development.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          But then again, before one could make use of the powers available to him or her, one
          must be able to comprehend first the kinds of powers he or she possesses. And I guess, after 26
          years since its ratification, we have yet to get to know more of our 1987 Constitution to truly
          appreciate the value and respect that it has given the ordinary Filipino to contribute to the
          wielding of this nation’s direction.
        </p>

        <p class="text-sm text-custom-brown-500 font-bold">References</p>

        <p class="text-sm text-custom-brown-500 indent-10">Books</p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Bernas, Joaquin G. The 1987 Constitution of the Republic of the Philippines: a Commentary,
          2003 Ed. Quezon City: Rex Bookstore Inc., 2003.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">
          Cruz, Isagani. Constitutional Law, 2007 Ed. Quezon City: Central Bookstore Supply, Inc., 2007.
        </p>

        <p class="text-sm text-custom-brown-500 indent-10">En.wikipedia.org/wiki/People_Power_Revolution</p>

        <p class="text-sm text-custom-brown-500 indent-10">http://www.rappler.com/business</p>
      </div>
    </div>
  </div>
</template>