// lib/Carousel.ts

// Define the type for a single carousel item
export interface CarouselItemData {
  id: number;
  imageUrl: string;
}

// Create and export the array of carousel items
export const carouselItems: CarouselItemData[] = [
  {
    id: 1,
    imageUrl: "https://res.cloudinary.com/ddhgvmdg9/video/upload/v1753536563/157657-815175893_aqnutz.mp4",
  },
  {
    id: 2,
    imageUrl: "https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753536967/happy-valentines-day-4615557_gkkbxm.jpg",
  },
  {
    id: 3,
    imageUrl: "https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753537559/ram-raja-vivah-ghar-shivpuri-city-shivpuri-hotels-wtuh21mf3w_jlgc6e.jpg",
  },
  {
    id: 4,
    imageUrl: "https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753538589/ChatGPT_Image_Jul_26_2025_07_32_53_PM_tvj9ln.png",
  },
  {
    id: 5,
    imageUrl: "https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753621506/Gemini_Generated_Image_i62sv1i62sv1i62s_oys6yz.png",
  },
];
