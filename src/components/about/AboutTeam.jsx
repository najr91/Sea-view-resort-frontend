const team = [
  { name: 'Elena Wright', role: 'General Manager' },
  { name: 'Marco Ruiz', role: 'Head Chef' },
  { name: 'Sara Kim', role: 'Guest Experience Lead' },
  { name: 'Jonas Müller', role: 'Wellness Director' },
  { name: 'John Doe', role: 'Front Desk Manager' },
];

export default function AboutTeam() {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <h2 className="text-2xl font-serif text-resort-olive mb-6">Our Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-resort-cream mb-3" />
              <div className="font-medium text-gray-900">{member.name}</div>
              <div className="text-sm text-resort-slate">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


