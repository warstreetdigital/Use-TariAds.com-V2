/**
 * TariAds - Global Listings & Advertising Marketplace
 * Master Data Layer & Storage Model
 * Property (Flagship) • Vehicles • Products • Other Listings
 */

// Global Location Taxonomy
export const LOCATIONS_DATA = {
  countries: [
    { code: "ALL", name: "All Locations (Global)", flag: "🌐" },
    { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "BW", name: "Botswana", flag: "🇧🇼" },
    { code: "ZM", name: "Zambia", flag: "🇿🇲" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" }
  ],
  popularCities: [
    { id: "harare", name: "Harare", country: "ZW", countryName: "Zimbabwe", tag: "Capital / Primary Market" },
    { id: "bulawayo", name: "Bulawayo", country: "ZW", countryName: "Zimbabwe", tag: "Second City" },
    { id: "mutare", name: "Mutare", country: "ZW", countryName: "Zimbabwe", tag: "Eastern Highlands" },
    { id: "gweru", name: "Gweru", country: "ZW", countryName: "Zimbabwe", tag: "Midlands Hub" },
    { id: "chitungwiza", name: "Chitungwiza", country: "ZW", countryName: "Zimbabwe", tag: "Greater Harare" },
    { id: "masvingo", name: "Masvingo", country: "ZW", countryName: "Zimbabwe", tag: "Ancient City" },
    { id: "vicfalls", name: "Victoria Falls", country: "ZW", countryName: "Zimbabwe", tag: "Resort & Tourism Hub" }
  ],
  regions: {
    ZW: [
      { id: "all_zw", name: "All Zimbabwe", country: "ZW", isAll: true },
      { id: "harare", name: "Harare", country: "ZW", areas: ["Borrowdale", "Avondale", "Mount Pleasant", "Eastlea", "Westgate", "CBD", "Greendale", "Newlands", "Highlands", "Shawasha Hills", "Chisipite", "Marlborough", "Belgravia", "Glen Lorne", "Waterfalls", "Hatfield"] },
      { id: "bulawayo", name: "Bulawayo", country: "ZW", areas: ["Kumalo", "Suburbs", "Hillside", "CBD", "Bradfield", "Burnside", "Morningside", "Woodville", "Matsheumhlope", "Killarney"] },
      { id: "mutare", name: "Mutare", country: "ZW", areas: ["Morningside", "Murambi", "CBD", "Palmerstone", "Yeovil", "Fairbridge Park", "Chikanga", "Dangamvura", "Bvumba"] },
      { id: "gweru", name: "Gweru", country: "ZW", areas: ["Kopje", "Daylesford", "CBD", "Southdowns", "Lundi Park", "Nashville", "Windsor Park"] },
      { id: "chitungwiza", name: "Chitungwiza", country: "ZW", areas: ["Unit L", "Unit K", "Zengeza", "St Marys", "Seke", "Chitungwiza Town Centre"] },
      { id: "masvingo", name: "Masvingo", country: "ZW", areas: ["Rhodene", "Target Kopje", "CBD", "Mucheke", "Clipsham Views"] },
      { id: "vicfalls", name: "Victoria Falls", country: "ZW", areas: ["Aerodrome", "Low Density", "Chidobe", "Chinotimba", "Elephant Hills Area"] },
      { id: "other_zw", name: "Other Cities (Zimbabwe)", country: "ZW", areas: ["Kwekwe", "Kadoma", "Chinhoyi", "Marondera", "Bindura", "Zvishavane", "Hwange", "Beitbridge", "Kariba", "Rusape"] }
    ],
    ZA: [
      { id: "all_za", name: "All South Africa", country: "ZA", isAll: true },
      { id: "capetown", name: "Cape Town", country: "ZA", areas: ["Camps Bay", "Sea Point", "City Bowl", "Claremont", "Constantia"] },
      { id: "jhb", name: "Johannesburg", country: "ZA", areas: ["Sandton", "Rosebank", "Fourways", "Midrand", "Randburg"] },
      { id: "durban", name: "Durban", country: "ZA", areas: ["Umhlanga", "Morningside", "Berea", "Ballito"] }
    ],
    UK: [
      { id: "all_uk", name: "All United Kingdom", country: "UK", isAll: true },
      { id: "london", name: "London", country: "UK", areas: ["Canary Wharf", "Kensington", "Stratford", "Camden", "Greenwich"] },
      { id: "manchester", name: "Manchester", country: "UK", areas: ["City Centre", "Salford Quays", "Didsbury"] }
    ],
    BW: [
      { id: "all_bw", name: "All Botswana", country: "BW", isAll: true },
      { id: "gaborone", name: "Gaborone", country: "BW", areas: ["Phakalane", "Block 6", "CBD", "Extension 9"] }
    ],
    ZM: [
      { id: "all_zm", name: "All Zambia", country: "ZM", isAll: true },
      { id: "lusaka", name: "Lusaka", country: "ZM", areas: ["Kabulonga", "Woodlands", "Rhodes Park", "Mass Media"] }
    ]
  }
};

// Initial Flagship Properties Dataset
export const INITIAL_PROPERTIES = [];

export const INITIAL_VEHICLES = [
  {
    "id": "TAR-VEH-01",
    "title": "Ford Ranger Raptor 4x4",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "pickup",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 35000,
    "currency": "USD",
    "priceNote": "Viewing in Harare",
    "year": 2021,
    "mileageKm": 52000,
    "transmission": "Automatic",
    "fuel": "Diesel",
    "condition": "Excellent Condition",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Rugged high-performance Ford Ranger Raptor 4x4 twin-turbo diesel by Kujinga Car Sales. Fox Racing suspension, terrain management, and luxury cabin.",
    "image": "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Ford-Raptor-03.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Ford-Raptor-03.webp"
    ],
    "seller": {
      "name": "Kujinga Car Sales",
      "type": "Auto Dealership",
      "phone": "+263 77 442 0070",
      "whatsapp": "263774420070",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Fox Racing Suspension",
      "Twin Turbo 4x4",
      "Full Leather Interior"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-02",
    "title": "Honda Fit Hybrid",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "hatchback",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 7000,
    "currency": "USD",
    "priceNote": "Viewing in Harare",
    "year": 2016,
    "mileageKm": 68000,
    "transmission": "Automatic",
    "fuel": "Hybrid Petrol",
    "condition": "Clean Import / Excellent Drive",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Economical Honda Fit Hybrid GP5 presented by Kujinga Car Sales. Outstanding fuel economy, push-start ignition, reverse camera, and pristine interior.",
    "image": "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Honda-Fit-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Honda-Fit-01.webp"
    ],
    "seller": {
      "name": "Kujinga Car Sales",
      "type": "Auto Dealership",
      "phone": "+263 77 442 0070",
      "whatsapp": "263774420070",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Ultra Low Consumption",
      "Push Start",
      "Reverse Camera"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-03",
    "title": "Toyota Aqua Hybrid",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "hatchback",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 8500,
    "currency": "USD",
    "priceNote": "Viewing in Harare",
    "year": 2017,
    "mileageKm": 61000,
    "transmission": "Automatic",
    "fuel": "Hybrid Petrol",
    "condition": "Clean Import / Fresh Stock",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Reliable Toyota Aqua Hybrid by Kujinga Car Sales. Toyota Hybrid Synergy Drive, responsive steering, power windows, and cold air conditioning.",
    "image": "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Toyota-Aqua-02.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Toyota-Aqua-02.webp"
    ],
    "seller": {
      "name": "Kujinga Car Sales",
      "type": "Auto Dealership",
      "phone": "+263 77 442 0070",
      "whatsapp": "263774420070",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Toyota Hybrid Synergy",
      "Keyless Entry",
      "Power Steering & AC"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-04",
    "title": "Toyota Hilux GD-6 4x4",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "pickup",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 30000,
    "currency": "USD",
    "priceNote": "Viewing in Harare",
    "year": 2020,
    "mileageKm": 74000,
    "transmission": "Manual",
    "fuel": "Diesel",
    "condition": "Tough Workhorse / Excellent",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Battle-tested Toyota Hilux GD-6 4x4 double cab from Kujinga Car Sales. Equipped with heavy-duty bullbar, roll bar, towbar, and differential lock.",
    "image": "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Toyota-Hilux-04.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Toyota-Hilux-04.webp"
    ],
    "seller": {
      "name": "Kujinga Car Sales",
      "type": "Auto Dealership",
      "phone": "+263 77 442 0070",
      "whatsapp": "263774420070",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "GD-6 Turbo Diesel",
      "4x4 High / Low",
      "Heavy Duty Bullbar"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-05",
    "title": "Toyota Sienta 7-Seater",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "family",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 10000,
    "currency": "USD",
    "priceNote": "Viewing in Harare",
    "year": 2018,
    "mileageKm": 59000,
    "transmission": "Automatic",
    "fuel": "Petrol",
    "condition": "Spacious Family Vehicle",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Modular 7-seater Toyota Sienta MPV offered by Kujinga Car Sales. Dual power sliding doors, low step-in height, and versatile folding third-row seats.",
    "image": "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Toyota-Sienta-05.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kujinga-Car-Sales-Toyota-Sienta-05.webp"
    ],
    "seller": {
      "name": "Kujinga Car Sales",
      "type": "Auto Dealership",
      "phone": "+263 77 442 0070",
      "whatsapp": "263774420070",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "7 Seats Capacity",
      "Dual Sliding Doors",
      "Modular Luggage Space"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-06",
    "title": "Delivery & Commute Motorcycle",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "motorcycle",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 900,
    "currency": "USD",
    "priceNote": "Available in Harare",
    "year": 2023,
    "mileageKm": 1200,
    "transmission": "Manual",
    "fuel": "Petrol",
    "condition": "Brand New / Low Maintenance",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Robust fuel-efficient commute and delivery motorcycle from Speed Bikes. Heavy-duty luggage carrier frame, kick and electric start, and low fuel draw.",
    "image": "https://media.usetariads.com/business%20posts/Speed-Bikes-Motorcycle.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Speed-Bikes-Motorcycle.webp"
    ],
    "seller": {
      "name": "Speed Bikes",
      "type": "Motorcycle Retailer",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Low Fuel Consumption",
      "Heavy Carrier Frame",
      "Electric & Kick Start"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-07",
    "title": "Alloy Rims Set",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "tyres-rims",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 500,
    "currency": "USD",
    "priceNote": "Per set of 4",
    "condition": "Brand New · Multi-fit PCD",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Stunning high-strength alloy wheel rims set by Grip-X Tyres & Rims. Precision engineered for luxury, SUV, and passenger vehicle fitments.",
    "image": "https://media.usetariads.com/business%20posts/Grip-X-Tyres-Rims-Alloy-Rims.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Grip-X-Tyres-Rims-Alloy-Rims.webp"
    ],
    "seller": {
      "name": "Grip-X Tyres & Rims",
      "type": "Tyres & Rims Specialist",
      "phone": "+263 71 980 1212",
      "whatsapp": "263719801212",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Multi-fit PCD",
      "High Strength Alloy",
      "Free Fitment Advice"
    ],
    "featured": true
  },
  {
    "id": "TAR-VEH-08",
    "title": "All-Weather Car Tyres",
    "category": "vehicles",
    "categoryLabel": "Vehicles",
    "subType": "tyres-rims",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 80,
    "currency": "USD",
    "priceNote": "Per tyre",
    "condition": "Brand New Stock",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Premium high-mileage all-weather passenger and commercial car tyres by Grip-X Tyres & Rims. Superior wet and dry road grip with enhanced tread life.",
    "image": "https://media.usetariads.com/business%20posts/Grip-X-Tyres-Rims-Car-Tyres.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Grip-X-Tyres-Rims-Car-Tyres.webp"
    ],
    "seller": {
      "name": "Grip-X Tyres & Rims",
      "type": "Tyres & Rims Specialist",
      "phone": "+263 71 980 1212",
      "whatsapp": "263719801212",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Deep Tread Pattern",
      "Reinforced Sidewalls",
      "All Weather Traction"
    ],
    "featured": true
  }
];

