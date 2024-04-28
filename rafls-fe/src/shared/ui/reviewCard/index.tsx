import {FC} from "react"
import styles from "./styles.module.scss"
import {Link} from "react-router-dom"
import {ReviewType} from "../../../entities/review/model.ts";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {GetUserName} from "../../../entities/user/api.ts";

export const ReviewCard: FC<ReviewType> = (data) => {
    const {data: name} = GetUserName(Number(data.userId))
    return (
        <Link
            className={styles.reviewWrapper}
            to={`/films`}
        >
                <Typography
                    variant="h5"
                    color="white"
                >
                    {name}
                </Typography>
                <div className={styles.review}>
                    <div className={styles.review__rating}>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Актерская игра
                            </Typography>
                            <Rating
                                readOnly
                                name="actorRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                value={data.criteria.actorRate}
                            />
                        </div>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Визуал
                            </Typography>
                            <Rating
                                readOnly
                                name="graphicsRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                value={data.criteria.graphicsRate}
                            />
                        </div>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Сюжет
                            </Typography>
                            <Rating
                                readOnly
                                name="scriptRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                value={data.criteria.scriptRate}
                            />
                        </div>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Вероятность пересмотра
                            </Typography>
                            <Rating
                                readOnly
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                name="rewatchValue"
                                value={data.criteria.rewatchValue}
                            />
                        </div>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Общее впечатление
                            </Typography>
                            <Rating
                                readOnly
                                name="generalRate"
                                sx={{'.MuiRating-icon': {color: 'unset'}}}
                                value={data.criteria.generalRate}
                            />
                        </div>
                        <div className={styles.review__ratingItem}>
                            <Typography variant="h5" color="white" fontWeight={500}>
                                Дата создания рецензии:
                            </Typography>
                            <Typography variant="body2" color="white" fontWeight={400}>
                                {new Date(data.createdAt).toLocaleString()}
                            </Typography>
                        </div>
                    </div>
                </div>
        </Link>
    )
}