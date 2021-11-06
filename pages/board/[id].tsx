import {GetServerSideProps, NextPage} from "next";
import {BoardComponent} from "../../components/BoardComponent";
import axios from "axios";
import {URL} from "../../constants/url";
export type BoardProps = {
    board: {id: number, owner: number, name: string, contributors: number[], generatedLink: string, todos: {id: number, text: string; completed: boolean; important: boolean}[]};
}
const Board: NextPage<BoardProps> = ({board}) => {
    return (
        <BoardComponent board={board}/>
    )
}
export default Board;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id;
    try {
        const res = await axios.get(`${URL}/board/${id}`, {withCredentials: true, headers: {
                Cookie: context.req.headers.cookie
            }});
        const board = await res.data;
        return {
            props: {board},
        };
    } catch (e: any) {
       if (e.response) {
           if (e.response.status === 403 || 404) {
               return {
                   redirect: {
                       permanent: false,
                       destination: "/",
                   },
               };
           }
       }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
    };
}