import About from "@/src/widgets/about";
import Certificates from "@/src/widgets/cerificates";
import Footer from "@/src/widgets/footer";
import Header from "@/src/widgets/header";
import Services from "@/src/widgets/services";

export default function HomePage() {
  return (
    <>
      <Header />
      <Services />
      <About />
      <Certificates />
      <Footer />
    </>
  );
}
