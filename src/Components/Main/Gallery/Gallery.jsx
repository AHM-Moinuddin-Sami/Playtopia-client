import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { PhotoAlbum } from "react-photo-album";

const Gallery = () => {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        AOS.init();
        fetch("http://localhost:5000/galleryPhotos")
            .then(res => res.json())
            .then(data => setPhotos(data));
    }, [])

    return (
        <div >
            <div className="text-primary-content font-semibold text-center my-10">
                <h3 className='text-6xl mb-5'>Gallery Section</h3>
                <p className='text-xl'>Check out some pictures of our products</p>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000">
                <PhotoAlbum layout="columns" photos={photos}>
                </PhotoAlbum>
            </div>
        </div>
    );
};

export default Gallery;