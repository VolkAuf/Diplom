import {useLocation, useNavigate, useParams} from "react-router"
import inceptionBG from './assets/inception.png'
import styles from './styles.module.scss'
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import {useEffect, useMemo, useRef, useState} from "react"
import {GetItemById, GetSameListItems} from "entities/film/api"
import {CardList} from "features/cardList"
import {useIsAuthenticated} from "entities/user/model"
import {ReviewForm} from "./ui/reviewForm"
import {GetReview} from "entities/review/api"
import {Review} from "./ui/review"

export const ItemPage = () => {
  const {id} = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [isShowReview, setIsShowReview] = useState(false)
  const isAuthenticated = useIsAuthenticated()
  const {data} = GetItemById(Number(id))
  const {data: review} = GetReview(Number(id))
  const {data: sameList} = GetSameListItems(data?.lists)

  const isSeries = useMemo(() => pathname.split('/')[1] === 'series', [pathname])

  const getSeriesDuration = useMemo(() => {
    if (!data?.seasonsInfo) return

    const info = data.seasonsInfo
      .reduce((acc, curr) => ({
        number: acc.number ? acc.number + 1 : 1,
        episodesCount: acc.episodesCount !== undefined && curr.episodesCount !== undefined ?
          acc.episodesCount + curr.episodesCount : 1
      }), {number: 0, episodesCount: 0})

    return `Кол-во сезонов: ${info.number} | Кол-во эпизодов: ${info.episodesCount}`
  }, [data?.seasonsInfo])

  const showHandler = () => {
    if (!isAuthenticated)
      return navigate('/login')

    setIsShowReview(true)
    setTimeout(() => {
      console.log(ref.current)
      ref.current?.scrollIntoView()
    }, 100)
  }

  useEffect(() => {
    if (!review) return

    setIsShowReview(false)
  }, [review])

  if (!data) return <></>

  return (
    <>
      <div className={styles.slide}>
        <img className={styles.slide__bg} src={data.backdrop?.url || inceptionBG} alt={data.name}/>
        <Typography
          sx={{zIndex: 1, fontSize: '96px', fontWeight: 300}}
          variant="h2"
          color="white"
        >
          {data.name}
        </Typography>
        <Typography
          sx={{zIndex: 1, fontWeight: 500}}
          variant="h5"
          color="#A7A7A7"
        >
          {!isSeries ? data.genres?.map((item) => item.name + ' | ') : null}
          {!isSeries ? data.year : null}
          {isSeries ? getSeriesDuration : null}
        </Typography>
        <Typography
          sx={{zIndex: 1, fontWeight: 300, maxWidth: 605, fontSize: '32px', overflow: 'hidden'}}
          variant="h4"
          color="white"
        >
          {data.shortDescription || data.description}
        </Typography>
        <Button
          sx={{borderRadius: '60px', p: '10px 34px', mt: '35px'}}
          color="warning"
          variant="contained"
          onClick={showHandler}
          disabled={isShowReview || Boolean(review)}
        >
          Оцени сейчас
        </Button>
      </div>
      <div className={styles.main}>
        <CardList data={sameList}/>
        {isShowReview && !review ? <ReviewForm ref={ref}/> : null}
        {review ? <Review text={review.text} criteria={review.criteria} dateCreated={review.createdAt}/> : null}
      </div>
    </>
  )
}