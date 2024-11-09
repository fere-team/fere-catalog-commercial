"use client"

import s from "./how-it-works.module.scss"

import cn from "clsx"
import { useRef } from "react"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"

import { Img } from "@/components/utility/img"

import ipad from "@/public/img/ipad.jpg"
import { IconCartArrow, IconDots, IconHuman } from "../icons"

export default function HowItWorks() {
  const howItWorksRef = useRef<HTMLElement>(null)
  const phasesRef = useRef<HTMLDivElement>(null)
  const stickyCRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!phasesRef.current) return
      if (!howItWorksRef.current) return
      if (!stickyCRef.current) return

      const tl = gsap.timeline()

      tl.to(".phases", {
        y: (phasesRef.current.offsetHeight - stickyCRef.current.offsetHeight) * -1,
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ".sticky-c",
        markers: true,
        pin: true,
        scrub: true,
        end: `+=5000px`,
      })
    },
    {
      scope: howItWorksRef,
    }
  )

  return (
    <section className={s.howItWorks} ref={howItWorksRef}>
      <div className={s.intro}>
        <h2>Nasıl Çalışır?</h2>
        <p>
          Adım adım rehberimizle, ürünlerinizi online katalogda nasıl sergileyebileceğinizi ve satışlarınızı nasıl
          artırabileceğinizi öğreneceksiniz.
        </p>
      </div>

      <div className={cn(s.stickyC, "sticky-c", "grid grid-cols-2")} ref={stickyCRef}>
        <div className={cn(s.phases, "phases")} ref={phasesRef}>
          <div>
            <div className={s.iconC}>
              <IconHuman />
            </div>
            <h3>Üye olun</h3>
            <p>Size uygun olan pakete karar verin sadece birkaç adımda abonelik işlemini tamamlayın.</p>
          </div>
          <div>
            <div className={s.iconC}>
              <IconDots />
            </div>
            <h3>Kataloğunuzu Oluşturun</h3>
            <p>
              Ürünlerinizi platforma ekleyerek kendi özel kataloğunuzu oluşturun. Ürünlerinizin özelliklerini belirtin
              ve görseller ekleyin.
            </p>
          </div>
          <div>
            <div className={s.iconC}>
              <IconCartArrow />
            </div>
            <h3>Kataloğunuzu Paylaşın</h3>
            <p>
              Kataloğunuzu oluşturduktan sonra, ürünlerinizi sunmak ve online sipariş almak için dijital kataloğunuzu
              müşterilerinizle paylaşın. Artık sipariş almaya hazırsınız!
            </p>
          </div>
          <div>
            <div className={s.iconC}>
              <IconCartArrow />
            </div>
            <h3>Analiz Edin</h3>
            <p>
              Raporlama araçlarını kullanarak satış verilerini izleyin, müşterilerinizin sipariş trendini analiz edin ve
              işletme performansınızı iyileştirin.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Img alt="Man holding an ipad" src={ipad} className="object-cover" />
        </div>
      </div>
    </section>
  )
}
