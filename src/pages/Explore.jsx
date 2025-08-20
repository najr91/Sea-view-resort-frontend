import { useState, useEffect } from "react";
import ExploreHero from "../components/explore/ExploreHero.jsx";


import gym1 from "../assets/AreasComunes/Gym/pexels-rdne-8611937.jpg";
import gym2 from "../assets/AreasComunes/Gym/pexels-willpicturethis-1954524.jpg";
import gym3 from "../assets/AreasComunes/Gym/pexels-victorfreitas-703016.jpg";
import gym4 from "../assets/AreasComunes/Gym/pexels-eduardo-cano-photo-co-3550159-7811530.jpg";

import jard1 from "../assets/AreasComunes/Jardines/pexels-siddanth-sawant-178759136-33259642.jpg";
import jard2 from "../assets/AreasComunes/Jardines/pexels-siddanth-sawant-178759136-33259643.jpg";
import jard3 from "../assets/AreasComunes/Jardines/pexels-siddanth-sawant-178759136-33259655.jpg";
import jard4 from "../assets/AreasComunes/Jardines/pexels-siddanth-sawant-178759136-33259641.jpg";

import pool1 from "../assets/AreasComunes/Pileta-Playa/pexels-geek-wandering-420882909-29289153.jpg";
import pool2 from "../assets/AreasComunes/Pileta-Playa/pexels-thorsten-technoman-109353-338504.jpg";
import pool3 from "../assets/AreasComunes/Pileta-Playa/pexels-wewe-yang-2383099-4025955.jpg";
import pool4 from "../assets/AreasComunes/Pileta-Playa/pexels-gapeppy1-2373201.jpg";

import rest1 from "../assets/AreasComunes/Restaurantes/pexels-naimbic-2290753.jpg";
import rest2 from "../assets/AreasComunes/Restaurantes/recortada-mujer-que-toma-el-bocado-de-la-tabla-buffet.jpg";
import rest3 from "../assets/AreasComunes/Restaurantes/pexels-pixabay-262978.jpg";
import rest4 from "../assets/AreasComunes/Restaurantes/pexels-helenalopes-696218.jpg";

import spa1 from "../assets/AreasComunes/Spa/pexels-pixabay-269110.jpg";
import spa2 from "../assets/AreasComunes/Spa/pexels-pixabay-161737.jpg";
import spa3 from "../assets/AreasComunes/Spa/pexels-olly-3757952.jpg";
import spa4 from "../assets/AreasComunes/Spa/pexels-jonathanborba-3316923.jpg";


const sections = [
  {
    title: "Playa y Pileta",
    images: [pool1, pool2, pool3, pool4],
    caption: "Disfrutá del sol y la brisa junto al mar"
  },
  {
    title: "Jardines",
    images: [jard1, jard2, jard3, jard4],
    caption: "Conectá con la naturaleza en nuestros jardines"
  },
  {
    title: "Restaurantes",
    images: [rest1, rest2, rest3, rest4],
    caption: "Sabores únicos que despiertan tus sentidos"
  },
  {
    title: "Spa",
    images: [spa1, spa2, spa3, spa4],
    caption: "Relajate con nuestros masajes y tratamientos"
  },
  {
    title: "Gym",
    images: [gym1, gym2, gym3, gym4],
    caption: "Mantente en forma con instalaciones de primer nivel"
  },
];

function ImageSlider({ images, caption }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={caption}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center px-4">
        <p className="text-white text-lg md:text-2xl font-medium drop-shadow-md text-center">
          {caption}
        </p>
      </div>
    </div>
  );
}

export default function Explore() {
  return (
    <div className="bg-white">

      <ExploreHero />


      <section className="py-10 space-y-16">
        <div className="container mx-auto px-4 space-y-12">
          {sections.map((sec) => (
            <div key={sec.title} className="space-y-4">
              <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {sec.title}
              </h2>
              <ImageSlider images={sec.images} caption={sec.caption} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
