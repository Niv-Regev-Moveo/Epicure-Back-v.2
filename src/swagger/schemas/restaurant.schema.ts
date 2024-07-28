/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - rating
 *         - description
 *         - chef
 *         - dishes
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the restaurant
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *         image:
 *           type: string
 *           description: The image URL of the restaurant
 *         rating:
 *           type: number
 *           description: The rating of the restaurant
 *         description:
 *           type: string
 *           description: The description of the restaurant
 *         chef:
 *           type: string
 *           description: The ID of the chef
 *         dishes:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of dish IDs
 *         status:
 *           type: string
 *           description: The status of the restaurant
 *       example:
 *         _id: 667aa9f5e43517c0de633b4a
 *         name: Claro
 *         image: https://s3-alpha-sig.figma.com/img/868d/15e4/c3a1aa1bfb70ad4213eb3d21c...
 *         rating: 4
 *         description: The claro restaurant by chef Ran Shmoeli, one of the oldest and most r...
 *         chef: 6679491d9f9af604650df1dc
 *         dishes: [667bc5209c5480b0d9185792, 6685113ba02a91a032b4746b, 6685120ea02a91a032b4746e]
 *         status: active
 */