export const INITIAL_PRODUCTS = [
  {
    "id": "TAR-PRD-01",
    "title": "Modern Bedroom Set",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "furniture",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 450,
    "currency": "USD",
    "condition": "Brand New · Quality Timber",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Quality contemporary bedroom set by Brian Furnitures. Includes sturdy bed frame, designer headboard, and matching bedside pedestals.",
    "image": "https://media.usetariads.com/business%20posts/Brian-Furnitures-Bedroom-Set-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Brian-Furnitures-Bedroom-Set-01.webp"
    ],
    "seller": {
      "name": "Brian Furnitures",
      "type": "Furniture Maker",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Solid Timber Frame",
      "Matching Pedestals",
      "Delivery Available"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-02",
    "title": "Recliner Sofa Set",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "furniture",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 350,
    "currency": "USD",
    "condition": "Brand New · High Density Foam",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Comfortable ergonomic recliner sofa set by Brian Furnitures. Smooth reclining action with supportive cushioned head and lumbar support.",
    "image": "https://media.usetariads.com/business%20posts/Brian-Furnitures-Recliner-Sofa-Set-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Brian-Furnitures-Recliner-Sofa-Set-01.webp"
    ],
    "seller": {
      "name": "Brian Furnitures",
      "type": "Furniture Maker",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Ergonomic Reclining",
      "High Density Foam",
      "Durable Fabric"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-03",
    "title": "Contemporary Lounge Set",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "furniture",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Graniteside",
    "price": 400,
    "currency": "USD",
    "condition": "Brand New · Designer Finish",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Elegant modern lounge suite by OMA Bedding & Furniture. Deep-seated comfort with resilient upholstery fabric and kiln-dried hardwood frame.",
    "image": "https://media.usetariads.com/business%20posts/OMA-Bedding-and-Furniture-Lounge-Set-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/OMA-Bedding-and-Furniture-Lounge-Set-01.webp"
    ],
    "seller": {
      "name": "OMA Bedding & Furniture",
      "type": "Bedding & Furniture Specialist",
      "phone": "+263 77 955 7981",
      "whatsapp": "263779557981",
      "location": "Graniteside, Harare"
    },
    "features": [
      "Hardwood Frame",
      "Stain Resistant Fabric",
      "Includes Scatter Cushions"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-04",
    "title": "Quilted Orthopedic Mattress",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "furniture",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Graniteside",
    "price": 100,
    "currency": "USD",
    "condition": "Brand New Sealed",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Orthopedic spinal-support mattress by OMA Bedding & Furniture. Breathable bamboo quilted fabric with high-resilience support core.",
    "image": "https://media.usetariads.com/business%20posts/OMA-Bedding-and-Furniture-Mattress-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/OMA-Bedding-and-Furniture-Mattress-01.webp"
    ],
    "seller": {
      "name": "OMA Bedding & Furniture",
      "type": "Bedding & Furniture Specialist",
      "phone": "+263 77 955 7981",
      "whatsapp": "263779557981",
      "location": "Graniteside, Harare"
    },
    "features": [
      "Orthopedic Support",
      "Quilted Top",
      "Hypoallergenic"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-05",
    "title": "BUX Energy Drink",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "food",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Workington",
    "price": 1,
    "currency": "USD",
    "condition": "Fresh Stock · Cold Available",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Invigorating BUX Energy Drink distributed by Flash Beverages. Formulated with taurine, B-vitamins, and caffeine to power your day.",
    "image": "https://media.usetariads.com/business%20posts/Flash-Beverages-BUX-Energy-Drink.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Flash-Beverages-BUX-Energy-Drink.webp"
    ],
    "seller": {
      "name": "Flash Beverages",
      "type": "Beverage Distributor",
      "phone": "+263 77 612 1889",
      "whatsapp": "263776121889",
      "location": "Workington, Harare"
    },
    "features": [
      "Taurine & Caffeine",
      "Vitamin B Complex",
      "Bulk Packs Available"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-06",
    "title": "Custom Birthday Cake",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "food",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Avondale",
    "price": 25,
    "currency": "USD",
    "condition": "Freshly Baked on Order",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Handcrafted celebratory birthday cake by Kumbies Cake Box. Choice of vanilla, chocolate fudge, or red velvet with custom edible toppers.",
    "image": "https://media.usetariads.com/business%20posts/Kumbies-Cake-Box-Birthday-Cake-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kumbies-Cake-Box-Birthday-Cake-01.webp"
    ],
    "seller": {
      "name": "Kumbies Cake Box",
      "type": "Custom Bakery & Confectionery",
      "phone": "+263 78 910 7205",
      "whatsapp": "263789107205",
      "location": "Avondale, Harare"
    },
    "features": [
      "Custom Designs",
      "Gourmet Flavors",
      "Made to Order"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-07",
    "title": "Gourmet Cupcakes Pack",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "food",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Avondale",
    "price": 2.5,
    "currency": "USD",
    "condition": "Freshly Baked Daily",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Delicious artisanal cupcakes with creamy buttercream swirl frosting from Kumbies Cake Box. Perfect for treats, events, and parties.",
    "image": "https://media.usetariads.com/business%20posts/Kumbies-Cake-Box-Cupcakes-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Kumbies-Cake-Box-Cupcakes-01.webp"
    ],
    "seller": {
      "name": "Kumbies Cake Box",
      "type": "Custom Bakery & Confectionery",
      "phone": "+263 78 910 7205",
      "whatsapp": "263789107205",
      "location": "Avondale, Harare"
    },
    "features": [
      "Assorted Flavors",
      "Buttercream Frosting",
      "Party Packs Available"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-08",
    "title": "Universal Car Phone Holder Mount",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 10,
    "currency": "USD",
    "condition": "Brand New Boxed",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Secure windshield and dashboard 360-degree rotating car phone mount from Massive Gadgets. Strong vacuum suction with one-touch release.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-Car-Phone-Holder-04.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-Car-Phone-Holder-04.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "360° Rotation",
      "Strong Vacuum Grip",
      "Fits All Phones"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-09",
    "title": "Double-Door Refrigerator",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 350,
    "currency": "USD",
    "condition": "Brand New in Box",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Energy-efficient double-door domestic refrigerator and freezer from KESON Electronics. Low energy consumption and fast cooling compressor.",
    "image": "https://media.usetariads.com/business%20posts/KESON-Electronics-Refrigerator-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/KESON-Electronics-Refrigerator-01.webp"
    ],
    "seller": {
      "name": "KESON Electronics",
      "type": "Home Appliances & Electronics",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Low Power Consumption",
      "Auto Defrost",
      "Spacious Freezer"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-10",
    "title": "High-Power Speaker System",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 60,
    "currency": "USD",
    "condition": "Brand New Sealed",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Loud Bluetooth multimedia party speaker system by KESON Electronics. Deep bass reflex, USB/SD inputs, FM radio, and karaoke microphone port.",
    "image": "https://media.usetariads.com/business%20posts/KESON-Electronics-Speaker-System-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/KESON-Electronics-Speaker-System-01.webp"
    ],
    "seller": {
      "name": "KESON Electronics",
      "type": "Home Appliances & Electronics",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Deep Bass Subwoofer",
      "Bluetooth 5.0",
      "Remote Control"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-11",
    "title": "Computer Accessories Bundle",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 15,
    "currency": "USD",
    "condition": "Brand New Sealed",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Quality desktop and laptop essential computer accessories from Klick Tech. Includes precision mouse, USB hubs, adapters, and durable cabling.",
    "image": "https://media.usetariads.com/business%20posts/Klick-Tech-Computer-Accessories.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Klick-Tech-Computer-Accessories.webp"
    ],
    "seller": {
      "name": "Klick Tech",
      "type": "IT & Office Equipment",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Plug & Play",
      "High Speed Data",
      "Universal Compatibility"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-12",
    "title": "Multifunction Office Printer",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 180,
    "currency": "USD",
    "condition": "Brand New Sealed Box",
    "verified": false,
    "lastUpdated": "Today",
    "description": "High-yield all-in-one print, scan, and copy machine by Klick Tech. Eco-tank refill system offering ultra-low cost per printed page.",
    "image": "https://media.usetariads.com/business%20posts/Klick-Tech-Printer-Office-Equipment.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Klick-Tech-Printer-Office-Equipment.webp"
    ],
    "seller": {
      "name": "Klick Tech",
      "type": "IT & Office Equipment",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Print Scan Copy",
      "Wireless Wi-Fi Printing",
      "EcoTank Refills"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-13",
    "title": "JBL Wireless Headphones",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 50,
    "currency": "USD",
    "condition": "Brand New Sealed",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Pure Bass wireless over-ear Bluetooth headphones with long battery life from Massive Gadgets. Lightweight foldable design with hands-free calling.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-JBL-Headphones-03.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-JBL-Headphones-03.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "JBL Pure Bass",
      "Long Battery Life",
      "Hands-Free Mic"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-14",
    "title": "Business Laptop",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 450,
    "currency": "USD",
    "condition": "Clean Condition · Fast SSD",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Reliable slim business and study laptop from Massive Gadgets. Fast SSD storage, HD display, long battery life, and preloaded Windows 11.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-Laptop.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-Laptop.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "High Speed SSD",
      "HD Anti-Glare Display",
      "Original Charger"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-15",
    "title": "Smartphone 4G",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 100,
    "currency": "USD",
    "condition": "Brand New in Box",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Affordable 4G Android smartphone by Massive Gadgets. Dual SIM capability, long-lasting battery, dual camera, and crisp display.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-Mobile-Phone.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-Mobile-Phone.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Dual SIM 4G",
      "Long Life Battery",
      "Full Android Support"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-16",
    "title": "Orange iPhone",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 500,
    "currency": "USD",
    "condition": "Pristine Condition · 100% Battery",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Striking sunset orange edition Apple iPhone offered by Massive Gadgets. Super Retina XDR OLED display, cinema camera, and all-day battery.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-Orange-iPhone-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-Orange-iPhone-01.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Super Retina Display",
      "Face ID Unlocked",
      "Cinematic Video"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-17",
    "title": "Samsung Galaxy Phone",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 250,
    "currency": "USD",
    "condition": "Brand New Sealed Box",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Sleek Samsung Galaxy series smartphone from Massive Gadgets. Brilliant AMOLED display, multi-lens camera system, and fast charging.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-Samsung-Phone-02.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-Samsung-Phone-02.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "AMOLED Screen",
      "Multi-Lens Camera",
      "Fast Charging"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-18",
    "title": "Wireless Lapel Microphones",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "electronics",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 80,
    "currency": "USD",
    "condition": "Brand New Boxed",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Crystal-clear wireless dual clip-on lavalier microphones by Massive Gadgets. Ideal for content creation, interviews, and streaming.",
    "image": "https://media.usetariads.com/business%20posts/Massive-Gadgets-Wireless-Microphones-05.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Massive-Gadgets-Wireless-Microphones-05.webp"
    ],
    "seller": {
      "name": "Massive Gadgets",
      "type": "Gadgets & Electronics Store",
      "phone": "+263 77 397 4683",
      "whatsapp": "263773974683",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Noise Reduction",
      "Dual Microphones",
      "Lightning & Type-C"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-19",
    "title": "Electrical Wire Roll",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "building-supplies",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Graniteside",
    "price": 30,
    "currency": "USD",
    "condition": "100m Certified Copper",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Certified copper electrical single and twin-core conduit wire rolls by Praise Enterprises. Standards compliant for residential and commercial wiring.",
    "image": "https://media.usetariads.com/business%20posts/Praise-Enterprises-Electrical-Wire-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Praise-Enterprises-Electrical-Wire-01.webp"
    ],
    "seller": {
      "name": "Praise Enterprises",
      "type": "Electrical & Hardware Supplies",
      "phone": "+263 77 244 9746",
      "whatsapp": "263772449746",
      "location": "Graniteside, Harare"
    },
    "features": [
      "Pure Copper Core",
      "Flame Retardant Sheath",
      "100m Full Roll"
    ],
    "featured": true
  },
  {
    "id": "TAR-PRD-20",
    "title": "PVC Pipes and Fittings Bundle",
    "category": "products",
    "categoryLabel": "Products",
    "subType": "building-supplies",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Graniteside",
    "price": 25,
    "currency": "USD",
    "condition": "Heavy-Duty Standards",
    "verified": true,
    "lastUpdated": "Today",
    "description": "Durable high-pressure and drainage PVC pipes, elbows, tees, and couplings from Praise Enterprises. Perfect for plumbing, civil construction, and irrigation.",
    "image": "https://media.usetariads.com/business%20posts/Praise-Enterprises-PVC-Pipes-and-Fittings-01.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/Praise-Enterprises-PVC-Pipes-and-Fittings-01.webp"
    ],
    "seller": {
      "name": "Praise Enterprises",
      "type": "Electrical & Hardware Supplies",
      "phone": "+263 77 244 9746",
      "whatsapp": "263772449746",
      "location": "Graniteside, Harare"
    },
    "features": [
      "Pressure & Drain Rated",
      "UV & Chemical Resistant",
      "Full Assortment"
    ],
    "featured": true
  }
];

