import Stopwatch from '../components/Stopwatch';
import Container from '../components/Container';
import {useEffect, useState} from 'react';
import SettingsModal from "../components/SettingsModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import ColourContext from '../contexts/ColourContext'
import Head from 'next/head';

const Home: () => false | JSX.Element = () => {
  const [title, setTitle] = useState('Flowmodoro');
  const [showModal, setShowModal] = useState(false);
  const colourState = useState<string>();
  const [colour, setColour] = colourState;
  const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        console.log('useeffect running');
        console.log(localStorage);
            if((localStorage.getItem('colour') === 'dark' ) || (localStorage.getItem('colour') === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
                setColour('dark');
            } else {
                document.documentElement.classList.add('light');
                setColour('light');
            }
        setDomLoaded(true);
    }, []);

    useEffect(() => {
            console.log('colour changed to ' + colour);
    }, [colour]);


  return (
      domLoaded && <>
        <ColourContext.Provider value={colourState}>
            <Head>
                { window.matchMedia('(prefers-color-scheme: dark)').matches ? <link rel='icon' href='/favicon-dark.ico'/>
                    : <link rel='icon' href='/favicon-light.ico' />
                }
                <title>Flowmodoro</title>
            </Head>
                <Container>
                    <Stopwatch setTitle={setTitle}/>
                        <div className='absolute right-2 top-2'>
                            <button onClick={() => setShowModal(true)}>
                                {colour === 'dark' && (
                                    <FontAwesomeIcon icon={faGear} size='2x' style={{color: "#ffffff"}} />
                                )}
                                {colour === 'light' && (
                                    <FontAwesomeIcon icon={faGear} size='2x' style={{color: "#000000"}} />
                                )}
                            </button>
                        </div>
                </Container>
                <p className='text-xs'>Site icon made by iconfield on The Noun Project. Used under the Creative Commons license.</p>
                {showModal && (
                    <SettingsModal setShowModal={setShowModal}/>
                )}
        </ColourContext.Provider>
      </>
  );
};

export default Home;
