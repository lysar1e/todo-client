import {GetServerSideProps, NextPage} from "next";
import { RegistrationComponent } from "../components/RegistrationComponent";
import {notRequireAuthentication} from "../HOC/requireAuthentication";
import {Navbar} from "../components/Navbar";

const Registration: NextPage = () => {
  return (
      <>
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