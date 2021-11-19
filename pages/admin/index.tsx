import { GetServerSideProps, NextPage } from "next";
import {
  notRequireAuthentication,
  requireAdminRole,
  requireAuthentication,
} from "../../HOC/requireAuthentication";
import { Navbar } from "../../components/Navbar";
import { AdminPanel } from "../../components/AdminPanel";

const Admin: NextPage = () => {
  return (
    <>
      <Navbar isLogin={true} />
      <AdminPanel />
    </>
  );
};
export default Admin;
export const getServerSideProps: GetServerSideProps = requireAdminRole(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
