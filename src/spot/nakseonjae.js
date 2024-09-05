import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nakseonjaeDay from './image/nakseonjae/nakseonjae_day.png';
import nakseonjaeEvening from './image/nakseonjae/nakseonjae_evening.png';
import nakseonjaeNight from './image/nakseonjae/nakseonjae_night.png';
import king from './image/nakseonjae/nakseonjae_king.png';
import maid from './image/nakseonjae/nakseonjae_maid.png';
import book from './image/book.png';
import changhoji from './image/nakseonjae/nakseonjae_changhoji.png';

export default function Nakseonjae() {
    const [showImages, setShowImages] = useState(false);
    const [shifted, setShifted] = useState(false);
    const [opacity, setOpacity] = useState(0); // 추가된 상태
    const navigate = useNavigate();

    const handleIconClick = (path) => {
        navigate(path);
    };

    const handleChanghojiClick = (path) => {
        setShifted(false);
        setShifted(true);
        setTimeout(() => {
            navigate(path);
        }, 800);
    };

    // 왕과 궁녀 이미지 2초 뒤에 등장
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowImages(true);
            // 서서히 선명도를 증가시키는 애니메이션
            let fadeEffect = setInterval(() => {
                setOpacity(prev => {
                    if (prev >= 1) {
                        clearInterval(fadeEffect);
                        return 1;
                    }
                    return prev + 0.1; // 0.1씩 증가
                });
            }, 100); // 0.1 초 간격으로 증가

        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // 주기적으로 shifted 상태 변경
    useEffect(() => {
        const interval = setInterval(() => {
            setShifted(prev => !prev);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // 현재 시간에 따라 배경 이미지 결정
    const currentHour = new Date().getHours();
    let backgroundImage;

    if (currentHour >= 6 && currentHour < 17) {
        backgroundImage = nakseonjaeDay;
    } else if (currentHour >= 17 && currentHour < 20) {
        backgroundImage = nakseonjaeEvening;
    } else {
        backgroundImage = nakseonjaeNight;
    }

    return (
        <div style={{ position: 'relative', overflow: 'hidden', height: '1069px', width: '1710px' }}>
            <img src={backgroundImage} alt="배경" style={{ position: 'relative', overflow: 'hidden', height: '1069px', width: '1710px' }} />
            <div style={{ position: 'absolute', top: '60%', left: '80%' }} onClick={() => handleIconClick('/nakseonjae/book')}>
                <img src={book} alt="서책" style={{ width: '150px', cursor: 'pointer' }} />
            </div>
            <div style={{ position: 'absolute', top: '50.5%', left: '20.7%' }} onClick={() => handleChanghojiClick('/nakseonjae/changhoji')}>
                <img 
                    src={changhoji} 
                    alt="창호지" 
                    style={{ 
                        width: '195px', 
                        cursor: 'pointer', 
                        transform: shifted ? 'translateX(40px)' : 'translateX(0)',
                        transition: 'transform 0.7s'
                    }} 
                />
            </div>
            <div style={{ position: 'absolute', top: '50.5%', left: '17.5%' }} onClick={() => handleChanghojiClick('/nakseonjae/changhoji')}>
                <img 
                    src={changhoji} 
                    alt="창호지" 
                    style={{ 
                        width: '195px', 
                        cursor: 'pointer', 
                        transform: shifted ? 'translateX(-33px)' : 'translateX(0)',
                        transition: 'transform 0.7s'
                    }} 
                />
            </div>

            {showImages && (
                <>
                    <img 
                        src={king} 
                        alt="왕" 
                        style={{ 
                            position: 'absolute', 
                            top: '65%', 
                            left: '65%', 
                            width: '170px', 
                            opacity: opacity, 
                            transition: 'opacity 0.5s'
                        }} 
                    />
                    <img 
                        src={maid} 
                        alt="궁녀" 
                        style={{ 
                            position: 'absolute', 
                            top: '65%', 
                            left: '60%', 
                            width: '127px', 
                            opacity: opacity, 
                            transition: 'opacity 0.5s'
                        }} 
                    />
                </>
            )}
        </div>
    );
}