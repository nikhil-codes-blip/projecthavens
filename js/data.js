// Heritage Havens Lucknow - Data
const haveliData = [
  {
    id: 1,
    name: "Chhatar Manzil",
    description:
      "A magnificent palace complex built during the Nawabi era, featuring Indo-European architecture with beautiful gardens and water features.",
    period: "1780-1850",
    status: "preserved",
    location: "Gomti Nagar",
    architect: "Unknown",
    style: "Indo-European",
    significance: "Former residence of Nawabs",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details:
      "Chhatar Manzil, also known as the Umbrella Palace, is one of the most iconic structures in Lucknow. Built during the reign of Nawab Ghazi-ud-Din Haider, this palace complex showcases the finest example of Indo-European architecture. The palace gets its name from the distinctive umbrella-shaped dome that crowns the main building. The complex includes beautiful gardens, fountains, and intricate architectural details that reflect the grandeur of the Nawabi era. Today, it serves as a symbol of Lucknow's rich cultural heritage and architectural brilliance.",
  },
  {
    id: 2,
    name: "Dilkusha Kothi",
    description:
      "An 18th-century country house built in English Baroque style, once serving as a hunting lodge and summer retreat for the Nawabs.",
    period: "1800-1857",
    status: "ruins",
    location: "Dilkusha",
    architect: "Gore Ouseley",
    style: "English Baroque",
    significance: "Historical hunting lodge",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details:
      "Dilkusha Kothi stands as a testament to the architectural fusion that characterized Lucknow during the Nawabi period. Built by Gore Ouseley for Nawab Saadat Ali Khan, this English Baroque style mansion served as a hunting lodge and summer retreat. The name 'Dilkusha' means 'heart's delight,' reflecting the pleasure the Nawabs derived from this beautiful estate. Though now in ruins, the remaining structure still showcases the grandeur of its past, with its distinctive towers and European architectural elements that were rare in Indian palaces of that era.",
  },
  {
    id: 3,
    name: "Constantia House",
    description:
      "A neoclassical mansion built by Major General Claude Martin, showcasing European architectural influences in Mughal India.",
    period: "1785-1800",
    status: "restored",
    location: "La Martiniere",
    architect: "Claude Martin",
    style: "Neoclassical",
    significance: "Educational institution",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details:
      "Constantia House, now known as La Martiniere College, represents one of the finest examples of neoclassical architecture in India. Built by Major General Claude Martin, a French soldier of fortune who served in the British East India Company, this magnificent structure was designed as his residence and mausoleum. The building features a unique blend of European and Indian architectural elements, with its imposing facade, ornate interiors, and beautiful gardens. Today, it continues to serve as one of India's most prestigious educational institutions, preserving the legacy of its eccentric founder.",
  },
  {
    id: 4,
    name: "Chattar Manzil Palace",
    description: "An exquisite example of Awadhi architecture with intricate stucco work and beautiful courtyards.",
    period: "1820-1840",
    status: "preserved",
    location: "Old City",
    architect: "Nawabi Court Architects",
    style: "Awadhi",
    significance: "Royal residence",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details:
      "Chattar Manzil Palace stands as a magnificent example of Awadhi architectural excellence. Built during the golden period of the Nawabi rule, this palace showcases the sophisticated taste and artistic sensibilities of the Awadhi court. The palace features intricate stucco work, beautiful courtyards, and ornate chambers that reflect the luxury and grandeur of the Nawabi lifestyle. The architectural details include delicate floral motifs, geometric patterns, and calligraphy that demonstrate the high level of craftsmanship achieved during this period.",
  },
  {
    id: 5,
    name: "Roshan-ud-Daula Kothi",
    description: "A beautiful mansion showcasing the transition from Mughal to colonial architectural styles.",
    period: "1790-1820",
    status: "restored",
    location: "Hazratganj",
    architect: "Court Architects",
    style: "Transitional",
    significance: "Architectural evolution",
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details:
      "Roshan-ud-Daula Kothi represents a fascinating period in Lucknow's architectural history when traditional Mughal styles began incorporating European elements. This mansion beautifully demonstrates the transitional phase in Indian architecture, featuring traditional Islamic arches alongside European-style windows and decorative elements. The building serves as an important study in architectural evolution, showing how local craftsmen adapted and integrated foreign influences while maintaining their cultural identity.",
  },
  {
    id: 6,
    name: "Moti Mahal",
    description: "The Pearl Palace, known for its delicate architecture and beautiful pearl-like decorations.",
    period: "1830-1850",
    status: "preserved",
    location: "Qaiserbagh",
    architect: "Nawabi Architects",
    style: "Late Awadhi",
    significance: "Architectural gem",
    image: "/images/Moti-Mahal.jpg?height=300&width=400",
    images: [
      "/images/Moti-Mahal.jpg?height=400&width=600",
      "/images/Moti-Mahal.jpg?height=400&width=600",
      "/images/Moti-Mahal.jpg?height=400&width=600",
    ],
    details:
      "Moti Mahal, or the Pearl Palace, earned its name from the exquisite pearl-like decorations that adorn its walls and ceilings. This palace represents the pinnacle of late Awadhi architecture, featuring delicate stucco work, intricate mirror work, and beautiful frescoes. The palace was designed as a private retreat for the royal family, with intimate chambers and beautiful gardens that provided a peaceful escape from court life. The architectural details showcase the refinement and sophistication that characterized the final phase of Nawabi rule in Lucknow.",
  },
]

const categories = [
  {
    id: "palaces",
    title: "Royal Palaces",
    description: "Magnificent palaces that housed the Nawabs and their courts",
    icon: "🏰",
    count: 12,
  },
  {
    id: "mansions",
    title: "Noble Mansions",
    description: "Elegant residences of nobles and wealthy merchants",
    icon: "🏛️",
    count: 18,
  },
  {
    id: "gardens",
    title: "Garden Houses",
    description: "Beautiful garden retreats and summer houses",
    icon: "🌺",
    count: 8,
  },
  {
    id: "religious",
    title: "Religious Sites",
    description: "Sacred spaces and religious architecture",
    icon: "🕌",
    count: 15,
  },
]

const searchData = [
  ...haveliData.map((haveli) => ({
    type: "haveli",
    id: haveli.id,
    title: haveli.name,
    description: haveli.description,
    url: `haveli-detail.html?id=${haveli.id}`,
  })),
  ...categories.map((category) => ({
    type: "category",
    id: category.id,
    title: category.title,
    description: category.description,
    url: `havelis.html?category=${category.id}`,
  })),
]

// Export data for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { haveliData, categories, searchData }
}
