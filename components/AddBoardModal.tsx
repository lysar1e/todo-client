import React, {useEffect, useState} from "react";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import {Loader} from "./Loader";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import theme from "../store/theme";

export const AddBoardModal: React.FC = observer(() => {
    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();
    useEffect(() => {
        document.body.addEventListener("click", function (event) {
            const elem = event.target;
            //@ts-ignore
            if (elem.classList.contains("modalka")) {
                closeModal();
            }
        });
    }, []);
    const closeModal = () => {
        setIsClicked(false);
    }
    const [name, setName] = useState("");
    const createBoard = () => {
        try {
            setIsLoading(true);
            axiosJWT.post(`${URL}/board/create`, {name}, {withCredentials: true}).then(() => {
                setIsLoading(false);
                setIsClicked(false);
                router.replace('/');
            });
        } catch (e) {
            console.warn(e)
            setIsLoading(false);
        }
    }
    return (
        <>
            <button className={`btn ${theme.theme}`} onClick={() => setIsClicked(true)} data-testid="add-board-modal">Добавить доску</button>
                <div id="myModal" className={isClicked ? "modalka show" : "modalka"} data-testid="my-modal">
                    <div className={`modal-content ${theme.theme}`}>
                        {isLoading ? <Loader/> :
                            <>
                            <span className="close" onClick={() => closeModal()}>
                          &times;
                        </span>
                            <form onSubmit={e => e.preventDefault()}>
                            <h5 className={`board-name ${theme.theme}`}>Название доски</h5>
                            <input type="text" placeholder="Название доски..." onChange={e => setName(e.target.value)} className={theme.theme}/>
                            <button type="submit" className={`btn ${theme.theme}`} onClick={() => createBoard()}>Добавить</button>
                            </form>
                            </>
                        }
                    </div>
                </div>
        </>
    )
});