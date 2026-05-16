import Icon from "./Icons";

export default function About() {
  const team = [
    { image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=500&q=80", name: "Chef Emeka Obi", role: "Executive Chef", bio: "Afro-European technique, Paris training, Lagos soul." },
    { image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=80", name: "Chef Amara Nwosu", role: "Pastry Chef", bio: "Creates the desserts people quietly plan their whole meal around." },
    { image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80", name: "Tunde Adeyemi", role: "Restaurant Manager", bio: "Keeps service smooth from first greeting to last receipt." },
    { image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=500&q=80", name: "Chidinma Eze", role: "Beverage Lead", bio: "Pairs cocktails, wines, and zero-proof drinks with every plate." },
  ];

  const contactInfo = [
    { icon: "mapPin", label: "Location", value: "12 Adeola Odeku Street, Victoria Island, Lagos" },
    { icon: "phone", label: "Phone", value: "+234 801 234 5678" },
    { icon: "mail", label: "Email", value: "hello@savoria.ng" },
    { icon: "clock", label: "Hours", value: "Mon-Sun: 11am - 11pm" },
    { icon: "shield", label: "Reservations", value: "Private dining and same-day bookings available." },
    { icon: "leaf", label: "Sourcing", value: "Seasonal produce from trusted Nigerian farms." },
  ];

  return (
    <section className="about-section">
      <div className="about-hero">
        <div className="about-left">
          <span className="section-tag">Our Story</span>
          <h2>Contemporary Dining with a Lagos Point of View</h2>
          <p>Savoria began as a small bistro built around one idea: make global comfort food feel personal, generous, and beautifully presented.</p>
          <p>Our kitchen blends fine-dining technique with familiar Nigerian warmth, using local produce, clean plating, and a menu that works just as well for a special night out as it does for a careful delivery order.</p>
          <p>Every service is designed around speed, hospitality, and flavor that still lands after the first photo is taken.</p>
        </div>
        <div className="about-right">
          <img className="about-img-card tall" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85" alt="Chef plating a dish" />
          <img className="about-img-card" src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=85" alt="Restaurant dining room" />
          <img className="about-img-card" src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=85" alt="Prepared restaurant food" />
        </div>
      </div>

      <div className="info-section">
        <span className="section-tag">Find Us</span>
        <h3 className="section-title align-left">Restaurant Information</h3>
        <div className="info-grid">
          {contactInfo.map((info) => (
            <div key={info.label} className="info-item">
              <div className="info-icon"><Icon name={info.icon} size={24} /></div>
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <span className="section-tag">Our Values</span>
        <h3 className="section-title align-left">What We Stand For</h3>
        <div className="info-grid">
          {[
            { icon: "leaf", title: "Farm to Table", desc: "Seasonal produce, small-batch sauces, and ingredients chosen for freshness first." },
            { icon: "users", title: "Community First", desc: "Local hiring, local suppliers, and hospitality that feels human." },
            { icon: "shield", title: "Responsible Dining", desc: "Compostable delivery packaging and lower-waste kitchen systems." },
          ].map((v) => (
            <div key={v.title} className="info-item">
              <div className="info-icon"><Icon name={v.icon} size={24} /></div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="team-section">
        <div className="section-header">
          <span className="section-tag">The Team</span>
          <h2 className="section-title">Faces Behind the Flavour</h2>
          <p className="section-subtitle">A focused crew building a restaurant experience that feels premium without feeling cold.</p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article key={member.name} className="team-card">
              <img className="team-avatar" src={member.image} alt={member.name} />
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
