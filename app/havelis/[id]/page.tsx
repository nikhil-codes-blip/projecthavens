"use client"

import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio/audio-player"
import { ArrowLeft, Calendar, MapPin, Clock, Ticket, Users, Star, Heart, Share2, Download } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for filteredHavelis - replace with your actual data source
const filteredHavelis = [
{
  id: "bara-imambara",
  name: "Bara Imambara",
  shortDescription: "A grand Mughal-era complex known for its massive central hall and historical significance.",
  fullDescription:
    "Bara Imambara, also known as Asafi Imambara, is one of Lucknow’s most iconic monuments. Built in 1784 by Nawab Asaf-ud-Daula during a famine to provide employment, it features a massive unsupported vaulted hall, the famous Bhool Bhulaiya (labyrinth), the Asfi Mosque, and the Bowli Stepwell.",
  imageUrl: "/images/bara-imambara.jpg",
  yearBuilt: "1784",
  location: "Hussainabad, Lucknow, Uttar Pradesh",
  visitingHours: "6:00 AM - 5:00 PM",
  entryFee: "₹50 for Indians, ₹500 for Foreigners (includes Bhool Bhulaiya & Stepwell)",
  architect: "Kifayatullah",
  audioFile: "bara-imambara-audio.mp3",
  tags: ["Heritage", "Architecture", "Nawabi Era", "Labyrinth", "Mughal"],
  rating: 4.7,
  reviews: 1823,
  audioLength: "2:35",
  category: "Historical Monument",
  significance: "Symbol of Nawabi architecture and social welfare",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Chhota Imambara", "Rumi Darwaza", "Clock Tower"],
  architecturalStyle: "Mughal with Nawabi influence",
  materials: ["Lakhauri bricks", "Stucco", "Plaster"],
  historicalPeriod: "Late 18th Century",
  culturalImportance: "Built as famine relief and as a Shia congregation hall"
},

{
  id: "chhota-imambara",
  name: "Chhota Imambara",
  shortDescription: "A beautifully ornamental mausoleum built by the Nawabs of Awadh.",
  fullDescription:
    "Chhota Imambara, completed in 1838 by Nawab Muhammad Ali Shah, serves as his mausoleum and that of his mother. Lavishly decorated with chandeliers, gilt interiors, silverwork, calligraphy, and stained glass, it reflects the artistic refinement of the Awadhi court.",
  imageUrl: "/images/chhota-imambara.jpg",
  yearBuilt: "1838",
  location: "Hussainabad, Lucknow, Uttar Pradesh",
  visitingHours: "7:00 AM - 5:00 PM",
  entryFee: "₹40 for Indians, ₹200 for Foreigners",
  architect: "Muhammad Ali Shah’s court artisans",
  audioFile: "chhota-imambara1.mp3",
  tags: ["Mausoleum", "Chandeliers", "Calligraphy", "Stained Glass", "Awadhi"],
  rating: 4.6,
  reviews: 1024,
  audioLength: "1:38",
  category: "Historical Monument",
  significance: "Remembrance of the Awadhi dynasty’s cultural art",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Bara Imambara", "Rumi Darwaza", "Clock Tower"],
  architecturalStyle: "Awadhi-Mughal fusion",
  materials: ["Brick", "Stucco", "Plaster", "Metal"],
  historicalPeriod: "19th Century",
  culturalImportance: "Represents diplomacy of sunni‑Shia cultural blending"
},
{
  id: "rumi-darwaza",
  name: "Rumi Darwaza",
  shortDescription: "A majestic gateway modeled after Istanbul’s Porte de Romen.",
  fullDescription:
    "Rumi Darwaza, also known as the Turkish Gate, was built in 1784 under Nawab Asaf-ud-Daula. Standing 60 feet tall, it exemplifies Awadhi craftsmanship with intricate stucco work and Mughal-inspired elegance, becoming an enduring symbol of Lucknow.",
  imageUrl: "/images/rumi-darwaza.jpg",
  yearBuilt: "1784",
  location: "Hussainabad, Lucknow, Uttar Pradesh",
  visitingHours: "Open 24 hours",
  entryFee: "Free",
  architect: "Kifayatullah",
  audioFile: "rumi-darwaza1.mp3",
  tags: ["Gateway", "Stucco", "Awadhi", "Mughal", "Landmark"],
  rating: 4.8,
  reviews: 1500,
  audioLength: "1:26",
  category: "Historical Monument",
  significance: "Iconic symbol of Lucknow’s Nawabi architecture",
  bestTimeToVisit: "All year",
  nearbyAttractions: ["Bara Imambara", "Chhota Imambara", "Clock Tower"],
  architecturalStyle: "Awadhi-Mughal",
  materials: ["Brick", "Stucco"],
  historicalPeriod: "Late 18th Century",
  culturalImportance: "Gateway commemorating famine relief project"
},
{
  id: "clock-tower",
  name: "Hussainabad Clock Tower",
  shortDescription: "A Victorian-Gothic clock tower inspired by Big Ben in London.",
  fullDescription:
    "Commissioned by Nawab Nasir-ud-Din Haidar and built in 1881, this 67‑meter tall clock tower was designed by Richard Roskell Bayne. It blends Indian and Victorian styles with red brick facade, white sandstone trim, and a functioning clock mechanism imported from England.",
  imageUrl: "/images/clock-tower.jpg",
  yearBuilt: "1881",
  location: "Hussainabad, Lucknow, Uttar Pradesh",
  visitingHours: "8:00 AM - 6:00 PM",
  entryFee: "₹10",
  architect: "Richard Roskell Bayne",
  audioFile: "clock-tower-audio1.mp3",
  tags: ["Clock Tower", "Victorian-Gothic", "Landmark", "Kazmi Gate"],
  rating: 4.4,
  reviews: 634,
  audioLength: "1:44",
  category: "Historical Monument",
  significance: "Tallest clock tower in India, symbol of colonial influence",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Bara Imambara", "Rumi Darwaza", "Chhota Imambara"],
  architecturalStyle: "Victorian-Gothic mix",
  materials: ["Red Brick", "Sandstone", "Metal"],
  historicalPeriod: "Late 19th Century",
  culturalImportance: "Fusion of British and Indian architectural styles"
},
{
  id: "dilkusha-kothi",
  name: "Dilkusha Kothi",
  shortDescription: "A ruined European-style pleasure palace built by the Nawabs.",
  fullDescription:
    "Dilkusha Kothi, constructed in the early 19th century by Nawab Saadat Ali Khan II, was a country house modeled on English baroque architecture. Though damaged during the 1857 uprising, its ruins showcase classical columns, arched openings, and garden terraces.",
  imageUrl: "/images/dilkusha-kothi.jpg",
  yearBuilt: "c. 1800",
  location: "Dilkusha, Lucknow, Uttar Pradesh",
  visitingHours: "Sunrise to Sunset",
  entryFee: "₹20",
  architect: "European-trained local artisans",
  audioFile: "dilkusha-kothi-audio1.mp3",
  tags: ["Ruins", "European-style", "Baroque", "Pleasure House", "Nawabi"],
  rating: 4.1,
  reviews: 311,
  audioLength: "3:03",
  category: "Historical Monument",
  significance: "Example of early European influence in Lucknow’s architecture",
  bestTimeToVisit: "Winter months",
  nearbyAttractions: ["Chattar Manzil", "Safed Baradari", "Kaiserbagh"],
  architecturalStyle: "Baroque-European",
  materials: ["Brick", "Plaster", "Stone"],
  historicalPeriod: "Early 19th Century",
  culturalImportance: "Leisure retreat of the Nawabs, reflecting western tastes"
},
{
  id: "chattar-manzil",
  name: "Chattar Manzil",
  shortDescription: "A palace famed for its octagonal domed pavilions.",
  fullDescription:
    "Chattar Manzil, literally “umbrella palace,” was built in early 19th century under Nawab Ghazi-ud-Din Haidar. It features distinctive chattris (domed kiosks), curved balconies, and Rococo-inspired interiors. It was severely damaged during 1857 but continues to stand as a symbol of Lucknow’s royal past.",
  imageUrl: "/images/chattar-manzil.jpg",
  yearBuilt: "c. 1820",
  location: "Rumi Darwaza Road, Lucknow, Uttar Pradesh",
  visitingHours: "8:00 AM - 4:00 PM",
  entryFee: "₹30 for Indians, ₹150 for Foreigners",
  architect: "Court architects under Ghazi-ud-Din Haidar",
  audioFile: "chhatar-manzil1.mp3",
  tags: ["Palace", "Chattri", "Nawabi", "Rococo", "Heritage"],
  rating: 4.2,
  reviews: 298,
  audioLength: "3:19",
  category: "Historical Monument",
  significance: "Exemplifies European influences mingled with Indian motifs",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Dilkusha Kothi", "Safed Baradari", "Kaiserbagh"],
  architecturalStyle: "Awadhi-European blend",
  materials: ["Brick", "Stucco", "Timber"],
  historicalPeriod: "Early 19th Century",
  culturalImportance: "Venues for royal entertainment and receptions"
},
{
  id: "safed-baradari",
  name: "Safed Baradari",
  shortDescription: "A white marble pavilion built for royal ceremonies.",
  fullDescription:
    "Safed Baradari, built in early 19th century at Kaiserbagh, was constructed using gleaming white marble brought from Shahjahanpur. It served as a ceremonial pavilion for Nawabs. Its Ganga-Jamuni taint and serene proportions make it a peaceful heritage structure today.",
  imageUrl: "/images/Safed-Baradari.jpg",
  yearBuilt: "c. 1810",
  location: "Kaiserbagh, Lucknow, Uttar Pradesh",
  visitingHours: "8:00 AM - 6:00 PM",
  entryFee: "₹25 for Indians, ₹125 for Foreigners",
  architect: "Royal court masons",
  audioFile: "safed-baradari-audio1.mp3",
  tags: ["Baradari", "Marble", "Ceremonial", "Kaiserbagh", "Nawabi"],
  rating: 4.0,
  reviews: 219,
  audioLength: "3:12",
  category: "Historical Pavilion",
  significance: "Venue for royal receptions and celebrations",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Chattar Manzil", "Dilkusha Kothi", "Kaiserbagh Palace"],
  architecturalStyle: "Classic baradari",
  materials: ["White Marble"],
  historicalPeriod: "Early 19th Century",
  culturalImportance: "Reflects regal ceremonial culture"
},
{
  id: "la-martiniere",
  name: "La Martiniere (Constantia House)",
  shortDescription: "A grand colonial mansion now serving as La Martiniere College.",
  fullDescription:
    "Constantia House, built in 1857 by Major General Claude Martin, is a magnificent colonial‑Italianate mansion featuring red brick facades, arches, Corinthian columns, and private chapel. Today, it forms part of La Martiniere College where students attend classes amid heritage architecture.",
  imageUrl: "/images/La-Martiniere.jpg",
  yearBuilt: "1857",
  location: "La Martiniere Road, Lucknow, Uttar Pradesh",
  visitingHours: "By prior appointment",
  entryFee: "Permission required",
  architect: "Claude Martin & associates",
  audioFile: "la-martiniere-audio1.mp3",
  tags: ["Colonial", "Italianate", "College", "Heritage", "Mansion"],
  rating: 4.3,
  reviews: 185,
  audioLength: "2:53",
  category: "Historical Building",
  significance: "Blend of colonial and classical architecture, educational legacy",
  bestTimeToVisit: "Academic year (Mon–Fri)",
  nearbyAttractions: ["Kaiserbagh", "Safed Baradari"],
  architecturalStyle: "Italianate-Colonial",
  materials: ["Brick", "Stone", "Stucco"],
  historicalPeriod: "Mid‑19th Century",
  culturalImportance: "Educational landmark founded by a Frenchman in India"
},
{
  id: "kaiserbagh-palace",
  name: "Kaiserbagh Palace Complex",
  shortDescription: "An expansive royal palace built by Nawab Wajid Ali Shah.",
  fullDescription:
    "Kaiserbagh Complex, constructed in 1848–1856 by Nawab Wajid Ali Shah, spanned over 700 acres and included palaces, gardens, courtyards, and pavilions. Though much was lost during the 1857 rebellion, ruins and restored elements still convey its former glory.",
  imageUrl: "/images/Kaiserbagh.jpg",
  yearBuilt: "1848–1856",
  location: "Kaiserbagh, Lucknow, Uttar Pradesh",
  visitingHours: "Sunrise to Sunset",
  entryFee: "₹30 for Indians, ₹150 for Foreigners",
  architect: "Royal court planners",
  audioFile: "kaiserbagh-audio1.mp3",
  tags: ["Palace Complex", "Gardens", "Courtyards", "Nawabi", "Royalty"],
  rating: 4.2,
  reviews: 502,
  audioLength: "3:16",
  category: "Historical Complex",
  significance: "Last great palace of the Awadhi dynasty",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Chattar Manzil", "Safed Baradari", "La Martiniere"],
  architecturalStyle: "Nawabi classical",
  materials: ["Brick", "Stone", "Plaster"],
  historicalPeriod: "Mid‑19th Century",
  culturalImportance: "Nawabi extravagance before colonial suppression"
},
{
  id: "shah-najaf-imambara",
  name: "Shah Najaf Imambara",
  shortDescription: "Mausoleum of Nawab Ghazi-ud-Din Haidar, with twin tombs.",
  fullDescription:
    "Built by Nawab Ghazi-ud-Din Haidar in 1823–24, Shah Najaf Imambara houses his self-proclaimed tomb (though he was buried elsewhere) and his uncle’s. It’s noted for twin domes, red & white stucco, and religious significance for the Shia community.",
  imageUrl: "/images/Shah-Najaf.jpg",
  yearBuilt: "1824",
  location: "Hazratganj, Lucknow, Uttar Pradesh",
  visitingHours: "7:00 AM - 5:00 PM",
  entryFee: "₹40 for Indians, ₹200 for Foreigners",
  architect: "Court artisans",
  audioFile: "shah-najaf-audio1.mp3",
  tags: ["Mausoleum", "Shia", "Dome", "Stucco", "Awadhi"],
  rating: 4.5,
  reviews: 583,
  audioLength: "3:29",
  category: "Religious Monument",
  significance: "Important Shia monument and architectural marker",
  bestTimeToVisit: "All year",
  nearbyAttractions: ["Bara Imambara", "Chhota Imambara", "Bhool Bhulaiya"],
  architecturalStyle: "Awadhi-Mughal",
  materials: ["Brick", "Stucco"],
  historicalPeriod: "Early 19th Century",
  culturalImportance: "Spiritual centre for Lucknow’s Islamic community"
},
{
  id: "nadan-mahal",
  name: "Nadan Mahal",
  shortDescription: "A small mausoleum built for Ghazi-ud-Din Haidar’s mother.",
  fullDescription:
    "Commissioned by Nawab Ghazi-ud-Din Haidar in 1825, Nadan Mahal is a peaceful tomb for his mother. Located in a garden setting, it features a dome topped with lotus motifs, simple design, and stucco embellishments reflecting early 19th century elegance.",
  imageUrl: "/images/Nadan-Mahal.jpg",
  yearBuilt: "1825",
  location: "Pattharkhana, Lucknow, Uttar Pradesh",
  visitingHours: "8:00 AM - 6:00 PM",
  entryFee: "₹20",
  architect: "Court artisans",
  audioFile: "nadan-mahal-audio1.mp3",
  tags: ["Mausoleum", "Dome", "Mother’s remembrance", "Garden", "Awadhi"],
  rating: 4.0,
  reviews: 142,
  audioLength: "3:28",
  category: "Historical Monument",
  significance: "Unique maternal memorial of a Nawab",
  bestTimeToVisit: "All year",
  nearbyAttractions: ["Shah Najaf Imambara"],
  architecturalStyle: "Awadhi revival",
  materials: ["Brick", "Stucco"],
  historicalPeriod: "Early 19th Century",
  culturalImportance: "Represents filial devotion in royal family"
},
{
  id: "begum-kothi",
  name: "Begum Kothi",
  shortDescription: "Residence built for the Begums of Awadh, blending European flair.",
  fullDescription:
    "Begum Kothi, built in early 19th century near Kaiserbagh, housed the Begums of Awadh. Featuring classical columns, arches, verandahs, and spacious rooms, it blends European neoclassical elements with Awadhi sensibilities, though now mostly in ruins.",
  imageUrl: "/images/Begum-Kothi.jpg",
  yearBuilt: "c. 1820",
  location: "Kaiserbagh Road, Lucknow, Uttar Pradesh",
  visitingHours: "Sunrise to Sunset",
  entryFee: "₹15",
  architect: "Court architects",
  audioFile: "begum-kothi-audio1.mp3",
  tags: ["Residence", "Neoclassical", "Begum", "Royal", "Ruins"],
  rating: 3.8,
  reviews: 98,
  audioLength: "2:26",
  category: "Historical Building",
  significance: "Reflected status of royal women in Awadh",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Dilkusha Kothi", "Kaiserbagh Palace"],
  architecturalStyle: "Neoclassical-European",
  materials: ["Brick", "Stucco"],
  historicalPeriod: "Early 19th Century",
  culturalImportance: "Monument to Begums’ heritage and influence"
},
{
  id: "farhat-baksh-kothi",
  name: "Farhat Baksh Kothi",
  shortDescription: "Once Nawab Saadat Ali Khan's residence, later the seat of British power.",
  fullDescription:
    "Farhat Baksh Kothi, located in Qaiserbagh, was originally built by Nawab Saadat Ali Khan and served as a royal residence. After the fall of Awadh, it became the official residence of General Outram, symbolizing the British takeover. The kothi features European-style arcades, tall windows, and spacious lawns.",
  imageUrl: "/images/Farhat-Baksh.jpg",
  yearBuilt: "Early 19th Century",
  location: "Qaiserbagh, Lucknow, Uttar Pradesh",
  visitingHours: "9:00 AM - 5:00 PM",
  entryFee: "Free",
  architect: "Awadhi and British Engineers",
  audioFile: "farhat-baksh-audio1.mp3",
  tags: ["Residence", "Colonial", "Nawab", "British", "Politics"],
  rating: 4.1,
  reviews: 76,
  audioLength: "2:22",
  category: "Colonial Era Building",
  significance: "Transition site from Nawabi to British rule",
  bestTimeToVisit: "November to February",
  nearbyAttractions: ["Begum Kothi", "Kaiserbagh Palace"],
  architecturalStyle: "Indo-European",
  materials: ["Brick", "Stucco", "Wood"],
  historicalPeriod: "Colonial Era",
  culturalImportance: "Political and cultural convergence point in 19th century Awadh"
},

{
  id: "darshan-vilas-kothi",
  name: "Darshan Vilas Kothi",
  shortDescription: "A scenic riverside haveli built for royal leisure and celebrations.",
  fullDescription:
    "Darshan Vilas Kothi was designed to offer panoramic views of the Gomti River and served as a retreat for Nawabi royalty. With expansive terraces and serene gardens, it was often used for royal gatherings and cultural performances.",
  imageUrl: "/images/Darshan-Vilas.jpg",
  yearBuilt: "Mid 19th Century",
  location: "Riverside, Lucknow",
  visitingHours: "10:00 AM - 6:00 PM",
  entryFee: "₹20",
  architect: "Awadhi Royal Architects",
  audioFile: "darshan-vilas-audio1.mp3",
  tags: ["Royal Retreat", "Garden", "Riverfront", "Culture"],
  rating: 4.0,
  reviews: 42,
  audioLength: "2:47",
  category: "Leisure Palace",
  significance: "Venue for royal relaxation and cultural events",
  bestTimeToVisit: "October to March",
  nearbyAttractions: ["Moti Mahal", "Chattar Manzil"],
  architecturalStyle: "Indo-Persian",
  materials: ["Plaster", "Brick", "Stucco"],
  historicalPeriod: "Nawabi Era",
  culturalImportance: "Hosted traditional music and dance performances"
},
{
  id: "hayat-baksh-kothi",
  name: "Hayat Baksh Kothi",
  shortDescription: "Part of the British Residency complex, linked to the 1857 revolt.",
  fullDescription:
    "Hayat Baksh Kothi, embedded within the Lucknow Residency, was an important structure during the 1857 First War of Independence. Used by British officers, the building now stands in ruins, echoing the turbulent colonial past.",
  imageUrl: "/images/Hayat-Baksh.jpg",
  yearBuilt: "Before 1857",
  location: "Residency Complex, Lucknow",
  visitingHours: "8:00 AM - 6:00 PM",
  entryFee: "₹25 for Indians, ₹200 for Foreigners",
  architect: "British Military Engineers",
  audioFile: "hayat-baksh-audio1.mp3",
  tags: ["Residency", "Revolt", "Colonial", "Military"],
  rating: 4.2,
  reviews: 91,
  audioLength: "1:56",
  category: "Colonial Military Building",
  significance: "Historic structure from 1857 uprising",
  bestTimeToVisit: "Winter Months",
  nearbyAttractions: ["Residency Ruins", "Tomb of Sadat Ali Khan"],
  architecturalStyle: "British Colonial",
  materials: ["Stone", "Mortar", "Iron"],
  historicalPeriod: "Colonial Period",
  culturalImportance: "A war-scarred monument of resistance and change"
},
{
  id: "mubarak-manzil",
  name: "Mubarak Manzil",
  shortDescription: "A graceful palace known for its Nawabi luxury and artistry.",
  fullDescription:
    "Mubarak Manzil stands as a symbol of refined Nawabi taste. Once a home to nobility, it is adorned with delicate jaalis, wide verandahs, and arch-framed windows. The haveli tells stories of Lucknow’s sophisticated lifestyle and courtly grace.",
  imageUrl: "/images/Mubarak-Manzil.jpg",
  yearBuilt: "Early 19th Century",
  location: "Qaiserbagh, Lucknow",
  visitingHours: "9:30 AM - 5:30 PM",
  entryFee: "Free",
  architect: "Awadhi Craftsmen",
  audioFile: "mubarak-manzil-audio1.mp3",
  tags: ["Nawab", "Luxury", "Heritage", "Jaalis"],
  rating: 4.3,
  reviews: 64,
  audioLength: "2:07",
  category: "Royal Mansion",
  significance: "Showcases Nawabi opulence and architecture",
  bestTimeToVisit: "October to February",
  nearbyAttractions: ["Kaiserbagh Complex", "Chattar Manzil"],
  architecturalStyle: "Awadhi Royal",
  materials: ["Lime Plaster", "Wood", "Chuna"],
  historicalPeriod: "Nawabi Period",
  culturalImportance: "Reflected the zenana and durbar culture of the era"
},
{
  id: "kothi-roshan-ud-daula",
  name: "Kothi Roshan-ud-Daula",
  shortDescription: "Built by Roshan-ud-Daula, a powerful minister in Nawab Asaf-ud-Daula’s court.",
  fullDescription:
    "Kothi Roshan-ud-Daula was commissioned by one of the most influential nobles of Awadh. Featuring symmetrical courtyards and a façade with delicate ornamentation, it was a hub of elite political and cultural life in the 18th century.",
  imageUrl: "/images/Roshan-ud-Daula.jpg",
  yearBuilt: "Late 18th Century",
  location: "Old Lucknow",
  visitingHours: "10:00 AM - 5:00 PM",
  entryFee: "₹10",
  architect: "Awadhi and Mughal Engineers",
  audioFile: "roshan-daula-audio1.mp3",
  tags: ["Minister", "Politics", "Royal Court", "Architecture"],
  rating: 4.1,
  reviews: 55,
  audioLength: "1:32",
  category: "Noble Residence",
  significance: "Reflects political power and artistic flair of Awadh nobility",
  bestTimeToVisit: "Morning hours",
  nearbyAttractions: ["Bara Imambara", "Teele Wali Masjid"],
  architecturalStyle: "Mughal-Awadhi Fusion",
  materials: ["Stone", "Stucco", "Carved Wood"],
  historicalPeriod: "18th Century",
  culturalImportance: "Important site in the social fabric of Nawabi Lucknow"
},
{
  id: "kothi-noor-baksh",
  name: "Kothi Noor Baksh",
  shortDescription: "An elegant kothi reflecting refined Mughal-Awadhi lifestyle.",
  fullDescription:
    "Kothi Noor Baksh exemplifies the gracious Nawabi lifestyle with its calm courtyards, delicately designed balconies, and airy interiors. The kothi was used both as a residence and cultural venue, known for its mehfils and poetry recitations.",
  imageUrl: "/images/Noor-Baksh1.jpg",
  yearBuilt: "19th Century",
  location: "Central Lucknow",
  visitingHours: "9:00 AM - 6:00 PM",
  entryFee: "Free",
  architect: "Local Architects of Lucknow",
  audioFile: "noor-baksh-audio1.mp3",
  tags: ["Culture", "Mehfil", "Residence", "Architecture"],
  rating: 3.9,
  reviews: 33,
  audioLength: "1:55",
  category: "Residential Haveli",
  significance: "Hosted literary gatherings and Nawabi hospitality",
  bestTimeToVisit: "Evenings",
  nearbyAttractions: ["Moti Mahal", "Begum Hazrat Mahal Park"],
  architecturalStyle: "Awadhi Haveli",
  materials: ["Lime Plaster", "Wood", "Glass"],
  historicalPeriod: "Post-Mughal Period",
  culturalImportance: "Center of poetry, hospitality, and classical music"
},
{
  id: "khursheed-manzil",
  name: "Khursheed Manzil",
  shortDescription: "Palace of Begum Khursheed, known for its pivotal role in 1857.",
  fullDescription:
    "Built by Nawab Ghazi-ud-Din Haider for his beloved wife, Begum Khursheed, this haveli later became a battleground during the revolt of 1857. Its semi-circular façade and majestic lawn reflect its grandeur, now functioning as an educational institution.",
  imageUrl: "/images/Khursheed-manzil.jpg",
  yearBuilt: "Early 19th Century",
  location: "Hazratganj, Lucknow",
  visitingHours: "Monday to Saturday, 9:00 AM - 4:00 PM",
  entryFee: "Restricted Entry (Institutional Use)",
  architect: "Awadhi Royal Court",
  audioFile: "khursheed-manzil-audio1.mp3",
  tags: ["Battle", "Begum", "Architecture", "Education"],
  rating: 4.0,
  reviews: 71,
  audioLength: "1:56",
  category: "Royal Residence & Historic Site",
  significance: "Linked to royal love and national struggle",
  bestTimeToVisit: "Weekdays (with permission)",
  nearbyAttractions: ["Hazratganj", "Residency"],
  architecturalStyle: "Circular Awadhi",
  materials: ["Brick", "Stucco", "Glass"],
  historicalPeriod: "Nawabi Era + Colonial Resistance",
  culturalImportance: "Feminine legacy and rebellion under one roof"
},
{
  id: "moti-mahal",
  name: "Moti Mahal",
  shortDescription: "‘Palace of Pearls’ used for royal observation over the Gomti River.",
  fullDescription:
    "Moti Mahal, a pearl among Lucknow’s monuments, was part of a group of palaces used to watch elephant fights and river ceremonies. Its balconies offered royal views over the Gomti. Today, its domes and charm continue to mesmerize visitors.",
  imageUrl: "/images/Moti-Mahal.jpg",
  yearBuilt: "Mid 19th Century",
  location: "Qaiserbagh, Lucknow",
  visitingHours: "10:00 AM - 5:00 PM",
  entryFee: "₹20",
  architect: "Royal Architects of Awadh",
  audioFile: "moti-mahal-audio1.mp3",
  tags: ["Pearls", "Riverfront", "Royal", "Panoramic"],
  rating: 4.4,
  reviews: 82,
  audioLength: "1:46",
  category: "Royal Observatory Palace",
  significance: "Used by Nawabs to enjoy festive riverfront spectacles",
  bestTimeToVisit: "Late Afternoon",
  nearbyAttractions: ["Kaiserbagh", "Darshan Vilas"],
  architecturalStyle: "Awadhi-Persian",
  materials: ["White Plaster", "Tile", "Iron"],
  historicalPeriod: "Nawabi Period",
  culturalImportance: "Symbol of Lucknow’s architectural elegance"
},
{
  id: "taluqdar-havelis",
  name: "Taluqdar Havelis",
  shortDescription: "Residences of feudal landlords—pillars of Awadh’s zamindari legacy.",
  fullDescription:
    "Taluqdar Havelis were grand estates owned by hereditary landlords (taluqdars) under the Nawabi and later British regimes. Spread across Lucknow and nearby areas, these havelis were known for hosting lavish durbars and maintaining regional control.",
  imageUrl: "/images/Taluqdar-Havelis.jpg",
  yearBuilt: "18th–19th Century",
  location: "Scattered across Lucknow",
  visitingHours: "By permission only",
  entryFee: "Private Property",
  architect: "Local Master Builders",
  audioFile: "taluqdar-havelis-audio1.mp3",
  tags: ["Feudal", "Landlords", "Heritage", "Legacy"],
  rating: 4.0,
  reviews: 58,
  audioLength: "1:51",
  category: "Heritage Residences",
  significance: "Symbol of Awadh’s feudal and administrative structure",
  bestTimeToVisit: "By local guide",
  nearbyAttractions: ["Rural Estates", "Old Town Areas"],
  architecturalStyle: "Rural Nawabi",
  materials: ["Brick", "Mud Plaster", "Wood"],
  historicalPeriod: "Feudal Era",
  culturalImportance: "Cultural continuity of rural elite in post-Mughal India"
},



]

