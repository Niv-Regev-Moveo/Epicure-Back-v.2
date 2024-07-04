/**
 * @swagger
 * tags:
 *   name: Chefs
 *   description: Chef management
 */

/**
 * @swagger
 * /api/v1/chefs:
 *   get:
 *     summary: Retrieve a list of chefs
 *     tags: [Chefs]
 *     responses:
 *       200:
 *         description: A list of chefs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chef'
 *             examples:
 *               chef:
 *                 value:
 *                   _id: "6679491d9f9af604650df1d7"
 *                   name: "Yuval Ben Neriah"
 *                   image: "https://s3-alpha-sig.figma.com/img/633a/3efb/1c993e795f129e18faad1e1d8e49bb67?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WQFwqawexN14p~v~f-y1fYPav27JxFD1xobtEdlxKSqHcnDAP2OJvkyyNoXBPxWz~GygYbanoVpB9in7xGaheI8XtSAXaklmoV3PecMPxQWdDAkCn8xHUEOda2D4UbLpqlne1VCaMrrXHuiAtf750Br4R7uuQsLE-Acq-JNykZJrs-aHuagIA9rNdhZT00NCcPoXBs953bWhQzPxq2ELKZ4J3E429~b49wsYiP6H3sn337lExFjbxhmD5l8KgBiaeZnPrE9L5OFBXz~Uhni1dmCc~MTO~V-5rL79uT7ubKrtEvlV7laoviE611vFMfSWnNuNtCEWKO0ebweowylIaQ__"
 *                   description: "Chef Yuval Ben Neriah, with his unwavering passion for culinary arts, has carved a niche for himself in the vibrant culinary landscape. His journey, marked by dedication and innovation, has led him to create gastronomic wonders that tantalize the taste buds and leave a lasting impression."
 *                   chefOfTheWeek: false
 *                   restaurants: ["restaurantId1", "restaurantId2", "restaurantId3", "restaurantId4"]
 *                   status: "active"
 */

/**
 * @swagger
 * /api/v1/chefs/{id}:
 *   get:
 *     summary: Get a chef by ID
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chef ID
 *     responses:
 *       200:
 *         description: The chef description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chef'
 *       404:
 *         description: Chef not found
 */

/**
 * @swagger
 * /api/v1/chefs:
 *   post:
 *     summary: Create a new chef
 *     tags: [Chefs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chef'
 *     responses:
 *       201:
 *         description: Chef created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chef'
 */

/**
 * @swagger
 * /api/v1/chefs/{id}:
 *   put:
 *     summary: Update a chef by ID
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chef ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chef'
 *     responses:
 *       200:
 *         description: Chef updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chef'
 *       404:
 *         description: Chef not found
 */

/**
 * @swagger
 * /api/v1/chefs/{id}:
 *   delete:
 *     summary: Delete a chef by ID
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chef ID
 *     responses:
 *       200:
 *         description: Chef deleted successfully
 *       404:
 *         description: Chef not found
 */

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
 *         - chefOfTheWeek
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the chef
 *         name:
 *           type: string
 *           description: Chef's name
 *         image:
 *           type: string
 *           description: Chef's image URL
 *         description:
 *           type: string
 *           description: Chef's description
 *         chefOfTheWeek:
 *           type: boolean
 *           description: Is the chef the chef of the week
 *         restaurants:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the restaurants associated with the chef
 *         status:
 *           type: string
 *           description: The status of the chef
 */
