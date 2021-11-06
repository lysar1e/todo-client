import React from "react";
import theme from "../store/theme";
import Link from "next/link";
type ContributorBoardsComponentProps = {
    contributorBoards: {id: number, owner: number, name: string, contributors: number[]}[];
}
export const ContributorBoardsComponent: React.FC<ContributorBoardsComponentProps> = ({contributorBoards}) => {
    return (
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
    )
}