export const INITIAL_SERVICES = [
  {
    "id": "TAR-SRV-01",
    "title": "Large Format Banner Printing",
    "category": "services",
    "categoryLabel": "Services",
    "subType": "printing",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 15,
    "currency": "USD",
    "rateType": "Per square meter / item",
    "condition": "Custom Commercial Printing",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Vibrant high-resolution PVC banner and teardrop banner printing by CSISA Printing Services. Weatherproof inks suitable for indoor and outdoor display.",
    "image": "https://media.usetariads.com/business%20posts/CSISA-Printing-Services-Banner-Printing.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/CSISA-Printing-Services-Banner-Printing.webp"
    ],
    "seller": {
      "name": "CSISA Printing Services",
      "type": "Commercial Printer",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "UV Resistant Inks",
      "Heavy-Duty Eyelets",
      "Fast Turnaround"
    ],
    "featured": true
  },
  {
    "id": "TAR-SRV-02",
    "title": "Custom Printed Stationery",
    "category": "services",
    "categoryLabel": "Services",
    "subType": "printing",
    "country": "ZW",
    "countryName": "Zimbabwe",
    "location": "Harare",
    "suburb": "Harare CBD",
    "price": 10,
    "currency": "USD",
    "rateType": "Per order / package",
    "condition": "Custom Corporate Order",
    "verified": false,
    "lastUpdated": "Today",
    "description": "Professional corporate stationery including letterheads, NCR duplicate invoice books, folders, business cards, and brochures by CSISA Printing Services.",
    "image": "https://media.usetariads.com/business%20posts/CSISA-Printing-Services-Printed-Stationery.webp",
    "images": [
      "https://media.usetariads.com/business%20posts/CSISA-Printing-Services-Printed-Stationery.webp"
    ],
    "seller": {
      "name": "CSISA Printing Services",
      "type": "Commercial Printer",
      "phone": "",
      "whatsapp": "",
      "location": "Harare CBD, Zimbabwe"
    },
    "features": [
      "Full Color Offset",
      "Custom Layouts",
      "Bulk Volume Rates"
    ],
    "featured": true
  }
];

