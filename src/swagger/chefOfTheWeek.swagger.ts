/**
 * @swagger
 * tags:
 *   name: ChefOfTheWeek
 *   description: Chef of the Week management
 */

/**
 * @swagger
 * /api/v1/chefOfTheWeek:
 *   get:
 *     summary: Retrieve the Chef of the Week
 *     tags: [ChefOfTheWeek]
 *     responses:
 *       200:
 *         description: The Chef of the Week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChefOfTheWeek'
 *       404:
 *         description: Chef of the Week not found
 */

/**
 * @swagger
 * /api/v1/chefOfTheWeek/{id}:
 *   post:
 *     summary: Create a new Chef of the Week
 *     tags: [ChefOfTheWeek]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chef ID
 *     responses:
 *       201:
 *         description: The Chef of the Week was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChefOfTheWeek'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
