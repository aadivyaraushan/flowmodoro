import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Stopwatch from '../components/Stopwatch';
import Container from '../components/Container';

const Home: NextPage = () => {
  return (
    <Container>
      <Stopwatch />
    </Container>
  );
};

export default Home;
