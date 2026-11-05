window.CYRIL = {
  phone: '945-344-4580',
  tel: 'tel:+19453444580',
  cities: [
    { slug: 'forney', name: 'Forney', near: ['mesquite', 'terrell', 'crandall'], projects: true, reviews: true,
      intro: 'Our home base. Garage doors, faux wood blinds, patio screens, media walls and Christmas lights, plus the smaller repairs in between.',
      see: '[CYRIL: add real local detail — which Forney neighborhoods you work in most, what the homes are like (age, builders, garage sizes), and which jobs Forney homeowners ask for first.]' },
    { slug: 'mesquite', name: 'Mesquite', near: ['sunnyvale', 'garland', 'forney'], projects: false, reviews: false,
      intro: 'Garage door repairs and new doors, faux wood blinds and patio screens for Mesquite homes. One call sets the day.',
      see: '[CYRIL: add real local detail — the Mesquite areas you work in, older vs. newer homes you see there, and the most common Mesquite requests.]' },
    { slug: 'sunnyvale', name: 'Sunnyvale', near: ['mesquite', 'forney', 'garland'], projects: false, reviews: false,
      intro: 'Media walls, faux wood blinds and garage doors for Sunnyvale homeowners. Tell us what you have in mind and we’ll set a time.',
      see: '[CYRIL: add real local detail — Sunnyvale neighborhoods, lot and home sizes you see, and what Sunnyvale customers usually call about.]' },
    { slug: 'rockwall', name: 'Rockwall', near: ['garland', 'forney', 'mesquite'], projects: false, reviews: false,
      intro: 'Patio screens, garage doors and Christmas lights in Rockwall. Travel isn’t an issue. Call and we’ll get you on the schedule.',
      see: '[CYRIL: add real local detail — Rockwall areas you work in, lake-side vs. in-town homes, and the jobs Rockwall homeowners ask for most.]' },
    { slug: 'terrell', name: 'Terrell', near: ['forney', 'crandall'], projects: false, reviews: false,
      intro: 'Garage doors, blinds and handyman repairs in Terrell. Scheduling is one phone call.',
      see: '[CYRIL: add real local detail — Terrell neighborhoods, the age of homes you see there, and common Terrell requests.]' },
    { slug: 'crandall', name: 'Crandall', near: ['forney', 'terrell'], projects: false, reviews: false,
      intro: 'From a new garage door opener to a full accent wall, we work in Crandall homes. Call to set a time.',
      see: '[CYRIL: add real local detail — Crandall subdivisions you work in, what the homes are like, and what Crandall customers call about.]' },
    { slug: 'garland', name: 'Garland', near: ['mesquite', 'sunnyvale', 'rockwall'], projects: false, reviews: false,
      intro: 'Now serving Garland: garage doors, blinds, patio screens, media walls and Christmas lights. Same crew, same phone number.',
      see: '[CYRIL: add real local detail — the Garland areas you cover, typical home age there, and the first Garland jobs you’ve done.]' },
    { slug: 'frisco', name: 'Frisco', near: ['garland', 'rockwall'], projects: false, reviews: false,
      intro: 'Now serving Frisco. The same five specialties, booked with one phone call.',
      see: '[CYRIL: add real local detail — the Frisco neighborhoods you work in, newer-build details you see, and what Frisco customers ask for.]' }
  ],
  services: [
    { slug: 'garage-door-repair-installation', name: 'Garage doors', long: 'Garage Door Repair & Installation',
      promise: 'New garage doors, openers, springs and repairs, scheduled with one phone call.',
      slot: 'garage door install',
      jobs: [
        { t: 'New doors', d: 'Measured, supplied and installed. [CONFIRM door styles and brands offered]' },
        { t: 'Openers', d: 'New openers and replacements on an existing door.' },
        { t: 'Springs', d: 'Broken or worn springs replaced so the door lifts the way it should.' },
        { t: 'Repairs', d: 'Off-track doors, noisy rollers, damaged panels and the rest.' }
      ],
      faqs: [
        { q: 'Do you repair broken springs?', a: 'Yes. Spring replacement is one of the jobs we do most. [CONFIRM same-day availability]' },
        { q: 'Can you put a new opener on my existing door?', a: '[CONFIRM] Usually, yes. Tell us the door on the phone and we’ll let you know.' },
        { q: 'Do you haul away the old door?', a: '[CONFIRM haul-away policy]' }
      ] },
    { slug: 'faux-wood-blinds', name: 'Faux wood blinds', long: 'Faux Wood Blinds',
      promise: 'Faux wood blinds, measured and installed in your home.',
      slot: 'blinds in a window',
      jobs: [
        { t: 'Measured', d: 'We measure every window ourselves so the blinds fit the first time.' },
        { t: 'Installed', d: 'Mounted, leveled and checked before we leave.' },
        { t: 'One window or the whole house', d: '[CONFIRM] Single rooms or every window at once.' }
      ],
      faqs: [
        { q: 'Do you measure the windows?', a: 'Yes. We measure and install. [CONFIRM]' },
        { q: 'Can you do the whole house at once?', a: '[CONFIRM]' },
        { q: 'Where do the blinds come from?', a: '[CONFIRM supplier / brands]' }
      ] },
    { slug: 'motorized-retractable-patio-screens', name: 'Patio screens', long: 'Motorized & Retractable Patio Screens',
      promise: 'Motorized and retractable patio screens, fitted to your patio.',
      slot: 'patio screen lowered',
      jobs: [
        { t: 'Motorized screens', d: 'Raise and lower with a switch or remote. [CONFIRM controls offered]' },
        { t: 'Retractable screens', d: 'Roll away when you don’t need them, come down when you do.' }
      ],
      faqs: [
        { q: 'What’s the difference between motorized and retractable?', a: 'Motorized screens raise and lower with a motor. Retractable screens roll up out of sight by hand. [CONFIRM options offered]' },
        { q: 'Do motorized screens need an outlet nearby?', a: '[CONFIRM power requirements]' },
        { q: 'Will screens fit my patio?', a: '[CONFIRM] Call and describe the patio, or send photos with a quote request.' }
      ] },
    { slug: 'media-walls-accent-walls', name: 'Media & accent walls', long: 'Media Walls & Accent Walls',
      promise: 'Slat walls, panel walls and built-ins, designed with you and built in place.',
      slot: 'media wall, finished',
      jobs: [
        { t: 'Slat walls', d: 'Vertical slat walls for living rooms, offices and entries.' },
        { t: 'Panel walls', d: 'Panel and trim accent walls, painted or stained.' },
        { t: 'Built-ins', d: 'Media walls and built-in shelving around the TV. [CONFIRM]' }
      ],
      faqs: [
        { q: 'What styles do you build?', a: 'Slat walls, panel walls and built-ins. [CONFIRM materials]' },
        { q: 'Can you mount the TV and hide the wires?', a: '[CONFIRM]' },
        { q: 'How long does a media wall take?', a: '[CONFIRM typical timeline]' }
      ] },
    { slug: 'christmas-light-installation', name: 'Christmas lights', long: 'Christmas Light Installation',
      promise: 'Christmas lights designed, hung, maintained through the season and taken down.',
      slot: 'house lit at night',
      jobs: [
        { t: 'Design', d: 'We walk the house with you and plan where the lights go: roofline, trees, windows, walkway. [CONFIRM]' },
        { t: 'Install', d: 'Hung by us, so you stay off the ladder.' },
        { t: 'Maintenance', d: 'A strand goes out mid-season? Call and we’ll fix it. [CONFIRM terms]' },
        { t: 'Takedown', d: 'After the season we take it all down. [CONFIRM storage]' }
      ],
      faqs: [
        { q: 'When should I book?', a: '[CONFIRM booking window]' },
        { q: 'Do you take the lights down after the season?', a: 'Yes. Takedown is part of the service.' },
        { q: 'Do you supply the lights or use mine?', a: '[CONFIRM]' }
      ] }
  ]
};
