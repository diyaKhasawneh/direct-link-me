import { motion } from "framer-motion";
import logo from "@/assets/logo.jpeg";
import basicCard from "@/assets/products/basic-card.png";
import woodenLaserCard from "@/assets/products/wooden-laser-card.png";
import woodenPlainCard from "@/assets/products/wooden-plain-card.png";
import customCard from "@/assets/products/custom-card.png";
import blackCard from "@/assets/products/black-card.png";
import fabricBracelet from "@/assets/products/fabric-bracelet.png";
import rubberBracelet from "@/assets/products/rubber-bracelet.png";
import instagramKeychain from "@/assets/products/instagram-keychain.png";
import whatsappKeychain from "@/assets/products/whatsapp-keychain.png";
import googleKeychain from "@/assets/products/google-keychain.png";

const products = [
  { id: 1, name: "بطاقة Basic", price: "15 د.أ", category: "بطاقات", image: basicCard },
  { id: 2, name: "بطاقة خشبية ذكية مع حفر ليزر", price: "35 د.أ", category: "بطاقات", image: woodenLaserCard },
  { id: 3, name: "بطاقة خشبية ذكية سادة", price: "25 د.أ", category: "بطاقات", image: woodenPlainCard },
  { id: 4, name: "بطاقة الأعمال المخصصة", price: "30 د.أ", category: "بطاقات", image: customCard },
  { id: 5, name: "بطاقة ذكية سوداء", price: "20 د.أ", category: "بطاقات", image: blackCard },
  { id: 6, name: "أسوارة قماشية ذكية", price: "18 د.أ", category: "أساور", image: fabricBracelet },
  { id: 7, name: "أسوارة مطاطية ضد الماء", price: "22 د.أ", category: "أساور", image: rubberBracelet },
  { id: 8, name: "ميدالية انستجرام الذكية", price: "12 د.أ", category: "ميداليات", image: instagramKeychain },
  { id: 9, name: "ميدالية واتساب الذكية", price: "12 د.أ", category: "ميداليات", image: whatsappKeychain },
  { id: 10, name: "ميدالية تقييمات جوجل", price: "12 د.أ", category: "ميداليات", image: googleKeychain },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const whatsappMessage = encodeURIComponent(`مرحباً، أريد الاستفسار عن المنتج: ${product.name}`);
  const whatsappLink = `https://wa.me/962791234567?text=${whatsappMessage}`;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group relative bg-gradient-to-br from-card to-card/80 rounded-3xl overflow-hidden border border-border/30 hover:border-brand-blue/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-brand-blue/10"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 via-brand-yellow/0 to-brand-red/0 group-hover:from-brand-blue/5 group-hover:via-brand-yellow/5 group-hover:to-brand-red/5 transition-all duration-500" />
      
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <span className="absolute top-4 right-4 bg-brand-blue/90 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="relative p-6 space-y-4">
        <h3 className="text-lg font-bold text-foreground group-hover:text-brand-blue transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-black bg-gradient-to-r from-brand-yellow to-brand-red bg-clip-text text-transparent">
            {product.price}
          </p>
        </div>
        
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          اطلب الآن
        </motion.a>
      </div>
    </motion.div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-14 w-auto rounded-lg"
            whileHover={{ scale: 1.05 }}
          />
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-foreground/70 hover:text-brand-blue transition-colors font-medium text-sm">
              المنتجات
            </a>
            <a href="#features" className="text-foreground/70 hover:text-brand-blue transition-colors font-medium text-sm">
              المميزات
            </a>
            <a href="#contact" className="text-foreground/70 hover:text-brand-blue transition-colors font-medium text-sm">
              تواصل معنا
            </a>
          </div>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-brand-blue/20"
          >
            اطلب الآن
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <img
                src={logo}
                alt="Logo"
                className="w-28 h-28 mx-auto rounded-3xl shadow-2xl shadow-brand-blue/30 ring-4 ring-brand-blue/20"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-block bg-gradient-to-r from-brand-blue/20 to-brand-yellow/20 backdrop-blur-sm border border-brand-blue/30 text-brand-blue px-6 py-2 rounded-full text-sm font-medium mb-6">
                ✨ تقنية NFC الذكية
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight"
            >
              أسهل وأحدث طريقة
              <br />
              <span className="bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-red bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                لمشاركة معلوماتك
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              بمجرد <span className="text-brand-yellow font-bold">لمسة واحدة!</span> شارك بياناتك وحساباتك بسهولة مع بطاقات NFC الذكية
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0, 180, 216, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 bg-gradient-to-r from-brand-blue to-brand-blue/80 text-white font-bold text-lg rounded-2xl shadow-lg shadow-brand-blue/30 transition-all duration-300"
              >
                تصفح المنتجات
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
              <motion.a
                href="https://wa.me/962791234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 bg-card border-2 border-border/50 hover:border-green-500/50 text-foreground font-bold text-lg rounded-2xl transition-all duration-300"
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                تواصل معنا
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-7 h-12 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-brand-blue rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-brand-yellow/10 text-brand-yellow px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              لماذا تختارنا؟
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              طرق متعددة لمشاركة معلوماتك
            </h2>
            <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
              اختر من بين مجموعتنا المتنوعة من منتجات NFC الذكية
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: "💳", title: "بطاقات NFC", desc: "بطاقات أنيقة وعصرية بتصاميم متعددة", color: "brand-blue" },
              { icon: "⌚", title: "أساور ذكية", desc: "أساور عصرية مقاومة للماء", color: "brand-yellow" },
              { icon: "🔑", title: "ميداليات ذكية", desc: "ميداليات لمنصات التواصل الاجتماعي", color: "brand-red" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-gradient-to-br from-card to-card/50 p-8 rounded-3xl border border-border/30 hover:border-brand-blue/30 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-yellow/0 group-hover:from-brand-blue/5 group-hover:to-brand-yellow/5 rounded-3xl transition-all duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-yellow/20 flex items-center justify-center text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-foreground/50 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              تسوق الآن
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              منتجاتنا
            </h2>
            <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
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

      {/* How it Works Section */}
      <section className="relative py-24 bg-gradient-to-b from-card/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-brand-red/10 text-brand-red px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              سهولة الاستخدام
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              كيف تعمل؟
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { step: "01", title: "اختر منتجك", desc: "اختر البطاقة أو الأسوارة المناسبة لك" },
              { step: "02", title: "أضف بياناتك", desc: "قم بإضافة معلوماتك وروابط حساباتك" },
              { step: "03", title: "شارك بلمسة", desc: "قرّب البطاقة من أي هاتف لمشاركة بياناتك" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-blue to-brand-yellow flex items-center justify-center text-2xl font-black text-background">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/50">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-brand-blue/10 via-card to-brand-yellow/10 rounded-[2.5rem] p-10 md:p-16 text-center border border-border/30 max-w-4xl mx-auto overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                هل لديك أسئلة؟
              </h2>
              <p className="text-foreground/50 text-lg mb-8 max-w-xl mx-auto">
                تواصل معنا الآن عبر الواتساب وسنساعدك في اختيار المنتج المناسب لك
              </p>
              <motion.a
                href="https://wa.me/962791234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 py-4 px-10 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                تواصل معنا عبر الواتساب
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="h-12 w-auto rounded-xl" />
              <div className="text-right">
                <p className="font-bold text-foreground">NFC Cards</p>
                <p className="text-sm text-foreground/50">بطاقات ذكية لمستقبل أفضل</p>
              </div>
            </div>
            <p className="text-foreground/40 text-sm">
              © 2024 جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
