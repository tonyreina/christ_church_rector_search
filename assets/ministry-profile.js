// Ministry Profile Items Data and Generator
function generateMinistryProfileItems() {
    const items = [
        {
            title: "What we hope for in our next rector",
            content: `
                <span class="font-medium">We hope to call a leader who embodies Christ's love</span> with humility,
                compassion, and spiritual depth. Essential gifts include strong pastoral presence, excellent liturgical
                leadership, and <span class="font-medium">preaching that connects the Gospel to everyday life</span> with
                warmth and clarity. We value someone who helps newcomers feel truly welcome and who nurtures long-time
                members
                with care, especially in seasons of joy, grief, and transition.<br>
                <span class="font-medium">We also need a collaborative leader</span> who listens well, builds trust, and
                works
                closely with vestry, lay leaders, and staff. Administrative skill and wise stewardship are essential, as is
                adaptability in a changing Church. <span class="font-medium">Above all, we seek a rector grounded in prayer
                  and emotional maturity</span>—someone who will help us grow as a supportive community led by the Holy
                Spirit
                and rooted in faith, hope, and love.
            `
        },
        {
            title: "How we're preparing for the Church of the future",
            content: `
                <span class="font-medium">Christ Church welcomes all of God's children with hope and openness as we prepare
                  for the future.</span> We support worship and pastoral
                care through dedicated parishioners, strengthened by clergy guidance, and we offer both Rite I and
                Rite II so people can worship in the tradition that best nourishes them.
                <p class="text-[var(--muted)] leading-relaxed mt-3">
                We grow engagement through active ministries and committees, intentionally inviting new voices into shared
                leadership and discernment. <span class="font-medium">We also work to be visible in the wider
                  community</span>, so our neighbors know who we are and how we seek to follow Jesus. Our partnership with
                Christ Church Day School is a treasured part of our identity, and we are strengthening youth formation
                through
                Godly Play, fellowship, and meaningful learning.
                </p>
                <p class="text-[var(--muted)] leading-relaxed mt-3">
                <span class="font-medium">We care for our 130-year-old campus as a gift entrusted to us</span>, planning
                responsibly for maintenance and future needs. Finally, we seek deeper relationships across the Diocese,
                especially with parishes serving immigrant communities, so we can stand with those most in need.
                </p>
            `
        },
        {
            title: "Serving beyond our parish",
            content: `
                Our Service Ministry helps our parish live out a faith
                that
                is truly active and visible. James 2:17 says, "So also faith by itself, if it does not have works, is dead."
                Guided by that call, we raise funds for Vida Joven, shelter for orphans in Tijuana, through our annual Cinco
                de Mayo dinner. We also provide backpacks and school supplies for children, Thanksgiving meals for families
                in
                need.<br>In recent years, we revived a longtime tradition of offering practical care to neighbors
                experiencing
                homelessness by equipping parishioners with small gift bags of essentials to share with dignity and
                kindness.
                Our Thrift Shop further extends this outreach. It is a true community ministry, with volunteers and donors
                from well beyond our congregation.<br>We stay connected and engaged through our weekly newsletter, Grace
                Notes, which highlights opportunities to serve in the wider community. In addition, our Peace &amp; Justice
                Committee supports education and advocacy on issues such as housing, ocean pollution, immigration, and LGBTQ
                protections and rights, helping us respond thoughtfully and faithfully to our neighbors' needs.
            `
        },
        {
            title: "Peace & Justice ministry",
            content: `
                In the past five years, one of our most significant new
                ministries has been the formation of our Peace &amp; Justice Committee. During COVID, parishioners
                participated in the Episcopal Church's Sacred Ground program, which deepened our commitment to faithful
                action
                and honest conversation. From that work, we sensed a call to engage issues affecting our neighbors, and we
                joined the <a href="https://sdop.org/" target="_blank" rel="noopener noreferrer" class="underline">San Diego
                  Organizing Project (SDOP)</a>, a non-partisan, multi-faith network. Through listening and
                discernment, we focused first on housing, homelessness, and pollution, supporting efforts such as renter
                protections, housing initiatives, and practical support for the unhoused. More recently, we have felt a
                clear
                call toward immigration and refugee support. We have hosted Home Meetings, participated in forums and
                rallies,
                and held discussions on issues including refugee resettlement. In collaboration with Our Lady of Guadalupe
                Church and SDOP, we now support the FAITH program (Faithful Accompaniment in Trust &amp; Hope), offering
                moral
                and prayerful presence for migrants at court hearings and related sites.
            `
        },
        {
            title: "Life with the wider Church",
            content: `
                Christ Church is a loving, Spirit-filled community
                grounded
                in worship, prayer, and relationships. We are nourished through thoughtful liturgy, beautiful music, and
                gathering at the Lord's Table. Fellowship also matters to us: shared meals and parish gatherings deepen
                connection and remind us we do not walk alone. We care for one another's spiritual, emotional, and physical
                well-being through formation, prayer, and community life. Weekly Men's Bible Study and lay-led Evening
                Prayer
                offer regular opportunities for scripture, reflection, and shared intercession. We also support health of
                mind
                and body through offerings such as anon-site yoga class held twice a month. Beyond our parish, we extend
                care
                through hospitality by opening our facilities to youth events, scouting groups, arts performances,
                fundraisers, and Alcoholics Anonymous meetings. Our all-volunteer Thrift Shop is a ministry of compassion
                that
                provides affordable, high-quality goods and distributes over $100,000 annually to ministries locally and
                throughout the wider Church. Through worship, service, and welcome, we seek to reflect God's love in
                tangible
                ways.
            `
        },
        {
            title: "Our parish-school partnership",
            content: `
                Our partnership with Christ Church Day School is a
                treasured
                and defining part of our parish identity. For over 70 years, we have shared our campus, our worship life,
                and
                our commitment to Christian formation with students and families who bring energy, diversity, and joy to our
                community.
                <p class="text-[var(--muted)] leading-relaxed mt-3">We believe this partnership strengthens both church and
                school. Students participate in weekly chapels, building early connections to Episcopal worship and
                tradition.
                Parents and faculty often join parish events, deepening relationships across generations. Service projects
                unite school families and parishioners in common mission. Our Day School chaplain serves both communities,
                weaving together formation, pastoral care, and spiritual nurture.</p>
                <p class="text-[var(--muted)] leading-relaxed mt-3">We care for our 130-year-old campus as a gift entrusted to
                us by past generations and held in trust for those to come. As we plan responsibly for maintenance, growth,
                and future needs, we do so knowing that this sacred space serves not only Sunday worship but also the daily
                formation of young hearts and minds throughout the week.</p>
            `
        },
        {
            title: "A community ministry with broad impact",
            content: `
                We invite everyone to share in ministry as we seek to be
                Christ's "hands and feet" in the world. Parishioners serve our neighbors through outreach that meets real
                needs with dignity and care. We support St. Mark's kitchen and prepare "Blessings in a Bag" with snacks,
                water, and handmade hats, gloves, or scarves to offer those living on the streets. These remind our
                neighbors
                that they are seen and loved by God the Father, Son, and Spirit.<br>We also create space for prayer and
                belonging. Our mid-week, lay-led Evening Prayer service is intentionally welcoming and nonjudgmental, with
                opportunities for people to speak names and concerns aloud. In seasons like Lent, we gather for Stations of
                the Cross and a lecture series, sharing a simple meal and deepening fellowship.<br>Our congregation
                participates in the San Diego Pride celebration alongside others in the Diocese, praying at the Cathedral
                and
                witnessing to God's inclusive love. We support Vida Joven orphanages in Mexico through fundraising that
                helps
                provide food and care. Through our Peace and Justice Ministry, we educate ourselves about suffering at the
                border and offer prayerful presence for those facing immigration court proceedings, standing as
                compassionate
                witnesses and reminding people they are not alone.<br>Our volunteer-run Thrift Shop is another vital
                ministry.
                It offers affordable clothing and household goods to the larger community while generating annual support
                for
                staff, parish ministries, local organizations, and scholarships. It is entirely staffed by volunteers and is
                known as a place of warmth, generosity, and good humor.
            `
        },
        {
            title: "Stewardship and outreach",
            content: `
                We hope to call a leader who embodies Christ's love with
                humility, compassion, and spiritual depth. Essential gifts include strong pastoral presence, excellent
                liturgical leadership, and preaching that connects the Gospel to everyday life with warmth and clarity. We
                value someone who helps newcomers feel truly welcome and who nurtures long-time members with care,
                especially
                in seasons of joy, grief, and transition. We also need a collaborative leader who listens well, builds
                trust,
                and works closely with vestry, lay leaders, and staff. Administrative skill and wise stewardship are
                essential, as does adaptability in a changing Church. Above all, we seek a rector grounded in prayer and
                emotional maturity. We need someone who will help us grow as a supportive community led by the Holy Spirit
                and
                rooted in faith, hope, and love.
            `
        },
        {
            title: "Growing youth formation",
            content: `
                We are encouraged by new life in our ministries: our youth
                programs are rebuilding with the hiring of <a
                  href="https://www.buzzsprout.com/94924/episodes/18402328-the-tenth-day-of-christmas-with-leighton-jones-12-days-of-god-sightings-on-faith-to-go"
                  target="_blank" rel="noopener">Leighton Jones</a>, our new Youth Minister and Day School chaplain. We are
                nurturing the next generation through thoughtful Christian formation that invites wonder, questions, and
                belonging.
                <p class="text-[var(--muted)] leading-relaxed mt-3">Our vision for youth and family ministry includes:</p>
                <ul class="list-disc pl-6 text-[var(--muted)] leading-relaxed mt-3 space-y-2">
                    <li>Regular Sunday School and youth gatherings that build friendships rooted in faith</li>
                    <li>Godly Play sessions that help children encounter scripture through story and wonder</li>
                    <li>Service opportunities that connect young people to Christ's mission in the world</li>
                    <li>Intergenerational worship and fellowship that strengthens the whole parish family</li>
                    <li>Deepening partnerships with Christ Church Day School for shared formation and worship</li>
                    <li>Creating space where young people feel genuinely seen, heard, and valued</li>
                    <li>Supporting parents and families as they nurture faith at home</li>
                </ul>
            `
        }
    ];

    const container = document.getElementById('ministry-profile-container');
    if (!container) return;

    // Generate the navigation buttons HTML
    const buttonsHTML = `
        <button class="profile-nav-btn prev" aria-label="Previous profile section">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="profile-nav-btn next" aria-label="Next profile section">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
    `;

    // Generate the items HTML
    const itemsHTML = items.map((item, index) => `
        <div class="ministry-profile-item ${index === 0 ? 'active' : ''} cc-callout p-6 md:p-7">
          <div class="text-sm uppercase tracking-wide text-[var(--muted)]">From our Ministry Profile</div>
          <h3 class="text-2xl font-semibold tracking-tight mt-2">${item.title}</h3>
          <p class="text-[var(--muted)] leading-relaxed mt-3">
            ${item.content}
          </p>
        </div>
    `).join('');

    container.innerHTML = buttonsHTML + itemsHTML;
}
// Rotate ministry profile sections with navigation
function rotateMinistryProfile() {
    const container = document.getElementById('ministry-profile-container');
    if (!container) return;

    const items = container.querySelectorAll('.ministry-profile-item');
    if (items.length === 0) return;

    const prevBtn = container.querySelector('.profile-nav-btn.prev');
    const nextBtn = container.querySelector('.profile-nav-btn.next');

    let currentIndex = 0;
    let autoRotateInterval;

    function showItem(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(showNext, 30000);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showNext();
            resetAutoRotate();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showPrev();
            resetAutoRotate();
        });
    }

    startAutoRotate();
}
