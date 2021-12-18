import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { requireAuthentication } from "../HOC/requireAuthentication";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { URL } from "../constants/url";
import { MainPage } from "../components/MainPage";
export type MainPageProps = {
  boards: { id: number; owner: number; name: string; contributors: number[] }[];
  contributorBoards: {
    id: number;
    owner: number;
    name: string;
    contributors: number[];
  }[];
};
const Home: NextPage<MainPageProps> = ({ boards, contributorBoards }) => {
  return (
    <>
      <Head>
        <title>Страница заданий</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogin={true} />
      <MainPage boards={boards} contributorBoards={contributorBoards} />
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    const res = await axios.get(`${URL}/board/get/`, {
      withCredentials: true,
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });
    const data = await res.data;
    return {
      props: { boards: data.boards, contributorBoards: data.contributorBoards },
    };
  }
);
