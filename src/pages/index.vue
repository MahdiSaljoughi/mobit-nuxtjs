<template>
  <NuxtLayout name="main">
    <template #main>
      <SliderHomeTop />
      <Container>
        <div class="flex flex-col gap-y-10 mb-10">
          <HomeCategory />
          <HomePromotion />
          <HomeMostVisited />
        </div>
      </Container>
    </template>
  </NuxtLayout>
</template>
