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
import { firestore } from '../../firebase.config'
import uniq from 'lodash/uniqBy'
export default {
  name: 'Home',
  components: { Carousel, Featured },
  mounted() {
    const db = firestore.collection('starred_products')
    const rand = [...new Set(data)]
    const diff = uniq(data, 'id').slice(45, 49)

    diff.map(prod => {
      prod.quantity = 1
      prod.currency = 'GBP'
      prod.current_stock = Math.ceil(Math.random() * (123 - 12) + 12)
      prod.price = {
        min:
          prod.prices_amountmin ||
          Math.ceil(Math.random() * (prod.prices_amountmax - 12) + 12),
        max: prod.prices_amountmax,
        on_sale: prod.prices_issale,
        offer: prod.prices_offer
      }
      prod.condition = 'new'
      prod.currency = 'gbp'
      delete prod.quantities
      delete prod.id
      delete prod.vin
      delete prod.upc
      delete prod.keys
      delete prod.flavors
      delete prod.ean
      delete prod.asins
      delete prod.isbn
      delete prod.manufacturernumber
      delete prod.flavors
      delete prod.prices_flavor
      delete prod.prices_dateadded
      delete prod.prices_dateseen
      delete prod.prices_count
      delete prod.prices_color
      delete prod.prices_source
      delete prod.skus
      delete prod.prices_availability
      delete prod.weight
      delete prod.count
      delete prod.websiteids
      delete prod.prices_amountmax
      delete prod.prices_amountmin
      delete prod.prices_currency
      delete prod.prices_condition
      delete prod.prices_offer
      delete prod.prices_issale
      delete prod.merchants
      delete prod.prices_sizes
      delete prod.prices_merchant
      // delete prod.descriptions

      // db.add(prod)
    })
  }
}
</script>
