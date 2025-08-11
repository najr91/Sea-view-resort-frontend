export default function ContactMap() {
  return (
    <section className="bg-white">
      <div className="w-full h-[360px] md:h-[440px]">
        <iframe
          title="map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0277296077495!2d-99.16236192397388!3d19.41382084100139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3e2b2fd6a7%3A0xb3a4e9c5fb2a1a6!2sRoma%20Nte.%2C%2006700%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1700000000000"
        />
      </div>
    </section>
  );
}


