// ========== DATA LAYER (UK Pricing in GBP £) ==========
const navItems = [
    { label: "Home", href: "#home" },
    { label: "Craft & Services", href: "#services" },
    { label: "Why Us", href: "#features" },
    { label: "About Stephany", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Book", href: "#book" }
];

const services = [
    {
        id: "locs-repair",
        category: "locs",
        img: "https://picsum.photos/400/300?random=10",
        alt: "Locs repair and maintenance",
        icon: "fas fa-leaf",
        title: "Locs Repair & Maintenance",
        price: 65,
        duration: "2.5 hrs",
        desc: "Re-twisting, root strengthening, thinning loc reconstruction, and detox washing."
    },
    {
        id: "starter-locs",
        category: "locs",
        img: "https://picsum.photos/400/300?random=14",
        alt: "Starter locs installation",
        icon: "fas fa-seedling",
        title: "Starter Locs Installation",
        price: 95,
        duration: "3.5 hrs",
        desc: "Precision sectioning, comb coils or interlocking techniques custom fitted to your hair density."
    },
    {
        id: "face-beats",
        category: "makeup",
        img: "https://picsum.photos/400/300?random=11",
        alt: "Makeup artistry face beats",
        icon: "fas fa-paint-brush",
        title: "Full Glam Face Beats",
        price: 75,
        duration: "1.5 hrs",
        desc: "High-definition bridal, photo-shoot, or special event makeup with long-lasting contouring."
    },
    {
        id: "soft-glam",
        category: "makeup",
        img: "https://picsum.photos/400/300?random=15",
        alt: "Soft glam everyday makeup",
        icon: "fas fa-wand-magic-sparkles",
        title: "Soft Glam & Natural Beat",
        price: 55,
        duration: "1.0 hr",
        desc: "Luminous skin finish, subtle brow sculpting, and lightweight everyday elegance."
    },
    {
        id: "combo-package",
        category: "packages",
        img: "https://picsum.photos/400/300?random=12",
        alt: "Locs and makeup combination",
        icon: "fas fa-gem",
        title: "Crown & Glow Combo",
        price: 130,
        duration: "3.5 hrs",
        desc: "Complete locs maintenance paired with a full glam makeup beat for your special occasions."
    }
];

const features = [
    { icon: "fas fa-certificate", title: "Certified Professional", desc: "Stephany is a licensed cosmetologist with over 10 years of experience." },
    { icon: "fas fa-store-alt", title: "London Studio & Mobile", desc: "Visit our welcoming London studio or request mobile home visits across Greater London." },
    { icon: "fas fa-heart", title: "Organic Formulations", desc: "We use natural oils, botanical sprays, and premium skin-friendly cosmetic lines." },
];

const testimonials = [
    { name: "Aaliyah M.", img: "https://picsum.photos/100/100?random=20", text: "Stephany saved my thinning locs! Her reconstruction skills are unmatched in London.", rating: 5 },
    { name: "Chloe W.", img: "https://picsum.photos/100/100?random=21", text: "My event makeup lasted all day through wind and photos. I felt like an absolute queen!", rating: 5 },
    { name: "Tariq S.", img: "https://picsum.photos/100/100?random=22", text: "The mobile home visit service in London is seamless. Punctual, professional, and super convenient.", rating: 5 },
];

const footerCols = [
    {
        title: "Services",
        links: [
            { label: "Locs Repair", href: "#services" },
            { label: "Starter Locs", href: "#services" },
            { label: "Makeup Artistry", href: "#services" },
        ]
    },
    {
        title: "Experience",
        links: [
            { label: "London Studio", href: "#book" },
            { label: "Mobile Home Visit", href: "#book" },
            { label: "Client Reviews", href: "#testimonials" },
        ]
    },
    {
        title: "Agency",
        links: [
            { label: "Made by Lumen Labzz", href: "https://lumenlabshq.com" },
            { label: "UK Operations", href: "https://lumenlabshq.com" },
            { label: "London, UK", href: "#" },
        ]
    }
];

// ========== URL STATE MANAGEMENT (PERSIST STATE IN URL) ==========
function getUrlParams() {
    return new URLSearchParams(window.location.search);
}

function updateUrlState(key, value) {
    const params = getUrlParams();
    if (value) {
        params.set(key, value);
    } else {
        params.delete(key);
    }
    const newRelativePathQuery = window.location.pathname + '?' + params.toString();
    history.pushState(null, '', newRelativePathQuery);
}

function restoreStateFromUrl() {
    const params = getUrlParams();
    const category = params.get('category');
    if (category) {
        const tab = document.querySelector(`.filter-tab[data-category="${category}"]`);
        if (tab) {
            document.querySelectorAll('.filter-tab').forEach(t => {
                t.classList.remove('active', 'bg-brand-brown', 'text-white');
                t.classList.add('bg-white', 'text-brand-charcoal');
            });
            tab.classList.add('active', 'bg-brand-brown', 'text-white');
            const filtered = category === 'all' ? services : services.filter(s => s.category === category);
            document.getElementById('services-grid').innerHTML = renderServices(filtered);
        }
    }

    const modalState = params.get('modal');
    if (modalState === 'confirmed') {
        const name = params.get('name') || 'Valued Client';
        const serviceId = params.get('service') || 'locs-repair';
        const visitType = params.get('type') || 'walkin';
        const date = params.get('date') || 'Today';
        const time = params.get('time') || '10:00 AM';

        const selectedService = services.find(s => s.id === serviceId) || services[0];
        const total = selectedService.price + (visitType === 'homevisit' ? 15 : 0);

        document.getElementById('summary-name').innerText = name;
        document.getElementById('summary-service').innerText = selectedService.title;
        document.getElementById('summary-type').innerText = visitType === 'walkin' ? 'London Studio' : 'Mobile Home Visit (+£15)';
        document.getElementById('summary-datetime').innerText = `${date} at ${time}`;
        document.getElementById('summary-total').innerText = `£${total}`;

        const modal = document.getElementById('booking-modal');
        const content = document.getElementById('modal-content');
        modal.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
}

// ========== RENDER FUNCTIONS ==========
function renderStars(rating) {
    return '<i class="fas fa-star text-brand-peach"></i> '.repeat(rating);
}

function renderNav(items) {
    return items.map(i => `<li><a href="${i.href}" class="block py-1 hover:text-brand-peach transition font-medium text-gray-700">${i.label}</a></li>`).join('');
}

function renderServices(items) {
    return items.map(s => `
        <article class="bg-white rounded-2xl overflow-hidden border border-brand-brown/10 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
                <img src="${s.img}" alt="${s.alt}" loading="lazy" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-semibold px-3 py-1 bg-brand-peach/15 text-brand-peach rounded-full uppercase">${s.category}</span>
                        <span class="text-xs text-gray-500"><i class="far fa-clock"></i> ${s.duration}</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <i class="${s.icon} text-brand-peach"></i>
                        <h3 class="font-serif text-xl font-bold text-brand-brown">${s.title}</h3>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">${s.desc}</p>
                </div>
            </div>
            <div class="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between mt-4">
                <span class="text-lg font-bold text-brand-brown">£${s.price}</span>
                <a href="#book" class="text-xs bg-brand-brown hover:bg-brand-darkBrown text-white px-4 py-2 rounded-lg font-semibold transition" onclick="selectServiceInForm('${s.id}')">Select</a>
            </div>
        </article>
    `).join('');
}

function renderFeatures(items) {
    return items.map(f => `
        <div class="text-center p-8 bg-brand-cream/50 rounded-2xl border border-brand-peach/20">
            <div class="w-16 h-16 bg-brand-peach/20 text-brand-peach rounded-full flex items-center justify-center mx-auto text-2xl mb-6">
                <i class="${f.icon}"></i>
            </div>
            <h3 class="font-serif text-2xl font-bold text-brand-brown mb-3">${f.title}</h3>
            <p class="text-gray-600 leading-relaxed text-sm">${f.desc}</p>
        </div>
    `).join('');
}

function renderTestimonials(items) {
    return items.map(t => `
        <article class="bg-brand-cream/30 p-8 rounded-2xl border border-brand-brown/10 shadow-sm flex flex-col justify-between">
            <div>
                <div class="flex justify-center mb-4">${renderStars(t.rating)}</div>
                <p class="text-gray-700 italic text-sm text-center mb-6">"${t.text}"</p>
            </div>
            <div class="flex items-center justify-center gap-3">
                <img src="${t.img}" alt="${t.name}" loading="lazy" class="w-12 h-12 rounded-full object-cover ring-2 ring-brand-peach/40">
                <h4 class="font-semibold text-brand-brown">${t.name}</h4>
            </div>
        </article>
    `).join('');
}

function renderBookingOptions(items) {
    return items.map(s => `<option value="${s.id}">${s.title} — £${s.price}</option>`).join('');
}

function renderFooter(cols) {
    return cols.map(c => `
        <div>
            <h4 class="font-bold text-base mb-4 text-brand-peach">${c.title}</h4>
            <ul class="space-y-2.5 text-xs text-white/70">${c.links.map(l => `<li><a href="${l.href}" class="hover:text-white transition">${l.label}</a></li>`).join('')}</ul>
        </div>
    `).join('');
}

// ========== MOUNT INITIAL UI ==========
document.getElementById('nav-list').innerHTML = renderNav(navItems);
document.getElementById('services-grid').innerHTML = renderServices(services);
document.getElementById('features-grid').innerHTML = renderFeatures(features);
document.getElementById('testimonials-grid').innerHTML = renderTestimonials(testimonials);
document.getElementById('service-options').innerHTML += renderBookingOptions(services);
document.getElementById('footer-links').innerHTML = renderFooter(footerCols);

// Run initial state restoration from URL
restoreStateFromUrl();

// ========== HELPER FUNCTIONS & LISTENERS ==========
function selectServiceInForm(serviceId) {
    const selectEl = document.getElementById('service-options');
    selectEl.value = serviceId;
    updateEstimate();
}

function updateEstimate() {
    const serviceId = document.getElementById('service-options').value;
    const visitType = document.getElementById('visit-type').value;
    const priceEl = document.getElementById('estimate-price');
    const durationEl = document.getElementById('estimate-duration');

    if (!serviceId) {
        priceEl.innerText = "Select a service";
        durationEl.innerText = "Est. Duration: --";
        return;
    }

    const selectedService = services.find(s => s.id === serviceId);
    if (selectedService) {
        const homeVisitFee = visitType === 'homevisit' ? 15 : 0;
        const totalPrice = selectedService.price + homeVisitFee;
        priceEl.innerText = `£${totalPrice}`;
        durationEl.innerText = `Est. Duration: ${selectedService.duration} ${visitType === 'homevisit' ? '(+Travel Time)' : ''}`;
    }
}

document.getElementById('service-options').addEventListener('change', updateEstimate);

// ========== SERVICE FILTERING TABS ==========
document.getElementById('service-filters').addEventListener('click', function(e) {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    
    document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('active', 'bg-brand-brown', 'text-white');
        t.classList.add('bg-white', 'text-brand-charcoal');
    });
    tab.classList.add('active', 'bg-brand-brown', 'text-white');
    
    const category = tab.dataset.category;
    const filtered = category === 'all' ? services : services.filter(s => s.category === category);
    document.getElementById('services-grid').innerHTML = renderServices(filtered);

    // Persist category state in URL
    updateUrlState('category', category === 'all' ? null : category);
});

