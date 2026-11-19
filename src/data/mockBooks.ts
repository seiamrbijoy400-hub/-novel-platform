import { Book } from '../types/book';
import { MOCK_AUTHORS } from './mockAuthors';

// All cover images use picsum.photos which always loads reliably, no Unsplash network issues
export const MOCK_BOOKS: Book[] = [
  {
    id: 'book-1',
    slug: 'the-last-tide-of-padma',
    title: 'The Last Tide of Padma',
    originalTitle: 'পদ্মার শেষ জোয়ার',
    languageId: 'bn',
    direction: 'ltr',
    author: MOCK_AUTHORS[0],
    publicationDate: '2021-04-12',
    publicationYear: 2021,
    genres: ['Literary Fiction', 'Family Saga'],
    synopsis: 'A sweeping multigenerational novel set along the roaring bends of the Padma River. Two brothers must reconcile family inheritances and forgotten promises as erosion threatens their ancestral homestead.',
    coverImageUrl: 'https://picsum.photos/seed/padma/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'direct_author',
    sourceProviderName: 'Novela Direct Portal',
    rightsHolderName: 'Anisur Rahman & Shadhin Boi Press',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.85,
    ratingCount: 312,
    totalChapters: 4,
    estimatedReadingMinutes: 45,
    chapters: [
      {
        id: 'c1-1', chapterIndex: 1,
        title: 'অধ্যায় ১ — কূলভাঙা নদীর গান',
        wordCount: 520,
        content: `ভোরের কুয়াশা তখনও পদ্মার চরে পুরোপুরি মিলিয়ে যায়নি। নদীটির বুক চিরে ছুটে চলা শীতল বাতাস পুরনো কাঠের বারান্দায় এসে আছড়ে পড়ছিল।

সোহরাব যখন তার চা-ভর্তি মাটির ভাঁড়টি হাতে তুলে নিল, তখন তার চোখ আটকে গেল দূর দিগন্তে। চর শালিখার পুরনো বটগাছটি আজ আর দেখা যাচ্ছে না। গতরাতের তীব্র স্রোতে গাছটি শিকড়সহ নদীতে বিলীন হয়ে গেছে।

"ভাইজান, তুমি কি শুনতে পাচ্ছ?" নিচতলা থেকে তার ছোট ভাই আরিফের কণ্ঠ ভেসে এল।

"পদ্মার ভাঙন কোনোদিন কারও জন্য অপেক্ষা করেনি, আরিফ," সোহরাব শান্ত গলায় উত্তর দিল। নদীর এই রুদ্র রূপ তার কাছে নতুন কিছু নয়। ত্রিশ বছর ধরে সে এই চরের মানুষের সুখ-দুঃখ আর নদীর উথালপাথাল ঢেউ দেখে আসছে।

কিন্তু আরিফের কাছে এ কেবল মাটি ভেঙে পড়া নয়; এ তাদের শৈশবের সব স্মৃতি এক নিমেষে অতলে তলিয়ে যাওয়া।`
      },
      {
        id: 'c1-2', chapterIndex: 2,
        title: 'অধ্যায় ২ — ঢাকার চিঠি',
        wordCount: 480,
        content: `চিঠির খামটি কাঠের সিন্দুকে সাবধানে রেখে দিয়েছিল সোহরাব। হলুদ হয়ে যাওয়া কাগজের ওপর আরিফের হাতের লেখা। চার বছর আগের লেখা সেই চিঠিতে ছিল এক তরুণ স্থপতির স্বপ্ন।

আরিফ তখন বলত, "আমরা প্রযুক্তি দিয়ে নদী শাসন করব।"

আজ সেই আরিফই নদীর পাড়ে দাঁড়িয়ে নীরব। নদী শাসন করা যায় না, নদীকে বুঝতে হয়। চরের প্রবীণ জেলেরা এই সত্যিটা শত শত বছর ধরে জানে।`
      },
      {
        id: 'c1-3', chapterIndex: 3,
        title: 'অধ্যায় ৩ — মাঝনদীর নিশানা',
        wordCount: 510,
        content: `রাত নামতেই নদীর বাতাসে এক তীব্র গন্ধ পাওয়া যায়। সোহরাবের বজরা নৌকাটি ঘাটে বাঁধা দড়ি টেনে টেনে শব্দ করছিল।

"আমরা কি কাল ভোরেই বের হব, ভাইজান?" আরিফ নৌকার গলুইয়ে গিয়ে বসল।

"হ্যাঁ। নদীর মাঝখানের নতুন জেগে ওঠা চরে অনেক মানুষ আশ্রয় নিয়েছে।"

দুজনের ভেতরকার সমস্ত দূরত্ব যেন এই একটি মুহূর্তে ঘুচে গেল। বিপদ যখন সামনে আসে, তখন ভাইয়ের হাত ভাইয়ের কাঁধেই থাকে।`
      },
      {
        id: 'c1-4', chapterIndex: 4,
        title: 'অধ্যায় ৪ — নতুন সূর্যোদয়',
        wordCount: 550,
        content: `মেঘ কেটে গিয়ে যখন পুব আকাশে রক্তিম সূর্য দেখা দিল, তখন নদীর পানি সোনালী আভায় ঝিকমিক করে উঠল।

নদী যেমন ভাঙে, তেমনই আবার গড়ে তোলে নতুন পলি, নতুন ভূমি। সোহরাব আর আরিফ একসঙ্গে চরের মাটিতে পা রাখল। তাদের সামনে নতুন এক সম্ভাবনার দিগন্ত।

নদী কখনো শেষ হয় না — নদী কেবল নতুন রূপ নিয়ে নতুন প্রজন্মের গল্প বয়ে নিয়ে যায়।`
      }
    ]
  },
  {
    id: 'book-2',
    slug: 'echoes-of-alexandria',
    title: 'Echoes of Alexandria',
    originalTitle: 'أصداء الإسكندرية',
    languageId: 'ar',
    direction: 'rtl',
    author: MOCK_AUTHORS[1],
    publicationDate: '2023-09-18',
    publicationYear: 2023,
    genres: ['Mystery & Thriller', 'Historical Fiction'],
    synopsis: 'When a hidden manuscript surfaces inside a crumbling heritage library in Alexandria\'s Manshiya quarter, Dr. Nadia races through a centuries-old intellectual conspiracy that could rewrite Mediterranean history.',
    coverImageUrl: 'https://picsum.photos/seed/alex/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'streetlib',
    sourceProviderName: 'StreetLib International',
    rightsHolderName: 'Dar Al-Fikr & Layla Al-Hassan',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.92,
    ratingCount: 428,
    totalChapters: 3,
    estimatedReadingMinutes: 38,
    chapters: [
      {
        id: 'c2-1', chapterIndex: 1,
        title: 'الفصل الأول — رياح المنشية',
        wordCount: 430,
        content: `كانت أمواج البحر المتوسط تصطدم بصخور كورنيش الإسكندرية بقوة غير معتادة في ذلك المساء الشتوي البارد. رائحة اليود الممزوجة برائحة القهوة المحموجة حديثاً كانت تملأ زقاق حي المنشية العتيق.

وقفت الدكتورة نادية أمام الباب الخشبي العتيق لمكتبة البستاني. كانت المفاتيح المعدنية الثقيلة ترتعش بين أصابعها. منذ وفاة عمها المؤرخ الكبير، ظلت هذه المكتبة مغلقة لشهور طويلة.

"هل أنتِ متأكدة من رغبتك في الدخول وحدكِ؟" سأل الحارس العجوز بصوت يرتجف.

"المعرفة لا تخيف يا عم إبراهيم، بل الجهل هو ما يستحق الخوف." وعندما دار المفتاح في القفل القديم، انفتحت بوابة نحو لغز تاريخي طال انتظاره.`
      },
      {
        id: 'c2-2', chapterIndex: 2,
        title: 'الفصل الثاني — المخطوط السري',
        wordCount: 460,
        content: `تحت طبقات الغبار المتراكم في خزانة السرداب، وجدت نادية صندوقاً نحاسياً مغلقاً بقفل نقشت عليه زهرة لوتس فرعونية ونجمة أندلسية.

عندما فتحت الغطاء بحذر، رأت صفحات ورقية من الرق القديم، كُتبت بخط نسخ متقن. كانت الكلمات تتحدث عن رحلة فلاسفة المتوسط بين قرطبة والإسكندرية في القرن الثاني عشر.

وفي الهامش، كُتبت ملاحظة بخط يد حديث: "الحقيقة ليست ملكاً لأمة واحدة، بل هي إرث الإنسانية جمعاء."`
      },
      {
        id: 'c2-3', chapterIndex: 3,
        title: 'الفصل الثالث — فجر الحقيقة',
        wordCount: 490,
        content: `مع بزوغ أولى خيوط الفجر فوق قلعة قايتباي، كانت نادية قد انتهت من فك شيفرة الرسالة الأولى.

أدركت حينها أن التاريخ لا يكرر نفسه فقط، بل يمنحنا الفرصة في كل مرة لنفهم حاضرنا ونصلح مساراتنا.

أغلقت الصندوق بحب واحترام، وهي تعلم أن رسالتها قد بدأت لتوها — كانت تحمل في يدها مفتاح قرون من الصمت.`
      }
    ]
  },
  {
    id: 'book-3',
    slug: 'the-orbital-sanctuary',
    title: 'The Orbital Sanctuary',
    languageId: 'en',
    direction: 'ltr',
    author: MOCK_AUTHORS[2],
    publicationDate: '2024-02-15',
    publicationYear: 2024,
    genres: ['Science Fiction', 'Adventure'],
    synopsis: 'Set in 2088, botanist Elena Cross has 72 hours to save humanity\'s last repository of botanical genetics as Sanctuary Station begins its fatal descent toward atmospheric burn-up.',
    coverImageUrl: 'https://picsum.photos/seed/orbital/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'Young Adult (16+)',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'draft2digital',
    sourceProviderName: 'Draft2Digital',
    rightsHolderName: 'Astraea Speculative Media LLC',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.79,
    ratingCount: 560,
    totalChapters: 3,
    estimatedReadingMinutes: 32,
    chapters: [
      {
        id: 'c3-1', chapterIndex: 1,
        title: 'Chapter 1 — The Descent Warning',
        wordCount: 460,
        content: `The primary telemetry console blinked in steady amber pulses. At four hundred kilometers above the Indian Ocean, Sanctuary Station should have felt silent, but Elena knew the subtle groan of the titanium struts meant atmospheric drag was creeping upward.

"Station descent rate is ninety meters per hour," the artificial voice murmured over her headset.

Elena didn't look up from her hydroponic seedlings. Her hands were caked in synthetic nutrient loam. "Confirm solar array gimbal status, Lyra."

"Gimbals frozen in zenith orientation. Battery capacity at forty-two percent."

Elena wiped her brow with the back of her wrist. Below them, the brilliant blue curve of Earth rolled forward in silent majesty, indifferent to the fragile cylinder circling in its upper grasp.`
      },
      {
        id: 'c3-2', chapterIndex: 2,
        title: 'Chapter 2 — The Seed Vault Code',
        wordCount: 470,
        content: `Deep within Module 4 lay the cryogenic seed bank — specimens of rain-forest flora collected fifty years prior, before the great continental desertification. If Sanctuary Station re-entered the atmosphere, that genetic legacy would atomize into vapor in less than four minutes.

Elena unhooked her safety harness and floated through the airlock into the central core. The manual override lever was iced over with condensation.

"To save the future, we have to preserve what was once freely given," she whispered, entering the physical keycard with steady hands.`
      },
      {
        id: 'c3-3', chapterIndex: 3,
        title: 'Chapter 3 — Escape Trajectory',
        wordCount: 480,
        content: `With the backup chemical thrusters firing in short, shuddering bursts, Sanctuary Station stabilized its apogee. The amber warnings cleared to crisp emerald green.

Elena stood by the panoramic observation cupola as the station passed over the Himalayan snow peaks. The seeds were safe. The orbital relief shuttle would rendezvous within hours.

She pressed her palm against the cold glass and watched the terminator line — that razor-thin boundary between night and dawn — race across the continents below. It looked, she thought, exactly like hope.`
      }
    ]
  },
  {
    id: 'book-4',
    slug: 'gulmohar-lane',
    title: 'Gulmohar Lane',
    originalTitle: 'गुलमोहर लेन',
    languageId: 'hi',
    direction: 'ltr',
    author: MOCK_AUTHORS[3],
    publicationDate: '2022-11-05',
    publicationYear: 2022,
    genres: ['Romance', 'Contemporary Drama'],
    synopsis: 'When classical musician Kabir and software engineer Anika find themselves neighbours on a historic Delhi lane, tradition and modernity discover a melody neither expected.',
    coverImageUrl: 'https://picsum.photos/seed/gulmohar/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'streetlib',
    sourceProviderName: 'StreetLib International',
    rightsHolderName: 'Priya Sharma & Vani Publications',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.88,
    ratingCount: 380,
    totalChapters: 3,
    estimatedReadingMinutes: 30,
    chapters: [
      {
        id: 'c4-1', chapterIndex: 1,
        title: 'अध्याय १ — शाम की चाय और सितार',
        wordCount: 420,
        content: `गुलमोहर के लाल-नारंगी फूलों से ढकी वो संकरी सड़क पुरानी दिल्ली और नई दिल्ली के संगम पर बसी थी। हर शाम जब सूरज कुतुब मीनार के पीछे ढलने लगता, तब कबीर की हवेली की खिड़की से सितार की एक मीठी धुन तैरती हुई बाहर आती थी।

अनिका ने अपनी कैब से बाहर कदम रखा। लैपटॉप बैग उसके कंधे पर भारी लग रहा था। दिन भर के कोड स्प्रिंट और क्लाइंट मीटिंग्स के बाद यह धुन उसके कानों में अमृत की तरह घुली।

वह सड़क के मोड़ पर एक पल के लिए रुक गई। उस धुन में कोई हड़बड़ी नहीं थी — बस एक ठहराव था, जिसकी तलाश में वह महीनों से भटक रही थी।`
      },
      {
        id: 'c4-2', chapterIndex: 2,
        title: 'अध्याय २ — परंपरा और कल',
        wordCount: 450,
        content: `अगले दिन जब वे दोनों पड़ोस की पुरानी किताबों की दुकान में आमने-सामने आए, तो कबीर के हाथ में राग दरबारी की एक पुरानी किताब थी और अनिका के हाथ में आर्टिफिशियल इंटेलिजेंस पर एक शोध पत्र।

"शायद संगीत और गणित में ज्यादा फर्क नहीं है," अनिका ने मुस्कुराते हुए कहा।

कबीर ने अपनी आँखें उठाईं और पहली बार मुस्कुराया, "दोनों ही अनंत की तलाश करते हैं।" और इसी एक वाक्य ने दोनों के बीच एक अनकहे रिश्ते की नींव रख दी।`
      },
      {
        id: 'c4-3', chapterIndex: 3,
        title: 'अध्याय ३ — जीवन का नया राग',
        wordCount: 460,
        content: `महीने बीतते गए और गुलमोहर लेन ने दोनों को बदलते देखा।

कबीर ने जाना कि आधुनिक दुनिया में भी आत्मा को जीवित रखा जा सकता है, और अनिका ने समझा कि गति से अधिक महत्वपूर्ण दिशा होती है।

जब वे दोनों साथ बैठे — कबीर सितार के तारों पर उंगली रखे, अनिका उसके पास चुप बैठी — तो जीवन का सबसे सुंदर राग बज उठा।`
      }
    ]
  },
  {
    id: 'book-5',
    slug: 'the-lahore-soliloquy',
    title: 'The Lahore Soliloquy',
    originalTitle: 'لاہور کا نوحہ و نغمہ',
    languageId: 'ur',
    direction: 'rtl',
    author: MOCK_AUTHORS[5],
    publicationDate: '2020-08-14',
    publicationYear: 2020,
    genres: ['Literary Fiction', 'Family Saga'],
    synopsis: 'A profound family saga winding through the old lanes of Lahore — where a grandfather\'s library of rare Urdu manuscripts holds secrets that could bind or break three generations.',
    coverImageUrl: 'https://picsum.photos/seed/lahore/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'direct_author',
    sourceProviderName: 'Novela Direct Portal',
    rightsHolderName: 'Tariq Qureshi & Sang-e-Meel',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.90,
    ratingCount: 260,
    totalChapters: 2,
    estimatedReadingMinutes: 24,
    chapters: [
      {
        id: 'c5-1', chapterIndex: 1,
        title: 'باب اول — انارکلی کی خاموش شام',
        wordCount: 410,
        content: `شام کے سائے جب انارکلی بازار کی پرانی محرابوں پر طویل ہونے لگے، تو حامد صاحب نے اپنی عینک اتار کر میز پر رکھی۔ پچھلے چالیس سال سے وہ اس کتب خانے میں بیٹھ کر اردو ادب کے نادر نسخے محفوظ کر رہے تھے۔

سامنے ان کا پوتا ارسلان بیٹھا تھا، جو آج ہی بیرون ملک سے اپنی تعلیم مکمل کر کے لوٹا تھا۔

"دادا جان، کیا اب بھی لوگ ان موٹی کتابوں کو پڑھنے آتے ہیں؟"

حامد صاحب مسکرائے اور بولے: "بیٹا، اسکرینیں معلومات دیتی ہیں، لیکن کاغذی صفحات انسان کو احساس بخشتے ہیں۔ جب تک دل دھڑکتے ہیں، کہانی کبھی مر نہیں سکتی۔"`
      },
      {
        id: 'c5-2', chapterIndex: 2,
        title: 'باب دوم — چراغوں کی روشنی',
        wordCount: 430,
        content: `ارسلان نے دادا کی لکھی ہوئی ڈائری کو ہاتھ میں لیا۔ اس کے اندر آزادی سے لے کر آج تک کے لاہور کی ہر صبح کی داستان درج تھی۔

اسے محسوس ہوا کہ وہ صرف ایک شہر میں نہیں لوٹا، بلکہ اپنے اسلاف کی روح سے دوبارہ جڑ گیا ہے۔

اس نے فیصلہ کیا کہ وہ دادا کے اس کتب خانے کو ڈیجیٹل دنیا میں لا کر ہمیشہ کے لیے زندہ رکھے گا — تاکہ لاہور کی آواز دنیا کے کسی کونے میں گم نہ ہو جائے۔`
      }
    ]
  },
  {
    id: 'book-6',
    slug: 'the-valencian-orchard',
    title: 'The Valencian Orchard',
    originalTitle: 'El Huerto Valenciano',
    languageId: 'es',
    direction: 'ltr',
    author: MOCK_AUTHORS[4],
    publicationDate: '2022-03-10',
    publicationYear: 2022,
    genres: ['Historical Fiction', 'Mystery'],
    synopsis: 'A sunlit masía outside Valencia hides a 1939 letter behind its olive-wood panels. Art restorer Mateo discovers his family\'s story is entangled with a vanished Renaissance masterpiece.',
    coverImageUrl: 'https://picsum.photos/seed/valencia/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'streetlib',
    sourceProviderName: 'StreetLib International',
    rightsHolderName: 'Ediciones del Mediterráneo',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.81,
    ratingCount: 340,
    totalChapters: 2,
    estimatedReadingMinutes: 25,
    chapters: [
      {
        id: 'c6-1', chapterIndex: 1,
        title: 'Capítulo 1 — El Olor a Azahar',
        wordCount: 420,
        content: `El tren de cercanías se detuvo con un silbido metálico entre los campos dorados de naranjos. Mateo descendió con su pequeña maleta de herramientas de restauración y respiró profundamente el aire cálido de la huerta valenciana.

La vieja masía familiar de su abuelo, abandonada durante casi dos décadas, se alzaba al final del camino de tierra. Sus muros de piedra clara y su tejado de teja árabe parecían resistirse al paso inexorable del tiempo.

"Si abres esa bodega, Mateo, no busques solo polvo," le había advertido su tía antes de partir de Madrid. "Busca la verdad que tu abuelo no pudo escribir."`
      },
      {
        id: 'c6-2', chapterIndex: 2,
        title: 'Capítulo 2 — El Lienzo Escondido',
        wordCount: 440,
        content: `Detrás de un falso panel de madera de olivo en la alacena, Mateo encontró un lienzo enrollado en lino encerado. Al retirar con cuidado los cordeles, los pigmentos azules y dorados del siglo XVI resplandecieron con una intensidad milagrosa.

No era solo una obra de arte; era el testimonio de cómo la belleza y la compasión lograron sobrevivir a las sombras de la guerra civil.

Mateo supo que su misión en Valencia acababa de transformar su vida por completo — no como restaurador, sino como heredero de una verdad que había esperado ochenta años para ser contada.`
      }
    ]
  },
  {
    id: 'book-7',
    slug: 'cloud-pavilion',
    title: 'Cloud Pavilion',
    originalTitle: '云阁纪事',
    languageId: 'zh',
    direction: 'ltr',
    author: {
      id: 'auth-7', slug: 'lin-yuxian', name: 'Lin Yuxian', nativeName: '林雨贤',
      biography: 'Award-winning Hangzhou author exploring architectural memory and the intersection of tradition and digital preservation.',
      photoUrl: 'https://picsum.photos/seed/lin/300/300',
      country: 'China', verified: true, totalNovels: 4,
    },
    publicationDate: '2023-05-20',
    publicationYear: 2023,
    genres: ['Literary Fiction', 'Contemporary Drama'],
    synopsis: 'A century-old wooden pavilion by West Lake faces demolition. An elderly architect and his granddaughter — armed with 3D-scanning technology — race to preserve its soul before the city erases it.',
    coverImageUrl: 'https://picsum.photos/seed/cloud/400/600',
    completionStatus: 'completed',
    accessType: 'full_book',
    fullBookAvailable: true,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'direct_author',
    sourceProviderName: 'Novela Direct Portal',
    rightsHolderName: 'Lin Yuxian & Jiangnan Cultural Media',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.87,
    ratingCount: 310,
    totalChapters: 2,
    estimatedReadingMinutes: 22,
    chapters: [
      {
        id: 'c7-1', chapterIndex: 1,
        title: '第一章 — 雨落西湖',
        wordCount: 400,
        content: `细雨朦胧的初夏，湖面泛起一圈圈轻柔的涟漪。云阁的飞檐翘角隐在苍翠的香樟树林中，宛如一幅徐徐展开的水墨画卷。

周老先生站在木廊下，手中的紫砂壶还散发着龙井新茶的清香。今天是他在这座木结构古阁居住的第六十年。

身后传来了轻快的脚步声，是刚从上海回来的孙女小芸，手中提着激光扫描测绘仪。

"爷爷，我答应过您，要用数字孪生技术让云阁在云端永久存在。"`
      },
      {
        id: 'c7-2', chapterIndex: 2,
        title: '第二章 — 梁木之魂',
        wordCount: 430,
        content: `古老的榫卯结构在三维激光下呈现出严丝合缝的精妙几何。每一根柱子、每一片瓦、每一道梁，都在点云数据中重生。

老少两代人促膝长谈，老一代讲述每一根柱子的来源和故事，年轻一代用数据重现当年的匠心独运。

传统与现代在这里达成了温暖的共识——云阁不会消失，它只是换了一种方式，永远活在人们的记忆与数字宇宙之中。`
      }
    ]
  },
  {
    id: 'book-8',
    slug: 'whispering-manuscript-preview',
    title: 'The Whispering Manuscript',
    languageId: 'en',
    direction: 'ltr',
    author: MOCK_AUTHORS[2],
    publicationDate: '2025-01-10',
    publicationYear: 2025,
    genres: ['Mystery & Thriller'],
    synopsis: 'A sealed vellum package delivered to an Oxford professor unlocks a code-breaking race across four continents. This title is available as an authorized publisher preview.',
    coverImageUrl: 'https://picsum.photos/seed/whisper/400/600',
    completionStatus: 'completed',
    accessType: 'preview_only',
    fullBookAvailable: false,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'google_books',
    sourceProviderName: 'Google Books Discovery',
    rightsHolderName: 'Apex Commercial Press',
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.50,
    ratingCount: 140,
    totalChapters: 1,
    estimatedReadingMinutes: 10,
    chapters: [
      {
        id: 'c8-1', chapterIndex: 1,
        title: 'Publisher Preview — Opening Chapter',
        wordCount: 300,
        content: `The fog hung low over Oxford's Bodleian Library when the courier delivered the sealed vellum package, addressed in a hand that carbon-dating would later place at 1683.

Professor Marsh turned it over twice, noting the broken seal — a double-headed serpent eating its own tails. Someone had read this before it reached him.

[This is an authorized publisher excerpt for discovery purposes. The complete novel is available through licensed retail partners.]`
      }
    ]
  }
];
