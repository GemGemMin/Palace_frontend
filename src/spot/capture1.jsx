import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import background from './image/capture1/icon_background.png';
import captureIcon from './image/capture1/capture_icon.png';
import mapIcon from './image/capture1/map_icon.png';
import moonIcon from './image/capture1/moon_icon.png';
import Capture1 from './image/capture1/capture1.png';
import Capture2 from './image/capture1/capture2.png';
import Capture3 from './image/capture1/capture3.png';
import Capture4 from './image/capture1/capture4.png';
import Capture5 from './image/capture1/capture5.png';
import timeBackground from './image/capture1/time_background.png';
import dayText from './image/capture1/day_text.png';
import eveningText from './image/capture1/evening_text.png';
import nightText from './image/capture1/night_text.png';
import { useCapture } from '../captureComtext';

const captures = [Capture1, Capture2, Capture3, Capture4, Capture5];

export default function CaptureComponent({ handleBackgroundChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addPage } = useCapture();
    const [captureIndex, setCaptureIndex] = useState(-1);
    const [showTimeChange, setShowTimeChange] = useState(false);
    const currentPath = window.location.pathname;
    const capturedPages = useSelector((state) => state.capturedPages);

    const handleMapClick = () => {       
        navigate('/map');
    };

    const handleMoonClick = () => {
        setShowTimeChange(!showTimeChange);
    };


    const handleCaptureClick = () => {
        const currentPage = window.location.pathname; // 현재 페이지 경로를 가져옴
        
        
        // console.log('Current Path:', currentPath);
        // addPage(currentPath);
        
        captures.forEach((_, index) => {
            setTimeout(() => {
                setCaptureIndex(index);
                if (index === captures.length - 1) {
                    setTimeout(() => {
                        setCaptureIndex(-1);
                    }, 1000);
                }
            }, index * 1000);
        });
        if (capturedPages.includes(currentPage)) {
            console.log('Page already captured:', currentPage);
            return; // 중복된 페이지는 추가하지 않음
        }
        console.log('Dispatching ADD_CAPTURED_PAGE with page:', currentPage); 
        dispatch({ 
            type: 'ADD_CAPTURED_PAGE', 
            payload: { page: currentPage }, // 현재 페이지를 payload로 저장
        });
    };

    const handleBackgroundSelect = (time) => () => {
        handleBackgroundChange(time);
    };

    return (
        <>
            <img src={background} alt='아이콘 배경' style={{ position: 'absolute', top: '930px', left: '1450px', width: '210px', zIndex: 2, opacity: 0.5 }} />
            <img src={mapIcon} alt="Map" onClick={handleMapClick} style={{ position: 'absolute', top: '938px', left: '1540px', cursor: 'pointer', zIndex: 2 }} />
            <img src={captureIcon} alt="Capture" onClick={handleCaptureClick} style={{ position: 'absolute', top: '942px', left: '1480px', cursor: 'pointer', zIndex: 2 }} />
            <img src={moonIcon} alt="Time" onClick={handleMoonClick} style={{ position: 'absolute', top: '942px', left: '1600px', cursor: 'pointer', zIndex: 2 }} />
            {showTimeChange &&(
                <>
                    <img src={timeBackground} alt='텍스트 배경' style={{ position: 'absolute', top: '770px', left: '1540px', width: '150px', zIndex: 2, opacity: 0.5 }} />
                    <img src={dayText} alt='오전 텍스트' style={{ position: 'absolute', top: '780px', left: '1590px', width: '50px', zIndex: 3 }} onClick={handleBackgroundSelect('day')} />
                    <img src={eveningText} alt='오후 텍스트' style={{ position: 'absolute', top: '830px', left: '1590px', width: '50px', zIndex: 3 }} onClick={handleBackgroundSelect('evening')}/>
                    <img src={nightText} alt='밤 텍스트' style={{ position: 'absolute', top: '875px', left: '1600px', width: '30px', zIndex: 3 }} onClick={handleBackgroundSelect('night')}/>
                </>
            )}
            
            
            {captureIndex >= 0 && (
                <img
                    src={captures[captureIndex]}
                    alt={`Capture ${captureIndex + 1}`}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        zIndex: 5,
                        transition: 'opacity 0.5s',
                        opacity: 0.9,
                    }}
                />
            )}
        </>
    );
}