// ========== TIME SLOT SELECTION ==========
document.getElementById('time-slots').addEventListener('click', function(e) {
    const slot = e.target.closest('.time-slot');
    if (!slot || slot.classList.contains('disabled')) return;
    
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');
    document.getElementById('selected-time').value = slot.dataset.time;
});

// ========== EVENT DELEGATION ==========
document.addEventListener('click', function(e) {
    // Mobile Navigation Toggle
    if (e.target.closest('#menu-toggle')) {
        const nav = document.getElementById('main-nav');
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        return;
    }

    // Booking Visit Type Toggle
    const toggleBtn = e.target.closest('.toggle-btn');
    if (toggleBtn) {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        toggleBtn.classList.add('active');
        document.getElementById('visit-type').value = toggleBtn.dataset.type;
        updateEstimate();
        return;
    }

    // Close Modal
    if (e.target.id === 'close-modal' || e.target.id === 'booking-modal') {
        const modal = document.getElementById('booking-modal');
        const content = document.getElementById('modal-content');
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 200);

        // Clear modal state from URL
        const params = getUrlParams();
        params.delete('modal');
        params.delete('name');
        params.delete('service');
        params.delete('type');
        params.delete('date');
        params.delete('time');
        const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        history.pushState(null, '', newRelativePathQuery);
    }
});

