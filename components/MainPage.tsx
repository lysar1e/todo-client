import React, {useState} from "react";
import {AddBoardModal} from "./AddBoardModal";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import {MainPageProps} from "../pages";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import theme from "../store/theme";
export const MainPage: React.FC<MainPageProps> = observer(({boards, contributorBoards}) => {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div className="container row">
            <h3 className={`my-boards ${theme.theme}`}>Мои доски</h3>
            <button className={`btn ${theme.theme}`} onClick={() => setIsClicked(true)}>Добавить доску</button>
            <AddBoardModal isClicked={isClicked} setIsClicked={setIsClicked} />
            <div className="cards">
                {
                    boards.length ?
                        boards.map(item => {
                            return (
                                // <div key={item.id}>
                                    <div className="card horizontal" key={item.id}>
                                        <div className={`card-stacked ${theme.theme}`}>
                                            <div className="card-content">
                                                <p>{item.name}</p>
                                            </div>
                                            <div className="card-action">
                                                <Link href={`/board/${item.id}`}><a className={theme.theme}>Перейти к доске</a></Link>
                                            </div>
                                        </div>
                                    </div>
                                // </div>
                            )
                        })
                        : <h5>Досок нет</h5>
                }
            </div>
            <h3 className={`my-boards ${theme.theme}`}>Доски в которых участвуешь</h3>
            <div className="cards">
                {
                    contributorBoards ?
                        <>
                            <br/>
                            {
                                contributorBoards.map(item => {
                                    return (
                                            <div className="card horizontal" key={item.id}>
                                                <div className={`card-stacked ${theme.theme}`}>
                                                    <div className="card-content">
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <div className="card-action">
                                                        <Link href={`/board/${item.id}`}><a className={theme.theme}>Перейти к доске</a></Link>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                })
                            }
                        </>
                        : null
                }
            </div>
        </div>
    )
})