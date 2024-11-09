import { ContactForm } from "@/components/contact-form"
import { Img } from "@/components/utility/img"
import { SideNavigationProps, SupportFaqProps } from "@/types"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Navigation from "./components/navigation"
import SupportFaq from "./components/support-faq"

export default function Page() {
  const mockNavigation: SideNavigationProps = {
    title: "En Çok Merak Edilenler",
    items: [
      {
        id: "1",
        title: "Üyelik Türleri ve Fiyatlandırma",
        href: "/membership",
      },
      {
        id: "2",
        title: "Abonelik Planları Karşılaştırması",
        href: "/subscription",
      },
      {
        id: "3",
        title: "Sürdürülebilir Tekstil Eko-Dostu Malzemeler ve Üretim Teknikleri",
        href: "/sustainability",
      },
      {
        id: "4",
        title: "3D Baskının Tekstil ve Moda Üzerindeki Etkisi",
        href: "/3d-printing",
      },
      {
        id: "5",
        title: "Giyilebilir Teknoloji: Popüler Ürünler ve İnovasyonlar",
        href: "/wearable-tech",
      },
      {
        id: "6",
        title: "Endüstri 4.0 ve Dijitalleşmenin Tekstildeki Rolü",
        href: "/industry",
      },
      {
        id: "7",
        title: "Gelecek Öngörüleri ve Teknolojik Gelişmeler",
        href: "/future",
      },
      {
        id: "8",
        title: "İletişim Formu",
        href: "/contact",
      },
    ],
  }

  const mockSupportFaq: SupportFaqProps = {
    id: "1",
    title: "Üyelik Türleri ve Fiyatlandırma",
    items: [
      {
        id: "membership",
        question: "Nasıl üye olurum?",
        answer: [
          "İlk olarak, hemen üye ol butonuna tıklayın.",
          "Üyelik Formununda bulunan bilgileri doldurun.",
          "Verdiğiniz bilgileri doğrulayın ve gerekirse e-posta veya telefon numaranızı onaylayın.",
          "Üyelik işlemi tamamlandığında, platforma giriş yapabilir ve kullanmaya başlayabilirsiniz.",
        ],
      },
      {
        id: "business",
        question: "Üye olmak için işletme sahibi olmam gerekir mi?",
        answer: "Hayır, bireysel kullanıcılar da üye olabilir.",
      },
      {
        id: "payment",
        question: "Ürün satışı için ödeme altyapısı sağlanıyor mu?",
        answer: "Evet, güvenli ödeme altyapımız mevcuttur.",
      },
    ],
  }

  return (
    <div className="pb-40 pt-10 space-y-12">
      <div className="grid grid-cols-12">
        <nav
          className="col-span-4 flex items-center mb-auto space-x-1 text-14 font-albert-sans text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link href="/destek" className="hover:text-foreground transition-colors">
            Destek
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="">Üyelik ve Abonelik</span>
        </nav>
        <div className="col-span-8 space-y-4">
          <h1 className="text-30 font-albert-sans font-medium">Üyelik ve Abonelik</h1>
          <p className="text-20 font-mukta font-light max-w-4xl">
            Bu kategoriye ait tüm soruları aşağıda bulabilirsiniz. Ulaşamadığınız bir soru varsa sayfanın sonundaki
            iletişim formunu doldurup bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <nav className="col-span-4 space-x-1 text-14 font-albert-sans text-muted-foreground">
          <Navigation {...mockNavigation} />
        </nav>
        <div className="col-span-8 space-y-4">
          <div className="h-98">
            <Img src={"/img/sample.jpg"} height={500} width={500} alt={"Sample"} className="object-cover" />
          </div>
          <SupportFaq {...mockSupportFaq} />
        </div>
      </div>
      <section className="grid grid-cols-12 gap-20 py-16">
        <div className="col-span-6 flex flex-col space-y-8">
          <p className="indent-16 font-albert-sans text-20 font-normal leading-tight">
            Aradığınız soruyu bulamadınız mı? Sorunuzu bize iletmek için aşağıdaki formu doldurun, en kısa sürede size
            geri dönüş yapacağız.
          </p>
          <div className="max-w-lg">
            <ContactForm />
          </div>
        </div>
        <div className="col-span-6">
          <div>
            <Img src="/img/employee.jpg" alt="Sample" height={1000} width={1000} />
          </div>
        </div>
      </section>
    </div>
  )
}
