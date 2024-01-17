
import './HeroSection.css'; 

export function HeroSection() {
  return (
    <>
     
      <div className="hero-section">
          <h1>Welcome to M4 Books</h1>
          <h5 id='id1'>Discover, share, and learn with our textbook-sharing platform.</h5>
          <a href="/signup" className="btn">Get Started</a>
      </div>
      
    </>
  );
}

export default HeroSection;
