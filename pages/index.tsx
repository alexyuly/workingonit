import type { GetServerSideProps } from 'next';
import type { ComponentProps } from 'react';

import Head from 'next/head';
import { useState } from 'react';
import Card from "../components/Card";
import NewCardInput from "../components/NewCardInput";

interface Props {
  cards: ComponentProps<typeof Card>[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      cards: [
        {
          status: "inactive",
          text: "This card has not been completed yet.",
        },
        {
          status: "active",
          text: "This card is being worked on now.",
        },
        {
          status: "done",
          text: "This card has been completed already.",
        },
      ],
    },
  };
};

const Home = ({
  cards,
}: Props) => {
  const [cardsLocal, setCardsLocal] = useState(cards);

  return (
    <>
      <Head>
        <title>Working On It</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-xl mx-auto my-4">
        <NewCardInput
          onSubmitNewCard={(value) => {
            setCardsLocal([
              {
                status: "inactive",
                text: value,
              },
              ...cardsLocal,
            ])
          }}
        />
        {cardsLocal.map((card, index) => {
          return (
            <Card
              key={index}
              status={card.status}
              text={card.text}
            />
          )
        })}
      </main>
    </>
  )
}

export default Home