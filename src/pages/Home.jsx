import Hero from "../components/home/Hero";
import SearchBar from "../components/home/SearchBar";
import FeaturedJobs from "../components/home/FeaturedJobs";
import LatestJobs from "../components/home/LatestJobs";
import JobStats from "../components/home/JobStats";
import FeaturedCompanies from "../components/home/FeaturedCompanies";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <>
      <Hero />

      <SearchBar />

      <FeaturedJobs />

      <LatestJobs />

      <JobStats />

      <FeaturedCompanies />

      <WhyChooseUs />

      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;