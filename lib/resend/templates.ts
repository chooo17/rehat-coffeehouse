import type { BookingInput, PreorderInput } from '@/lib/zod/schemas'

export function bookingEmailHtml(data: BookingInput): string {
  return `
    <h2>Booking Meja Baru — Rehat Coffeehouse</h2>
    <table>
      <tr><td><b>Nama</b></td><td>${data.name}</td></tr>
      <tr><td><b>No. HP</b></td><td>${data.phone}</td></tr>
      <tr><td><b>Tanggal</b></td><td>${data.date}</td></tr>
      <tr><td><b>Jam</b></td><td>${data.time}</td></tr>
      <tr><td><b>Jumlah Tamu</b></td><td>${data.guests}</td></tr>
      <tr><td><b>Catatan</b></td><td>${data.notes || '-'}</td></tr>
    </table>
  `
}

export function preorderEmailHtml(data: PreorderInput): string {
  const itemsList = data.items
    .map(i => `<li>${i.name} x${i.qty} — Rp ${i.price.toLocaleString('id-ID')}</li>`)
    .join('')
  const total = data.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  return `
    <h2>Pre-order Baru — Rehat Coffeehouse</h2>
    <p><b>Nama:</b> ${data.name}</p>
    <p><b>Jam Kedatangan:</b> ${data.arrivalTime}</p>
    <p><b>Catatan:</b> ${data.notes || '-'}</p>
    <h3>Pesanan:</h3>
    <ul>${itemsList}</ul>
    <p><b>Total:</b> Rp ${total.toLocaleString('id-ID')}</p>
  `
}

export function buildWaUrl(waNumber: string, text: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`
}

export function bookingWaText(data: BookingInput): string {
  return `Halo Rehat Coffeehouse, saya ${data.name} ingin booking meja:\n- Tanggal: ${data.date}\n- Jam: ${data.time}\n- Tamu: ${data.guests} orang\n- Catatan: ${data.notes || '-'}`
}

export function preorderWaText(data: PreorderInput): string {
  const items = data.items.map(i => `${i.name} x${i.qty}`).join(', ')
  return `Halo Rehat Coffeehouse, saya ${data.name} mau pre-order:\n${items}\nJam kedatangan: ${data.arrivalTime}\nCatatan: ${data.notes || '-'}`
}
