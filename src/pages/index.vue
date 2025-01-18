<template>
  <NuxtLayout name="main">
    <template #main>
      <SliderHomeTopPoster />
      <Container>
        <div class="flex flex-col gap-y-10 mb-10">
          <HomeCategory />
          <HomePromotion />
          <HomeMostVisited />
          <HomeTowPoster />
          <HomeBestseller />
          <SliderHomeBrands />
          <HomeNewProduct />
          <HomeNewMobile />
          <HomeFourPoster />
          <HomeMag />
        </div>
      </Container>
    </template>
  </NuxtLayout>
</template>
