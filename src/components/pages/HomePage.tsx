import { useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { BestSellers } from '@/components/sections/BestSellers';
import { FeaturedProduct } from '@/components/sections/FeaturedProduct';
import { Story } from '@/components/sections/Story';
import { Origin } from '@/components/sections/Origin';
import { Brewing } from '@/components/sections/Brewing';
import { WhyKaisen } from '@/components/sections/WhyKaisen';
import { Testimonials } from '@/components/sections/Testimonials';
import { Subscription } from '@/components/sections/Subscription';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { Newsletter } from '@/components/sections/Newsletter';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  useEffect(() => {
    document.title = "Kaisen Coffee — L'art du café, révélé";
  }, []);

  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <FeaturedProduct />
      <Story />
      <Origin />
      <Brewing />
      <WhyKaisen />
      <Testimonials />
      <Subscription />
      <InstagramFeed />
      <Newsletter />
      <FinalCTA />
    </>
  );
}