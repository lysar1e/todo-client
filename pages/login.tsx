import { GetServerSideProps, NextPage } from "next";
import { SignInComponent } from "../components/SignIn";
import {
  notRequireAuthentication,
  requireAuthentication,
} from "../HOC/requireAuthentication";
import { Navbar } from "../components/Navbar";

const Login: NextPage = () => {
  return (
    <>
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
