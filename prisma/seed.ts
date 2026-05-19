import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Programs
  const programs = await prisma.program.createMany({
    data: [
      {
        title: 'Mass Monster Program',
        subtitle: 'Build serious size and strength',
        category: 'Bulking',
        difficulty: 'Advanced',
        duration: '12 Weeks',
        calories: '3200–4000',
        sessions: '5x / Week',
        image: 'https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Hypertrophy', 'Strength', 'Mass'],
        description: 'Advanced hypertrophy program for maximum muscle growth'
      },
            {
        title: 'PowerLift Elite',
        subtitle: 'Maximize your 1RM across all lifts',
        category: 'Strength',
        difficulty: 'Advanced',
        duration: '16 Weeks',
        calories: '2800–3500',
        sessions: '4x / Week',
        image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Powerlifting', 'Olympic', 'Strength'],
        description: 'Elite powerlifting program for 1RM gains'
      }
    ]
  })

  // Seed Trainers
  const trainers = await prisma.trainer.createMany({
    data: [
      {
        name: 'Alex Mercer',
        role: 'Head of Strength & Conditioning',
        specialty: 'Powerlifting & Hypertrophy',
        image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=600',
        experience: '12 Years',
        clients: '500+',
        certifications: ['CSCS', 'NASM-CPT', 'FRCms'],
        bio: 'Former competitive powerlifter with 3 national championships. Alex specializes in maximizing strength gains through progressive overload and periodization.',
        rating: 4.9,
        reviews: 214,
        languages: ['English', 'Mongolian'],
        schedule: { monday: '9AM-6PM', tuesday: '9AM-6PM', wednesday: '9AM-6PM', thursday: '9AM-6PM', friday: '9AM-6PM', saturday: '10AM-4PM', sunday: 'Closed' },
        availability: true,
        social: { instagram: '#', twitter: '#', youtube: '#' },
        pricing: '$199/month',
        tags: ['Strength', 'Hypertrophy', 'Powerlifting'],
        transformationResults: ['Lost 20lbs in 8 weeks', 'Increased squat by 100lbs'],
        isFeatured: true
      },
      {
        name: 'Ц. Золжаргал',
        role: 'Fitness & Beauty Coach',
        specialty: 'Fitness & Beauty',
        image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=600',
        experience: '5+ Years',
        clients: '100+',
        certifications: ['Mr India Amateur 2023 - Silver Medal 🥈', 'Champ Cup 2024 - Gold Medal 🥇'],
        bio: 'Mr India Amateur 2023 – Энэтхэг улсын нээлттэй тэмцээн – Атлетик ангилал Мөнгөн медаль🥈, Champ Cup 2024 – Спорт модел ангилал алтан медальт 🥇',
        rating: 5.0,
        reviews: 50,
        languages: ['Mongolian', 'English'],
        schedule: { monday: '10AM-7PM', tuesday: '10AM-7PM', wednesday: '10AM-7PM', thursday: '10AM-7PM', friday: '10AM-7PM', saturday: 'Closed', sunday: 'Closed' },
        availability: true,
        social: { instagram: '#', twitter: '#', youtube: '#' },
        pricing: '$149/month',
        tags: ['Fitness', 'Beauty', 'Sports Model'],
        transformationResults: ['Competition ready in 12 weeks', 'Won 2 competitions'],
        isFeatured: true
      },
      {
        name: 'Sarah Johnson',
        role: 'Fat Loss Expert',
        specialty: 'Weight Loss & Nutrition',
        image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=600',
        experience: '8 Years',
        clients: '300+',
        certifications: ['NASM-CPT', 'Precision Nutrition Level 1', 'ACE Health Coach'],
        bio: 'Certified nutrition coach specializing in sustainable weight loss transformations. Sarah helps clients achieve their goals through science-based nutrition and training.',
        rating: 4.8,
        reviews: 156,
        languages: ['English'],
        schedule: { monday: '8AM-5PM', tuesday: '8AM-5PM', wednesday: '8AM-5PM', thursday: '8AM-5PM', friday: '8AM-5PM', saturday: '9AM-2PM', sunday: 'Closed' },
        availability: true,
        social: { instagram: '#', twitter: '#', youtube: '#' },
        pricing: '$179/month',
        tags: ['Fat Loss', 'Nutrition', 'Weight Loss'],
        transformationResults: ['Lost 50lbs in 6 months', 'Maintained for 2+ years'],
        isFeatured: true
      },
      {
        name: 'Mike Chen',
        role: 'Bodybuilding Coach',
        specialty: 'Bodybuilding & Physique',
        image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=600',
        experience: '15 Years',
        clients: '400+',
        certifications: ['IFBB Pro', 'NASM-CPT', 'ISSA'],
        bio: 'Former IFBB professional bodybuilder with over 15 years of competition experience. Mike specializes in contest prep and physique transformation.',
        rating: 4.9,
        reviews: 289,
        languages: ['English', 'Chinese'],
        schedule: { monday: '6AM-8PM', tuesday: '6AM-8PM', wednesday: '6AM-8PM', thursday: '6AM-8PM', friday: '6AM-8PM', saturday: '8AM-4PM', sunday: '8AM-12PM' },
        availability: true,
        social: { instagram: '#', twitter: '#', youtube: '#' },
        pricing: '$249/month',
        tags: ['Bodybuilding', 'Physique', 'Contest Prep'],
        transformationResults: ['3x IFBB Pro qualifier', 'Helped 50+ clients compete'],
        isFeatured: true
      },
      {
        name: 'Emma Wilson',
        role: 'CrossFit Trainer',
        specialty: 'CrossFit & Functional Training',
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
        experience: '7 Years',
        clients: '200+',
        certifications: ['CrossFit Level 3', 'NASM-CPT', 'FMS'],
        bio: 'CrossFit Level 3 trainer with a passion for functional fitness. Emma helps clients build strength, endurance, and mobility through varied high-intensity workouts.',
        rating: 4.7,
        reviews: 134,
        languages: ['English', 'Spanish'],
        schedule: { monday: '5AM-9AM', tuesday: '5AM-9AM', wednesday: '5AM-9AM', thursday: '5AM-9PM', friday: '5AM-9PM', saturday: '7AM-11AM', sunday: 'Closed' },
        availability: true,
        social: { instagram: '#', twitter: '#', youtube: '#' },
        pricing: '$159/month',
        tags: ['CrossFit', 'Functional Training', 'HIIT'],
        transformationResults: ['Qualified for Regionals', 'Improved Fran time by 50%'],
        isFeatured: false
      },
      {
        name: 'Luna Martinez',
        role: 'Yoga Instructor',
        specialty: 'Yoga & Flexibility',
        image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=600',
        experience: '10 Years',
        clients: '350+',
        certifications: ['RYT-500', 'Yoga Alliance', 'Prenatal Yoga'],
        bio: 'Certified yoga instructor specializing in vinyasa, power yoga, and mobility work. Luna helps clients improve flexibility, reduce stress, and prevent injuries.',
        rating: 4.9,
        reviews: 198,
        languages: ['English', 'Spanish', 'Portuguese'],
        schedule: { monday: '7AM-8PM', tuesday: '7AM-8PM', wednesday: '7AM-8PM', thursday: '7AM-8PM', friday: '7AM-8PM', saturday: '8AM-4PM', sunday: '9AM-2PM' },
        availability: true,
        social: { instagram: '#', twitter: '#', youtube: '#' },
        pricing: '$129/month',
        tags: ['Yoga', 'Flexibility', 'Mobility'],
        transformationResults: ['Achieved splits in 6 months', 'Reduced back pain 80%'],
        isFeatured: false
      }
    ]
  })

  // Seed Gyms
  const gyms = await prisma.gym.createMany({
    data: [
      {
        name: 'Corporate Hotel Fitness',
        address: 'Olympic Street 1, Sukhbaatar District, Ulaanbaatar',
        district: 'Sukhbaatar',
        latitude: 47.9196,
        longitude: 106.9176,
        phone: '+976 11 321 321',
        email: 'fitness@corporatehotel.mn',
        rating: 4.8,
        reviews: 156,
        image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '6AM-10PM',
          tuesday: '6AM-10PM',
          wednesday: '6AM-10PM',
          thursday: '6AM-10PM',
          friday: '6AM-10PM',
          saturday: '7AM-9PM',
          sunday: '8AM-8PM'
        },
        amenities: ['Swimming Pool', 'Sauna', 'Spa', 'Personal Training', 'Group Classes', 'Cardio Equipment', 'Free Weights', 'Locker Rooms'],
        priceRange: '$$',
        website: 'https://corporatehotel.mn/fitness',
        isFeatured: true,
        availability: true,
        tags: ['Luxury', 'Hotel Gym', 'Full Service', 'Spa']
      },
      {
        name: 'Ultra Gym',
        address: 'Peace Avenue 15, Bayangol District, Ulaanbaatar',
        district: 'Bayangol',
        latitude: 47.9184,
        longitude: 106.9055,
        phone: '+976 11 322 322',
        email: 'info@ultragym.mn',
        rating: 4.9,
        reviews: 234,
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '5AM-11PM',
          tuesday: '5AM-11PM',
          wednesday: '5AM-11PM',
          thursday: '5AM-11PM',
          friday: '5AM-11PM',
          saturday: '6AM-10PM',
          sunday: '7AM-9PM'
        },
        amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Group Classes', 'CrossFit Zone', 'Yoga Studio', 'Nutrition Counseling'],
        priceRange: '$$$',
        website: 'https://ultragym.mn',
        isFeatured: true,
        availability: true,
        tags: ['Premium', 'CrossFit', 'Personal Training', 'Nutrition']
      },
      {
        name: 'Fitness Zone',
        address: 'Enkh Taivny Orgon 14, Khan-Uul District, Ulaanbaatar',
        district: 'Khan-Uul',
        latitude: 47.9152,
        longitude: 106.9234,
        phone: '+976 11 323 323',
        email: 'contact@fitnesszone.mn',
        rating: 4.6,
        reviews: 189,
        image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '6AM-9PM',
          tuesday: '6AM-9PM',
          wednesday: '6AM-9PM',
          thursday: '6AM-9PM',
          friday: '6AM-9PM',
          saturday: '8AM-8PM',
          sunday: '9AM-6PM'
        },
        amenities: ['Cardio Equipment', 'Free Weights', 'Group Classes', 'Personal Training', 'Locker Rooms', 'Showers'],
        priceRange: '$$',
        website: 'https://fitnesszone.mn',
        isFeatured: false,
        availability: true,
        tags: ['Affordable', 'Group Classes', 'Cardio']
      },
      {
        name: 'California Gym',
        address: 'Baga Toiruu 4, Chingeltei District, Ulaanbaatar',
        district: 'Chingeltei',
        latitude: 47.9245,
        longitude: 106.9087,
        phone: '+976 11 324 324',
        email: 'info@californiagym.mn',
        rating: 4.7,
        reviews: 178,
        image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '5:30AM-10PM',
          tuesday: '5:30AM-10PM',
          wednesday: '5:30AM-10PM',
          thursday: '5:30AM-10PM',
          friday: '5:30AM-10PM',
          saturday: '7AM-9PM',
          sunday: '8AM-7PM'
        },
        amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Group Classes', 'Sauna', 'Steam Room'],
        priceRange: '$$$',
        website: 'https://californiagym.mn',
        isFeatured: true,
        availability: true,
        tags: ['Premium', 'Bodybuilding', 'Cardio', 'Sauna']
      },
      {
        name: 'UFC Gym Mongolia',
        address: 'Narny Zam Road 8, Sukhbaatar District, Ulaanbaatar',
        district: 'Sukhbaatar',
        latitude: 47.9212,
        longitude: 106.9156,
        phone: '+976 11 325 325',
        email: 'mongolia@ufcgym.com',
        rating: 4.8,
        reviews: 267,
        image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '5AM-11PM',
          tuesday: '5AM-11PM',
          wednesday: '5AM-11PM',
          thursday: '5AM-11PM',
          friday: '5AM-11PM',
          saturday: '6AM-10PM',
          sunday: '7AM-9PM'
        },
        amenities: ['MMA Training', 'Boxing Ring', 'Cardio Equipment', 'Free Weights', 'Personal Training', 'Group Classes'],
        priceRange: '$$$',
        website: 'https://ufcgym.com/mongolia',
        isFeatured: true,
        availability: true,
        tags: ['MMA', 'Boxing', 'Combat Sports', 'High-Intensity']
      },
      {
        name: 'Naadam Center Fitness',
        address: 'Naadam Street 12, Bayangol District, Ulaanbaatar',
        district: 'Bayangol',
        latitude: 47.9168,
        longitude: 106.9023,
        phone: '+976 11 326 326',
        email: 'fitness@naadamcenter.mn',
        rating: 4.5,
        reviews: 145,
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '6AM-10PM',
          tuesday: '6AM-10PM',
          wednesday: '6AM-10PM',
          thursday: '6AM-10PM',
          friday: '6AM-10PM',
          saturday: '7AM-9PM',
          sunday: '8AM-8PM'
        },
        amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Group Classes', 'Basketball Court', 'Tennis Court'],
        priceRange: '$$',
        website: 'https://naadamcenter.mn/fitness',
        isFeatured: false,
        availability: true,
        tags: ['Multi-Sport', 'Family Friendly', 'Group Classes']
      },
      {
        name: 'Orchlon Fitness',
        address: 'Tokhriin Gudamj 5, Khan-Uul District, Ulaanbaatar',
        district: 'Khan-Uul',
        latitude: 47.9134,
        longitude: 106.9289,
        phone: '+976 11 327 327',
        email: 'info@orchlonfitness.mn',
        rating: 4.6,
        reviews: 198,
        image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '6AM-9:30PM',
          tuesday: '6AM-9:30PM',
          wednesday: '6AM-9:30PM',
          thursday: '6AM-9:30PM',
          friday: '6AM-9:30PM',
          saturday: '7AM-8PM',
          sunday: '8AM-7PM'
        },
        amenities: ['Cardio Equipment', 'Free Weights', 'Personal Training', 'Group Classes', 'Yoga', 'Pilates'],
        priceRange: '$$',
        website: 'https://orchlonfitness.mn',
        isFeatured: false,
        availability: true,
        tags: ['Yoga', 'Pilates', 'Women Friendly', 'Group Classes']
      },
      {
        name: 'Sky Fitness Club',
        address: 'Sky Tower Building, Peace Avenue 25, Sukhbaatar District, Ulaanbaatar',
        district: 'Sukhbaatar',
        latitude: 47.9201,
        longitude: 106.9198,
        phone: '+976 11 328 328',
        email: 'info@skyfitness.mn',
        rating: 4.9,
        reviews: 289,
        image: 'https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=800',
        openingHours: {
          monday: '5AM-11PM',
          tuesday: '5AM-11PM',
          wednesday: '5AM-11PM',
          thursday: '5AM-11PM',
          friday: '5AM-11PM',
          saturday: '6AM-10PM',
          sunday: '7AM-9PM'
        },
        amenities: ['Swimming Pool', 'Sauna', 'Spa', 'Personal Training', 'Group Classes', 'Cardio Equipment', 'Free Weights', 'Rooftop Terrace', 'Restaurant'],
        priceRange: '$$$$',
        website: 'https://skyfitness.mn',
        isFeatured: true,
        availability: true,
        tags: ['Luxury', 'Rooftop', 'Premium', 'Full Service']
      }
    ]
  })

  // Seed Exercises
  const exercises = await prisma.exercise.createMany({
    data: [
      {
        name: 'Barbell Squat',
        category: 'Legs',
        difficulty: 'Intermediate',
        equipment: 'Barbell, Squat Rack',
        description: 'Compound leg exercise targeting quads, glutes, and hamstrings',
        image: 'https://images.pexels.com/photos/1584998/pexels-photo-1584998.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Bench Press',
        category: 'Chest',
        difficulty: 'Intermediate',
        equipment: 'Barbell, Bench',
        description: 'Classic chest exercise for upper body strength',
        image: 'https://images.pexels.com/photos/1828628/pexels-photo-1828628.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Deadlift',
        category: 'Full Body',
        difficulty: 'Advanced',
        equipment: 'Barbell',
        description: 'Full body compound exercise for strength and power',
        image: 'https://images.pexels.com/photos/1534438/pexels-photo-1534438.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
