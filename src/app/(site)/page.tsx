"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MediaCard } from "@/components/site/MediaCard";
import { mediaItems } from "@/lib/media-data";
import { RepresentationCard } from "@/components/site/RepresentationCard";
import { representationsData } from "@/lib/representations-data";

export default function SinglePageSite() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle hero parallax on scroll
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroVideoY = useTransform(
    heroProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "12%"]
  );

  const heroTextY = useTransform(
    heroProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-8%"]
  );

  return (
    <div className="w-full overflow-hidden bg-transparent text-[var(--primary-text)]">

      {/* 1. HERO SECTION */}
      <section
        id="home"
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-20 bg-gradient-to-b from-[var(--background-footer)] to-[var(--background)]"
      >
        {/* Central Sketch / Architectural Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroVideoY }}
          className="w-[90vw] md:w-[60vw] max-w-[1000px] aspect-video relative z-10 overflow-hidden rounded-sm border border-[var(--sketch-border)] shadow-[0_12px_40px_var(--shadow-color)]"
        >

          {/* Hero Animated Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/videos/Rohit_Animated_Video_Poster.jpg"
            className="absolute inset-0 w-full h-full object-cover scale-[1.10] origin-center"
          >
            <source
              src="/videos/Rohit_Animated_Video.mp4"
              type="video/mp4"
            />
          </video>

          {/* Subtle overlay adapting to theme */}
          <div className="absolute inset-0 bg-[var(--hero-overlay)] pointer-events-none transition-colors duration-300" />

        </motion.div>

        <motion.div
          style={{ y: heroTextY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[15%] md:translate-y-[20%] flex flex-col items-center justify-center z-20 w-full pointer-events-none transition-all drop-shadow-2xl"
        >
          <h1 className="flex flex-col items-center text-center uppercase tracking-tighter leading-[0.85] font-heading m-0 p-0 text-[var(--accent)]">
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16vw] md:text-[14vw] font-bold"
            >
              ROHIT
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[10vw] font-normal -mt-[0.2em] tracking-normal"
              style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic" }}
            >
              Dandwate
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm md:text-xl font-sans tracking-[0.2em] text-[var(--primary-text)] uppercase font-bold drop-shadow-lg transition-colors"
          >
            Education & Social Impact Activist
          </motion.p>
        </motion.div>
      </section>

      {/* 2. STATS SECTION (Two Side-by-Side Images) */}
      <section className="relative w-full overflow-hidden pt-20 pb-10 bg-[var(--background)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-5/12"
            >
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-[var(--border-subtle)] shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] transition-shadow duration-500">
                <Image
                  src="/images/rohit_homepage.png"
                  alt="Rohit Portrait 1"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
            {/* SECOND IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-full md:w-5/12"
            >
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-[var(--border)] mt-12 md:mt-24">
                <Image
                  src="/images/Rohit_image2.png"
                  alt="Rohit Portrait 2"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION 2 (Large Text Reveal) */}
      <section id="about" className="bg-[var(--background-secondary)] py-16 md:py-32 relative z-10 border-t border-[var(--border-subtle)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading leading-tight text-[var(--muted-text)] transition-colors duration-300"
          >
            <strong className="font-bold text-[var(--primary-text)] transition-colors duration-300">Rohit Dandawate</strong> is an education and social impact activist working to make schools safer, healthier and more accountable to the families they serve. <strong className="font-bold text-[var(--primary-text)] transition-colors duration-300">Rohit Dandawate is the President of the Global Parents Teachers Association (GPTA)</strong>, a platform that brings parents, teachers and institutions into one conversation about the everyday realities of education, from classroom safety and school food to student wellbeing.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-4xl lg:text-5xl font-sans font-light leading-tight text-[var(--secondary-text)] mt-12 md:mt-20 transition-colors duration-300"
          >
            Over years of public work across Maharashtra, Rohit has raised concerns, filed representations and built awareness on issues that affect children long before they reach the headlines. His approach is simple: listen to parents, verify the facts, engage the institution, and follow through until something changes.
          </motion.h2>
        </div>
      </section>

      {/* 4. MY STORY SECTION (Video) */}
      <section className="py-16 md:py-32 relative z-10 bg-[var(--background)] border-t border-[var(--border-subtle)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-heading mb-8 md:text-right text-[var(--primary-text)] transition-colors duration-300"
            >
              My Story
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-video bg-[var(--card-bg)] rounded-sm overflow-hidden border border-[var(--border)] shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] hover:border-[var(--accent)] transition-all duration-500"
            >

              <video
                controls
                controlsList="nodownload noplaybackrate"
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source
                  src="/videos/Rohit_My_Story.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="py-16 md:py-32 relative z-10 bg-[var(--background-secondary)] border-t border-[var(--border-subtle)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-widest text-[var(--muted-text)] mb-2 transition-colors duration-300">About</h2>
            <h3 className="text-5xl md:text-7xl font-heading mb-16 md:mb-24 text-[var(--primary-text)] transition-colors duration-300">Advocacy Leadership <span className="text-[var(--accent)] italic font-normal">With a Human Purpose</span></h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-12 gap-8 md:gap-16"
          >
            <div className="md:col-span-9">
              <h2 className="text-3xl md:text-5xl font-heading leading-tight text-[var(--primary-text)] transition-colors duration-300">
                Rohit Dandawate has built his career at the intersection of education reform, child safety, and institutional accountability.
              </h2>
              <h2 className="text-2xl md:text-4xl font-sans font-light leading-tight text-[var(--secondary-text)] mt-12 transition-colors duration-300">
                His journey includes extensive fieldwork, policy advocacy, and community mobilization. He has led groundbreaking initiatives to ensure schools adhere to safety norms, nutrition standards, and transparent fee structures, always placing the welfare of the child at the center of his work.
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-12 gap-8 md:gap-16 mt-20"
          >
            <div className="md:col-span-10">
              <h2 className="text-3xl md:text-5xl font-heading leading-tight text-[var(--primary-text)] transition-colors duration-300">
                <strong className="font-bold">Rohit is the President of the GPTA</strong>, a platform empowering parents and teachers to actively shape the educational ecosystem.
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-end mt-16"
          >
            <div className="group w-full md:w-10/12 aspect-[21/9] bg-[var(--background)] rounded-sm overflow-hidden border border-[var(--border)] relative transition-all duration-500 shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] hover:border-[var(--accent)]">
              <Image
                src="/images/Rohit_about.png"
                alt="Rohit Dandawate"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. SPEAKING / EXPERTISE SECTION */}
      <section id="work" className="py-16 md:py-32 relative z-10 border-t border-[var(--border-subtle)] bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-widest text-[var(--muted-text)] mb-2 transition-colors duration-300">Expertise</h2>
            <h3 className="text-5xl md:text-7xl font-heading mb-16 md:mb-24 text-[var(--primary-text)] transition-colors duration-300">Speaking About the <span className="text-[var(--accent)] italic font-normal">Future of Education</span></h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--card-bg)] p-8 md:p-16 rounded-sm border border-[var(--border)] shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] hover:border-[var(--accent)] transition-all duration-500"
          >
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-8">
                <h2 className="text-3xl md:text-4xl font-heading leading-tight text-[var(--primary-text)] transition-colors duration-300">
                  Rohit brings together years of grassroots activism, policy understanding, and community leadership.
                </h2>
                <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight text-[var(--secondary-text)] mt-8 transition-colors duration-300">
                  As a sought-after speaker, he explores the realities of modern schooling and asks how institutions can remain aligned with the fundamental needs of children and families.
                </h2>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-6 md:text-right text-[var(--primary-text)] transition-colors duration-300">Topics of Focus:</h3>
                <ul className="space-y-3 text-[var(--secondary-text)] font-sans md:text-right transition-colors duration-300">
                  {['Child Safety & School Audits', 'Parent-Teacher Collaboration', 'Education Policy Reform', 'Institutional Accountability', 'Student Mental & Physical Wellbeing'].map((topic, i) => (
                    <li key={i} className="hover:text-[var(--accent)] transition-colors duration-200">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. JOURNEY (Timeline) */}
      <section id="gpta" className="py-16 md:py-32 relative z-10 bg-[var(--background-secondary)] border-t border-[var(--border-subtle)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-widest text-[var(--muted-text)] mb-2 transition-colors duration-300">Journey</h2>
            <h3 className="text-5xl md:text-7xl font-heading mb-16 md:mb-24 text-[var(--primary-text)] transition-colors duration-300">Through the <span className="text-[var(--accent)] italic font-normal">years</span></h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div className="w-full aspect-[4/5] bg-[var(--background)] rounded-sm overflow-hidden mb-6 relative border border-[var(--border)] shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] group-hover:border-[var(--accent)] transition-all duration-500">
                <Image src="/images/White_dress.png" alt="GPTA Founded" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" />
              </div>
              <p className="text-[var(--accent)] font-bold tracking-widest text-lg md:text-xl mb-3">2022 / PRESENT</p>
              <h4 className="text-3xl lg:text-4xl font-heading mb-4 text-[var(--primary-text)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">President, GPTA</h4>
              <p className="text-base lg:text-lg text-[var(--secondary-text)] font-sans font-light leading-relaxed transition-colors duration-300">Leading the Global Parents Teachers Association to revolutionize the dialogue between parents and educational institutions across the state.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div className="w-full aspect-[4/6] bg-[var(--background)] rounded-sm overflow-hidden mb-6 relative border border-[var(--border)] shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] group-hover:border-[var(--accent)] transition-all duration-500">
                <Image src="/images/rohit_homepage.png" alt="Safety Campaign" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" />
              </div>
              <p className="text-[var(--accent)] font-bold tracking-widest text-lg md:text-xl mb-3">2018 / 2022</p>
              <h4 className="text-3xl lg:text-4xl font-heading mb-4 text-[var(--primary-text)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">School Safety Advocate</h4>
              <p className="text-base lg:text-lg text-[var(--secondary-text)] font-sans font-light leading-relaxed transition-colors duration-300">Spearheaded multiple public campaigns addressing critical gaps in school transport, fire safety, and campus security.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div className="w-full aspect-[3/3] bg-[var(--background)] rounded-sm overflow-hidden mb-6 relative border border-[var(--border)] shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_45px_var(--shadow-color)] group-hover:border-[var(--accent)] transition-all duration-500">
                <Image src="/images/Community_mobilizer.png" alt="Early Activism" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" />
              </div>
              <p className="text-[var(--accent)] font-bold tracking-widest text-lg md:text-xl mb-3">2015 / 2018</p>
              <h4 className="text-3xl lg:text-4xl font-heading mb-4 text-[var(--primary-text)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">Community Mobilizer</h4>
              <p className="text-base lg:text-lg text-[var(--secondary-text)] font-sans font-light leading-relaxed transition-colors duration-300">Worked at the grassroots level organizing parents to audit school fee structures and demand transparency in educational expenses.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. IMPACT — 150+ PUBLIC REPRESENTATIONS ARCHIVE */}
      <section id="impact" className="py-16 md:py-32 relative z-10 border-t border-[var(--border-subtle)] bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">

          {/* Main Headline Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-20"
          >
            <span className="text-6xl md:text-8xl font-heading text-[var(--primary-text)] transition-colors duration-300 block leading-none">
              <b>  150+  Public Representations  </b>
            </span>
            <p className="text-lg md:text-2xl text-[var(--secondary-text)] mt-4 font-sans font-light max-w-4xl leading-relaxed transition-colors duration-300">
              More than 150 public representations and interventions addressing issues concerning education, student welfare, parent concerns, school accountability and children’s well-being.
            </p>
          </motion.div>

          {/* 3-Column Representation Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {representationsData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <RepresentationCard item={item} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. INITIATIVES (Replacing Inventions) */}
      <section className="py-16 md:py-32 relative z-10 bg-[var(--background-secondary)] border-t border-[var(--border-subtle)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-widest text-[var(--muted-text)] mb-2 transition-colors duration-300">Initiatives</h2>
            <h3 className="text-5xl md:text-7xl font-heading mb-16 md:mb-24 text-[var(--primary-text)] transition-colors duration-300">Actions Taken For <span className="text-[var(--accent)] italic font-normal">Change</span></h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Campus Hygiene & Nutrition Audits",
                image: "/images/initiatives/action_01_lokmat_canteen.jpg",
                description: "Lokmat: Demanding strict monitoring and quarterly compliance reports against high-sugar and fatty food sales in school canteens.",
              },
              {
                title: "Statewide Junk Food Ban Enforcement",
                image: "/images/initiatives/action_02_toi_junk_food.jpg",
                description: "Times of India: Sounding the alarm across Maharashtra on the 10-year ban on fast food and HFSS items in school premises.",
              },
              {
                title: "FSSAI Safety Act Compliance",
                image: "/images/initiatives/action_03_pudhari_canteen.jpg",
                description: "Pudhari: Pushing for regulatory inspection and legal penalties under Section 56 of FSSAI Act for defaulting school vendors.",
              },
              {
                title: "School Canteen Oversight Committees",
                image: "/images/initiatives/action_04_mumbai_mirror.jpg",
                description: "Mumbai Mirror: Advocating 30-day inspection drives, school-level food monitoring committees, and active parent oversight.",
              },
              {
                title: "Student Data Privacy & APAAR ID",
                image: "/images/initiatives/action_05_midday_apaar.jpg",
                description: "Mid-Day: Public representations seeking statutory clarity and data protection safeguards against student ID data exposure.",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300 block text-left"
              >
                <div className="aspect-[3/4] bg-[var(--background)] border border-[var(--border)] rounded-sm mb-4 overflow-hidden relative transition-all duration-300 shadow-[0_12px_40px_var(--shadow-color)] hover:shadow-[0_20px_40px_var(--shadow-color)] group-hover:border-[var(--accent)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/10 transition-all duration-300 pointer-events-none" />

                  {/* Subtle View Hover Overlay */}
                  <div className="absolute inset-0 z-10 bg-[var(--background)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center p-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[var(--card-bg)]/95 border border-[var(--accent)] text-[var(--accent)] text-[11px] font-sans font-medium tracking-wider uppercase shadow-xl flex items-center gap-1">
                      View Record ↗
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-heading text-[var(--primary-text)] group-hover:text-[var(--accent)] transition-colors leading-snug">{item.title}</h4>
                <p className="text-[var(--muted-text)] text-sm mt-2 transition-colors duration-300 font-light leading-relaxed">{item.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. MEDIA */}
      <section id="media" className="py-16 md:py-32 relative z-10 border-t border-[var(--border-subtle)] bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-sans uppercase tracking-widest text-[var(--muted-text)] mb-12 transition-colors duration-300"
          >
            IN THE MEDIA
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <MediaCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
