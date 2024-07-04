/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search management
 */

/**
 * @swagger
 * /api/v1/search/{keyword}:
 *   get:
 *     summary: Search for chefs, restaurants, and dishes by keyword
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: The keyword to search for
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chefs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chef'
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 *                 dishes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Keyword not found
 *       500:
 *         description: Some server error
 */
