
import './HeroSection.css'; 

export function HeroSection() {
  return (
    <>
      <div className='po' style={{width:"50%" ,height:""}}>
        <img src='Read.jpg' style={{width:"100%",marginLeft:"350px"}}/>
      </div>

      <div className="hero-section" style={{backgroundImage:'',marginTop:"-150px"}}>
          <h1>Welcome to M4 Books</h1>
          {/* <h5 id='id1'>Discover, share, and learn with our textbook platform.</h5> */}
          <a href="/signup" className="btn">Get Started</a>
      </div>
    </>
  );
}

export default HeroSection;
