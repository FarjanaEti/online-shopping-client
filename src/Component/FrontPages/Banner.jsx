
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


import img1 from '../../assets/img-7.jpg';
import img3 from '../../assets/img-3.webp';
import img4 from '../../assets/img-4.webp';
import img5 from '../../assets/img-8.jpg';
import img6 from '../../assets/img-5.jpg';



const Banner = () => {
    return (
        <Carousel
        autoPlay={true}     
            interval={3000}     
            infiniteLoop={true}
            
            showStatus={false}  >
            <div>
            <div className="absolute  inset-0 flex items-center justify-center">
                   
                </div>             
                <img src={img1} />
            </div>
           
            <div >  
            <div className="absolute  inset-0 flex items-center justify-center">
                    
                </div>                           
                <img src={img4} />
            </div>
            <div >
            <div className="absolute  inset-0 flex items-center justify-center">
                   
                </div>             
                <img src={img5} />
            </div>
            <div >
            <div className="absolute  inset-0 flex items-center justify-center">
                   
                </div>             
                <img src={img6} />
            </div>
            <div >
            <div className="absolute  inset-0 flex items-center justify-center">
                   
                </div>             
                <img src={img3} />
            </div>
        </Carousel>
    );
};

export default Banner;
