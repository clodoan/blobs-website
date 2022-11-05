import { useRef, useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({});
  const boxRef = useRef();
  const handleMouseMove = (e) => {
    setMousePosition(getRelativeCoordinates(e, boxRef.current));
  };
  function getRelativeCoordinates(event, referenceElement) {
    const position = {
      x: event.pageX,
      y: event.pageY,
    };

    const offset = {
      left: referenceElement.offsetLeft,
      top: referenceElement.offsetTop,
      width: referenceElement.clientWidth,
      height: referenceElement.clientHeight,
    };

    let reference = referenceElement.offsetParent;

    while (reference) {
      offset.left += reference.offsetLeft;
      offset.top += reference.offsetTop;
      reference = reference.offsetParent;
    }

    return {
      x: position.x - offset.left,
      y: position.y - offset.top,
      width: offset.width,
      height: offset.height,
      centerX:
        (position.x - offset.left - offset.width / 2) / (offset.width / 2),
      centerY:
        (position.y - offset.top - offset.height / 2) / (offset.height / 2),
      relativeX: ((position.x - offset.left) * 100) / offset.width,
      relativeY: ((position.y - offset.top) * 100) / offset.height,
    };
  }

  const COLORS = {
    blue: "#c6f1ff",
    yellow: "#fcffe9",
    orange: "#ffcd9f",
    green: "#e2ffee",
    purple: "#ffc1fd",
  };

  const Blob = ({ color, width, height, top, left }) => {
    const posY =
      top + (mousePosition.relativeY / (mousePosition.relativeX + 1)) * 2;
    const posX =
      left + (mousePosition.relativeX / (mousePosition.relativeY + 1)) * 2;
    return (
      <div
        className={styles.blob}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: COLORS[color],
          top: `${posY}%`,
          left: `${posX}%`,
          scale: `${
            (mousePosition.relativeX + mousePosition.relativeY) / 100 + 1
          }`,
        }}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.blobsCard}
        ref={boxRef}
        onMouseMove={(e) => handleMouseMove(e)}
      >
        <Blob width={600} height={320} color="purple" top={0} left={40} />
        <Blob width={600} height={320} color="orange" top={0} left={0} />
        <Blob width={600} height={320} color="orange" top={0} left={100} />
        <Blob width={600} height={520} color="blue" top={60} left={60} />
        <Blob width={600} height={620} color="green" top={100} left={100} />
        <Blob width={600} height={320} color="yellow" top={0} left={10} />
        <Blob width={800} height={320} color="green" top={100} left={60} />
        <Blob width={600} height={320} color="orange" top={100} left={100} />
        <Blob width={600} height={320} color="purple" top={80} left={40} />
        <Blob width={400} height={320} color="green" top={50} left={0} />
        <Blob width={600} height={620} color="green" top={-30} left={120} />
        <Blob width={600} height={320} color="yellow" top={-20} left={150} />
      </div>
    </div>
  );
}
