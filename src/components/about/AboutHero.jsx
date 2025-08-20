export default function AboutHero() {
  return (
    <section className="relative hero-standard w-full h-[80vh] flex items-center justify-center overflow-hidden">
     
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dokpk3c2l/video/upload/v1693098463/7820463-hd_1920_1080_25fps_hznclw.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      
      <div className="absolute inset-0 bg-black/35" />

      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-serif mb-4">Sobre nosotros</h1>
        <p className="max-w-2xl mx-auto text-resort-cream/90 text-sm md:text-base leading-relaxed">
          Conozca nuestra historia, nuestro compromiso con la hospitalidad excepcional y los valores que nos guían.
        </p>
      </div>
    </section>
  );
}
