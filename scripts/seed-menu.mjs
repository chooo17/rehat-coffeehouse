import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Load .env.local
const env = {}
try {
  const envFile = readFileSync('.env.local', 'utf-8')
  for (const line of envFile.split('\n')) {
    const idx = line.indexOf('=')
    if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
} catch {
  console.error('File .env.local tidak ditemukan. Jalankan script dari root project.')
  process.exit(1)
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET,
  token:     env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const menuItems = [
  // ── COFFEE — Espresso Based ─────────────────────
  { name: 'Americano',       category: 'coffee', price: 15000, description: 'Espresso dengan air panas, bold dan clean.' },
  { name: 'Capuccino',       category: 'coffee', price: 17000, description: 'Espresso, susu steam, dan foam susu yang lembut.' },
  { name: 'Espresso',        category: 'coffee', price: 10000, description: 'Shot espresso murni, pekat dan kaya rasa.' },
  { name: 'Latte',           category: 'coffee', price: 17000, description: 'Espresso dengan susu steam yang creamy dan lembut.' },
  { name: 'Supresso',        category: 'coffee', price: 13000, description: 'Espresso dengan sedikit susu, bold dengan sentuhan creamy.' },

  // ── COFFEE — White Coffee ───────────────────────
  { name: 'Baileys',         category: 'coffee', price: 18000, description: 'Kopi susu dengan sentuhan rasa Baileys yang creamy.' },
  { name: 'Biscoff Latte',   category: 'coffee', price: 20000, description: 'Latte dengan sirup dan crumble Biscoff yang karamel.' },
  { name: 'Butterscotch',    category: 'coffee', price: 18000, description: 'Kopi susu dengan rasa butterscotch yang manis dan buttery.' },
  { name: 'Caramel',         category: 'coffee', price: 17000, description: 'Latte dengan drizzle karamel manis.' },
  { name: 'Chessy Cloud',    category: 'coffee', price: 20000, description: 'Kopi susu dengan foam keju yang creamy dan gurih.' },
  { name: 'Gula Aren',       category: 'coffee', price: 17000, description: 'Kopi susu dengan gula aren asli, manis alami khas Indonesia.' },

  // ── COFFEE — Manual Brew ────────────────────────
  { name: 'Tubruk',          category: 'coffee', price: 10000, description: 'Kopi tubruk tradisional Indonesia, sederhana dan autentik.' },
  { name: 'Tubruk Susu',     category: 'coffee', price: 13000, description: 'Kopi tubruk dengan tambahan susu, creamy dan nikmat.' },
  { name: 'Vietnam Drip',    category: 'coffee', price: 13000, description: 'Kopi tetes Vietnam dengan susu kental manis yang khas.' },

  // ── COFFEE — Barista Choice ─────────────────────
  { name: 'Kopi Susu Kerabat', category: 'coffee', price: 20000, description: 'Signature kopi susu Rehat, pilihan spesial dari barista kami.' },
  { name: 'Kopi Susu Pisang',  category: 'coffee', price: 17000, description: 'Kopi susu dengan rasa pisang segar yang unik.' },

  // ── NON-COFFEE — Fruity Americano ───────────────
  { name: 'Strawberry Cano', category: 'non-coffee', price: 17000, description: 'Americano segar dengan potongan stroberi manis.' },
  { name: 'Mango Cano',      category: 'non-coffee', price: 17000, description: 'Americano segar dengan mangga tropis yang juicy.' },
  { name: 'Peach Cano',      category: 'non-coffee', price: 17000, description: 'Americano segar dengan peach yang harum dan manis.' },

  // ── NON-COFFEE — Refreshment ────────────────────
  { name: 'Lychee Yakult',   category: 'non-coffee', price: 17000, description: 'Perpaduan leci dan yakult yang menyegarkan.' },
  { name: 'Peach Yakult',    category: 'non-coffee', price: 17000, description: 'Kesegaran peach berpadu dengan yakult yang asam segar.' },
  { name: 'Berry Yakult',    category: 'non-coffee', price: 17000, description: 'Mix berry segar dengan yakult, manis asam yang pas.' },
  { name: 'Kiwikick',        category: 'non-coffee', price: 13000, description: 'Minuman kiwi segar dengan sensasi rasa yang unik.' },
  { name: 'Sparkling Peach', category: 'non-coffee', price: 13000, description: 'Peach dengan soda yang refreshing dan ringan.' },
  { name: 'Purple Haze',     category: 'non-coffee', price: 13000, description: 'Minuman biru-ungu segar dengan rasa yang unik.' },
  { name: 'Berry Tea',       category: 'non-coffee', price: 13000, description: 'Teh dengan perpaduan rasa berry yang menyegarkan.' },

  // ── NON-COFFEE — Milk Based ─────────────────────
  { name: 'Chocolate',       category: 'non-coffee', price: 15000, description: 'Susu coklat creamy yang lezat dan menenangkan.' },
  { name: 'Greentea',        category: 'non-coffee', price: 15000, description: 'Susu matcha premium dengan rasa yang khas dan earthy.' },
  { name: 'Red Velvet',      category: 'non-coffee', price: 15000, description: 'Susu dengan cita rasa red velvet yang manis dan creamy.' },
  { name: 'Taro',            category: 'non-coffee', price: 15000, description: 'Susu taro dengan warna ungu cantik dan rasa yang lembut.' },
  { name: 'Pistachoco',      category: 'non-coffee', price: 18000, description: 'Paduan pistachio dan coklat dalam susu yang premium.' },

  // ── NON-COFFEE — Barista Choice ─────────────────
  { name: 'Cocoa Bliss',           category: 'non-coffee', price: 18000, description: 'Minuman coklat premium pilihan barista, rich dan indulgent.' },
  { name: 'Strawberry Cheesecake', category: 'non-coffee', price: 18000, description: 'Minuman stroberi dengan rasa cheesecake yang creamy.' },

  // ── FOOD ────────────────────────────────────────
  { name: 'Ayam Sambal Matah',       category: 'food', price: 20000, description: 'Ayam goreng renyah dengan sambal matah Bali yang segar dan pedas.' },
  { name: 'Ayam Gepuk Sambal Gurih', category: 'food', price: 23000, description: 'Ayam gepuk empuk dengan sambal gurih yang kaya rasa.' },
  { name: 'Nasi Goreng Kampong',     category: 'food', price: 18000, description: 'Nasi goreng kampong klasik dengan telur ceplok dan sayuran segar.' },
  { name: 'Curry Katsu',             category: 'food', price: 20000, description: 'Ayam katsu renyah dengan saus kare yang kaya rempah.' },

  // ── SNACK — Pastry ──────────────────────────────
  { name: 'Fudgy Brownies',   category: 'snack', price: 15000, description: 'Brownies coklat lembut dan fudgy yang meleleh di mulut.' },
  { name: 'Choco Banana',     category: 'snack', price: 15000, description: 'Pastri pisang dengan coklat, manis dan hangat.' },
  { name: 'Pain O Chocolate', category: 'snack', price: 15000, description: 'Croissant isi coklat yang renyah dan buttery.' },
  { name: 'Pizza Puff',       category: 'snack', price: 15000, description: 'Puff pastry dengan isian pizza yang gurih dan lezat.' },

  // ── SNACK ────────────────────────────────────────
  { name: 'Mix French Fries', category: 'snack', price: 15000, description: 'Kentang goreng crispy campur dengan bumbu spesial.' },
  { name: 'Pisang Coklat',    category: 'snack', price: 15000, description: 'Pisang goreng dengan lelehan coklat yang manis.' },
  { name: 'Dimsum Goreng',    category: 'snack', price: 15000, description: 'Dimsum goreng crispy dengan isian yang gurih.' },
  { name: 'Lumpia',           category: 'snack', price: 13000, description: 'Lumpia goreng renyah dengan isian yang lezat.' },
]

async function seed() {
  console.log(`\nMemulai import ${menuItems.length} menu item ke Sanity...\n`)
  let success = 0
  let failed = 0

  for (const item of menuItems) {
    try {
      const doc = await client.create({
        _type: 'menuItem',
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description,
        isAvailable: true,
      })
      console.log(`✓  ${item.name.padEnd(30)} Rp ${String(item.price).padStart(6)} — ${doc._id}`)
      success++
    } catch (err) {
      console.error(`✗  ${item.name}: ${err.message}`)
      failed++
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`Selesai! ${success} berhasil, ${failed} gagal.\n`)
}

seed()
