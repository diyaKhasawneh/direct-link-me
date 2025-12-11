import { motion } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const products = [
  { id: 1, name: "بطاقة NFC كلاسيك", price: "25 د.أ", category: "بطاقات" },
  { id: 2, name: "بطاقة NFC برو", price: "35 د.أ", category: "بطاقات" },
  { id: 3, name: "بطاقة NFC بريميوم", price: "45 د.أ", category: "بطاقات" },
  { id: 4, name: "ستاند NFC أبيض", price: "30 د.أ", category: "ستاندات" },
  { id: 5, name: "ستاند NFC أسود", price: "30 د.أ", category: "ستاندات" },
  { id: 6, name: "ستاند NFC ذهبي", price: "40 د.أ", category: "ستاندات" },
  { id: 7, name: "خاتم NFC ذكي - فضي", price: "55 د.أ", category: "خواتم" },
  { id: 8, name: "خاتم NFC ذكي - أسود", price: "55 د.أ", category: "خواتم" },
  { id: 9, name: "خاتم NFC ذكي - ذهبي", price: "65 د.أ", category: "خواتم" },
  { id: 10, name: "سوار NFC رياضي", price: "35 د.أ", category: "أساور" },
  { id: 11, name: "سوار NFC جلد", price: "45 د.أ", category: "أساور" },
  { id: 12, name: "سوار NFC معدن", price: "50 د.أ", category: "أساور" },
  { id: 13, name: "ملصق NFC دائري", price: "10 د.أ", category: "ملصقات" },
  { id: 14, name: "ملصق NFC مربع", price: "10 د.أ", category: "ملصقات" },
  { id: 15, name: "ملصق NFC شفاف", price: "15 د.أ", category: "ملصقات" },
  { id: 16, name: "حافظة NFC للهاتف", price: "25 د.أ", category: "إكسسوارات" },
  { id: 17, name: "محفظة NFC ذكية", price: "60 د.أ", category: "إكسسوارات" },
  { id: 18, name: "سلسلة مفاتيح NFC", price: "20 د.أ", category: "إكسسوارات" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const whatsappMessage = encodeURIComponent(`مرحباً، أريد الاستفسار عن المنتج: ${product.name}`);
  const whatsappLink = `https://wa.me/962791234567?text=${whatsappMessage}`;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
    >
      {/* Product Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-brand-blue/20 via-brand-yellow/10 to-brand-red/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-yellow flex items-center justify-center">
          <span className="text-4xl">📱</span>
        </div>
        <span className="absolute top-3 right-3 bg-brand-red text-white text-xs px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-blue transition-colors">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-brand-yellow mb-4">{product.price}</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl text-center transition-all duration-300 transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تفاصيل المنتج
          </span>
        </a>
      </div>
    </motion.div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-12 w-auto"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex items-center gap-6">
            <a href="#products" className="text-foreground/80 hover:text-brand-blue transition-colors font-medium">
              المنتجات
            </a>
            <a href="#features" className="text-foreground/80 hover:text-brand-blue transition-colors font-medium">
              المميزات
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-brand-blue transition-colors font-medium">
              تواصل معنا
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-blue/5 to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={logo}
              alt="Logo"
              className="w-32 h-32 mx-auto mb-8 rounded-2xl shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              أسهل وأحدث طريقة
              <br />
              <span className="bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-red bg-clip-text text-transparent">
                لمشاركة معلوماتك
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-2xl mx-auto"
            >
              بمجرد لمسة واحدة! عزّز علاقاتك المهنية ومبيعاتك مع بطاقات NFC الرقمية للأعمال
            </motion.p>
            <motion.a
              href="#products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block py-4 px-10 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white font-bold text-lg rounded-full shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-all duration-300"
            >
              اكتشف منتجاتنا
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-brand-blue rounded-full animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              طرق متعددة لمشاركة معلوماتك
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              اختر من بين مجموعتنا من منتجات NFC التي تناسب احتياجاتك
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: "💳", title: "بطاقات NFC", desc: "بطاقات أنيقة وعصرية لمشاركة بياناتك بلمسة واحدة", color: "brand-blue" },
              { icon: "💍", title: "خواتم ذكية", desc: "أناقة وتقنية في تصميم واحد فريد", color: "brand-yellow" },
              { icon: "📱", title: "ستاندات ذكية", desc: "مثالية للمكاتب والمحلات التجارية", color: "brand-red" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-card p-8 rounded-3xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${feature.color}/20 flex items-center justify-center text-4xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/60">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              منتجاتنا
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              اكتشف مجموعتنا المتنوعة من منتجات NFC الذكية
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-brand-blue/10 via-background to-brand-yellow/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-10 md:p-16 text-center shadow-2xl border border-border/50 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              هل لديك أسئلة؟
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-xl mx-auto">
              تواصل معنا الآن عبر الواتساب وسنساعدك في اختيار المنتج المناسب لك
            </p>
            <motion.a
              href="https://wa.me/962791234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 py-4 px-10 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا عبر الواتساب
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="Logo" className="h-10 w-auto mx-auto mb-4" />
          <p className="text-foreground/60">
            © 2024 جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
