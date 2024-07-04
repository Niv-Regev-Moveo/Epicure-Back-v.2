/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management
 */

/**
 * @swagger
 * /api/v1/dishes:
 *   get:
 *     summary: Retrieve a list of dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: A list of dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 */

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dish ID
 *     responses:
 *       200:
 *         description: The dish description by ID
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Dish not found
 */

/**
 * @swagger
 * /api/v1/dishes:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       201:
 *         description: The dish was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *   put:
 *     summary: Update a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dish ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       200:
 *         description: The dish was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *   delete:
 *     summary: Remove a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dish ID
 *     responses:
 *       200:
 *         description: The dish was successfully deleted
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Some server error
 */
