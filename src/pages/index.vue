<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

<template>
  <div>
    <SliderHomeTopPoster />

    <Container>
      <div class="flex flex-col gap-y-10 mb-10">
        <HomeCategory />

        <HomePromotion
          title="واچ پارتی"
          href="https://www.mobit.ir/promotion"
        />

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
  </div>
</template>
