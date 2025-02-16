
const About = () => {
    return (
      <div className="bg-customBlueLight">

        <div className='flex flex-wrap gap-2 sm:gap-x-6 pt-20 items-center justify-center '>
          <h1 className='text-4xl text-customBlueDarkest font-bold leading-none tracking-tight sm:text-6xl '>
            We love
          </h1>
          <div className='stats bg-customBlueDarkest shadow'>
            <div className='stat'>
              <div className='stat-title text-primary-content  text-4xl font-bold tracking-widest'>
                BlaZe Cars
              </div>
            </div>
          </div>
        </div>
        <p className='mt-10 text-customBlueDarkest pb-20 text-lg leading-8 max-w-2xl mx-auto'>
           
Welcome to  BlaZe Car Rentals! With over a decade of experience serving travelers across Kenya, we pride ourselves on 
providing hassle-free mobility solutions.
Our mission is simple: to make your journey memorable by offering reliable and well-maintained vehicles. <br />

At  BlaZe, we believe in quality, integrity, and exceptional customer service. Our dedicated team ensures that every 
rental experience is smooth, efficient, and tailored to your needs. <br />Join us on the road and discover the freedom of exploring
 Kenya with confidence.
        </p>
      </div>
    );
  };
  export default About;