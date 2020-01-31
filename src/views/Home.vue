<template>
  <div>
    <Carousel />
    <Featured />
  </div>
</template>

<script>
import Carousel from '../components/products/ProductCarousel'
import Featured from '../components/products/FeaturedProducts'
import data from './admin/mens_shoe_dataset.json'
import firebase from 'firebase'

export default {
  name: 'Home',
  components: {
    Carousel,
    Featured
  },
  mounted() {
    const db = firebase.firestore().collection('starred_products')
    const rand = [...new Set(data)]
    // const diff = uniq(data, 'id').slice(46, 51)

    // diff.map(prod => {
    //   prod.quantities = 1
    //   // db.add(prod)
    // })
  }
}
</script>
