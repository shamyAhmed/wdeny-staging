"use client";
import { useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WhyChooseUsSectionProps {
  data: {
    about_why_choose_title_desc_en: string;
    about_why_choose_title_desc_ar: string;
    about_why_choose_description_desc_en: string;
    about_why_choose_description_desc_ar: string;
    about_why_choose_comprehensive_support_desc_en: string;
    about_why_choose_comprehensive_support_desc_ar: string;
    about_why_choose_robust_network_desc_en: string;
    about_why_choose_robust_network_desc_ar: string;
    about_why_choose_in_house_expertise_desc_en: string;
    about_why_choose_in_house_expertise_desc_ar: string;
  };
}

export const WhyChooseUsSection = () => {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const sectionRef = useRef<HTMLElement>(null);

  const whyChooseUsData = [
    {
      icon: "/images/about/why-choose-one.svg",
      title: "الاستقلالية الموجهة",
      desc: 'لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت"  البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل إيبسوم.',
    },
    {
      icon: "/images/about/why-choose-two.svg",
      title: "شبكة قوية",
      desc: 'لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت"  البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل ألدوس بايج مايكرم.',
    },
    {
      icon: "/images/about/why-choose-three.svg",
      title: "خبرة داخلية",
      desc: 'لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت"  البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل .',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-choose-heading", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".why-choose-card", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        clearProps: "all", // reset after animation
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why-choose-us-section">
      <div className="container">
        <div className="content why-choose-heading">
          <h4 className="title">لماذا تختارنا؟</h4>
          <p>
            لوريم إيبسوم هو ببساطة نص شكلي بمعنى أن الغاية هي الشكل وليس المحتوى
            ويُستخدم في صناعات المطابع ودور النشر.
          </p>
        </div>
        <div className="cards">
          <Row gutter={[24, 24]}>
            {whyChooseUsData.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <div className="card why-choose-card">
                  <Image src={item.icon} width={64} height={64} alt={"Icon"} />
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};
