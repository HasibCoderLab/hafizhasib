import { prisma } from '../lib/db'

async function main() {
  // Clear existing availability
  await prisma.availability.deleteMany()
  
  // Days: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const workingDays = [0, 1, 2, 3, 4, 6] // Sun-Thu + Sat
  const timeSlots = [
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' },
    { start: '20:00', end: '21:00' },
  ]
  
  // Friday (5) limited slots
  const fridaySlots = [
    { start: '20:00', end: '21:00' },
    { start: '21:00', end: '22:00' },
  ]

  for (const day of workingDays) {
    for (const slot of timeSlots) {
      await prisma.availability.create({
        data: {
          dayOfWeek: day,
          startTime: slot.start,
          endTime: slot.end,
          isBlocked: false,
        }
      })
    }
  }
  
  for (const slot of fridaySlots) {
    await prisma.availability.create({
      data: {
        dayOfWeek: 5,
        startTime: slot.start,
        endTime: slot.end,
        isBlocked: false,
      }
    })
  }
  
  console.log('✅ Availability seeded successfully')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
