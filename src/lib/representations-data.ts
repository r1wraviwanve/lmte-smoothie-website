export interface RepresentationItem {
  id: number;
  number: string;
  title: string;
  date?: string;
  category?: string;
  image?: string;
  description?: string;
  url?: string;
}

export const representationsData: RepresentationItem[] = [
  {
    id: 1,
    number: "01",
    title: "शाळांना कायमस्वरूपी क्रीडांगण बंधनकारक करा!",
    date: "Aug 06, 2026",
    category: "School Infrastructure",
    image: "/images/representations/representation_01_sakal_playground.jpg",
    description: "ग्लोबल पेरेंट्स टीचर्स असोसिएशनने महापालिका आयुक्तांकडे प्रत्येक शाळेत ४०% कायमस्वरूपी क्रीडांगण अनिवार्य करण्याची केलेली अधिकृत मागणी.",
    url: "/images/representations/representation_01_sakal_playground.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "शाळांसाठी क्रीडांगण बंधनकारक करा — मनपाकडे मागणी",
    date: "Aug 06, 2026",
    category: "DCPR 2034 Compliance",
    image: "/images/representations/representation_02_punyanagari_ground.jpg",
    description: "डीसिपीआर २०३४ मधील नियम ३८ च्या उल्लंघनाविरुद्ध आणि विद्यार्थ्यांच्या सुरक्षिततेसाठी मनपा आयुक्तांना सादर केलेले अधिकृत निवेदन.",
    url: "/images/representations/representation_02_punyanagari_ground.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Playground Regulations & Student Stress Reduction",
    date: "Sep 19, 2026",
    category: "Student Welfare",
    image: "/images/representations/representation_03_midday_mundhe.jpg",
    description: "Representation on reforming school education landscape, auditing private schools violating playground norms, and prioritizing child physical health.",
    url: "/images/representations/representation_03_midday_mundhe.jpg",
  },
];