export const TariData = {
  USD_TO_ZIG_RATE: 27.5,
  LOCATIONS_DATA,

  // LOCATION ENGINE (City-First with Scalable Global Hierarchy)
  getSelectedLocation: function () {
    try {
      const stored = localStorage.getItem("tariads_selected_location");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name) return parsed;
      }
    } catch (e) {}

    // Default market: Harare, Zimbabwe
    return {
      id: "harare",
      name: "Harare",
      country: "ZW",
      countryName: "Zimbabwe",
      type: "city",
      area: ""
    };
  },

  getSelectedCity: function () {
    return this.getSelectedLocation().name || "Harare";
  },

  setSelectedLocation: function (loc) {
    if (!loc) return;
    try {
      localStorage.setItem("tariads_selected_location", JSON.stringify(loc));
      if (loc.country) {
        localStorage.setItem("tariads_country", loc.country);
      }
    } catch (e) {}
    window.dispatchEvent(
      new CustomEvent("tariads:location-changed", { detail: loc })
    );
    return loc;
  },

  setSelectedCity: function (name, country = "ZW", area = "", id = "") {
    const isAll = name === "All Zimbabwe" || name.startsWith("All ");
    const loc = {
      id: id || name.toLowerCase().replace(/[^a-z0-9]/g, "_"),
      name: name,
      country: country,
      countryName: country === "ZW" ? "Zimbabwe" : country === "ZA" ? "South Africa" : country === "UK" ? "United Kingdom" : country,
      type: isAll ? "country" : area ? "area" : "city",
      area: area || ""
    };
    return this.setSelectedLocation(loc);
  },

  searchLocations: function (query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results = [];
    const seen = new Set();

    // 1. Check Popular Cities
    if (Array.isArray(LOCATIONS_DATA.popularCities)) {
      for (const city of LOCATIONS_DATA.popularCities) {
        if (city.name.toLowerCase().includes(q)) {
          results.push({
            type: "city",
            id: city.id,
            name: city.name,
            country: city.country,
            countryName: city.countryName,
            subtitle: city.tag || `${city.countryName} City`
          });
          seen.add(city.name.toLowerCase());
        }
      }
    }

    // 2. Check Regions & Suburbs/Areas across all countries (preserving global scalability)
    for (const [countryCode, cities] of Object.entries(LOCATIONS_DATA.regions)) {
      const countryObj = LOCATIONS_DATA.countries.find((c) => c.code === countryCode);
      const countryName = countryObj ? countryObj.name : countryCode;

      for (const reg of cities) {
        // City match
        if (reg.name.toLowerCase().includes(q) && !seen.has(reg.name.toLowerCase())) {
          results.push({
            type: reg.isAll ? "country" : "city",
            id: reg.id,
            name: reg.name,
            country: reg.country,
            countryName: countryName,
            subtitle: reg.isAll ? `All listings in ${countryName}` : `${countryName} City`
          });
          seen.add(reg.name.toLowerCase());
        }

        // Suburb/Area match (e.g. Borrowdale -> Harare, Kumalo -> Bulawayo, Morningside -> Mutare)
        if (Array.isArray(reg.areas)) {
          for (const area of reg.areas) {
            if (area.toLowerCase().includes(q)) {
              results.push({
                type: "area",
                id: `${reg.id}_${area.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                name: area,
                city: reg.name,
                country: reg.country,
                countryName: countryName,
                subtitle: `${reg.name}, ${countryName}`
              });
            }
          }
        }
      }
    }

    return results;
  },

  // Get active country filter (backward compatible)
  getSelectedCountry: function () {
    try {
      const loc = this.getSelectedLocation();
      if (loc && loc.country) return loc.country;
      return localStorage.getItem("tariads_country") || "ZW";
    } catch (e) {
      return "ZW";
    }
  },

  setSelectedCountry: function (countryCode) {
    try {
      localStorage.setItem("tariads_country", countryCode.toUpperCase());
      const countryObj = LOCATIONS_DATA.countries.find((c) => c.code === countryCode.toUpperCase());
      if (countryObj) {
        this.setSelectedCity(countryObj.name, countryObj.code);
      }
    } catch (e) {}
  },

  // In-memory cache for ultra-responsive navigation
  _cache: {
    properties: null,
    vehicles: null,
    products: null,
    services: null
  },

  // PROPERTIES (Flagship)
  getProperties: function () {
    if (this._cache.properties) return this._cache.properties;
    try {
      const stored = localStorage.getItem("tariads_properties_v8");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._cache.properties = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read properties from localStorage:", e);
    }
    try {
      localStorage.setItem("tariads_properties_v8", JSON.stringify(INITIAL_PROPERTIES));
    } catch (e) {}
    this._cache.properties = INITIAL_PROPERTIES;
    return INITIAL_PROPERTIES;
  },

  getPropertyById: function (id) {
    return this.getProperties().find((p) => p.id === id) || null;
  },

  addProperty: function (newProp) {
    const list = this.getProperties();
    list.unshift(newProp);
    this._cache.properties = list;
    try {
      localStorage.setItem("tariads_properties_v8", JSON.stringify(list));
    } catch (e) {
      console.error("Storage error:", e);
    }
    return newProp;
  },

  // VEHICLES
  getVehicles: function () {
    if (this._cache.vehicles) return this._cache.vehicles;
    try {
      const stored = localStorage.getItem("tariads_vehicles_v8");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._cache.vehicles = parsed;
          return parsed;
        }
      }
    } catch (e) {}
    try {
      localStorage.setItem("tariads_vehicles_v8", JSON.stringify(INITIAL_VEHICLES));
    } catch (e) {}
    this._cache.vehicles = INITIAL_VEHICLES;
    return INITIAL_VEHICLES;
  },

  getVehicleById: function (id) {
    return this.getVehicles().find((v) => v.id === id) || null;
  },

  addVehicle: function (item) {
    const list = this.getVehicles();
    list.unshift(item);
    this._cache.vehicles = list;
    try {
      localStorage.setItem("tariads_vehicles_v8", JSON.stringify(list));
    } catch (e) {}
    return item;
  },

  // PRODUCTS
  getProducts: function () {
    if (this._cache.products) return this._cache.products;
    try {
      const stored = localStorage.getItem("tariads_products_v8");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._cache.products = parsed;
          return parsed;
        }
      }
    } catch (e) {}
    try {
      localStorage.setItem("tariads_products_v8", JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {}
    this._cache.products = INITIAL_PRODUCTS;
    return INITIAL_PRODUCTS;
  },

  getProductById: function (id) {
    return this.getProducts().find((p) => p.id === id) || null;
  },

  addProduct: function (item) {
    const list = this.getProducts();
    list.unshift(item);
    this._cache.products = list;
    try {
      localStorage.setItem("tariads_products_v8", JSON.stringify(list));
    } catch (e) {}
    return item;
  },

  // SERVICES
  getServices: function () {
    if (this._cache.services) return this._cache.services;
    try {
      const stored = localStorage.getItem("tariads_services_v8");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._cache.services = parsed;
          return parsed;
        }
      }
    } catch (e) {}
    try {
      localStorage.setItem("tariads_services_v8", JSON.stringify(INITIAL_SERVICES));
    } catch (e) {}
    this._cache.services = INITIAL_SERVICES;
    return INITIAL_SERVICES;
  },

  getServiceById: function (id) {
    return this.getServices().find((s) => s.id === id) || null;
  },

  addService: function (item) {
    const list = this.getServices();
    list.unshift(item);
    this._cache.services = list;
    try {
      localStorage.setItem("tariads_services_v8", JSON.stringify(list));
    } catch (e) {}
    return item;
  },

  // AGRICULTURE (Produce, livestock, seeds/fertilizers, tractors, irrigation, farming services)
  getAgriculture: function () {
    const products = this.getProducts().filter((p) => 
      p.category === "agriculture" || 
      p.category === "agri-supplies" || 
      p.category === "agri-equipment" || 
      p.tags?.includes("agriculture")
    );
    const services = this.getServices().filter((s) => 
      s.category === "agriculture" || 
      s.category === "farming" || 
      s.tags?.includes("agriculture")
    );
    return [...products, ...services];
  },

  // MINING (Cross-category discovery: Machinery, rock drills, safety PPE, slurry pumps, mining services)
  getMining: function () {
    const products = this.getProducts().filter((p) => 
      p.category === "mining-equipment" || 
      p.category === "mining-supplies" || 
      p.tags?.includes("mining")
    );
    const services = this.getServices().filter((s) => 
      s.category === "mining-services" || 
      s.tags?.includes("mining")
    );
    return [...products, ...services];
  },

  // UNIVERSAL ITEM GETTER (by ID)
  getItemById: function (id) {
    if (!id) return null;
    if (id.startsWith("TAR-PROP") || id.startsWith("PROP") || id.startsWith("TAR-HRE") || id.startsWith("TAR-BYO")) {
      return { item: this.getPropertyById(id), type: "property" };
    }
    if (id.startsWith("TAR-VEH") || id.startsWith("VEH")) {
      return { item: this.getVehicleById(id), type: "vehicle" };
    }
    if (id.startsWith("TAR-PRD") || id.startsWith("PRD")) {
      return { item: this.getProductById(id), type: "product" };
    }
    if (id.startsWith("TAR-SRV") || id.startsWith("SRV")) {
      return { item: this.getServiceById(id), type: "service" };
    }
    // Check all collections as fallback
    const prop = this.getPropertyById(id);
    if (prop) return { item: prop, type: "property" };
    const veh = this.getVehicleById(id);
    if (veh) return { item: veh, type: "vehicle" };
    const prd = this.getProductById(id);
    if (prd) return { item: prd, type: "product" };
    const srv = this.getServiceById(id);
    if (srv) return { item: srv, type: "service" };
    return null;
  },

  // ALL INVENTORY (All 30 active marketplace items across verticals)
  getAllInventory: function () {
    return [
      ...this.getProperties(),
      ...this.getVehicles(),
      ...this.getProducts(),
      ...this.getServices()
    ];
  },

  // Saved / Bookmarks (supports items of any type)
  getSavedIds: function () {
    try {
      const s = localStorage.getItem("tariads_saved_ids");
      return s ? JSON.parse(s) : [];
    } catch (e) {
      return [];
    }
  },

  toggleSave: function (id) {
    let ids = this.getSavedIds();
    const idx = ids.indexOf(id);
    let saved = false;
    if (idx > -1) {
      ids.splice(idx, 1);
      saved = false;
    } else {
      ids.push(id);
      saved = true;
    }
    try {
      localStorage.setItem("tariads_saved_ids", JSON.stringify(ids));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("tariads:saved-changed", { detail: { count: ids.length, id, saved } }));
    return saved;
  },

  isSaved: function (id) {
    return this.getSavedIds().includes(id);
  },

  // Viewing Requests
  getViewingRequests: function () {
    try {
      const v = localStorage.getItem("tariads_viewing_requests");
      return v ? JSON.parse(v) : [];
    } catch (e) {
      return [];
    }
  },

  saveViewingRequest: function (req) {
    const list = this.getViewingRequests();
    const newReq = {
      id: "VR-" + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: "Pending Landlord Confirmation",
      ...req
    };
    list.unshift(newReq);
    try {
      localStorage.setItem("tariads_viewing_requests", JSON.stringify(list));
    } catch (e) {}
    return newReq;
  },

  // Price Formatting
  formatPrice: function (amount, currency = "USD", period = "") {
    if (!amount && amount !== 0) return "Price on Request";
    const symbol = currency === "ZAR" ? "R" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
    let formatted;
    if (amount === 1 && currency === "USD") {
      formatted = "$1.00";
    } else if (Number(amount) % 1 !== 0) {
      formatted = symbol + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      formatted = symbol + Number(amount).toLocaleString("en-US");
    }
    if (period === "month") return `${formatted} / month`;
    if (period === "night") return `${formatted} / night`;
    return formatted;
  },

  formatZiGGuide: function (amountUsd, country = "ZW") {
    if (country !== "ZW" || !amountUsd) return "";
    const zig = Math.round(amountUsd * this.USD_TO_ZIG_RATE);
    return `≈ ZiG ${zig.toLocaleString("en-US")} (indicative guide)`;
  }
};

// Make globally accessible in browser environment
if (typeof window !== "undefined") {
  window.TariData = TariData;
}