export default function HaveliDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [mounted, setMounted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Find haveli from filteredHavelis
  const haveli = filteredHavelis.find((h) => h.id === id)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: haveli?.name,
          text: haveli?.shortDescription,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }
   
  const handleDownloadGuide = () => {
  if (!haveli) return;

  const doc = new jsPDF();

  // ✅ Add Logo / Title Text
  doc.setTextColor(70, 130, 180); // Steel Blue color
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("HERITAGE HAVENS LUCKNOW", 10, 15);

  // ✅ Haveli Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(haveli.name, 10, 30);

  // ✅ Haveli Info Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const lines = [
    `Location: ${haveli.location}`,
    `Year Built: ${haveli.yearBuilt}`,
    `Architect: ${haveli.architect}`,
    `Entry Fee: ${haveli.entryFee}`,
    `Visiting Hours: ${haveli.visitingHours}`,
    `Category: ${haveli.category}`,
    `Significance: ${haveli.significance}`,
    `Best Time to Visit: ${haveli.bestTimeToVisit}`,
    `Nearby Attractions: ${haveli.nearbyAttractions.join(", ")}`,
    `Architectural Style: ${haveli.architecturalStyle}`,
    `Materials: ${haveli.materials.join(", ")}`,
    `Historical Period: ${haveli.historicalPeriod}`,
    `Cultural Importance: ${haveli.culturalImportance}`,
    ``,
    `Short Description:`,
    haveli.shortDescription,
    ``,
    `Full Description:`,
    haveli.fullDescription,
  ];

  const content = doc.splitTextToSize(lines.join("\n"), 180);
  doc.text(content, 10, 40);

  // ✅ Save the file
  doc.save(`${haveli.name.replace(/\s+/g, "_")}_Guide.pdf`);
};
    
  
  
  
  

  
  
  
  
  
  
  if (!mounted) return null

  if (!haveli) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Haveli Not Found</h1>
        <p className="mb-8">The haveli you are looking for does not exist.</p>
        <Link href="/explore">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Havelis
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/havelis">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Havelis
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadGuide}>
            <Download className="mr-2 h-4 w-4" />
            Guide
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-6">
            <img src={haveli.imageUrl || "/placeholder.svg"} alt={haveli.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-black/50 text-white">
                {haveli.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-black/50 text-white">
                <Star className="mr-1 h-3 w-3 fill-current" />
                {haveli.rating} ({haveli.reviews})
              </Badge>
            </div>
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{haveli.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{haveli.shortDescription}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Built: {haveli.yearBuilt}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {haveli.location.split(",")[0]}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {haveli.reviews} reviews
              </span>
            </div>
          </div>

          {/* Audio Player */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">🎧</span>
                </div>
                Audio Guide
              </CardTitle>
              <CardDescription>
                Listen to the complete history and architectural details ({haveli.audioLength})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AudioPlayer
                audioSrc={`/audio/${haveli.audioFile}`}
                className="w-full"
                onProgressChange={setAudioProgress}
                onPlayStateChange={setIsPlaying}
              />
              <div className="mt-2">
                <Progress value={audioProgress} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="visit">Visit Info</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold mb-4">About {haveli.name}</h3>
                <p className="mb-6 leading-relaxed">{haveli.fullDescription}</p>

                <h4 className="text-lg font-semibold mb-3">Cultural Significance</h4>
                <p className="mb-4">{haveli.culturalImportance}</p>

                <h4 className="text-lg font-semibold mb-3">Historical Period</h4>
                <p className="mb-4">
                  This magnificent structure belongs to the {haveli.historicalPeriod}, representing the architectural
                  excellence and cultural prosperity of that era.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold mb-4">Architectural Details</h3>
                <p className="mb-4">
                  The haveli showcases the finest example of {haveli.architecturalStyle}, characterized by intricate
                  stone carvings, elaborate jharokhas, and detailed facade work.
                </p>

                <h4 className="text-lg font-semibold mb-3">Construction Materials</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {haveli.materials.map((material) => (
                    <Badge key={material} variant="outline">
                      {material}
                    </Badge>
                  ))}
                </div>

                <h4 className="text-lg font-semibold mb-3">Architectural Features</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Intricate stone lattice work (jali) allowing natural ventilation</li>
                  <li>Elaborate jharokhas (overhanging balconies) with detailed carvings</li>
                  <li>Traditional courtyard design for climate control</li>
                  <li>Ornate doorways and window frames with geometric patterns</li>
                  <li>Decorative brackets supporting the upper floors</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold mb-4">Historical Background</h3>
                <p className="mb-4">
                  Built during the prosperous era of trade routes, this haveli stands as a testament to the wealth and
                  artistic patronage of merchant families in Rajasthan.
                </p>

                <h4 className="text-lg font-semibold mb-3">Timeline</h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">1800</p>
                    <p className="text-muted-foreground">Construction began under the patronage of wealthy merchants</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">1860</p>
                    <p className="text-muted-foreground">Final completion of all sections of the haveli complex</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">1950s</p>
                    <p className="text-muted-foreground">Recognition as an important heritage structure</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-semibold">Present</p>
                    <p className="text-muted-foreground">Protected monument and major tourist attraction</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visit" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold mb-4">Planning Your Visit</h3>

                <h4 className="text-lg font-semibold mb-3">Best Time to Visit</h4>
                <p className="mb-4">
                  {haveli.bestTimeToVisit} - The weather is pleasant and ideal for exploring the intricate architectural
                  details.
                </p>

                <h4 className="text-lg font-semibold mb-3">Photography Tips</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Early morning light (7-9 AM) provides the best illumination for facade details</li>
                  <li>Golden hour (5-7 PM) creates dramatic shadows highlighting the stone work</li>
                  <li>Use a wide-angle lens to capture the full grandeur of the structure</li>
                  <li>Focus on intricate details like jharokhas and carved brackets</li>
                </ul>

                <h4 className="text-lg font-semibold mb-3">Nearby Attractions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {haveli.nearbyAttractions.map((attraction) => (
                    <div key={attraction} className="flex items-center gap-2 p-2 border rounded">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Quick Info Card - Sticky */}
            <Card className="bottom top-4">
              
              <CardHeader>
                <CardTitle>Visit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Year Built</p>
                    <p className="text-muted-foreground">{haveli.yearBuilt}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{haveli.location}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Visiting Hours</p>
                    <p className="text-muted-foreground">{haveli.visitingHours}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Ticket className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Entry Fee</p>
                    <p className="text-muted-foreground">{haveli.entryFee}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">
                    <span className="font-serif italic">A</span>
                  </div>
                  <div>
                    <p className="font-medium">Architect</p>
                    <p className="text-muted-foreground">{haveli.architect}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-2">Significance</p>
                  <Badge variant="secondary" className="text-xs">
                    {haveli.significance}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tags - Fixed position, no sticky */}
            <Card>
              
              
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {haveli.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-[#49ce71] text-black border-[#49ce71]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
              </CardContent>
            </Card>

            {/* Reviews Preview - Fixed position, no sticky */}
            <Card>
              <Card className="sticky bottom-4"></Card>
              
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>What visitors are saying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder1.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">John Doe</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Absolutely stunning architecture! The audio guide was very informative."
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder2.png" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">Maria Silva</p>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                        ))}
                        <Star className="h-3 w-3 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Rich history and beautiful craftsmanship. Worth the visit!"
                    </p>
                  </div>
                </div>

                
                 
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
