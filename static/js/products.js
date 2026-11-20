
// Jewellery Categories:
// rings, necklaces, earrings, bracelets, anklets, nose-rings, sets

// Product prices are placeholders. Edit them to match your actual prices.

const PRODUCTS = [

  // =========================
  // RINGS
  // =========================

  {
    id: 1,
    name: "Classic Ring",
    category: "rings",
    price: 2500,
    image: "images/rings.jpg",
    description: "A timeless ring designed to be worn every day."
  },
  {
    id: 2,
    name: "Carat Diamond Ring",
    category: "rings",
    price: 8500,
    image: "images/carat diamond ring.jpg",
    description: "A sparkling statement ring for your special moments."
  },
  {
    id: 12,
    name: "Classic Gold Rings",
    category: "rings",
    price: 3000,
    image: "images/ring.jpg",
    description: "Elegant gold rings with a timeless design."
  },
  {
    id: 13,
    name: "Diamond Statement Ring",
    category: "rings",
    price: 5500,
    image: "images/ring1.jpg",
    description: "A beautiful statement ring with a sparkling centrepiece."
  },
  {
    id: 14,
    name: "Steel Ring Collection",
    category: "rings",
    price: 2800,
    image: "images/Steel Rings.jpg",
    description: "Stylish rings designed to complement your everyday look."
  },
  {
    id: 15,
    name: "Wedding Rings",
    category: "rings",
    price: 6000,
    image: "images/Wedding Rings.jpg",
    description: "Beautiful matching rings for meaningful occasions."
  },

  // =========================
  // NECKLACES
  // =========================

  {
    id: 3,
    name: "Elegant Necklace",
    category: "necklaces",
    price: 3800,
    image: "images/necklace.jpg",
    description: "A delicate necklace that complements any outfit."
  },
  {
    id: 4,
    name: "Signature Necklace",
    category: "necklaces",
    price: 4500,
    image: "images/Van cleef.jpg",
    description: "A refined necklace that adds a touch of luxury."
  },
  {
    id: 16,
    name: "Charm Necklace",
    category: "necklaces",
    price: 3200,
    image: "images/Charm Necklace.jpg",
    description: "A delicate gold necklace with beautiful decorative charms."
  },
  {
    id: 17,
    name: "Emerald Necklace",
    category: "necklaces",
    price: 4800,
    image: "images/necklace1.jpg",
    description: "A striking necklace featuring elegant green accents."
  },
  {
    id: 18,
    name: "Layered Gold Necklace",
    category: "necklaces",
    price: 5200,
    image: "images/necklace2.jpg",
    description: "A layered necklace for a sophisticated look."
  },
  {
    id: 19,
    name: "Pendant Necklace",
    category: "necklaces",
    price: 3500,
    image: "images/necklace3.jpg",
    description: "A delicate pendant necklace for everyday elegance."
  },
  {
    id: 20,
    name: "Gold Statement Necklace",
    category: "necklaces",
    price: 4200,
    image: "images/necklace4.jpg",
    description: "A beautiful statement necklace with a golden finish."
  },

  // =========================
  // EARRINGS
  // =========================

  {
    id: 5,
    name: "Moana Earrings",
    category: "earrings",
    price: 1800,
    image: "images/moana earrings.jpg",
    description: "Graceful earrings that catch the light."
  },
 
  {
    id: 22,
    name: "Emerald Earrings",
    category: "earrings",
    price: 2800,
    image: "images/earring4.jpg",
    description: "Beautiful earrings with rich green accents."
  },
  {
    id: 23,
    name: "Gold Hoop Earrings",
    category: "earrings",
    price: 1900,
    image: "images/earrings 5.jpg",
    description: "Classic gold hoops that never go out of style."
  },
  {
    id: 24,
    name: "Flower Petal Earrings",
    category: "earrings",
    price: 2500,
    image: "images/Flower Petal.jpg",
    description: "Floral-inspired earrings with a delicate finish."
  },
  {
    id: 25,
    name: "Glitter Gold Earrings",
    category: "earrings",
    price: 2300,
    image: "images/Glitter Gold.jpg",
    description: "Golden statement earrings for special occasions."
  },
  {
    id: 26,
    name: "Gold Knot Earrings",
    category: "earrings",
    price: 2100,
    image: "images/Gold Knot.jpg",
    description: "Stylish knot earrings with a polished golden finish."
  },
  {
    id: 27,
    name: "Golden Drop Earrings",
    category: "earrings",
    price: 2400,
    image: "images/golden earrings.jpg",
    description: "Elegant gold drop earrings for a refined look."
  },
  {
    id: 28,
    name: "Leaf Dangle Earrings",
    category: "earrings",
    price: 2600,
    image: "images/Leaf Dangle Earrings.jpg",
    description: "Nature-inspired earrings with a graceful design."
  },
  {
    id: 29,
    name: "Pearl Drop Earrings",
    category: "earrings",
    price: 2200,
    image: "images/Pearl Drop Earrings.jpg",
    description: "Beautiful pearl drops for timeless elegance."
  },

  // =========================
  // BRACELETS
  // =========================

  {
    id: 6,
    name: "Classic Bracelet",
    category: "bracelets",
    price: 2200,
    image: "images/bracelet.jpg",
    description: "A simple bracelet that suits any style."
  },
  {
    id: 7,
    name: "Gold Bangles",
    category: "bracelets",
    price: 3200,
    image: "images/bangles.jpg",
    description: "Beautiful bangles to stack or wear on their own."
  },
  {
    id: 30,
    name: "Aqua Blue Bracelet",
    category: "bracelets",
    price: 2800,
    image: "images/Aqua Blue.jpg",
    description: "A colourful jewellery piece with beautiful blue accents."
  },
  {
    id: 31,
    name: "Bloom Bracelet",
    category: "bracelets",
    price: 2000,
    image: "images/Bloom Bracelet.jpg",
    description: "A charming bracelet with delicate floral details."
  },
  {
    id: 32,
    name: "Elegant Bracelet",
    category: "bracelets",
    price: 2300,
    image: "images/bracelet1.jpg",
    description: "A refined bracelet for everyday styling."
  },
  {
    id: 33,
    name: "Charm Bracelet",
    category: "bracelets",
    price: 2500,
    image: "images/Charm Bracelet.jpg",
    description: "A playful bracelet featuring decorative charms."
  },
  {
    id: 34,
    name: "Chunky Gold Bracelet",
    category: "bracelets",
    price: 3500,
    image: "images/Chunky Bracelet.jpg",
    description: "A bold bracelet that makes a stylish statement."
  },
  {
    id: 35,
    name: "Greek Key Bracelet",
    category: "bracelets",
    price: 3000,
    image: "images/Greek key bracelet.jpg",
    description: "A distinctive bracelet with a classic geometric design."
  },
  {
    id: 36,
    name: "Pulsera Gold Bangle",
    category: "bracelets",
    price: 2800,
    image: "images/Pulsera.jpg",
    description: "A beautiful gold bangle for a polished finish."
  },

  // =========================
  // ANKLETS
  // =========================

  {
    id: 8,
    name: "Elegant Anklet",
    category: "anklets",
    price: 1500,
    image: "images/anklet.jpg",
    description: "A dainty anklet for everyday elegance."
  },
  {
    id: 37,
    name: "Gold Chain Anklet",
    category: "anklets",
    price: 1700,
    image: "images/anklet 1.jpg",
    description: "A delicate gold chain anklet."
  },
  {
    id: 38,
    name: "Beautiful Floral Anklet",
    category: "anklets",
    price: 2200,
    image: "images/Beautiful anklets.jpg",
    description: "A charming anklet with floral-inspired details."
  },
  {
    id: 39,
    name: "Hollow-Out Anklet",
    category: "anklets",
    price: 1800,
    image: "images/Hollow-out.jpg",
    description: "A stylish anklet with a delicate openwork design."
  },
  {
    id: 40,
    name: "Round Anklet",
    category: "anklets",
    price: 1600,
    image: "images/Anklet2.jpg",
    description: "A lovely anklet for a subtle touch of elegance."
  },

  // =========================
  // NOSE RINGS
  // =========================

  {
    id: 9,
    name: "Nose Ring",
    category: "nose-rings",
    price: 800,
    image: "images/nose ring.jpg",
    description: "A subtle sparkle for your personal style."
  },
  {
    id: 41,
    name: "Gold Nose Stud",
    category: "nose-rings",
    price: 900,
    image: "images/nosering1.jpg",
    description: "A delicate nose stud with a beautiful golden finish."
  },
  {
    id: 42,
    name: "Nose Hoop",
    category: "nose-rings",
    price: 1000,
    image: "images/Ring Hoop.jpg",
    description: "A simple nose hoop for a stylish everyday look."
  },

  // =========================
  // JEWELLERY SETS
  // =========================

  {
    id: 10,
    name: "Hand Jewellery Set",
    category: "sets",
    price: 3500,
    image: "images/hand set.jpg",
    description: "A matching set made to be worn together."
  },
  {
    id: 11,
    name: "Watch Set",
    category: "sets",
    price: 6500,
    image: "images/watch set.jpg",
    description: "A watch with matching pieces, ready to gift."
  },
  {
    id: 43,
    name: "Diamond Jewellery Set",
    category: "sets",
    price: 7500,
    image: "images/Amazon.jpg",
    description: "A beautiful coordinated jewellery set for special occasions."
  },
  {
    id: 44,
    name: "Bridal Jewellery Set",
    category: "sets",
    price: 9500,
    image: "images/Bridal Jewelry.jpg",
    description: "An elegant jewellery set for unforgettable celebrations."
  },
  {
    id: 45,
    name: "Floral Necklace Set",
    category: "sets",
    price: 5800,
    image: "images/Floral Necklace Set.jpg",
    description: "A floral-inspired matching necklace and earrings set."
  },
  {
    id: 46,
    name: "Golden Jewellery Set",
    category: "sets",
    price: 6200,
    image: "images/set1.jpg",
    description: "A coordinated golden jewellery set for elegant occasions."
  },
  {
    id: 47,
    name: "Emerald Jewellery Set",
    category: "sets",
    price: 7000,
    image: "images/set2.jpg",
    description: "A beautiful coordinated set with emerald-inspired details."
  }

];
