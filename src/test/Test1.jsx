import React, { useState, useEffect } from "react";
import "./song/object/Experience.css";
import "./song/object/door.css";
import "./song/object/scrollImage.css";

export default function Test1() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [greenDoor1Open, setDoorsOpen1] = useState(false);
  const [greenDoor2Open, setDoorsOpen2] = useState(false);
  const [firstDoorsOpen, setFirstDoorsOpen] = useState(false);
  const [adjustView, setAdjustView] = useState(false);
  const [appealMoving, setAppealMoving] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [showAppealOpen, setShowAppealOpen] = useState(false); // Appeal Open 상태 추가
  const [disableInteraction, setDisableInteraction] = useState(false); // 사용자 입력 차단 상태
  const [isAppealClicked, setIsAppealClicked] = useState(false); // Appeal 클릭 여부


  useEffect(() => {
    // 처음 화면이 시작되면 1초 대기 후 first door가 열리도록 함
    setTimeout(() => {
      setFirstDoorsOpen(true);
    }, 1000);

    const handleScroll = (e) => {
      e.preventDefault();
      if (disableInteraction) return; // 상호작용 차단

      const delta = e.deltaY;
      const newPosition = scrollPosition + delta;

      // 이전 위치로 돌아가는 것을 방지
      if (newPosition <= scrollPosition) {
        return; // 무조건 앞으로만 이동
      }

       // 스크롤 위치 제한 (최대 6000px)
       if (newPosition >= 6000) {
        setScrollPosition(6000); // 최대 스크롤을 6000px로 제한
        return;
      }

      if (newPosition >= 3000 && !greenDoor1Open) {
        setScrollPosition(3000);
        setTimeout(() => {
          setDoorsOpen1(true);
        }, 1000);
      } else if (greenDoor1Open && !adjustView) {
        setAdjustView(true);
        setScrollPosition(3000);
      } else if (newPosition >= 4500 && !greenDoor2Open) {
        setScrollPosition(4500);
        setTimeout(() => {
          setDoorsOpen2(true);
        }, 1000);
      } else {
        setScrollPosition((prev) => Math.max(prev + delta, 0));
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollPosition, greenDoor1Open, greenDoor2Open, adjustView, appealMoving, disableInteraction]);

  // 클릭 시 애니메이션과 Appeal Open을 처리
  const handleAppealClick = () => {
    setDisableInteraction(true);
    setAppealMoving(true);
    setBlurBackground(true);

    setTimeout(() => {
      setShowAppealOpen(true); // `new-appeal` 애니메이션을 1초 지연하여 시작
      setTimeout(() => {
        setDisableInteraction(false);
      }, 2000); // `new-appeal` 애니메이션이 완료된 후 상호작용 가능하게 변경
    }, 2000); // `move-left` 애니메이션이 완료된 후 시작
  };

  return (
    <div className={`world ${blurBackground ? "blurred-background" : ""} ${disableInteraction ? "disable-interaction" : ""}`}>
      <div
        className="stage"
        style={{
          transform: adjustView
            ? `translateY(-20%) translateZ(${scrollPosition}px)`
            : `translateY(0%) translateZ(${scrollPosition}px)`,
        }}
      >
        <div className="house">
          {/* 첫 번째 문 */}
          <section className="wall wall-front" style={{ transform: "translateZ(-0px)" }}>
            <div className="first-doors">
              <img
                src="images/first_door_left.png"
                alt="Left Door"
                className={`first-door-left ${firstDoorsOpen ? "open-forward" : ""}`}
              />
              <img
                src="images/first_door_right.png"
                alt="Right Door"
                className={`first-door-right ${firstDoorsOpen ? "open-forward" : ""}`}
              />
            </div>
          </section>

          {/* 초록색 배경 문 */}
          <section className="wall wall-front" style={{ transform: "translateZ(-3000px)" }}>
            <div className="wall-content">
              <div className="background-image">
                <img src="images/green/background1.png" alt="Background" />
              </div>
              <div className="doors1">
                <img
                  src="images/green/door_left.png"
                  alt="Left Door"
                  className={`door-left ${greenDoor1Open ? "open" : ""}`}
                />
                <img
                  src="images/green/door_right.png"
                  alt="Right Door"
                  className={`door-right ${greenDoor1Open ? "open" : ""}`}
                />
              </div>

              <div className="doors2">
                <img
                  src="images/green/door_left.png"
                  alt="Left Door"
                  className={`door-left ${greenDoor2Open ? "open" : ""}`}
                />
                <img
                  src="images/green/door_right.png"
                  alt="Right Door"
                  className={`door-right ${greenDoor2Open ? "open" : ""}`}
                />
              </div>
            </div>
          </section>

          {/* Appeal 이미지 애니메이션 */}
          <section className="wall wall-front" style={{ transform: "translateZ(-5000px)" }}>
            <div className="wall-content">
              <div className="background-image">
                <img src="images/green/background2.png" alt="Background" />
              </div>

              <div className={`appeal ${appealMoving ? "move-left" : ""}`} onClick={handleAppealClick}>
                <img src="images/green/appeal.png" 
                alt="Appeal"
                className={`appeal-now ${appealMoving ? "rotate" : ""}`}/>
              </div>

              {!showAppealOpen && (
                  <div className={`new-appeal ${!showAppealOpen ? "enter" : ""}`}>
                    <img src="images/green/appeal_open.png" alt="Appeal Open" />
                  </div>
                )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
