"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowLeft,
  Headphones,
  ExternalLink,
  ArrowUp,
} from "lucide-react"

interface Haveli {
  id: string
  name: string
  location: string
  era: string
  highlight: string

  image: string
  description: string
  rating: number
  reviews: number
  timings: string
  category: "visit" | "stay" | "dine"
  coordinates: {
    lat: number
    lng: number
  }
  wikiTitle: string
  audioFile: string
}

const translations = {
  en: {
    siteTitle: "Heritage Havens Lucknow",
    pageTitle: "Explore Historic Havelis",
    pageSubtitle:
      "Discover the magnificent havelis and heritage landmarks of Lucknow with detailed information, audio guides, and interactive maps.",
    searchPlaceholder: "Search havelis...",
    viewDetails: "View Details",
    playAudio: "Play Audio Guide",
    viewOnMap: "View on Map",
    scanQR: "Scan QR Code",
    backToHome: "Back to Home",
    allCategories: "All Categories",
    visitCategory: "Visit",
    stayCategory: "Stay",
    dineCategory: "Dine",
    noResults: "No havelis found matching your search.",
    loading: "Loading haveli information...",
    wikiSource: "Source: Wikipedia",
    contact: "Contact",
    followUs: "Follow Us",
    allRights: "All rights reserved.",
    qrCodeTitle: "Wikipedia QR Code",
    qrCodeDescription: "Scan this QR code to read more about this monument on Wikipedia",
    quickLinks: "Quick Links",
    heritageSites: "Heritage Sites",
    home: "Home",
    explore: "Explore",
    havelis: "Havelis",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    heritageTeam: "Heritage Havens Team",
  },
  hi: {
    siteTitle: "हेरिटेज हेवन्स लखनऊ",
    pageTitle: "ऐतिहासिक हवेलियों का अन्वेषण करें",
    pageSubtitle: "विस्तृत जानकारी, ऑडियो गाइड और इंटरैक्टिव मैप्स के साथ लखनऊ की शानदार हवेलियों और विरासत स्थलों की खोज करें।",
    searchPlaceholder: "हवेलियां खोजें...",
    viewDetails: "विवरण देखें",
    playAudio: "ऑडियो गाइड चलाएं",
    viewOnMap: "मैप पर देखें",
    scanQR: "क्यूआर कोड स्कैन करें",
    backToHome: "होम पर वापस जाएं",
    allCategories: "सभी श्रेणियां",
    visitCategory: "देखें",
    stayCategory: "रहें",
    dineCategory: "भोजन",
    noResults: "आपकी खोज से मेल खाने वाली कोई हवेली नहीं मिली।",
    loading: "हवेली की जानकारी लोड हो रही है...",
    wikiSource: "स्रोत: विकिपीडिया",
    contact: "संपर्क",
    followUs: "हमें फॉलो करें",
    allRights: "सभी अधिकार सुरक्षित।",
    qrCodeTitle: "विकिपीडिया क्यूआर कोड",
    qrCodeDescription: "इस स्मारक के बारे में विकिपीडिया पर और पढ़ने के लिए इस क्यूआर कोड को स्कैन करें",
    quickLinks: "त्वरित लिंक",
    heritageSites: "विरासत स्थल",
    home: "होम",
    explore: "अन्वेषण",
    havelis: "हवेलियां",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    heritageTeam: "हेरिटेज हेवन्स टीम",
  },
  ur: {
    siteTitle: "ہیریٹیج ہیونز لکھنؤ",
    pageTitle: "تاریخی حویلیوں کی تلاش کریں",
    pageSubtitle:
      "تفصیلی معلومات، آڈیو گائیڈز اور انٹرایکٹو نقشوں کے ساتھ لکھنؤ کی شاندار حویلیوں اور ورثہ مقامات کو دریافت کریں۔",
    searchPlaceholder: "حویلیاں تلاش کریں...",
    viewDetails: "تفصیلات دیکھیں",
    playAudio: "آڈیو گائیڈ چلائیں",
    viewOnMap: "نقشے پر دیکھیں",
    scanQR: "کیو آر کوڈ اسکین کریں",
    backToHome: "گھر واپس جائیں",
    allCategories: "تمام اقسام",
    visitCategory: "دیکھیں",
    stayCategory: "قیام",
    dineCategory: "کھانا",
    noResults: "آپ کی تلاش سے میل کھانے والی کوئی حویلی نہیں ملی۔",
    loading: "حویلی کی معلومات لوڈ ہو رہی ہیں...",
    wikiSource: "ماخذ: ویکیپیڈیا",
    contact: "رابطہ",
    followUs: "ہمیں فالو کریں",
    allRights: "تمام حقوق محفوظ ہیں۔",
    qrCodeTitle: "ویکیپیڈیا کیو آر کوڈ",
    qrCodeDescription: "اس یادگار کے بارے میں ویکیپیڈیا پر مزید پڑھنے کے لیے اس کیو آر کوڈ کو اسکین کریں",
    quickLinks: "فوری لنکس",
    heritageSites: "ورثہ مقامات",
    home: "گھر",
    explore: "تلاش",
    havelis: "حویلیاں",
    privacyPolicy: "رازداری کی پالیسی",
    termsOfService: "خدمات کی شرائط",
    heritageTeam: "ہیریٹیج ہیونز ٹیم",
  },
}

