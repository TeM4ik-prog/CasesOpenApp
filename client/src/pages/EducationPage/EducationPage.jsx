import { Link } from "react-router-dom";


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "./EducationPage.scss"


import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Slide1 from "./Slides/slide1";
import Slide2 from "./Slides/slide2";
import Slide3 from "./Slides/slide3";
import Slide4 from "./Slides/slide4";
import Slide5 from "./Slides/slide5";
import Slide6 from "./Slides/slide6";

export default function EducationPage() {




    return (
        <div id="unique-page">
            <div className="container-page" style={{ height: '100%' }}>

                <Link to={'/'}>
                    <p className="text-link">🢢 На главную</p>

                </Link>
                <h2>Education</h2>


                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper">

                    <SwiperSlide><Slide1 /></SwiperSlide>
                    <SwiperSlide><Slide2 /></SwiperSlide>
                    <SwiperSlide><Slide3 /></SwiperSlide>
                    <SwiperSlide><Slide4 /></SwiperSlide>
                    <SwiperSlide><Slide5 /></SwiperSlide>
                    <SwiperSlide><Slide6 /></SwiperSlide>

                </Swiper>



            </div>
        </div>

    )
}