import {GetServerSideProps, NextPage} from "next";
import { RegistrationComponent } from "../components/RegistrationComponent";
import {notRequireAuthentication} from "../HOC/requireAuthentication";
import {Navbar} from "../components/Navbar";
import Head from 'next/head'

const Registration: NextPage = () => {
  return (
      <>
      <Head>
        <meta name="description" content="Mern todo app это - веб-приложение для записей списков дел, которые нужно сделать. Приложение имеет удобный интерфейс." />
        <meta name="keywords" content="mern todo app, mern, todo, список дел, app" />
        <title>Mern Todo App - регистрация</title>
      </Head>
      <Navbar isLogin={false}/>
      <RegistrationComponent />
      </>
  );
};
export default Registration;
export const getServerSideProps: GetServerSideProps = notRequireAuthentication(
    async (ctx) => {
      return {
        props: {},
      };
    }
);