const haveliTranslations = {
  en: {
    // Keep original data as is
  },
  hi: {
    "bara-imambara": {
      name: "बड़ा इमामबाड़ा",
      location: "पुराना लखनऊ",
      highlight: "वास्तुकला का चमत्कार",
      description:
        "बड़ा इमामबाड़ा आसफ-उद-दौला द्वारा निर्मित एक वास्तुकला का चमत्कार है। अपने केंद्रीय हॉल और रहस्यमय भूल-भुलैया के लिए प्रसिद्ध।",
      timings: "सुबह 6:00 बजे - शाम 5:00 बजे",
    },
    "chhota-imambara": {
      name: "छोटा इमामबाड़ा",
      location: "हुसैनाबाद",
      highlight: "स्वर्णिम गुंबद स्वर्ग",
      description: "इमामबाड़ा हुसैनाबाद मुबारक के नाम से भी जाना जाता है, यह खूबसूरत झूमर और जटिल सजावट वाला शानदार स्मारक है।",
      timings: "सुबह 6:00 बजे - शाम 5:00 बजे",
    },
    "rumi-darwaza": {
      name: "रूमी दरवाजा",
      location: "पुराना लखनऊ",
      highlight: "इतिहास का प्रवेश द्वार",
      description: "एक भव्य प्रवेश द्वार जो लखनऊ के प्रतीक के रूप में खड़ा है, इस्तांबुल के सब्लाइम पोर्ते के आधार पर बनाया गया।",
      timings: "24 घंटे",
    },
    "clock-tower": {
      name: "हुसैनाबाद क्लॉक टावर",
      location: "हुसैनाबाद",
      highlight: "विक्टोरियन वास्तुकला",
      description: "भारत का सबसे ऊंचा क्लॉक टावर, विक्टोरियन गॉथिक शैली में ब्रिटिश वास्तुकला के प्रभाव के प्रतीक के रूप में निर्मित।",
      timings: "सुबह 9:00 बजे - शाम 6:00 बजे",
    },
    "dilkusha-kothi": {
      name: "दिलकुशा कोठी",
      location: "दिलकुशा",
      highlight: "विरासत निवास",
      description: "इस पुनर्स्थापित विरासत संपत्ति में ऐतिहासिक आकर्षण के साथ शाही जीवन का अनुभव करें।",
      timings: "चेक-इन: दोपहर 2:00 बजे",
    },
    "chattar-manzil": {
      name: "छत्तर मंजिल",
      location: "लखनऊ",
      highlight: "छतरी के आकार का गुंबद",
      description: "नवाबों का पूर्व महल, अपने अनूठे छतरी के आकार के गुंबद और भारतीय-यूरोपीय वास्तुकला के लिए जाना जाता है।",
      timings: "सुबह 10:00 बजे - शाम 5:00 बजे",
    },
    "safed-baradari": {
      name: "सफेद बारादरी",
      location: "कैसरबाग",
      highlight: "सफेद संगमरमर संरचना",
      description: "मूल रूप से 'शोक का महल' के रूप में निर्मित, अब सांस्कृतिक और सरकारी कार्यक्रमों के लिए उपयोग किया जाता है।",
      timings: "सुबह 9:00 बजे - शाम 6:00 बजे",
    },
    "la-martiniere": {
      name: "ला मार्टिनियर (कॉन्स्टेंशिया हाउस)",
      location: "ला मार्टिनियर कॉलेज",
      highlight: "अनूठी भारतीय-यूरोपीय शैली",
      description: "एक प्रतिष्ठित कॉलेज भवन, यूरोपीय और मुगल वास्तुकला का मिश्रण।",
      timings: "सुबह 8:00 बजे - शाम 4:00 बजे",
    },
    "kaiserbagh-palace": {
      name: "कैसरबाग पैलेस कॉम्प्लेक्स",
      location: "कैसरबाग",
      highlight: "शाही दरबार और बगीचे",
      description: "वाजिद अली शाह द्वारा निर्मित, इस परिसर में महल, दरबार और बगीचे शामिल थे।",
      timings: "सुबह 10:00 बजे - शाम 6:00 बजे",
    },
    "shah-najaf-imambara": {
      name: "शाह नजफ इमामबाड़ा",
      location: "गोमती नदी के पास",
      highlight: "गाजी-उद-दीन हैदर का मकबरा",
      description: "नवाब गाजी-उद-दीन हैदर और उनकी पत्नियों के लिए निर्मित मकबरा, इस्लामी वास्तुकला का प्रदर्शन।",
      timings: "सुबह 6:00 बजे - शाम 6:00 बजे",
    },
    "nadan-mahal": {
      name: "नादान महल",
      location: "हुसैनाबाद",
      highlight: "लखनऊ का पहला मुगल मकबरा",
      description: "सम्राट हुमायूं के युग के संत शेख इब्राहिम चिश्ती का मकबरा।",
      timings: "सुबह 9:00 बजे - शाम 5:00 बजे",
    },
    "begum-kothi": {
      name: "बेगम कोठी",
      location: "लखनऊ",
      highlight: "यूरोपीय बेगम का निवास",
      description: "लखनऊ की यूरोपीय बेगमों का घर, विशेष रूप से 1857 की ऐतिहासिक घटनाओं का हिस्सा।",
      timings: "सुबह 10:00 बजे - शाम 5:00 बजे",
    },
    "farhat-baksh-kothi": {
      name: "फरहत बख्श कोठी",
      location: "लखनऊ",
      highlight: "रेजीडेंसी अनुलग्नक",
      description: "नवाब गाजी-उद-दीन हैदर द्वारा उपयोग किया गया, अब लखनऊ विश्वविद्यालय परिसर का हिस्सा।",
      timings: "सुबह 10:00 बजे - शाम 5:00 बजे",
    },
    "darshan-vilas-kothi": {
      name: "दर्शन विलास कोठी",
      location: "अज्ञात",
      highlight: "शाही विश्राम स्थल",
      description: "कभी एक कुलीन निवास, अपने सौंदर्य आकर्षण और एकांत स्थान के लिए जाना जाता है।",
      timings: "सुबह 10:00 बजे - शाम 4:00 बजे",
    },
    "hayat-baksh-kothi": {
      name: "हयात बख्श कोठी",
      location: "लखनऊ विश्वविद्यालय परिसर",
      highlight: "ब्रिटिश युग अनुलग्नक",
      description: "लखनऊ विश्वविद्यालय का हिस्सा, मूल रूप से एक नवाबी भवन जो सैन्य और प्रशासनिक केंद्र के रूप में काम करता था।",
      timings: "सुबह 9:00 बजे - शाम 5:00 बजे",
    },
    "mubarak-manzil": {
      name: "मुबारक मंजिल",
      location: "हजरतगंज, लखनऊ",
      highlight: "शाही निवास से प्रशासनिक भवन",
      description:
        "एक सुंदर संरचना जो कभी शाही परिवार के लिए हवेली के रूप में काम करती थी, बाद में आधिकारिक उद्देश्यों के लिए उपयोग की गई।",
      timings: "सुबह 9:00 बजे - शाम 4:00 बजे",
    },
    "kothi-roshan-ud-daula": {
      name: "कोठी रोशन-उद-दौला",
      location: "हुसैनाबाद के पास",
      highlight: "रोशन-उद-दौला का दरबारी निवास",
      description: "यह कोठी अवध के शक्तिशाली रईस रोशन-उद-दौला के नाम पर रखी गई थी और मुगल डिजाइन संवेदनाओं को दर्शाती है।",
      timings: "सुबह 10:00 बजे - शाम 5:00 बजे",
    },
    "kothi-noor-baksh": {
      name: "कोठी नूर बख्श",
      location: "चौक क्षेत्र",
      highlight: "नवाबी डिजाइन के साथ आवासीय कोठी",
      description: "नवाबों की परिष्कृत जीवनशैली को दर्शाने वाली एक कम ज्ञात लेकिन खूबसूरती से तैयार की गई हवेली।",
      timings: "सुबह 9:00 बजे - शाम 5:00 बजे",
    },
    "khursheed-manzil": {
      name: "खुर्शीद मंजिल",
      location: "रेजीडेंसी के पास",
      highlight: "1857 विद्रोह घटनाओं का स्थल",
      description:
        "मूल रूप से नवाबों के लिए महल के रूप में निर्मित, बाद में 1857 के दौरान अंग्रेजों द्वारा कब्जा कर लिया गया और उपयोग किया गया।",
      timings: "सुबह 8:00 बजे - शाम 6:00 बजे",
    },
    "moti-mahal": {
      name: "मोती महल",
      location: "कैसरबाग",
      highlight: "गोमती को देखने वाला मोती महल",
      description: "गोमती नदी के दृश्य प्रदान करने वाला एक सुंदर महल परिसर, शाही मनोरंजन भवनों का हिस्सा।",
      timings: "सुबह 9:00 बजे - शाम 6:00 बजे",
    },
    "taluqdar-havelis": {
      name: "तालुकदार हवेलियां",
      location: "लखनऊ में विभिन्न स्थान",
      highlight: "जमींदारों की निजी हवेलियां",
      description: "अवध क्षेत्र के प्रभावशाली तालुकदारों की कुलीन हवेलियों का संग्रह।",
      timings: "निजी पहुंच / विरासत यात्राएं",
    },
  },
  ur: {
    "bara-imambara": {
      name: "بڑا امام بارگاہ",
      location: "پرانا لکھنؤ",
      highlight: "تعمیراتی شاہکار",
      description:
        "بڑا امام بارگاہ آصف الدولہ کی تعمیر کردہ ایک تعمیراتی شاہکار ہے۔ اپنے مرکزی ہال اور پراسرار بھول بھلیا کے لیے مشہور۔",
      timings: "صبح 6:00 بجے - شام 5:00 بجے",
    },
    "chhota-imambara": {
      name: "چھوٹا امام بارگاہ",
      location: "حسین آباد",
      highlight: "سنہری گنبد جنت",
      description:
        "امام بارگاہ حسین آباد مبارک کے نام سے بھی جانا جاتا ہے، یہ خوبصورت فانوسوں اور پیچیدہ سجاوٹ والا شاندار یادگار ہے۔",
      timings: "صبح 6:00 بجے - شام 5:00 بجے",
    },
    "rumi-darwaza": {
      name: "رومی دروازہ",
      location: "پرانا لکھنؤ",
      highlight: "تاریخ کا داخلی دروازہ",
      description:
        "ایک شاندار داخلی دروازہ جو لکھنؤ کی علامت کے طور پر کھڑا ہے، استنبول کے سبلائم پورٹے کی بنیاد پر بنایا گیا۔",
      timings: "24 گھنٹے",
    },
    "clock-tower": {
      name: "حسین آباد کلاک ٹاور",
      location: "حسین آباد",
      highlight: "وکٹورین فن تعمیر",
      description:
        "ہندوستان کا سب سے اونچا کلاک ٹاور، وکٹورین گوتھک طرز میں برطانوی تعمیراتی اثرات کی علامت کے طور پر تعمیر کیا گیا۔",
      timings: "صبح 9:00 بجے - شام 6:00 بجے",
    },
    "dilkusha-kothi": {
      name: "دلکشا کوٹھی",
      location: "دلکشا",
      highlight: "ورثہ رہائش",
      description: "اس بحال شدہ ورثہ املاک میں تاریخی دلکشی کے ساتھ شاہی زندگی کا تجربہ کریں۔",
      timings: "چیک ان: دوپہر 2:00 بجے",
    },
    "chattar-manzil": {
      name: "چھتر منزل",
      location: "لکھنؤ",
      highlight: "چھتری کی شکل کا گنبد",
      description:
        "نوابوں کا سابق محل، اپنے منفرد چھتری کی شکل کے گنبد اور ہندوستانی-یورپی فن تعمیر کے لیے جانا جاتا ہے۔",
      timings: "صبح 10:00 بجے - شام 5:00 بجے",
    },
    "safed-baradari": {
      name: "سفید بارہ دری",
      location: "قیصر باغ",
      highlight: "سفید سنگ مرمر کی ساخت",
      description: "اصل میں 'غم کے محل' کے طور پر تعمیر کیا گیا، اب ثقافتی اور سرکاری تقریبات کے لیے استعمال ہوتا ہے۔",
      timings: "صبح 9:00 بجے - شام 6:00 بجے",
    },
    "la-martiniere": {
      name: "لا مارٹینیئر (کانسٹینشیا ہاؤس)",
      location: "لا مارٹینیئر کالج",
      highlight: "منفرد ہندوستانی-یورپی طرز",
      description: "ایک مشہور کالج کی عمارت، یورپی اور مغل فن تعمیر کا امتزاج۔",
      timings: "صبح 8:00 بجے - شام 4:00 بجے",
    },
    "kaiserbagh-palace": {
      name: "قیصر باغ محل کمپلیکس",
      location: "قیصر باغ",
      highlight: "شاہی دربار اور باغات",
      description: "واجد علی شاہ کی تعمیر کردہ، اس کمپلیکس میں محل، دربار اور باغات شامل تھے۔",
      timings: "صبح 10:00 بجے - شام 6:00 بجے",
    },
    "shah-najaf-imambara": {
      name: "شاہ نجف امام بارگاہ",
      location: "گومتی ندی کے قریب",
      highlight: "غازی الدین حیدر کا مقبرہ",
      description: "نواب غازی الدین حیدر اور ان کی بیویوں کے لیے تعمیر کردہ مقبرہ، اسلامی فن تعمیر کا مظاہرہ۔",
      timings: "صبح 6:00 بجے - شام 6:00 بجے",
    },
    "nadan-mahal": {
      name: "نادان محل",
      location: "حسین آباد",
      highlight: "لکھنؤ کا پہلا مغل مقبرہ",
      description: "شیخ ابراہیم چشتی کا مقبرہ، جو شہنشاہ ہمایوں کے دور کے ولی تھے۔",
      timings: "صبح 9:00 بجے - شام 5:00 بجے",
    },
    "begum-kothi": {
      name: "بیگم کوٹھی",
      location: "لکھنؤ",
      highlight: "یورپی بیگم کی رہائش",
      description: "لکھنؤ کی یورپی بیگمات کا گھر، خاص طور پر 1857 کے تاریخی واقعات کا حصہ۔",
      timings: "صبح 10:00 بجے - شام 5:00 بجے",
    },
    "farhat-baksh-kothi": {
      name: "فرحت بخش کوٹھی",
      location: "لکھنؤ",
      highlight: "ریزیڈنسی ضمیمہ",
      description: "نواب غازی الدین حیدر کا استعمال کردہ، اب لکھنؤ یونیورسٹی کیمپس کا حصہ۔",
      timings: "صبح 10:00 بجے - شام 5:00 بجے",
    },
    "darshan-vilas-kothi": {
      name: "درشن ولاس کوٹھی",
      location: "نامعلوم",
      highlight: "شاہی تفریحی مقام",
      description: "کبھی ایک اشرافیہ کی رہائش، اپنی جمالیاتی دلکشی اور الگ مقام کے لیے جانا جاتا ہے۔",
      timings: "صبح 10:00 بجے - شام 4:00 بجے",
    },
    "hayat-baksh-kothi": {
      name: "حیات بخش کوٹھی",
      location: "لکھنؤ یونیورسٹی کیمپس",
      highlight: "برطانوی دور کا ضمیمہ",
      description: "لکھنؤ یونیورسٹی کا حصہ، اصل میں ایک نوابی عمارت جو فوجی اور انتظامی مرکز کا کام کرتی تھی۔",
      timings: "صبح 9:00 بجے - شام 5:00 بجے",
    },
    "mubarak-manzil": {
      name: "مبارک منزل",
      location: "حضرت گنج، لکھنؤ",
      highlight: "شاہی رہائش سے انتظامی عمارت",
      description:
        "ایک خوبصورت ساخت جو کبھی شاہی خاندان کے لیے حویلی کا کام کرتی تھی، بعد میں سرکاری مقاصد کے لیے استعمال ہوئی۔",
      timings: "صبح 9:00 بجے - شام 4:00 بجے",
    },
    "kothi-roshan-ud-daula": {
      name: "کوٹھی روشن الدولہ",
      location: "حسین آباد کے قریب",
      highlight: "روشن الدولہ کی درباری رہائش",
      description:
        "یہ کوٹھی اودھ کے طاقتور رئیس روشن الدولہ کے نام پر رکھی گئی تھی اور مغل ڈیزائن کی حساسیت کو ظاہر کرتی ہے۔",
      timings: "صبح 10:00 بجے - شام 5:00 بجے",
    },
    "kothi-noor-baksh": {
      name: "کوٹھی نور بخش",
      location: "چوک علاقہ",
      highlight: "نوابی ڈیزائن کے ساتھ رہائشی کوٹھی",
      description: "نوابوں کی نفیس طرز زندگی کو ظاہر کرنے والی ایک کم معروف لیکن خوبصورتی سے تیار کردہ حویلی۔",
      timings: "صبح 9:00 بجے - شام 5:00 بجے",
    },
    "khursheed-manzil": {
      name: "خورشید منزل",
      location: "ریزیڈنسی کے قریب",
      highlight: "1857 بغاوت کے واقعات کا مقام",
      description:
        "اصل میں نوابوں کے لیے محل کے طور پر تعمیر کیا گیا، بعد میں 1857 کے دوران انگریزوں نے قبضہ کر کے استعمال کیا۔",
      timings: "صبح 8:00 بجے - شام 6:00 بجے",
    },
    "moti-mahal": {
      name: "موتی محل",
      location: "قیصر باغ",
      highlight: "گومتی کو دیکھنے والا موتی محل",
      description: "گومتی ندی کے نظارے فراہم کرنے والا ایک خوبصورت محل کمپلیکس، شاہی تفریحی عمارات کا حصہ۔",
      timings: "صبح 9:00 بجے - شام 6:00 بجے",
    },
    "taluqdar-havelis": {
      name: "تعلقدار حویلیاں",
      location: "لکھنؤ میں مختلف مقامات",
      highlight: "زمینداروں کی نجی حویلیاں",
      description: "اودھ علاقے کے بااثر تعلقداروں کی اشرافیہ حویلیوں کا مجموعہ۔",
      timings: "نجی رسائی / ورثہ دورے",
    },
  },
}

