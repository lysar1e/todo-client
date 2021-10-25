import {GetServerSideProps, NextPage} from "next";
import axios from "axios";
import {URL} from "../../constants/url";
import {requireAuthentication} from "../../HOC/requireAuthentication";
import {useRouter} from "next/router";
import {useEffect} from "react";
type Props = {
    boardId: number;
}
const InviteLink: NextPage<Props> = ({boardId}) => {
    const router = useRouter();
    useEffect(() => {
        router.replace(`/board/${boardId}`);
    }, []);
    console.log(boardId)
    return (
        <div>
            hello
        </div>
    )
}
export default InviteLink;
export const getServerSideProps: GetServerSideProps = requireAuthentication(
    async (ctx) => {
        const code = ctx.query.code;
       const res = await axios.post(`${URL}/link/join`, {code}, {withCredentials: true, headers: {
                Cookie: ctx.req.headers.cookie
            }})
        const data = await res.data;
        // console.log(data.boardId)
        return {
            props: {boardId: data.boardId},
        };
    }
);