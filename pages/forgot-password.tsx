import {GetServerSideProps, NextPage} from "next";
import {notRequireAuthentication} from "../HOC/requireAuthentication";
import {ForgotPasswordComponent} from "../components/ForgotPasswordComponent";
import {Navbar} from "../components/Navbar";

const ForgotPassword: NextPage = () => {
    return (
        <>
            <Navbar isLogin={false} />
            <ForgotPasswordComponent/>
        </>
    )
}
export default ForgotPassword;
export const getServerSideProps: GetServerSideProps = notRequireAuthentication(
    async () => {
        return {
            props: {}
        }
    }
)