export interface MediaItem {
  id: string;
  type: "youtube" | "facebook";
  videoId?: string;
  url: string;
  category: string;
  platform: "YouTube" | "Facebook";
  title: string;
  description?: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: "media-1",
    type: "youtube",
    videoId: "DKexCzTU88w",
    url: "https://youtu.be/DKexCzTU88w?si=sHGQahOAzQsaG228",
    category: "School Canteen / Student Health",
    platform: "YouTube",
    title:
      "ग्लोबल पेरेंट्स टीचर्स असोसिएशन अध्यक्ष रोहित अलका श्यामसुंदर दंडवते यांच्या पत्राची दखल घेत राज्यात सर्वात मोठी कार्यवाही. शाळेच्या उपवरगृहावर (School Canteen) अन्न व औषध प्रशासन (FDA) आयुक्त तुकाराम मुंढे यांच्याकडून नियमावली जाहीर आता शाळेच्या ५० मीटरच्या आवारात चॉकलेट बिस्किटवर बंदी. मुलांच्या आरोग्याच्या दृष्टिकोनातून खूपच चांगली बाब आहे त्याचबरोबर शाळा मुख्याध्यापक व संस्थाचालक यांना नम्र विनंती आहे की शाळेमध्ये फ्रूट डे, व्हेジットेबल डे साजरे होण्यासाठी पुढाकार घ्यावा ही नम्र विनंती.",
  },
  {
    id: "media-2",
    type: "facebook",
    url: "https://www.facebook.com/share/v/18bpMBaEaF/",
    category: "Education / Drug Awareness",
    platform: "Facebook",
    title:
      "ग्लोबल पेरेंट्स टीचर्स असोसिएशनच्या मागणीला यश — ड्रग्स वर घाव, आता सातवी पासून शाळेत व्यसनमुक्तीचे देणार धडे",
    description:
      "दिनांक ०८.०८.२०२६ रोजी माननीय मुख्यमंत्री श्री देवेंद्र फडणीस साहेब यांना शालेय व महाविद्यालयीन विद्यार्थ्यांच्या प्रबोधनासाठी अमली पदार्थ (ड्रग्स) सेवनाचे दुष्परिणाम याचा शैक्षणिक अभ्यासक्रमात समावेश करण्याबाबत पत्र लिहिले होते. सदर पत्राची दखल घेत सह्याद्री अतिथिगृहातील 'अमली पदार्थ मुक्त महाराष्ट्र' या कृती आराखड्याच्या बैठकीत सातवी ते दहावीच्या अभ्यासक्रमात अमली पदार्थांच्या दुष्परिणामांचा समावेश करण्याची सूचना करण्यात आली.",
  },
  {
    id: "media-3",
    type: "youtube",
    videoId: "6RP-zSA4jZk",
    url: "https://youtube.com/shorts/6RP-zSA4jZk?si=HzRH7MjkPgefMhvP",
    category: "Drug Awareness / Education",
    platform: "YouTube",
    title:
      "ग्लोबल पेरेंट्स टीचर्स असोसिएशनच्या मागणीला यश — ड्रग्स वर घाव, आता सातवी पासून शाळेत व्यसनमुक्तीचे देणार धडे",
  },
  {
    id: "media-4",
    type: "youtube",
    videoId: "ifIpb5MPKHA",
    url: "https://youtube.com/shorts/ifIpb5MPKHA?si=kHVbiiEPn5L0RVMx",
    category: "School Canteen / Student Health",
    platform: "YouTube",
    title:
      "ग्लोबल पेरेंट्स टीचर्स असोसिएशन अध्यक्ष रोहित अलका श्यामसुंदर दंडवते यांच्या पत्राची दखल घेत राज्यात सर्वात मोठी कार्यवाही — शाळेच्या उपवरगृहावर (School Canteen) अन्न व औषध प्रशासन (FDA) आयुक्त तुकाराम मुंढे यांची करडी नजर",
  },
];
