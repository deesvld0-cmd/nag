import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBanner from '@/components/StatsBanner';
import Programs from '@/components/Programs';
import ExerciseLibrary from '@/components/ExerciseLibrary';
import BMICalculator from '@/components/BMI.Calculator';
import GymMap from '@/components/GymMap';
import Membership from '@/components/Membership';
import Transformations from '@/components/Transformation';
import Trainers from '@/components/Trainers';
import Shop from '@/components/Shop';
import Blog from '@/components/blog';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsBanner />
      <Programs />
      <ExerciseLibrary />
      <BMICalculator />
      <GymMap />
      <Membership />
      <Transformations />
      <Trainers />
      <Shop />
      <Blog />
      <Footer />
      <AIChat />
    </main>
  );
}