// ========== FORM SUBMISSION ==========
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('booking-name').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const serviceId = document.getElementById('service-options').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('selected-time').value;
    const visitType = document.getElementById('visit-type').value;

    if (!time) {
        alert("Please select an available time slot.");
        return;
    }

    const selectedService = services.find(s => s.id === serviceId);
    const total = selectedService.price + (visitType === 'homevisit' ? 15 : 0);

    // Populate Modal Summary
    document.getElementById('summary-name').innerText = `${name} (${phone})`;
    document.getElementById('summary-service').innerText = selectedService.title;
    document.getElementById('summary-type').innerText = visitType === 'walkin' ? 'London Studio' : 'Mobile Home Visit (+£15)';
    document.getElementById('summary-datetime').innerText = `${date} at ${time}`;
    document.getElementById('summary-total').innerText = `£${total}`;

    // Show Modal
    const modal = document.getElementById('booking-modal');
    const content = document.getElementById('modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-100');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);

    // Persist booking state in URL query parameters
    const params = getUrlParams();
    params.set('modal', 'confirmed');
    params.set('name', name);
    params.set('service', serviceId);
    params.set('type', visitType);
    params.set('date', date);
    params.set('time', time);
    history.pushState(null, '', window.location.pathname + '?' + params.toString());

    // Reset Form & Calculator
    this.reset();
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    document.getElementById('selected-time').value = '';
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.toggle-btn[data-type="walkin"]').classList.add('active');
    document.getElementById('visit-type').value = 'walkin';
    updateEstimate();
});

// ========== INTERSECTION OBSERVER ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => observer.observe(s));