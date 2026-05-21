const dishImages = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  juice: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80',
  vegan: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  peruvian: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?auto=format&fit=crop&w=900&q=80',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
  steak: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
  cuban: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aecb?auto=format&fit=crop&w=900&q=80',
  falafel: 'https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?auto=format&fit=crop&w=900&q=80',
  ramen: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=80',
  greek: 'https://images.unsplash.com/photo-1606735584785-1848fdcaea57?auto=format&fit=crop&w=900&q=80',
  indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80'
};

const restaurants = [
  {
    name: 'Papa Johns',
    website: 'https://locations.papajohns.com/united-states/nj/07310/jersey-city/125-18th-street/pizza-near-me',
    category: 'Pizza',
    address: '125 18th Street',
    city: 'Jersey City',
    state: 'NJ',
    zip: '07310',
    latitude: 40.732628,
    longitude: -74.037628,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Papa_johns_i92i1b.webp',
    menu: [
      ['Pepperoni Pizza', '14.99', dishImages.pizza, 'Classic hand-tossed pizza with pepperoni, mozzarella, and tomato sauce.'],
      ['Epic Stuffed Crust Pizza', '18.99', dishImages.pizza, 'Cheese-stuffed crust with a bold sauce base and melty mozzarella.'],
      ['Garlic Parmesan Breadsticks', '6.99', dishImages.pizza, 'Warm breadsticks brushed with garlic parmesan seasoning.'],
      ['BBQ Chicken Bacon Pizza', '17.99', dishImages.pizza, 'Grilled chicken, smoky bacon, barbecue sauce, and cheese.']
    ]
  },
  {
    name: 'Vibez Juice & Vegan Cafe',
    website: 'https://www.vibezjuicecafe.com/',
    category: 'Juice',
    address: '83 Hutton St',
    city: 'Jersey City',
    state: 'NJ',
    zip: '07307',
    latitude: 40.7445109,
    longitude: -74.0514578,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Vibez_oqkocy.jpg',
    menu: [
      ['Vibez Detox Juice', '8.95', dishImages.juice, 'Cold-pressed greens, apple, lemon, ginger, and a clean citrus finish.'],
      ['Acai Energy Bowl', '11.95', dishImages.vegan, 'Acai blend with banana, berries, granola, coconut, and agave.'],
      ['Vegan Chopped Cheese', '13.95', dishImages.vegan, 'Plant-based chopped patty, vegan cheese, lettuce, tomato, and sauce.'],
      ['Jerk Jackfruit Wrap', '12.95', dishImages.vegan, 'Spiced jackfruit with greens, peppers, and creamy vegan dressing.']
    ]
  },
  {
    name: 'El Gordo',
    website: 'https://www.elgordoeats.com/',
    category: 'Peruvian',
    address: '291 Central Ave',
    city: 'Jersey City',
    state: 'NJ',
    zip: '07307',
    latitude: 40.7450379,
    longitude: -74.0524309,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Elgordo_afz6p2.png',
    menu: [
      ['Lomo Saltado', '21.00', dishImages.peruvian, 'Stir-fried steak with onions, tomatoes, fries, and white rice.'],
      ['Pollo A La Brasa', '17.00', dishImages.peruvian, 'Peruvian rotisserie chicken with green sauce and a side.'],
      ['Tallarin Verde', '18.00', dishImages.peruvian, 'Pesto-style Peruvian noodles finished with steak or chicken.'],
      ['Ceviche Clasico', '19.00', dishImages.peruvian, 'Citrus-marinated fish with red onion, cilantro, corn, and sweet potato.']
    ]
  },
  {
    name: 'The Franklin',
    website: 'https://thefranklinjc.com/',
    category: 'Italian',
    address: '159 New York Ave',
    city: 'Jersey City',
    state: 'NJ',
    zip: '07307',
    latitude: 40.7417174,
    longitude: -74.0491971,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/the_franklin_vxsd0w.png',
    menu: [
      ['Rigatoni Vodka', '18.00', dishImages.pasta, 'Rigatoni tossed in creamy tomato vodka sauce with parmesan.'],
      ['Chicken Milanese', '22.00', dishImages.pasta, 'Crispy chicken cutlet with arugula, lemon, and shaved cheese.'],
      ['Franklin Burger', '17.00', dishImages.steak, 'House burger with cheese, pickles, and fries.'],
      ['Burrata Toast', '15.00', dishImages.pasta, 'Creamy burrata, tomato, basil, and grilled bread.']
    ]
  },
  {
    name: "Dino & Harry's Steakhouse",
    website: 'https://dinoandharrys.com/',
    category: 'Steak',
    address: '163 14th St',
    city: 'Hoboken',
    state: 'NJ',
    zip: '07030',
    latitude: 40.753252,
    longitude: -74.026031,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Dino_umt9i6.jpg',
    menu: [
      ['Filet Mignon', '52.00', dishImages.steak, 'Classic steakhouse filet with a charred crust and tender center.'],
      ['New York Sirloin', '48.00', dishImages.steak, 'Dry-aged style sirloin served with steakhouse seasoning.'],
      ['Jumbo Lump Crab Cake', '24.00', dishImages.steak, 'Golden crab cake with lemon and house sauce.'],
      ['Creamed Spinach', '12.00', dishImages.steak, 'Rich steakhouse spinach with cream and parmesan.']
    ]
  },
  {
    name: 'La Isla',
    website: 'https://laislarestaurant.com/',
    category: 'Cuban',
    address: '104 Washington St',
    city: 'Hoboken',
    state: 'NJ',
    zip: '07030',
    latitude: 40.737041,
    longitude: -74.030923,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/la_isla_ex2s7b.jpg',
    menu: [
      ['Ropa Vieja', '19.00', dishImages.cuban, 'Braised shredded beef with peppers, onions, rice, and beans.'],
      ['Lechon Asado', '18.00', dishImages.cuban, 'Slow-roasted pork with mojo, sweet plantains, and rice.'],
      ['Cubano Sandwich', '15.00', dishImages.cuban, 'Roast pork, ham, Swiss, pickles, and mustard on pressed bread.'],
      ['Tostones Rellenos', '12.00', dishImages.cuban, 'Crisp plantain cups with savory filling and garlic sauce.']
    ]
  },
  {
    name: 'Ali Baba Restaurant',
    website: 'https://www.hobokenalibaba.com/',
    category: 'Middle Eastern',
    address: '912 Washington St Ste 1',
    city: 'Hoboken',
    state: 'NJ',
    zip: '07030',
    latitude: 40.7477496,
    longitude: -74.0302254,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476427/Ali_baba_yymx03.png',
    menu: [
      ['Chicken Shawarma Platter', '17.95', dishImages.falafel, 'Spiced chicken shawarma with rice, salad, hummus, and pita.'],
      ['Falafel Sandwich', '9.95', dishImages.falafel, 'Falafel, tahini, lettuce, tomato, and pickles wrapped in pita.'],
      ['Mixed Grill', '23.95', dishImages.falafel, 'Skewered meats with rice, grilled vegetables, hummus, and salad.'],
      ['Baba Ghanoush', '8.95', dishImages.falafel, 'Smoky eggplant dip with olive oil and warm pita.']
    ]
  },
  {
    name: 'South Street Fish & Ramen Co.',
    website: 'https://southstreet.co/',
    category: 'Japanese',
    address: '219 Washington St',
    city: 'Hoboken',
    state: 'NJ',
    zip: '07030',
    latitude: 40.7393196,
    longitude: -74.032313,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/South_street_bnby9d.jpg',
    menu: [
      ['Tonkotsu Ramen', '16.95', dishImages.ramen, 'Pork broth ramen with noodles, chashu, egg, scallions, and bamboo.'],
      ['Spicy Miso Ramen', '16.95', dishImages.ramen, 'Miso broth with chili, noodles, vegetables, egg, and scallions.'],
      ['Salmon Poke Bowl', '17.95', dishImages.ramen, 'Salmon, rice, cucumber, edamame, avocado, and house sauce.'],
      ['Shrimp Tempura Burrito', '15.95', dishImages.ramen, 'Sushi burrito with shrimp tempura, rice, greens, and spicy mayo.']
    ]
  },
  {
    name: 'GreekTown',
    website: 'https://greektown-hoboken.com/',
    category: 'Greek',
    address: '86 Garden St',
    city: 'Hoboken',
    state: 'NJ',
    zip: '07030',
    latitude: 40.7369868,
    longitude: -74.03086,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617477180/greek_lizbsc.jpg',
    menu: [
      ['Chicken Gyro Platter', '16.95', dishImages.greek, 'Chicken gyro with rice, Greek salad, pita, and tzatziki.'],
      ['Pork Souvlaki Pita', '11.95', dishImages.greek, 'Pork skewers wrapped with tomato, onion, fries, and tzatziki.'],
      ['Spanakopita', '8.95', dishImages.greek, 'Flaky spinach and feta pie baked until crisp.'],
      ['Greek Salad', '12.95', dishImages.greek, 'Romaine, tomato, cucumber, olives, feta, peppers, and vinaigrette.']
    ]
  },
  {
    name: 'Chef Of India',
    website: 'https://www.chefofindia.com/',
    category: 'Indian',
    address: '324 Central Ave',
    city: 'Jersey City',
    state: 'NJ',
    zip: '07307',
    latitude: 40.7459498,
    longitude: -74.0512955,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/chef_jhbmob.jpg',
    menu: [
      ['Chicken Tikka Masala', '16.95', dishImages.indian, 'Tandoori chicken in creamy tomato masala sauce.'],
      ['Saag Paneer', '15.95', dishImages.indian, 'Paneer cubes simmered with spiced spinach and aromatics.'],
      ['Lamb Vindaloo', '18.95', dishImages.indian, 'Lamb in a spicy tangy curry with potatoes and warm spices.'],
      ['Garlic Naan', '4.95', dishImages.indian, 'Tandoor-baked naan brushed with garlic and herbs.']
    ]
  },
  {
    name: 'Karma Kafe',
    website: 'https://www.karmakafe.com/',
    category: 'Indian',
    address: '505 Washington St',
    city: 'Hoboken',
    state: 'NJ',
    zip: '07030',
    latitude: 40.7423915,
    longitude: -74.0313059,
    thumbnail: 'https://res.cloudinary.com/helpinghands101/image/upload/v1617476426/Karma_ejgadz.jpg',
    menu: [
      ['Butter Chicken', '17.95', dishImages.indian, 'Tandoori chicken simmered in buttery tomato cream sauce.'],
      ['Paneer Tikka Masala', '16.95', dishImages.indian, 'Paneer in a rich masala sauce with fenugreek and cream.'],
      ['Vegetable Samosa', '7.95', dishImages.indian, 'Crisp pastry stuffed with potatoes, peas, and spices.'],
      ['Chicken Biryani', '18.95', dishImages.indian, 'Basmati rice layered with chicken, saffron, herbs, and spices.']
    ]
  }
];

module.exports = restaurants;
