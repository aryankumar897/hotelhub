"use client";



import Navbar from "@/components/nav/Navbar";
import Home from "@/components/home/Home";

import Rooms from "@/components/rooms/Rooms";

import Quick from "@/components/quick/Quick";
import Service from "@/components/service/Service";

import Team from "@/components/team/Team";

import Testimonial from "@/components/testimonial/Testimonial";
import Faqsection from "@/components/faqsection/Faqsection ";
import Blog from "@/components/blog/Blog";


export default function Homes() {
  return (
    <main>
      {/* <Top /> */}
      {/* <Navbar /> */}
      <Home />
      <Rooms />

      <Quick />
      <Service />

      <Team />
      <Testimonial />
      <Faqsection />
      <Blog />
{/* 
      <Footer /> */}
    </main>
  );
}
