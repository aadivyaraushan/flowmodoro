import {useEffect, useRef, useState, FC, RefObject, Dispatch, SetStateAction} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStop } from '@fortawesome/free-solid-svg-icons';
import startSfx from '../public/sfx/start.mp3';
import stopSfx from '../public/sfx/stop.mp3';
import timerStartSfx from '../public/sfx/timerStart.mp3';

type Props = {
  setTitle: Dispatch<SetStateAction<string>>
}

const Stopwatch: FC<Props> = ({setTitle}) => {
  const [divisor, setDivisor] = useState(3);
  const [time, setTime] = useState(300);
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const startRef = useRef<HTMLAudioElement>(null);
  const stopRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<HTMLAudioElement>(null);
  const [domLoaded, setDomLoaded] = useState(false);

  const start = () => {
    startRef.current?.play();
  };
  const stop = () => {
    stopRef.current?.play();
  };
  const timerStart = () => {
    timerRef.current?.play();
  };


  useEffect(() => {
    let interval = setInterval(() => {});
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(Math.floor(time / divisor));
      setIsTimer(true);
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [running, divisor]);

  useEffect(() => {
    document.title = `Work - ${String(Math.floor(time / 59)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')} | Flowmodoro`;
    if(isTimer && timer > 0) {
      document.title = `Break - ${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')} | Flowmodoro`;
    }
    else if(time <= 0 && !isTimer) {
      document.title = 'Flowmodoro';
    }
  }, [time, timer])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> = setInterval(() => {});
    if (isTimer) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval);

  }, [isTimer]);

  useEffect(() => {
    if (timer <= 0) {
      setIsTimer(false);
    }
  }, [timer]);

  useEffect(() => {
    setDomLoaded(true);
  }, [])

  useEffect(() => {
    if (Number(localStorage.getItem('divisor')) === 0) {
      setDivisor(3);
    } else {
      setDivisor(Number(localStorage.getItem('divisor')));
    }
  }, [divisor])

  return (
  <>
    {domLoaded && (<div className='flex items-center flex-col self-center justify-center h-1/3 '>
      {!isTimer && (
        <>
          <div className=' flex flex-row  h-full w-full justify-center'>
            <div className=' flex-1 flex flex-col justify-center items-end'>
              <h1 className=' text-9xl w-80'>
                {String(Math.floor(time / 60)).padStart(2, '0')}:
                {String(time % 60).padStart(2, '0')}
              </h1>
              <div className='flex flex-row justify-between w-80'>
                <button
                  onClick={() => {
                    setRunning(true);
                    start();
                  }}
                >
                  <FontAwesomeIcon icon={faPlay} size='4x' />
                </button>
                <button
                  onClick={() => {
                    setRunning(false);
                    stop();
                  }}
                >
                  <FontAwesomeIcon icon={faStop} size='4x' />
                </button>
              </div>
            </div>
            <div className='flex-1 flex flex-col justify-center items-start'>
              <p className=' ml-10 text-justify text-4xl'>
                <p className=' mb-5 font-bold text-5xl  text-left '>
                  How does this method work?
                </p>{' '}
                Pick an aim for this session of work and give yourself a fixed
                deadline for it.
                <br />
                <br />
                Start the stopwatch and start working.
                <br />
                <br />
                When you feel like your focus is 50% or less, stop the timer and
                take a break.
                <br />
                <br />
                The break time is calculated by dividing the time you spent by a
                divisor which you can modify in the settings.
              </p>{' '}
            </div>
          </div>
        </>
      )}
      {isTimer && (
        <>
          <div className=' flex flex-row  h-full w-full justify-center'>
            <div className=' flex-1 flex flex-col justify-center items-end'>
              <h1 className='text-9xl' onLoad={timerStart}>
                {String(Math.floor(timer / 60)).padStart(2, '0')}:
                {String(timer % 60).padStart(2, '0')}
              </h1>
            </div>
            <div className='flex-1 flex flex-col justify-center items-start'>
              <br />
              <p className='ml-10 text-justify text-4xl'>
                <p className=' mb-5 font-bold text-5xl  text-left '>
                  How to spend breaks?
                </p>{' '}
                Practice active relaxation techniques like mindfulness
                meditation
                <br />
                <br />
                Do something else that&apos;s productive but easy(clean up your
                room, life admin, going for a stroll and casually studying,
                etc). <br />
                <br />
                DO NOT spend this time watching YouTube, scrolling through
                social media, etc... That&apos;s gonna take you out of the flow
                state.
              </p>
            </div>
          </div>
        </>
      )}
      <audio src={startSfx} ref={startRef} />
      <audio src={stopSfx} ref={stopRef} />
      <audio src={timerStartSfx} ref={timerRef} />
    </div>) }
  </>
  );
};

export default Stopwatch;
