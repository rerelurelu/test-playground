import { Grid, Link } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid placeItems={'center'} mt={200} gap={10}>
        <Link href="/page1">Page1</Link>
        <Link href="/page2">Page2</Link>
        <Link href="/page3">Page3</Link>
      </Grid>
    </>
  );
}