const getTranslatedHaveli = (haveli: Haveli, language: string) => {
  if (language === "hi" && haveliTranslations.hi[haveli.id as keyof typeof haveliTranslations.hi]) {
    const translation = haveliTranslations.hi[haveli.id as keyof typeof haveliTranslations.hi]
    return {
      ...haveli,
      name: translation.name,
      location: translation.location,
      highlight: translation.highlight,
      description: translation.description,
      timings: translation.timings,
    }
  }
  if (language === "ur" && haveliTranslations.ur[haveli.id as keyof typeof haveliTranslations.ur]) {
    const translation = haveliTranslations.ur[haveli.id as keyof typeof haveliTranslations.ur]
    return {
      ...haveli,
      name: translation.name,
      location: translation.location,
      highlight: translation.highlight,
      description: translation.description,
      timings: translation.timings,
    }
  }
  return haveli
}

const havelis: Haveli[] = [
  {
    id: "bara-imambara",
    name: "Bara Imambara",
    location: "Old Lucknow",
    era: "1784",
    highlight: "Architectural Marvel",
    image: "/images/bara-imambara.jpg?height=300&width=400",
    description:
      "The Bara Imambara is an architectural wonder built by Asaf-ud-Daula. Famous for its central hall and the mysterious Bhul-bhulaiya labyrinth.",
    rating: 4.8,
    reviews: 2847,
    timings: "6:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.86858, lng: 80.9127 },
    wikiTitle: "Bara_Imambara",
    audioFile: "/bara-imambara.mp3",
  },
  {
    id: "chhota-imambara",
    name: "Chhota Imambara",
    location: "Hussainabad",
    era: "1838",
    highlight: "Golden Dome Paradise",
    image: "/images/chhota-imambara.jpg?height=300&width=400",
    description:
      "Also known as Imambara Hussainabad Mubarak, this stunning monument features beautiful chandeliers and intricate decorations.",
    rating: 4.7,
    reviews: 1923,
    timings: "6:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.87456, lng: 80.904459 },
    wikiTitle: "Chhota_Imambara",
    audioFile: "/chhota-imambara.mp3",
  },
  {
    id: "rumi-darwaza",
    name: "Rumi Darwaza",
    location: "Old Lucknow",
    era: "1784",
    highlight: "Gateway to History",
    image: "/images/rumi-darwaza.jpg?height=300&width=400",
    description: "An imposing gateway that stands as a symbol of Lucknow, modeled after the Sublime Porte in Istanbul.",
    rating: 4.6,
    reviews: 1456,
    timings: "24 Hours",
    category: "visit",
    coordinates: { lat: 26.8712, lng: 80.9121 },
    wikiTitle: "Rumi_Darwaza",
    audioFile: "/rumi-darwaza.mp3",
  },
  {
    id: "clock-tower",
    name: "Hussainabad Clock Tower",
    location: "Hussainabad",
    era: "1881",
    highlight: "Victorian Architecture",
    image: "/images/clock-tower.jpg?height=300&width=400",
    description:
      "The tallest clock tower in India, built in the Victorian Gothic style as a symbol of British architectural influence.",
    rating: 4.5,
    reviews: 1234,
    timings: "9:00 AM - 6:00 PM",
    category: "visit",
    coordinates: { lat: 26.874, lng: 80.908 },
    wikiTitle: "Husainabad_Clock_Tower",
    audioFile: "/clock-tower-audio.mp3",
  },
  {
    id: "dilkusha-kothi",
    name: "Dilkusha Kothi",
    location: "Dilkusha",
    era: "1800",
    highlight: "Heritage Stay",
    image: "/images/Dilkusha-Kothi.jpg?height=300&width=400",
    description:
      "Experience royal living in this restored heritage property offering luxury accommodation with historical charm.",
    rating: 4.9,
    reviews: 567,
    timings: "Check-in: 2:00 PM",
    category: "stay",
    coordinates: { lat: 26.8456, lng: 80.9234 },
    wikiTitle: "Dilkusha_Kothi",
    audioFile: "dilkusha-kothi-audio.mp3",
  },
  {
    id: "chattar-manzil",
    name: "Chattar Manzil",
    location: "Lucknow",
    era: "18th Century",
    highlight: "Umbrella-shaped dome",
    image: "/images/chattar-manzil.jpg",
    description:
      "Former palace of the Nawabs, known for its unique umbrella-shaped dome and Indo-European architecture.",
    rating: 4.6,
    reviews: 1345,
    timings: "10:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.8601, lng: 80.9126 },
    wikiTitle: "Chattar_Manzil",
    audioFile: "chattar-manzil-audio.mp3",
  },
  {
    id: "safed-baradari",
    name: "Safed Baradari",
    location: "Qaiserbagh",
    era: "1854",
    highlight: "White marble structure",
    image: "/images/safed-baradari.jpg",
    description: "Originally built as a 'palace of mourning', now used for cultural and government events.",
    rating: 4.5,
    reviews: 980,
    timings: "9:00 AM - 6:00 PM",
    category: "visit",
    coordinates: { lat: 26.8605, lng: 80.9202 },
    wikiTitle: "Safed_Baradari",
    audioFile: "safed-baradari-audio.mp3",
  },
  {
    id: "la-martiniere",
    name: "La Martiniere (Constantia House)",
    location: "La Martiniere College",
    era: "1845",
    highlight: "Unique Indo-European style",
    image: "/images/la-martiniere.jpg",
    description: "An iconic college building, blending European and Mughal architecture.",
    rating: 4.8,
    reviews: 2045,
    timings: "8:00 AM - 4:00 PM",
    category: "visit",
    coordinates: { lat: 26.8357, lng: 80.9546 },
    wikiTitle: "La_Martiniere_Lucknow",
    audioFile: "la-martiniere-audio.mp3",
  },
  {
    id: "kaiserbagh-palace",
    name: "Kaiserbagh Palace Complex",
    location: "Kaiserbagh",
    era: "1850",
    highlight: "Royal court and gardens",
    image: "/images/kaiserbagh.jpg",
    description: "Built by Wajid Ali Shah, this complex included palaces, courts, and gardens.",
    rating: 4.4,
    reviews: 1102,
    timings: "10:00 AM - 6:00 PM",
    category: "visit",
    coordinates: { lat: 26.8694, lng: 80.9192 },
    wikiTitle: "Qaisar_Bagh",
    audioFile: "kaiserbagh-audio.mp3",
  },

  {
    id: "shah-najaf-imambara",
    name: "Shah Najaf Imambara",
    location: "Near Gomti River",
    era: "1817",
    highlight: "Tomb of Ghazi-ud-Din Haider",
    image: "/images/shah-najaf.jpg",
    description: "Mausoleum built for Nawab Ghazi-ud-Din Haider and his wives, showcasing Islamic architecture.",
    rating: 4.5,
    reviews: 879,
    timings: "6:00 AM - 6:00 PM",
    category: "visit",
    coordinates: { lat: 26.8575, lng: 80.9423 },
    wikiTitle: "Shah_Najaf_Imambara",
    audioFile: "shah-najaf-audio.mp3",
  },
  {
    id: "nadan-mahal",
    name: "Nadan Mahal",
    location: "Husainabad",
    era: "1600s",
    highlight: "First Mughal tomb in Lucknow",
    image: "/images/nadan-mahal.jpg",
    description: "Tomb of Shaikh Ibrahim Chishti, a saint from Emperor Humayun's era.",
    rating: 4.2,
    reviews: 600,
    timings: "9:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.8751, lng: 80.905 },
    wikiTitle: "Nadan_Mahal",
    audioFile: "nadan-mahal-audio.mp3",
  },
  {
    id: "begum-kothi",
    name: "Begum Kothi",
    location: "Lucknow",
    era: "1850s",
    highlight: "Residence of European Begum",
    image: "/images/begum-kothi.jpg",
    description: "Home to European Begums of Lucknow, notably part of historical events during 1857.",
    rating: 4.3,
    reviews: 530,
    timings: "10:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.8653, lng: 80.9185 },
    wikiTitle: "Begum_Kothi",
    audioFile: "begum-kothi-audio.mp3",
  },
  {
    id: "farhat-baksh-kothi",
    name: "Farhat Baksh Kothi",
    location: "Lucknow",
    era: "1827",
    highlight: "Residency annex",
    image: "/images/farhat-baksh.jpg",
    description: "Used by Nawab Ghazi-ud-Din Haider, now part of Lucknow University premises.",
    rating: 4.4,
    reviews: 490,
    timings: "10:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.8688, lng: 80.9311 },
    wikiTitle: "Farhat_Baksh_Kothi",
    audioFile: "farhat-baksh-audio.mp3",
  },
  {
    id: "darshan-vilas-kothi",
    name: "Darshan Vilas Kothi",
    location: "Unknown",
    era: "19th Century",
    highlight: "Royal retreat",
    image: "/images/darshan-vilas.jpg",
    description: "Once a noble residence, known for its aesthetic charm and secluded location.",
    rating: 4.1,
    reviews: 430,
    timings: "10:00 AM - 4:00 PM",
    category: "visit",
    coordinates: { lat: 26.8611, lng: 80.9178 },
    wikiTitle: "Darshan_Vilas_Kothi",
    audioFile: "darshan-vilas-audio.mp3",
  },
  {
    id: "hayat-baksh-kothi",
    name: "Hayat Baksh Kothi",
    location: "Lucknow University Campus",
    era: "19th Century",
    highlight: "British-era annex",
    image: "/images/hayat-baksh.jpg",
    description:
      "Part of Lucknow University, originally a Nawabi building that served as a military and administrative center.",
    rating: 4.2,
    reviews: 390,
    timings: "9:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.869, lng: 80.933 },
    wikiTitle: "Hayat_Baksh_Kothi",
    audioFile: "hayat-baksh-audio.mp3",
  },
  {
    id: "mubarak-manzil",
    name: "Mubarak Manzil",
    location: "Hazratganj, Lucknow",
    era: "Late 1800s",
    highlight: "Royal residence turned administrative building",
    image: "/images/mubarak-manzil.jpg",
    description: "A graceful structure that once served as a mansion for royalty, later used for official purposes.",
    rating: 4.0,
    reviews: 310,
    timings: "9:00 AM - 4:00 PM",
    category: "visit",
    coordinates: { lat: 26.8489, lng: 80.9462 },
    wikiTitle: "Mubarak_Manzil",
    audioFile: "mubarak-manzil-audio.mp3",
  },
  {
    id: "kothi-roshan-ud-daula",
    name: "Kothi Roshan-ud-Daula",
    location: "Near Husainabad",
    era: "Early 1800s",
    highlight: "Courtly residence of Roshan-ud-Daula",
    image: "/images/roshan-ud-daula.jpg",
    description:
      "This kothi was named after Roshan-ud-Daula, a powerful noble of Awadh, and reflects Mughal design sensibilities.",
    rating: 4.1,
    reviews: 275,
    timings: "10:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.8732, lng: 80.9025 },
    wikiTitle: "Roshan-ud-Daula",
    audioFile: "roshan-daula-audio.mp3",
  },
  {
    id: "kothi-noor-baksh",
    name: "Kothi Noor Baksh",
    location: "Chowk Area",
    era: "Mid 1800s",
    highlight: "Residential kothi with Nawabi design",
    image: "/images/noor-baksh.jpg",
    description: "A lesser-known yet beautifully crafted mansion reflecting the refined lifestyle of the Nawabs.",
    rating: 4.0,
    reviews: 240,
    timings: "9:00 AM - 5:00 PM",
    category: "visit",
    coordinates: { lat: 26.872, lng: 80.9008 },
    wikiTitle: "Kothi_Noor_Baksh",
    audioFile: "noor-baksh-audio.mp3",
  },
  {
    id: "khursheed-manzil",
    name: "Khursheed Manzil",
    location: "Near Residency",
    era: "Early 1800s",
    highlight: "Site of 1857 rebellion events",
    image: "/images/khursheed-manzil.jpg",
    description: "Originally built as a palace for the Nawabs, later captured and used by the British during 1857.",
    rating: 4.4,
    reviews: 510,
    timings: "8:00 AM - 6:00 PM",
    category: "visit",
    coordinates: { lat: 26.8705, lng: 80.9252 },
    wikiTitle: "Khursheed_Manzil",
    audioFile: "khursheed-manzil-audio.mp3",
  },
  {
    id: "moti-mahal",
    name: "Moti Mahal",
    location: "Qaiserbagh",
    era: "1840s",
    highlight: "Pearl Palace overlooking Gomti",
    image: "/images/moti-mahal.jpg",
    description: "A scenic palace complex offering views of the Gomti River, part of the royal leisure buildings.",
    rating: 4.6,
    reviews: 890,
    timings: "9:00 AM - 6:00 PM",
    category: "visit",
    coordinates: { lat: 26.8717, lng: 80.918 },
    wikiTitle: "Moti_Mahal_(Lucknow)",
    audioFile: "moti-mahal-audio.mp3",
  },
  {
    id: "taluqdar-havelis",
    name: "Taluqdar Havelis",
    location: "Various locations in Lucknow",
    era: "19th Century",
    highlight: "Private mansions of landowners",
    image: "/images/taluqdar-havelis.jpg",
    description: "A collection of aristocratic mansions belonging to the influential Taluqdars of Awadh region.",
    rating: 4.3,
    reviews: 620,
    timings: "Private access / heritage walks",
    category: "visit",
    coordinates: { lat: 26.87, lng: 80.92 },
    wikiTitle: "Taluqdar",
    audioFile: "taluqdar-havelis-audio.mp3",
  },
]

