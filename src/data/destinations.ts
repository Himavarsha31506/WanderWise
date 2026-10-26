import { Destination } from '../types/travel';

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'dest-goa',
    name: 'Goa',
    country: 'India',
    region: 'india',
    stateOrCity: 'Goa',
    tagline: 'Sun-Kissed Beaches, Portuguese Heritage & Vibrant Shacks',
    description: 'India’s premier beach haven offering golden shores, colonial Portuguese architecture, thrilling water sports, and mouthwatering coastal seafood curries.',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['beaches', 'food', 'adventure'],
    budgetCategory: 'medium',
    avgCostPerDayINR: 3200,
    avgCostPerDayUSD: 40,
    minDays: 3,
    maxDays: 7,
    idealDurationDays: 4,
    popularAttractions: ['Baga & Anjuna Beach', 'Aguada Fort', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Chapora Fort'],
    bestSeason: 'November to February',
    weatherSummary: 'Warm tropical breeze, sunny blue skies (24°C - 31°C)',
    highlights: ['Sunset beach shacks with live acoustic music', 'Parasailing and jet skiing at Calangute', 'Old Goa UNESCO heritage churches'],
    localFoodSpecialties: ['Goan Fish Curry & Rice', 'Prawn Balchão', 'Bebinca dessert', 'Poi bread & Chorizo'],
    adventureActivities: ['Scuba Diving at Grande Island', 'Kite Surfing', 'Trekking to Dudhsagar Falls', 'ATV Trail Riding'],
    rating: 4.8,
    reviewCount: 1420,
    sampleItinerary: [
      {
        day: 1,
        title: 'North Goa Beaches & Sunset',
        morning: 'Arrive and check in. Relax at Calangute Beach and sip fresh tender coconut.',
        afternoon: 'Explore historic Fort Aguada lighthouse overlooking the Arabian Sea.',
        evening: 'Dine at an iconic beach shack in Baga with live music and fresh seafood.'
      },
      {
        day: 2,
        title: 'Water Sports & Night Market',
        morning: 'Jet ski, banana boat ride, and parasailing at Anjuna Beach.',
        afternoon: 'Stroll through bohemian boutiques and cafes in Assagao.',
        evening: 'Visit the Saturday Night Flea Market or enjoy a seaside candlelit dinner.'
      },
      {
        day: 3,
        title: 'Heritage Old Goa & Backwater Cruise',
        morning: 'Visit Basilica of Bom Jesus and Se Cathedral in Old Goa.',
        afternoon: 'Spice plantation tour with authentic Goan buffet lunch served on banana leaf.',
        evening: 'Sunset catamaran cruise along the scenic Mandovi River.'
      },
      {
        day: 4,
        title: 'South Goa Serenity & Departure',
        morning: 'Unwind at the tranquil Palolem Crescent Beach or butterfly beach boat trip.',
        afternoon: 'Shopping for feni, cashew nuts, and handicrafts in Panaji Latin Quarter (Fontainhas).',
        evening: 'Farewell coastal dinner and departure.'
      }
    ]
  },
  {
    id: 'dest-manali',
    name: 'Manali & Solang Valley',
    country: 'India',
    region: 'india',
    stateOrCity: 'Himachal Pradesh',
    tagline: 'Snow-Capped Himalayan Peaks & Adrenaline-Packed Trails',
    description: 'A paradise nestled in the Beas River Valley, renowned for snow adventures, pine-covered mountain trails, scenic apple orchards, and cozy alpine cafes.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['mountains', 'adventure', 'nature'],
    budgetCategory: 'low',
    avgCostPerDayINR: 2200,
    avgCostPerDayUSD: 28,
    minDays: 3,
    maxDays: 6,
    idealDurationDays: 4,
    popularAttractions: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Jogini Waterfall', 'Old Manali Cafes'],
    bestSeason: 'October to June',
    weatherSummary: 'Cool mountain air in summer (10°C - 22°C), snowy winter (-3°C - 8°C)',
    highlights: ['Snowboarding & skiing at Solang Valley', 'Hippie Old Manali street with wood-fired pizzas', 'Scenic trek to Jogini Waterfalls'],
    localFoodSpecialties: ['Siddu (steamed Himachali bun)', 'Trout Fish Fry', 'Thukpa & Momos', 'Himachali Dham feast'],
    adventureActivities: ['Paragliding over Solang', 'River Rafting in Beas River', 'Ziplining & Quad Biking', 'Hampta Pass Trekking'],
    rating: 4.7,
    reviewCount: 980,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Old Manali Culture',
        morning: 'Check into riverside hotel. Walk among the ancient deodar trees to Hadimba Temple.',
        afternoon: 'Wander Old Manali’s cobblestone lanes, artisan stores, and indie cafes.',
        evening: 'Enjoy live acoustic music and Himalayan trout dinner by the river.'
      },
      {
        day: 2,
        title: 'Solang Valley Adventure',
        morning: 'Head early to Solang Valley for tandem paragliding and zorbing.',
        afternoon: 'Take the cable car ropeway up to Mount Phatru for panoramic Himalayan panoramas.',
        evening: 'Hot chocolate and steaming momos at Mall Road.'
      },
      {
        day: 3,
        title: 'Jogini Falls & Vashisht Hot Springs',
        morning: 'Hike from Vashisht Village through pine forests to the cascading Jogini Waterfall.',
        afternoon: 'Dip your feet in the natural sulphur hot water springs at Vashisht.',
        evening: 'Campfire and stargazing in the clear mountain sky.'
      },
      {
        day: 4,
        title: 'Atal Tunnel & Sissu Valley Day Trip',
        morning: 'Drive through the marvel Atal Tunnel into the rugged Lahaul Valley.',
        afternoon: 'Witness Sissu Waterfall surrounded by towering snow ridges.',
        evening: 'Souvenir shopping and return departure.'
      }
    ]
  },
  {
    id: 'dest-jaipur',
    name: 'Jaipur (Pink City)',
    country: 'India',
    region: 'india',
    stateOrCity: 'Rajasthan',
    tagline: 'Majestic Royal Palaces, Hilltop Forts & Vibrant Bazaars',
    description: 'The storied capital of Rajasthan adorned with terracotta-pink architecture, astronomical marvels, grand Rajput fortresses, and world-famous heritage cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['history', 'food', 'nature'],
    budgetCategory: 'low',
    avgCostPerDayINR: 2000,
    avgCostPerDayUSD: 25,
    minDays: 2,
    maxDays: 4,
    idealDurationDays: 3,
    popularAttractions: ['Amer Fort', 'Hawa Mahal (Palace of Winds)', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort Sunset'],
    bestSeason: 'October to March',
    weatherSummary: 'Pleasant winter days (15°C - 26°C), cool starry nights',
    highlights: ['Golden sunset over Jaipur from Nahargarh Fort ramparts', 'Intricate 953 stone-latticed windows of Hawa Mahal', 'Elephant / Jeep ride up to Amer Palace'],
    localFoodSpecialties: ['Dal Baati Churma', 'Pyaaz Kachori with spicy tamarind chutney', 'Laal Maas', 'Ghevar sweet & Kulhad Lassi'],
    adventureActivities: ['Hot Air Ballooning over royal forts', 'Cycling tour through ancient city gates', 'Zip-lining at Flying Fox Amer'],
    rating: 4.8,
    reviewCount: 1650,
    sampleItinerary: [
      {
        day: 1,
        title: 'The Heart of the Pink City',
        morning: 'Early morning photo shoot at Hawa Mahal with sunrise glow. Visit Jantar Mantar.',
        afternoon: 'Tour the grand courtyards and royal museum of City Palace.',
        evening: 'Savor famous Pyaaz Kachori at Rawat Mishtan Bhandar and shop at Johari Bazaar.'
      },
      {
        day: 2,
        title: 'Amer Fortress & Golden Sunset',
        morning: 'Explore the sprawling Amer Fort, Sheesh Mahal (Mirror Palace), and Maota Lake.',
        afternoon: 'Stop by Jal Mahal (Water Palace) in Man Sagar Lake for picturesque views.',
        evening: 'Climb to Nahargarh Fort for a breathtaking panoramic sunset over the entire city.'
      },
      {
        day: 3,
        title: 'Artisan Crafts & Royal Feast',
        morning: 'Visit Anokhi Museum of Hand Printing and Albert Hall Museum.',
        afternoon: 'Pick up blue pottery, block-print textiles, and silver jewelry in Bapu Bazaar.',
        evening: 'Grand traditional Rajasthani Thali dinner at Chokhi Dhani village resort.'
      }
    ]
  },
  {
    id: 'dest-kerala',
    name: 'Kerala (Munnar & Alleppey)',
    country: 'India',
    region: 'india',
    stateOrCity: 'Kerala',
    tagline: 'Emerald Tea Plantations, Serene Backwaters & Ayurveda',
    description: 'God’s Own Country, offering misty rolling tea estates in Munnar, blissful luxury houseboat stays in Alleppey backwaters, and coconut-infused Malabar gastronomy.',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['nature', 'beaches', 'food'],
    budgetCategory: 'medium',
    avgCostPerDayINR: 3500,
    avgCostPerDayUSD: 44,
    minDays: 4,
    maxDays: 7,
    idealDurationDays: 5,
    popularAttractions: ['Alleppey Backwaters Houseboat', 'Munnar Tea Gardens', 'Eravikulam National Park', 'Marari Beach', 'Mattupetty Dam'],
    bestSeason: 'September to March',
    weatherSummary: 'Gentle tropical breeze, misty hills (16°C - 28°C)',
    highlights: ['Overnight traditional Kettuvallam houseboat stay', 'Trekking through manicured tea hills with fresh tea tasting', 'Traditional Kathakali and Kalaripayattu martial art shows'],
    localFoodSpecialties: ['Kerala Sadya on plantain leaf', 'Appam with creamy Vegetable/Chicken Stew', 'Karimeen Pollichathu (Pearl Spot Fish)', 'Banana chips fried in pure coconut oil'],
    adventureActivities: ['Bamboo Rafting at Periyar', 'Kayaking through narrow village canals in Alleppey', 'Jeep Safari to Kolukkumalai Highest Tea Estate'],
    rating: 4.9,
    reviewCount: 1310,
    sampleItinerary: [
      {
        day: 1,
        title: 'Misty Arrival in Munnar Hills',
        morning: 'Drive from Kochi to Munnar, passing Cheeyappara and Valara waterfalls.',
        afternoon: 'Check in to a boutique plantation resort surrounded by cardamom trees.',
        evening: 'Walk through tea plantations and visit Tata Tea Museum for fresh brewing demo.'
      },
      {
        day: 2,
        title: 'Wildlife & Scenic Heights',
        morning: 'Spot the endangered Nilgiri Tahr at Eravikulam National Park.',
        afternoon: 'Boating at Mattupetty Dam and Echo Point surrounded by rolling green hills.',
        evening: 'Watch a traditional Kathakali theater performance in Munnar town.'
      },
      {
        day: 3,
        title: 'Journey to Alleppey Houseboat',
        morning: 'Scenic descent through spice plantations toward the backwater lakes.',
        afternoon: 'Board your private thatched houseboat in Alleppey. Cruise past floating paddy fields.',
        evening: 'Candlelight dinner on the boat with freshly caught Karimeen fish and Malabar spices.'
      },
      {
        day: 4,
        title: 'Canal Kayaking & Marari Beach',
        morning: 'Sunrise kayaking through narrow village waterways as fishermen cast their nets.',
        afternoon: 'Head to pristine Marari Beach, lined with coconut palms and quiet sands.',
        evening: 'Rejuvenating authentic Ayurvedic herbal oil massage.'
      },
      {
        day: 5,
        title: 'Kochi Heritage & Departure',
        morning: 'Transfer to Fort Kochi. See the iconic 14th-century Chinese Fishing Nets.',
        afternoon: 'Explore Jew Town spice markets and Mattancherry Palace.',
        evening: 'Depart with unforgettable memories and aromatic spices.'
      }
    ]
  },
  {
    id: 'dest-ladakh',
    name: 'Leh Ladakh',
    country: 'India',
    region: 'india',
    stateOrCity: 'Ladakh',
    tagline: 'Land of High Passes, Turquoise Lakes & Buddhist Monasteries',
    description: 'A breathtaking high-altitude desert surrounded by towering Himalayan ranges, crystal azure lakes like Pangong Tso, and serene ancient cliffside gompas.',
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['mountains', 'adventure', 'nature', 'history'],
    budgetCategory: 'high',
    avgCostPerDayINR: 5500,
    avgCostPerDayUSD: 70,
    minDays: 5,
    maxDays: 10,
    idealDurationDays: 6,
    popularAttractions: ['Pangong Tso Lake', 'Nubra Valley Sand Dunes', 'Khardung La Pass', 'Thiksey Monastery', 'Magnetic Hill'],
    bestSeason: 'May to September',
    weatherSummary: 'Crisp mountain air, brilliant sun (12°C - 20°C), cool nights (2°C - 8°C)',
    highlights: ['Camping under billion-star Milky Way at Pangong Lake', 'Double-humped Bactrian camel ride in Nubra sand dunes', 'Crossing Khardung La, one of world’s highest motorable passes'],
    localFoodSpecialties: ['Ladakhi Thukpa soup', 'Tingmo (steamed Tibetan bread)', 'Skyu vegetable stew', 'Butter Tea (Gur Gur Chai)'],
    adventureActivities: ['High-altitude Himalayan Bike Expedition', 'Rafting on Zanskar River confluence', 'Stok Kangri Trek Base Camp'],
    rating: 4.9,
    reviewCount: 890,
    sampleItinerary: [
      {
        day: 1,
        title: 'Acclimatization in Leh',
        morning: 'Arrive at Leh Airport (3,500m). Rest strictly for body altitude adaptation.',
        afternoon: 'Gentle walk to Leh Palace and Shanti Stupa for evening views.',
        evening: 'Warm dinner with herbal Ladakhi tea in Leh Main Bazaar.'
      },
      {
        day: 2,
        title: 'Sham Valley & Confluence',
        morning: 'Visit Hall of Fame and experience the gravity-defying Magnetic Hill.',
        afternoon: 'Witness the striking Sangam of Indus and Zanskar rivers.',
        evening: 'Tour Gurudwara Pathar Sahib and Alchi Monastery.'
      },
      {
        day: 3,
        title: 'Khardung La to Nubra Valley',
        morning: 'Drive across thrilling Khardung La Pass (5,359m).',
        afternoon: 'Arrive in Diskit. Admire the colossal 32-meter Maitreya Buddha statue.',
        evening: 'Ride double-humped Bactrian camels on Hunder silver sand dunes at sunset.'
      },
      {
        day: 4,
        title: 'Nubra to Mesmerizing Pangong Lake',
        morning: 'Drive along the picturesque Shyok River toward Pangong Tso.',
        afternoon: 'First glimpse of the shimmering 134-km long turquoise lake changing hues.',
        evening: 'Glamping tent stay by the lake with campfire and stargazing.'
      },
      {
        day: 5,
        title: 'Pangong to Leh via Chang La',
        morning: 'Catch surreal golden sunrise reflection on Pangong Lake.',
        afternoon: 'Cross Chang La Pass; visit majestic Thiksey Monastery resembling Potala Palace.',
        evening: 'Souvenir shopping for Pashmina shawls and Tibetan prayer flags.'
      },
      {
        day: 6,
        title: 'Departure with Lifetime Memories',
        morning: 'Final breakfast overlooking the Himalayan peaks and flight transfer.',
        afternoon: 'Farewell Ladakh.',
        evening: 'Homebound.'
      }
    ]
  },
  {
    id: 'dest-bali',
    name: 'Bali (Ubud & Seminyak)',
    country: 'Indonesia',
    region: 'international',
    stateOrCity: 'Bali',
    tagline: 'Island of the Gods, Emerald Terraces & Surf Beaches',
    description: 'An idyllic tropical haven blending terraced rice paddies, ancient Hindu water temples, dramatic cliffside sunsets, world-class beach clubs, and yoga sanctuaries.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['beaches', 'nature', 'adventure', 'food'],
    budgetCategory: 'medium',
    avgCostPerDayINR: 4200,
    avgCostPerDayUSD: 52,
    minDays: 4,
    maxDays: 9,
    idealDurationDays: 5,
    popularAttractions: ['Tegallalang Rice Terraces', 'Uluwatu Cliff Temple & Kecak Dance', 'Sacred Monkey Forest', 'Nusa Penida Kelingking Beach', 'Tanah Lot'],
    bestSeason: 'April to October',
    weatherSummary: 'Sunny tropical paradise, warm seas (26°C - 31°C)',
    highlights: ['Sunrise trek to the rim of Mount Batur active volcano', 'Giant jungle swings overlooking Tegallalang Valley', 'Clifftop Kecak fire dance against Uluwatu sunset'],
    localFoodSpecialties: ['Nasi Goreng & Mie Goreng', 'Babi Guling roast pork', 'Ayam Betutu slow-cooked chicken', 'Fresh dragonfruit smoothie bowls'],
    adventureActivities: ['White Water Rafting on Ayung River', 'Manta Ray snorkeling at Nusa Penida', 'Surfing lessons at Canggu Beach'],
    rating: 4.9,
    reviewCount: 2200,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Seminyak Sunset',
        morning: 'Arrive at Ngurah Rai Airport. Check into tropical private pool villa.',
        afternoon: 'Stroll along Seminyak beach and relax on colorful beanbags.',
        evening: 'Sunset cocktails and seafood barbecue at Potato Head Beach Club.'
      },
      {
        day: 2,
        title: 'Ubud Cultural Heartland',
        morning: 'Visit the playful residents of the Sacred Monkey Forest Sanctuary.',
        afternoon: 'Walk the famous Tegallalang Rice Terraces and try the exhilarating jungle swing.',
        evening: 'Dine at an organic farm-to-table restaurant in Ubud centre.'
      },
      {
        day: 3,
        title: 'Mount Batur Sunrise & Hot Springs',
        morning: '2:30 AM pick up for sunrise hike up Mount Batur volcano. Breakfast cooked in volcanic steam.',
        afternoon: 'Soak tired muscles in Toya Devasya natural geothermal hot springs.',
        evening: 'Traditional Balinese floral spa and massage.'
      },
      {
        day: 4,
        title: 'Nusa Penida Island Adventure',
        morning: 'Speedboat to Nusa Penida. Marvel at the T-Rex shaped Kelingking Beach cliff.',
        afternoon: 'Swim in the natural infinity pool of Angel’s Billabong and Broken Beach.',
        evening: 'Return to mainland for romantic seaside dinner.'
      },
      {
        day: 5,
        title: 'Uluwatu Cliffs & Kecak Dance',
        morning: 'Shop for handcrafted rattan bags, linen dresses, and silver jewelry.',
        afternoon: 'Explore the 70-meter sea cliff at Uluwatu Temple.',
        evening: 'Watch hypnotic Kecak Fire Dance as sun sinks into the Indian Ocean.'
      }
    ]
  },
  {
    id: 'dest-swiss-alps',
    name: 'Swiss Alps (Interlaken & Zermatt)',
    country: 'Switzerland',
    region: 'international',
    stateOrCity: 'Bernese Oberland / Valais',
    tagline: 'Majestic Peaks, Crystal Glacial Lakes & Alpine Wonder',
    description: 'The pinnacle of European mountain beauty featuring the iconic Matterhorn, cogwheel train journeys up to Jungfraujoch "Top of Europe", and fairytale wooden chalets.',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['mountains', 'nature', 'adventure'],
    budgetCategory: 'high',
    avgCostPerDayINR: 14000,
    avgCostPerDayUSD: 175,
    minDays: 4,
    maxDays: 8,
    idealDurationDays: 5,
    popularAttractions: ['Jungfraujoch - Top of Europe', 'Matterhorn & Gornergrat Railway', 'Lake Brienz & Lake Thun', 'Lauterbrunnen Valley of 72 Waterfalls', 'First Cliff Walk Grindelwald'],
    bestSeason: 'June to September (Hiking) or Dec to April (Skiing)',
    weatherSummary: 'Crisp alpine sunshine (15°C - 23°C in summer), snowy wonderland in winter',
    highlights: ['Cogwheel train through Eiger mountain tunnel to glacier Ice Palace', 'Steamer boat cruise across turquoise Lake Brienz', 'First Cliff Walk suspension bridge suspended above 2,000m abyss'],
    localFoodSpecialties: ['Swiss Cheese Fondue with crusty sourdough', 'Crispy Potato Rösti', 'Raclette scraped over boiled potatoes', 'Artisanal Swiss Chocolate pralines'],
    adventureActivities: ['Tandem Paragliding over Interlaken', 'First Flyer Zipline (84 km/h)', 'Glacier Trekking on Aletsch Glacier', 'World-class Alpine Skiing'],
    rating: 5.0,
    reviewCount: 1840,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival in Interlaken & Lake Cruise',
        morning: 'Arrive by panoramic train into Interlaken, nestled between two glacial lakes.',
        afternoon: 'Cruise across turquoise Lake Brienz to the fairytale Giessbach Grand Hotel and falls.',
        evening: 'Cozy Swiss cheese fondue dinner in a rustic timber restaurant.'
      },
      {
        day: 2,
        title: 'Lauterbrunnen & Top of Europe',
        morning: 'Wander through Lauterbrunnen valley beneath the soaring Staubbach Falls.',
        afternoon: 'Board the Eiger Express cable car and cogwheel train to Jungfraujoch (3,454m).',
        evening: 'Walk inside the carved Ice Palace and step onto the Sphinx observation deck.'
      },
      {
        day: 3,
        title: 'Grindelwald First Thrills',
        morning: 'Cable car up to Grindelwald First. Walk the thrilling cliff suspension walkway.',
        afternoon: 'Fly down the First Flyer zipline and ride Mountain Carts through alpine meadows.',
        evening: 'Swiss chocolate tasting tour and craft beer at Interlaken promenade.'
      },
      {
        day: 4,
        title: 'Scenic Train to Zermatt & The Matterhorn',
        morning: 'Scenic rail journey to car-free alpine village of Zermatt.',
        afternoon: 'Ride the Gornergrat cogwheel train for front-row reflections of the Matterhorn in Lake Riffelsee.',
        evening: 'Dine on sizzling Raclette while watching alpine alpenglow illuminate the peaks.'
      },
      {
        day: 5,
        title: 'Alpine Stroll & Departure',
        morning: 'Morning stroll through Hinterdorf, Zermatt’s preserved 16th-century wooden barn village.',
        afternoon: 'Souvenir shopping for Swiss watches and army knives.',
        evening: 'Panoramic train back to Zurich or Geneva for international flights.'
      }
    ]
  },
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'international',
    stateOrCity: 'Kansai',
    tagline: 'Ancient Shrines, Bamboo Groves & Geisha Culture',
    description: 'Japan’s historic imperial capital boasting over a thousand Buddhist temples, tranquil Zen stone gardens, whispering bamboo forests, and world-renowned matcha tea ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['history', 'food', 'nature'],
    budgetCategory: 'high',
    avgCostPerDayINR: 9500,
    avgCostPerDayUSD: 118,
    minDays: 3,
    maxDays: 6,
    idealDurationDays: 4,
    popularAttractions: ['Fushimi Inari-Taisha (10,000 Vermilion Torii)', 'Arashiyama Bamboo Grove', 'Kinkaku-ji (Golden Pavilion)', 'Gion Historic District', 'Kiyomizu-dera Wooden Temple'],
    bestSeason: 'March to May (Sakura) & Oct to Nov (Autumn Foliage)',
    weatherSummary: 'Crisp, temperate weather (14°C - 22°C), stunning seasonal foliage',
    highlights: ['Hiking beneath thousands of vibrant orange Torii gates', 'Authentic Matcha Green Tea Ceremony with seasonal wagashi sweets', 'Spotting Geiko and Maiko in traditional Gion lantern-lit alleys'],
    localFoodSpecialties: ['Kyoto Kaiseki multi-course banquet', 'Yudofu (simmered soft tofu)', 'Matcha Soft Cream & Parfaits', 'Handmade Soba noodles & Tonkatsu'],
    adventureActivities: ['Hozugawa River Boat ride through gorges', 'Early morning cycling along Kamo River', 'Meditation session with Zen Buddhist monks'],
    rating: 4.9,
    reviewCount: 1980,
    sampleItinerary: [
      {
        day: 1,
        title: 'Torii Gates & Lanterns of Gion',
        morning: 'Beat the crowds at Fushimi Inari-Taisha; hike through the tunnel of 10,000 vermilion Torii gates.',
        afternoon: 'Climb the hillside to Kiyomizu-dera wooden terrace offering views over Kyoto city.',
        evening: 'Walk the cobblestone lanes of Ninenzaka and Gion; enjoy authentic ramen and matcha sweets.'
      },
      {
        day: 2,
        title: 'Arashiyama Bamboo & Monkey Park',
        morning: 'Listen to the rustle of the wind in the ethereal Arashiyama Bamboo Grove.',
        afternoon: 'Cross Togetsukyo Bridge and visit Tenryu-ji UNESCO temple and tranquil pond garden.',
        evening: 'Traditional multi-course Kaiseki dinner highlighting Kyoto seasonal vegetables.'
      },
      {
        day: 3,
        title: 'Golden Pavilion & Philosopher’s Walk',
        morning: 'Marvel at Kinkaku-ji (The Golden Pavilion) glittering above its mirror pond.',
        afternoon: 'Peaceful stroll along Philosopher’s Path beside cherry blossom canals to Ginkaku-ji.',
        evening: 'Browse Nishiki Market "Kyoto’s Kitchen" for skewers, tamagoyaki, and pickled delicacies.'
      },
      {
        day: 4,
        title: 'Tea Culture & Shinkansen',
        morning: 'Participate in a serene Zen tea ceremony in a centuries-old machiya townhouse.',
        afternoon: 'Shop for Japanese ceramics, green tea, and traditional fans near Kyoto Station.',
        evening: 'Board Shinkansen bullet train to Tokyo or Osaka.'
      }
    ]
  },
  {
    id: 'dest-dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'international',
    stateOrCity: 'Dubai',
    tagline: 'Futuristic Skyscrapers, Golden Desert Safaris & Luxury',
    description: 'A dazzling metropolis where hyper-modern architecture like Burj Khalifa meets Arabian desert dunes, world-class theme parks, and Michelin-starred dining.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['adventure', 'food', 'beaches'],
    budgetCategory: 'high',
    avgCostPerDayINR: 11000,
    avgCostPerDayUSD: 140,
    minDays: 3,
    maxDays: 6,
    idealDurationDays: 4,
    popularAttractions: ['Burj Khalifa Level 148', 'Dubai Mall & Fountain Show', 'Desert Dune Bashing Safari', 'Museum of the Future', 'Palm Jumeirah & Atlantis'],
    bestSeason: 'November to March',
    weatherSummary: 'Warm sunny weather (22°C - 28°C), cool desert breeze in evening',
    highlights: ['Standing on the observation deck of world’s tallest tower Burj Khalifa', '4x4 Desert Safari dune bashing and Bedouin barbecue dinner', 'Dancing fountain show set to classical and Arabic symphony'],
    localFoodSpecialties: ['Shawarma with garlic toum', 'Al Machboos spiced lamb rice', 'Luqaimat sweet dumplings drizzled with date syrup', 'Arabic coffee & stuffed Medjool dates'],
    adventureActivities: ['Skydive Dubai over Palm Jumeirah', 'Desert Dune Bashing & Sandboarding', 'Aquaventure Waterpark leap of faith', 'Indoor skiing at Ski Dubai'],
    rating: 4.8,
    reviewCount: 2400,
    sampleItinerary: [
      {
        day: 1,
        title: 'Modern Marvels & Dancing Fountains',
        morning: 'Ascend to the 124th/148th floor of Burj Khalifa for breathtaking panoramas.',
        afternoon: 'Explore Dubai Mall, Dubai Aquarium & Underwater Zoo.',
        evening: 'Dine by the lake watching the choreographed Dubai Fountain show.'
      },
      {
        day: 2,
        title: 'Red Dune Desert Safari',
        morning: 'Visit the futuristic calligraphy torus: Museum of the Future.',
        afternoon: '4x4 Land Cruiser dune bashing, sandboarding, and camel rides in Lahbab desert.',
        evening: 'Barbecue buffet under the desert stars with tanoura dancing and henna painting.'
      },
      {
        day: 3,
        title: 'Palm Jumeirah & Marina Yacht Cruise',
        morning: 'Take the Monorail to Atlantis The Palm; splash into Aquaventure Waterpark.',
        afternoon: 'Stroll along Dubai Marina promenade and JBR The Walk beach.',
        evening: 'Sunset luxury yacht cruise around Dubai Marina and Ain Dubai.'
      },
      {
        day: 4,
        title: 'Historic Al Fahidi & Souk Crossing',
        morning: 'Ride traditional wooden Abra boat across Dubai Creek (1 AED).',
        afternoon: 'Bargain for aromatic spices, perfumes, and gold in the traditional souks.',
        evening: 'Gourmet Lebanese or Emirati dinner before departure.'
      }
    ]
  },
  {
    id: 'dest-phuket',
    name: 'Phuket & Krabi',
    country: 'Thailand',
    region: 'international',
    stateOrCity: 'Andaman Coast',
    tagline: 'Limestone Karsts, Turquoise Waters & Vibrant Night Markets',
    description: 'Thailand’s tropical jewel famous for dramatic limestone cliffs rising from emerald sea, island-hopping to Maya Bay (The Beach), buzzing night bazaars, and savory street food.',
    imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['beaches', 'adventure', 'food', 'nature'],
    budgetCategory: 'low',
    avgCostPerDayINR: 2800,
    avgCostPerDayUSD: 35,
    minDays: 3,
    maxDays: 7,
    idealDurationDays: 4,
    popularAttractions: ['Phi Phi Islands & Maya Bay', 'James Bond Island (Phang Nga Bay)', 'Big Buddha Phuket', 'Railay Beach Rock Climbing', 'Patong Night Market'],
    bestSeason: 'November to April',
    weatherSummary: 'Sunny tropical skies, crystal calm waters (27°C - 32°C)',
    highlights: ['Speedboat tour across Phi Phi Don, Phi Phi Leh, and Pileh Lagoon', 'Sea canoeing through hidden limestone sea caves (Hong)', 'Savoring authentic Pad Thai and Mango Sticky Rice by the beach'],
    localFoodSpecialties: ['Pad Thai kung sod (stir-fried noodles with prawns)', 'Tom Yum Goong spicy soup', 'Green Curry (Gaeng Keow Wan)', 'Sweet Mango Sticky Rice with coconut cream'],
    adventureActivities: ['Scuba Diving at Shark Point', 'Rock Climbing on limestone cliffs at Railay Beach', 'Sea kayaking through Phang Nga Mangroves'],
    rating: 4.8,
    reviewCount: 2100,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Patong Sunset',
        morning: 'Land in Phuket, transfer to beachfront resort in Kata or Karon.',
        afternoon: 'Visit the majestic 45-meter marble Big Buddha overlooking Chalong Bay.',
        evening: 'Sunset cocktail at Kata Beach followed by street food feast at Banzaan Market.'
      },
      {
        day: 2,
        title: 'Phi Phi Islands & Maya Bay Island Hopper',
        morning: 'Speedboat to Maya Bay, framed by 100-meter towering limestone cliffs.',
        afternoon: 'Swim and snorkel in the natural emerald pool of Pileh Lagoon and Monkey Beach.',
        evening: 'Beachside seafood barbecue with fire-spinning dancers in Patong.'
      },
      {
        day: 3,
        title: 'James Bond Island & Sea Canoeing',
        morning: 'Cruise Phang Nga Bay; kayak through caves into hidden emerald lagoons.',
        afternoon: 'Visit Koh Panyee, the fascinating floating Muslim fishing village on stilts.',
        evening: 'Relaxing Thai aromatherapy massage.'
      },
      {
        day: 4,
        title: 'Old Phuket Town & Departure',
        morning: 'Explore colorful Sino-Portuguese shophouses and murals in Old Phuket Town.',
        afternoon: 'Souvenir shopping for Thai silk, coconut snacks, and handmade soaps.',
        evening: 'Airport transfer.'
      }
    ]
  },
  {
    id: 'dest-paris',
    name: 'Paris',
    country: 'France',
    region: 'international',
    stateOrCity: 'Île-de-France',
    tagline: 'The City of Light, World-Class Art, Cafes & Haute Cuisine',
    description: 'The romantic heart of Europe celebrated for iconic monuments like the Eiffel Tower, the Louvre museum’s artistic treasures, boulevards lined with chic bistros, and buttery croissants.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['history', 'food', 'nature'],
    budgetCategory: 'high',
    avgCostPerDayINR: 13000,
    avgCostPerDayUSD: 160,
    minDays: 3,
    maxDays: 6,
    idealDurationDays: 4,
    popularAttractions: ['Eiffel Tower', 'Louvre Museum (Mona Lisa)', 'Notre-Dame Cathedral', 'Montmartre & Sacré-Cœur', 'Palace of Versailles'],
    bestSeason: 'April to October',
    weatherSummary: 'Pleasant spring and autumn days (15°C - 23°C), romantic cafe weather',
    highlights: ['Sparkling Eiffel Tower light show every hour after dusk', 'Admiring the Mona Lisa and Venus de Milo in the Louvre', 'Sunset cruise along the River Seine gliding past historic bridges'],
    localFoodSpecialties: ['Warm butter croissants & Pain au chocolat', 'French Onion Soup with melted Gruyère', 'Beef Bourguignon', 'Colorful Macarons from Ladurée'],
    adventureActivities: ['Night cycling tour along Seine riverbanks', 'Climbing 284 steps of Arc de Triomphe', 'Day trip by RER train to Chateau de Versailles gardens'],
    rating: 4.8,
    reviewCount: 3100,
    sampleItinerary: [
      {
        day: 1,
        title: 'The Icons: Eiffel & River Seine',
        morning: 'Ascend the Eiffel Tower for panoramic view of Parisian boulevards.',
        afternoon: 'Stroll along Champs-Élysées up to the grand Arc de Triomphe.',
        evening: 'Romantic sunset Seine river cruise past illuminated Notre-Dame Cathedral.'
      },
      {
        day: 2,
        title: 'Art Masters & Latin Quarter',
        morning: 'Explore the Louvre Museum (Mona Lisa, Winged Victory, Sphinx).',
        afternoon: 'Wander through Tuileries Garden and browse indie bookstores in the Latin Quarter.',
        evening: 'Enjoy duck confit and French red wine at a cozy sidewalk bistro in Saint-Germain.'
      },
      {
        day: 3,
        title: 'Bohemian Montmartre & Sacré-Cœur',
        morning: 'Climb the steps of Montmartre to the gleaming white dome of Sacré-Cœur Basilica.',
        afternoon: 'Watch portrait artists at Place du Tertre and taste fresh macarons.',
        evening: 'Explore trendy boutiques in Le Marais district.'
      },
      {
        day: 4,
        title: 'Versailles Palace & Farewell',
        morning: 'Half-day excursion to the gilded Hall of Mirrors and musical fountains of Versailles.',
        afternoon: 'Final cafe stop for espresso and tarte tatin.',
        evening: 'Departure from Paris Charles de Gaulle.'
      }
    ]
  },
  {
    id: 'dest-rishikesh',
    name: 'Rishikesh',
    country: 'India',
    region: 'india',
    stateOrCity: 'Uttarakhand',
    tagline: 'Yoga Capital of the World, Ganga Aarti & White Water Rafting',
    description: 'Set on the banks of holy river Ganges at the foothills of the Himalayas, Rishikesh is famed for thrilling river rafting, cliff jumping, yoga ashrams, and magical Ganga Aarti.',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['adventure', 'nature', 'mountains'],
    budgetCategory: 'low',
    avgCostPerDayINR: 1800,
    avgCostPerDayUSD: 22,
    minDays: 2,
    maxDays: 5,
    idealDurationDays: 3,
    popularAttractions: ['Laxman Jhula & Ram Jhula', 'Triveni Ghat Evening Aarti', 'The Beatles Ashram', 'Neer Garh Waterfall', 'Shivpuri Rafting Point'],
    bestSeason: 'September to May',
    weatherSummary: 'Fresh mountain breeze (15°C - 28°C), crisp clear waters',
    highlights: ['White water rafting through Grade III & IV rapids (Roller Coaster, Golf Course)', 'Soul-stirring chants and floating brass lamps at Triveni Ghat Aarti', 'Bungee jumping from India’s highest 83m platform at Mohan Chatti'],
    localFoodSpecialties: ['Ayurvedic Thali', 'Aloo Poori at Chotiwala', 'Nutella & Banana pancakes at German Bakery', 'Fresh Ginger Lemon Honey tea'],
    adventureActivities: ['16km & 24km Ganges River Rafting', 'India’s Highest Bungee Jump (83m)', 'Giant Canyon Swing & Flying Fox', 'Neer Garh waterfall trek'],
    rating: 4.8,
    reviewCount: 1150,
    sampleItinerary: [
      {
        day: 1,
        title: 'River Arrival & Spiritual Aarti',
        morning: 'Arrive and check in to a riverside camp or boutique yoga retreat.',
        afternoon: 'Walk across the suspension bridge Ram Jhula and visit The Beatles Ashram.',
        evening: 'Experience the mystical Ganga Aarti at Triveni Ghat with Vedic hymns and brass lamps.'
      },
      {
        day: 2,
        title: 'White Water Rafting & Cliff Jump',
        morning: 'Drive up to Shivpuri for thrilling 16km rafting through turbulent rapids.',
        afternoon: 'Cliff jump into the refreshing emerald waters of Ganga; relax on white sand beach.',
        evening: 'Chai and vegetarian dinner at a riverside cafe overlooking the suspension bridge.'
      },
      {
        day: 3,
        title: 'Waterfall Trek & Departure',
        morning: 'Early morning guided Yoga and meditation session by the river.',
        afternoon: 'Short scenic hike to Neer Garh Waterfall; swim in the natural mountain pools.',
        evening: 'Souvenir shopping for singing bowls and rudraksha beads, then departure.'
      }
    ]
  },
  {
    id: 'dest-andaman',
    name: 'Andaman & Havelock Island',
    country: 'India',
    region: 'india',
    stateOrCity: 'Andaman & Nicobar',
    tagline: 'Pristine Turquoise Lagoons, Radhanagar Beach & Coral Reefs',
    description: 'An exotic archipelago in the Bay of Bengal boasting Radhanagar Beach (voted Asia’s best beach), vibrant coral reefs, scuba diving with sea turtles, and historic Cellular Jail.',
    imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['beaches', 'nature', 'adventure', 'history'],
    budgetCategory: 'medium',
    avgCostPerDayINR: 4800,
    avgCostPerDayUSD: 60,
    minDays: 4,
    maxDays: 7,
    idealDurationDays: 5,
    popularAttractions: ['Radhanagar Beach No. 7', 'Elephant Beach Coral Snorkel', 'Cellular Jail Port Blair', 'Neil Island Natural Bridge', 'Baratang Limestone Caves'],
    bestSeason: 'October to May',
    weatherSummary: 'Tropical island sunshine, crystal visibility underwater (25°C - 30°C)',
    highlights: ['Watching vivid magenta sunset at Radhanagar Beach', 'Scuba diving among vibrant clownfish, manta rays, and live coral reefs', 'Emotional Light & Sound show at historic Cellular Jail'],
    localFoodSpecialties: ['Grilled Andaman Lobster', 'Crab Masala with coconut rice', 'Fresh Mango fish curry', 'Tender young coconuts'],
    adventureActivities: ['PADI Scuba Diving', 'Sea Walking on the seabed', 'Glass bottom boat ride', 'Mangrove Kayaking'],
    rating: 4.9,
    reviewCount: 940,
    sampleItinerary: [
      {
        day: 1,
        title: 'Port Blair & Cellular Jail',
        morning: 'Arrive at Veer Savarkar Airport Port Blair. Check in.',
        afternoon: 'Tour Cellular Jail (Kala Pani) and learn of India’s freedom fighters.',
        evening: 'Attend the moving Light and Sound show; dinner at seaside restaurant.'
      },
      {
        day: 2,
        title: 'Makruzz Cruise to Havelock Island',
        morning: 'Board luxury catamaran ferry to Havelock Island (Swaraj Dweep).',
        afternoon: 'Check into beach resort surrounded by coconut groves.',
        evening: 'Witness the world-famous sunset at pristine Radhanagar Beach.'
      },
      {
        day: 3,
        title: 'Elephant Beach Underwater Paradise',
        morning: 'Speedboat to Elephant Beach. Snorkel or Sea Walk amidst teeming tropical coral reefs.',
        afternoon: 'Parasailing and banana boat ride over turquoise waters.',
        evening: 'Candlelight seafood dinner under the palm trees.'
      },
      {
        day: 4,
        title: 'Neil Island Natural Rock Wonder',
        morning: 'Ferry to Neil Island (Shaheed Dweep). Visit the famous Natural Rock Formation.',
        afternoon: 'Relax on the shallow white sands of Bharatpur and Laxmanpur beaches.',
        evening: 'Sunset photography at Sunset Point.'
      },
      {
        day: 5,
        title: 'Return & Departure',
        morning: 'Ferry back to Port Blair; pick up shell handicrafts and pearl ornaments.',
        afternoon: 'Airport transfer for flight back.',
        evening: 'Homebound flight with unforgettable island memories.'
      }
    ]
  },
  {
    id: 'dest-varanasi',
    name: 'Varanasi',
    country: 'India',
    region: 'india',
    stateOrCity: 'Uttar Pradesh',
    tagline: 'The World’s Oldest Living City, Sacred Ghats & Silk Weavers',
    description: 'A mesmerizing spiritual capital on the sacred banks of the Ganges, where thousands of pilgrims pray on ancient ghats, classical sitar music echoes, and street food delights foodies.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['history', 'food', 'nature'],
    budgetCategory: 'low',
    avgCostPerDayINR: 1600,
    avgCostPerDayUSD: 20,
    minDays: 2,
    maxDays: 4,
    idealDurationDays: 3,
    popularAttractions: ['Dashashwamedh Ghat Evening Aarti', 'Sunrise Boat Ride on Ganges', 'Kashi Vishwanath Corridor', 'Sarnath (Buddha’s First Sermon)', 'Assi Ghat Morning Yoga'],
    bestSeason: 'October to March',
    weatherSummary: 'Cool pleasant winter mornings (12°C - 24°C)',
    highlights: ['Peaceful sunrise wooden boat ride watching bathers and priests along 84 ghats', 'Grand synchronized Ganga Aarti with multi-tiered flaming brass lamps', 'Visiting Dhamek Stupa where Buddha gave his first sermon at Sarnath'],
    localFoodSpecialties: ['Banarasi Paan with sweet gulkand', 'Kachori Sabzi & Jalebi breakfast', 'Malaiyo (saffron milk foam winter delicacy)', 'Thick Blue Lassi with pomegranate and pistachio'],
    adventureActivities: ['Heritage walking tour through 3,000-year-old alleyways', 'Private sitar and tabla musical concert', 'Handloom silk weaving demonstration'],
    rating: 4.7,
    reviewCount: 1420,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Grand Ganga Aarti',
        morning: 'Arrive and check in near Assi Ghat. Savor Kachori Sabzi for breakfast.',
        afternoon: 'Walk through narrow labyrinthine alleys; visit Kashi Vishwanath Golden Temple.',
        evening: 'Watch the world-famous grand Ganga Aarti at Dashashwamedh Ghat from a wooden boat.'
      },
      {
        day: 2,
        title: 'Sunrise Rowboat & Sarnath Excursion',
        morning: '5:30 AM rowboat ride as dawn illuminates the riverfront palaces and ancient steps.',
        afternoon: 'Drive 10km to Sarnath where Lord Buddha first taught the Dharma; visit museum with Ashoka Lion Capital.',
        evening: 'Try authentic Banarasi Chaat (Tamatar Chaat) at Kashi Chaat Bhandar.'
      },
      {
        day: 3,
        title: 'Assi Ghat Culture & Departure',
        morning: 'Subah-e-Banaras morning music and yoga at Assi Ghat.',
        afternoon: 'Visit master weavers crafting exquisite Banarasi Silk sarees.',
        evening: 'Final cup of Kulhad Chai, sweet Banarasi Paan, and departure.'
      }
    ]
  },
  {
    id: 'dest-queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'international',
    stateOrCity: 'Otago',
    tagline: 'Adventure Capital of the World on Lake Wakatipu',
    description: 'Set against the dramatic Southern Alps, Queenstown is the world capital of adrenaline sports, glacial fjords (Milford Sound), skydiving, and scenic vineyard valleys.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['adventure', 'mountains', 'nature'],
    budgetCategory: 'high',
    avgCostPerDayINR: 15000,
    avgCostPerDayUSD: 185,
    minDays: 4,
    maxDays: 7,
    idealDurationDays: 5,
    popularAttractions: ['Milford Sound Fjord Cruise', 'Skyline Gondola & Luge', 'Shotover Jet Boat', 'AJ Hackett Kawarau Bungy', 'Lake Wakatipu TSS Earnslaw'],
    bestSeason: 'December to March (Summer) or June to August (Ski)',
    weatherSummary: 'Cool temperate weather (16°C - 24°C in summer), snowy alpine peaks in winter',
    highlights: ['Cruising beneath cascading Stirling Falls in breathtaking Milford Sound', 'Spinning 360-degrees on Shotover River jet boat in narrow canyon walls', 'Bungy jumping off the historic Kawarau suspension bridge (43m)'],
    localFoodSpecialties: ['The legendary Fergburger (giant gourmet burger)', 'Canterbury roast lamb', 'Central Otago Pinot Noir wine', 'Pavlova with kiwi fruit and passionfruit'],
    adventureActivities: ['Kawarau Bridge Bungy Jump', '15,000-ft Tandem Skydiving', 'Shotover Jet Canyon Ride', 'Canyon Swing & Heli-Skiing'],
    rating: 4.9,
    reviewCount: 1670,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Skyline Gondola',
        morning: 'Arrive at Queenstown Airport; pick up rental and check in overlooking Lake Wakatipu.',
        afternoon: 'Take the Skyline Gondola up Bob’s Peak; race down the downhill Luge track.',
        evening: 'Grab a world-famous burger at Fergburger and relax by the lakeside.'
      },
      {
        day: 2,
        title: 'Adrenaline Rush Day',
        morning: 'Experience the birthplace of commercial bungy jumping at Kawarau Bridge.',
        afternoon: 'Heart-pumping 360-degree spins on the Shotover Jet boat through rocky canyons.',
        evening: 'Dine on Central Otago lamb and pinot noir in charming Arrowtown gold-mining village.'
      },
      {
        day: 3,
        title: 'Milford Sound 8th Wonder of the World',
        morning: 'Scenic coach drive through Southern Alps and Homer Tunnel to Milford Sound.',
        afternoon: 'Cruise beneath towering Mitre Peak; feel the glacial spray of Stirling Falls.',
        evening: 'Scenic flight or coach return to Queenstown.'
      },
      {
        day: 4,
        title: 'Lake Cruise & High Country Farm',
        morning: 'Steam across Lake Wakatipu on the historic 1912 vintage steamship TSS Earnslaw.',
        afternoon: 'Farm tour and gourmet BBQ lunch at Walter Peak High Country Farm.',
        evening: 'Stargazing tour atop Bob’s Peak through professional telescopes.'
      },
      {
        day: 5,
        title: 'Gibbston Valley Wine Tour & Departure',
        morning: 'Cycle or tour through Gibbston Valley wine caves.',
        afternoon: 'Lakeside stroll and souvenir shopping in Queenstown mall.',
        evening: 'Scenic departure flight over the snow-capped Southern Alps.'
      }
    ]
  }
];
