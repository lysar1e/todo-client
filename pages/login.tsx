import {GetServerSideProps, NextPage} from "next";
import { SignInComponent } from "../components/SignInComponent";
import {notRequireAuthentication, requireAuthentication} from "../HOC/requireAuthentication";
import {Navbar} from "../components/Navbar";
import Head from 'next/head'

const Login: NextPage = () => {
  return (
      <>
      <Head>
       <meta name="description" content="Mern todo app это - веб-приложение для записей списков дел, которые нужно сделать. Приложение имеет удобный интерфейс." />
       <meta name="keywords" content="mern todo app, mern, todo, список дел, app" />
       <title>Mern Todo App - авторизация</title> 
      </Head>
      <Navbar isLogin={false} />
      <SignInComponent />
      </>
  );
};
export default Login;
export const getServerSideProps: GetServerSideProps = notRequireAuthentication(
    async (ctx) => {
      return {
        props: {},
      };
    }
);
