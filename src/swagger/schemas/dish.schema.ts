/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - price
 *         - ingredients
 *         - restaurant
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the dish
 *         name:
 *           type: string
 *           description: The name of the dish
 *         image:
 *           type: string
 *           description: The image URL of the dish
 *         type:
 *           type: string
 *           description: The type of the dish
 *           enum:
 *             - VEGAN
 *             - VEGETARIAN
 *             - GLUTEN_FREE
 *         price:
 *           type: number
 *           description: The price of the dish
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of tags for the dish
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of ingredients for the dish
 *         restaurant:
 *           type: string
 *           description: The ID of the restaurant
 *         status:
 *           type: string
 *           description: The status of the dish
 *       example:
 *         _id: 667bc3e09c5480b0d918577a
 *         name: Crispy Tofu Bowl
 *         image: https://s3-alpha-sig.figma.com/img/fbfa/24c1/d4b333fbfe627670966f98742...
 *         type: null
 *         price: 75
 *         tags: []
 *         ingredients: [tofu, rice, broccoli, carrots, peanuts, sauce]
 *         restaurant: 667aa9f5e43517c0de633b4a
 *         status: active
 */
