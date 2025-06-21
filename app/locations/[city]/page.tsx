import { CityHeroSection } from "@/components/city-hero-section"
import { notFound } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"

// This data would typically be fetched from a database or a more robust data source.
// For demonstration, we're using a static map.
const cityDataMap: { [key: string]: any } = {
  nashville: {
    name: "Nashville",
    state: "Tennessee",
    stateAbbr: "TN",
    description:
      "Nashville is the capital and most populous city of the U.S. state of Tennessee. It is the county seat of Davidson County and is located on the Cumberland River. Known as 'Music City,' Nashville is a hub for country music, live entertainment, and a growing tech scene. Its vibrant culture, historic sites, and friendly atmosphere make it a popular destination for residents and visitors alike. Redhawk Relocation is proud to offer top-tier moving services throughout Nashville and its surrounding areas, ensuring a smooth transition for your home or business.",
    serviceCities: [
      { name: "Franklin", state: "TN" },
      { name: "Murfreesboro", state: "TN" },
      { name: "Clarksville", state: "TN" },
      { name: "Hendersonville", state: "TN" },
      { name: "Smyrna", state: "TN" },
    ],
  },
  austin: {
    name: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    description:
      "Austin is the capital city of the U.S. state of Texas, an inland city bordering the Hill Country region. Austin is known for its vibrant live-music scene, diverse culture, and rapidly growing tech industry. It's a city that prides itself on its unique character, often summarized by the motto 'Keep Austin Weird.' Redhawk Relocation provides comprehensive moving services to help you settle into this dynamic city.",
    serviceCities: [
      { name: "Round Rock", state: "TX" },
      { name: "Cedar Park", state: "TX" },
      { name: "Pflugerville", state: "TX" },
      { name: "Leander", state: "TX" },
      { name: "Georgetown", state: "TX" },
    ],
  },
  boise: {
    name: "Boise",
    state: "Idaho",
    stateAbbr: "ID",
    description:
      "Boise is the capital and most populous city of the U.S. state of Idaho, and the county seat of Ada County. Located on the Boise River, it is the largest city in the state. Boise offers a unique blend of outdoor adventure, a thriving downtown, and a friendly community. From its scenic greenbelt to its growing tech sector, Boise is a city on the rise. Redhawk Relocation is your trusted partner for moves within and to Boise.",
    serviceCities: [
      { name: "Meridian", state: "ID" },
      { name: "Nampa", state: "ID" },
      { name: "Caldwell", state: "ID" },
      { name: "Eagle", state: "ID" },
      { name: "Kuna", state: "ID" },
    ],
  },
  charlotte: {
    name: "Charlotte",
    state: "North Carolina",
    stateAbbr: "NC",
    description:
      "Charlotte is the most populous city in the U.S. state of North Carolina. Located in the Piedmont region, it is the county seat of Mecklenburg County. Known as the 'Queen City,' Charlotte is a major financial center and boasts a vibrant arts scene, professional sports teams, and beautiful neighborhoods. Redhawk Relocation offers reliable and efficient moving services for all your Charlotte relocation needs.",
    serviceCities: [
      { name: "Concord", state: "NC" },
      { name: "Gastonia", state: "NC" },
      { name: "Rock Hill", state: "SC" },
      { name: "Huntersville", state: "NC" },
      { name: "Kannapolis", state: "NC" },
    ],
  },
  columbus: {
    name: "Columbus",
    state: "Ohio",
    stateAbbr: "OH",
    description:
      "Columbus is the state capital and the most populous city in the U.S. state of Ohio. It is the county seat of Franklin County. Columbus is a diverse and dynamic city, home to Ohio State University, a burgeoning tech industry, and a lively arts and culinary scene. Redhawk Relocation is dedicated to providing seamless moving experiences for individuals and families moving to or from Columbus.",
    serviceCities: [
      { name: "Dublin", state: "OH" },
      { name: "Westerville", state: "OH" },
      { name: "Grove City", state: "OH" },
      { name: "Newark", state: "OH" },
      { name: "Lancaster", state: "OH" },
    ],
  },
  denver: {
    name: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    description:
      "Denver, the capital of Colorado, is an American metropolis dating to the Old West era. It's known for its many breweries and for being a gateway to the Rocky Mountains. With stunning natural beauty, a thriving job market, and a laid-back atmosphere, Denver offers an exceptional quality of life. Redhawk Relocation provides expert moving services to help you enjoy all that Denver has to offer.",
    serviceCities: [
      { name: "Aurora", state: "CO" },
      { name: "Lakewood", state: "CO" },
      { name: "Arvada", state: "CO" },
      { name: "Westminster", state: "CO" },
      { name: "Thornton", state: "CO" },
    ],
  },
  phoenix: {
    name: "Phoenix",
    state: "Arizona",
    stateAbbr: "AZ",
    description:
      "Phoenix is the capital of the southwestern U.S. state of Arizona. Known for its year-round sun and warm temperatures, it's the fifth-most populous city in the United States. Phoenix offers a vibrant urban core, stunning desert landscapes, and a growing economy. Redhawk Relocation is here to make your move to or from Phoenix as smooth and stress-free as possible.",
    serviceCities: [
      { name: "Mesa", state: "AZ" },
      { name: "Chandler", state: "AZ" },
      { name: "Scottsdale", state: "AZ" },
      { name: "Glendale", state: "AZ" },
      { name: "Tempe", state: "AZ" },
    ],
  },
  raleigh: {
    name: "Raleigh",
    state: "North Carolina",
    stateAbbr: "NC",
    description:
      "Raleigh is the capital of the U.S. state of North Carolina and the seat of Wake County. It is the second-most populous city in the state. Raleigh is a city of innovation and education, with a strong research triangle park, beautiful parks, and a lively downtown. Redhawk Relocation provides reliable moving services to help you transition seamlessly into the Raleigh area.",
    serviceCities: [
      { name: "Durham", state: "NC" },
      { name: "Cary", state: "NC" },
      { name: "Chapel Hill", state: "NC" },
      { name: "Apex", state: "NC" },
      { name: "Wake Forest", state: "NC" },
    ],
  },
  "salt-lake-city": {
    name: "Salt Lake City",
    state: "Utah",
    stateAbbr: "UT",
    description:
      "Salt Lake City is the capital and most populous city of Utah, as well as the county seat of Salt Lake County. It is the core of the Salt Lake City metropolitan area. Nestled against the Wasatch Mountains, Salt Lake City offers unparalleled access to outdoor recreation, a growing tech scene, and a unique cultural heritage. Redhawk Relocation is ready to assist with your move to this beautiful city.",
    serviceCities: [
      { name: "West Valley City", state: "UT" },
      { name: "Provo", state: "UT" },
      { name: "Orem", state: "UT" },
      { name: "Sandy", state: "UT" },
      { name: "Layton", state: "UT" },
    ],
  },
  tampa: {
    name: "Tampa",
    state: "Florida",
    stateAbbr: "FL",
    description:
      "Tampa is a city on the Gulf Coast of Florida. It's known for its business and cultural amenities, including museums and performing arts venues. With its beautiful waterfront, diverse neighborhoods, and growing economy, Tampa is a fantastic place to live and work. Redhawk Relocation provides efficient and professional moving services throughout the Tampa Bay area.",
    serviceCities: [
      { name: "St. Petersburg", state: "FL" },
      { name: "Clearwater", state: "FL" },
      { name: "Brandon", state: "FL" },
      { name: "Lakeland", state: "FL" },
      { name: "Sarasota", state: "FL" },
    ],
  },
  baltimore: {
    name: "Baltimore",
    state: "Maryland",
    stateAbbr: "MD",
    description:
      "Baltimore is the most populous city in the U.S. state of Maryland, and the 30th most populous city in the United States. Located in central Maryland along the tidal portion of the Patapsco River, Baltimore is a major seaport and is situated closer to major Midwestern markets than any other major seaport on the East Coast. Known for its rich history, vibrant neighborhoods, and thriving arts scene, Baltimore offers a unique blend of urban sophistication and small-town charm. Redhawk Relocation provides comprehensive moving services throughout Baltimore and the greater Maryland area.",
    serviceCities: [
      { name: "Annapolis", state: "MD" },
      { name: "Columbia", state: "MD" },
      { name: "Towson", state: "MD" },
      { name: "Silver Spring", state: "MD" },
      { name: "Rockville", state: "MD" },
    ],
  },
}

export default function CityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city.toLowerCase()
  const cityData = cityDataMap[citySlug]

  if (!cityData) {
    notFound()
  }

  return (
    <>
      <MainNav />
      <main>
        <CityHeroSection cityData={cityData} />
        {/* You can add more sections here, e.g., testimonials, FAQs, etc. */}
      </main>
      <HawkFooter />
    </>
  )
}