export default function HavelisPage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [qrModalSrc, setQrModalSrc] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isScrolled, setIsScrolled] = useState(false)
  const [filteredHavelis, setFilteredHavelis] = useState(havelis)
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null)
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const handleAudioToggle = (haveliId: string, audioFile: string) => {
    if (currentPlayingId === haveliId && playingAudio) {
      playingAudio.pause()
      setCurrentPlayingId(null)
      setPlayingAudio(null)
    } else {
      if (playingAudio) {
        playingAudio.pause()
      }
      const audio = new Audio(`/audio/${audioFile}`)
      audio.play()
      setPlayingAudio(audio)
      setCurrentPlayingId(haveliId)

      audio.onended = () => {
        setCurrentPlayingId(null)
        setPlayingAudio(null)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let filtered = havelis

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((haveli) => haveli.category === filterCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (haveli) =>
          haveli.name.toLowerCase().includes(query) ||
          haveli.location.toLowerCase().includes(query) ||
          haveli.description.toLowerCase().includes(query) ||
          haveli.highlight.toLowerCase().includes(query),
      )
    }

    setFilteredHavelis(filtered)
  }, [searchQuery, filterCategory])

  const t = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  const generateQRCode = (haveli: Haveli) => {
    const mapUrl = `https://www.google.com/maps?q=${haveli.coordinates.lat},${haveli.coordinates.lng}`
    const wikiUrl = `https://en.wikipedia.org/wiki/${haveli.wikiTitle}`
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wikiUrl)}`
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className="min-h-screen bg-[#121212] text-white relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(18, 18, 18, 0.8)), url('/images/lucknow-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl shadow-2xl border-b border-[#49ce71]/30"
            : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-[#49ce71] hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm">{t("backToHome")}</span>
              </Link>
              <div className="h-6 w-px bg-[#49ce71]"></div>
              <h1 className="text-xl font-bold text-[#49ce71] font-playfair">{t("siteTitle")}</h1>
            </div>

            <div className="hidden md:block"></div>

            <div className="hidden md:flex items-center space-x-4">
              <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger className="w-20 bg-transparent border-[#49ce71] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121212] border-[#49ce71]">
                  <SelectItem value="en" className="text-white hover:text-[#49ce71]">
                    EN
                  </SelectItem>
                  <SelectItem value="hi" className="text-white hover:text-[#49ce71]">
                    हिं
                  </SelectItem>
                  <SelectItem value="ur" className="text-white hover:text-[#49ce71]">
                    اردو
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#121212]/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-white hover:text-[#49ce71]">
                {t("home")}
              </Link>
              <Link href="/explore" className="block px-3 py-2 text-white hover:text-[#49ce71]">
                {t("explore")}
              </Link>
              <Link href="/havelis" className="block px-3 py-2 text-[#49ce71] font-medium">
                {t("havelis")}
              </Link>
              <a href="#contact" className="block px-3 py-2 text-white hover:text-[#49ce71]">
                {t("contact")}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#49da74] mb-6 font-playfair">
              {t("pageTitle")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {t("pageSubtitle")}
            </p>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mt-8 pt-12">
              <div className="relative flex-1 w-full">
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#222222] border-[#49ce71] text-white placeholder-gray-400"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48 bg-[#222222] border-[#49ce71] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#222222] border-[#49ce71]">
                  <SelectItem value="all" className="text-white hover:text-[#49ce71]">
                    {t("allCategories")}
                  </SelectItem>
                  <SelectItem value="visit" className="text-white hover:text-[#49ce71]">
                    {t("visitCategory")}
                  </SelectItem>
                  <SelectItem value="stay" className="text-white hover:text-[#49ce71]">
                    {t("stayCategory")}
                  </SelectItem>
                  <SelectItem value="dine" className="text-white hover:text-[#49ce71]">
                    {t("dineCategory")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Havelis Grid */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHavelis.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-4">{t("noResults")}</div>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setFilterCategory("all")
                }}
                className="bg-[#49ce71] hover:bg-[#3ba55c] text-black"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHavelis.map((haveli, index) => {
                const translatedHaveli = getTranslatedHaveli(haveli, currentLanguage)
                return (
                  <Card
                    key={haveli.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-[#222222] border-[#49ce71] group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={haveli.image || "/placeholder.svg"}
                        alt={translatedHaveli.name}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-[#49ce71] text-black font-medium">{haveli.era}</Badge>
                      <Badge className="absolute top-4 right-4 bg-[#222222]/80 text-[#49ce71] border-[#49ce71] backdrop-blur-sm">
                        {haveli.category}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white font-playfair mb-1">{translatedHaveli.name}</h3>
                        <p className="text-sm text-gray-200 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {translatedHaveli.location}
                        </p>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4">
                        <p className="text-[#49ce71] font-medium mb-2">{translatedHaveli.highlight}</p>
                        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                          {translatedHaveli.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium text-white">{haveli.rating}</span>
                          <span className="ml-1 text-xs text-gray-400">({haveli.reviews})</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {translatedHaveli.timings.split(" ")[0]}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#49ce71] text-[#49ce71] hover:bg-[#49ce71] hover:text-black"
                          onClick={() => handleAudioToggle(haveli.id, haveli.audioFile)}
                        >
                          <Headphones className="h-3 w-3 mr-1" />
                          Audio
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#49ce71] text-[#49ce71] hover:bg-[#49ce71] hover:text-black"
                          onClick={() => {
                            window.open(
                              `https://www.google.com/maps?q=${haveli.coordinates.lat},${haveli.coordinates.lng}`,
                              "_blank",
                            )
                          }}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          Map
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex flex-col items-center space-y-1 cursor-pointer group/qr">
                              <img
                                src={generateQRCode(haveli) ?? ""}
                                alt={`QR for ${translatedHaveli.name}`}
                                className="w-8 h-8 rounded border border-[#49ce71] group-hover/qr:scale-110 transition-transform"
                                title={`Scan to open Wikipedia page for ${translatedHaveli.name}`}
                              />
                              <div className="flex items-center space-x-1">
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg"
                                  alt="Wikipedia"
                                  className="w-4 h-4"
                                />
                                <span className="text-xs text-gray-400">Wikipedia</span>
                              </div>
                            </div>
                          </DialogTrigger>

                          <DialogContent className="bg-[#222222]/95 backdrop-blur-md border-[#49ce71] text-white">
                            <h4 className="text-lg font-semibold mb-4 text-center">{translatedHaveli.name}</h4>
                            <img
                              src={generateQRCode(haveli) ?? ""}
                              alt={`QR for ${translatedHaveli.name}`}
                              className="w-64 h-64 mx-auto rounded border border-[#49ce71]"
                            />
                            <p className="text-sm text-center mt-2 text-gray-300">
                              Scan to open the Wikipedia page for this Haveli.
                            </p>
                          </DialogContent>
                        </Dialog>
                        <Link href={`/havelis/${haveli.id}`}>
                          <Button className="bg-[#e6b619] hover:bg-[#b68c1d] text-black">
                            {t("viewDetails")}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="text-white py-16 border-t border-[#49ce71] backdrop-blur"
        style={{ backgroundColor: "rgba(26, 26, 26, 0.8)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-playfair text-[#49ce71]">{t("siteTitle")}</h3>
              <p className="text-gray-300 mb-4">
                {currentLanguage === "hi"
                  ? "हमारे क्यूरेटेड ऐतिहासिक हवेलियों के संग्रह के माध्यम से लखनऊ की शानदार विरासत की खोज करें।"
                  : currentLanguage === "ur"
                    ? "ہمارے منتخب تاریخی حویلیوں کے مجموعے کے ذریعے لکھنؤ کی شاندار ورثے کو دریافت کریں۔"
                    : "Discover the magnificent heritage of Lucknow through our curated collection of historic Havelis."}
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-[#49ce71] hover:text-white hover:bg-[#49ce71]/20">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[#49ce71] hover:text-white hover:bg-[#49ce71]/20">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-[#49ce71] hover:text-white hover:bg-[#49ce71]/20">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#49ce71]">{t("quickLinks")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-[#49ce71] transition-colors">
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-gray-300 hover:text-[#49ce71] transition-colors">
                    {t("explore")}
                  </Link>
                </li>
                <li>
                  <Link href="/havelis" className="text-gray-300 hover:text-[#49ce71] transition-colors">
                    {t("havelis")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#49ce71]">{t("heritageSites")}</h4>
              <ul className="space-y-2">
                {havelis.slice(0, 4).map((haveli) => {
                  const translatedHaveli = getTranslatedHaveli(haveli, currentLanguage)
                  return (
                    <li key={haveli.id}>
                      <Link
                        href={`/havelis/${haveli.id}`}
                        className="text-gray-300 hover:text-[#49ce71] transition-colors"
                      >
                        {translatedHaveli.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#49ce71]">{t("contact")}</h4>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#49ce71]" />
                  +91 97581 86377
                </p>
                <p className="text-gray-300 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-[#49ce71]" />
                  info@heritagehavenslucknow.com
                </p>
                <p className="text-gray-300 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-[#49ce71]" />
                  {currentLanguage === "hi"
                    ? "लखनऊ, उत्तर प्रदेश, भारत"
                    : currentLanguage === "ur"
                      ? "لکھنؤ، اتر پردیش، ہندوستان"
                      : "Lucknow, Uttar Pradesh, India"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#49ce71]/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {currentLanguage === "hi"
                ? "© 2024 हेरिटेज हेवन्स लखनऊ। सभी अधिकार सुरक्षित।"
                : currentLanguage === "ur"
                  ? "© 2024 ہیریٹیج ہیونز لکھنؤ۔ تمام حقوق محفوظ ہیں۔"
                  : `© 2024 Heritage Havens Lucknow. ${t("allRights")}`}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="/team" className="text-gray-300 hover:text-[#49ce71] text-sm smooth-transition">
                {t("heritageTeam")}
              </a>
              <a href="/privacy-policy" className="text-gray-300 hover:text-[#49ce71] text-sm smooth-transition">
                {t("privacyPolicy")}
              </a>
              <a href="/terms" className="text-gray-300 hover:text-[#49ce71] text-sm smooth-transition">
                {t("termsOfService")}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button - Updated Design */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-lg bg-[#49ce71] hover:bg-[#3ba55c] text-black transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {qrModalSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#222] p-4 rounded-lg relative">
            <button
              onClick={() => setQrModalSrc(null)}
              className="absolute top-2 right-2 text-white hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <img src={qrModalSrc || "/placeholder.svg"} alt="QR Code Enlarged" className="w-64 h-64" />
            <p className="text-sm text-gray-300 text-center mt-2">Scan to open Wikipedia page</p>
          </div>
        </div>
      )}
    </div>
  )
}
