/**
 * @swagger
 * components:
 *   schemas:
 *     Chef:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - description
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the chef
 *         name:
 *           type: string
 *           description: The name of the chef
 *         image:
 *           type: string
 *           description: The image URL of the chef
 *         description:
 *           type: string
 *           description: The description of the chef
 *         chefOfTheWeek:
 *           type: boolean
 *           description: Whether the chef is the chef of the week
 *         restaurants:
 *           type: array
 *           items:
 *             type: string
 *             description: The id of the restaurant
 *         status:
 *           type: string
 *           enum: [active, archive]
 *           description: The status of the chef
 *       example:
 *         _id: 6679491d9f9af604650df1d6
 *         name: "Yossi Shitrit"
 *         image: "https://s3-alpha-sig.figma.com/img/ecf7/ed9d/73aeb3d11f70c9712f15e5823..."
 *         description: "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades..."
 *         chefOfTheWeek: true
 *         restaurants: ["667aa705e43517c0de633b42"]
 *         status: "active"
 */
