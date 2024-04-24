import Router from "express"
import {createReview, getReview, getReviews, getReviewsByMovieId, getReviewsByUserId} from "../controllers/reviewController"

const router = Router()

/**
 * @openapi
 * tags:
 *  name: Review
 *  description: The review managing API
 */

/**
 * @openapi
 * /review/create:
 *   post:
 *     tags: [Review]
 *     description: Create review
 *     consumes:
 *          - json
 *     parameters:
 *          - in: number
 *            name: movieId
 *            type: number
 *            description: movie ID
 *          - in: string
 *            name: text
 *            type: string
 *            description: review text
 *          - in: json
 *            name: criteria
 *            type: object
 *            description: rating by criteria
 *     responses:
 *       200:
 *         description: review created
 */
router.post('/create', createReview)



/**
 * @openapi
 * /review/all:
 *   get:
 *     tags: [Review]
 *     description: Get reviews
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all', getReviews)



/**
 * @openapi
 * /review/all/byUId/{userId}:
 *   get:
 *     tags: [Review]
 *     description: Get reviews by userId
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all/byUId/:id', getReviewsByUserId)



/**
 * @openapi
 * /review/all/byMId/{movieId}:
 *   get:
 *     tags: [Review]
 *     description: Get reviews by movieId
 *     responses:
 *       200:
 *         description: reviews
 */
router.get('/all/byMId/:id', getReviewsByMovieId)


export default router