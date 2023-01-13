import { Router } from "express";

const router = Router( );

/**
 * Responsável pela splashscreen da página principal.
 */
router.get("/", ( request, response ) => {
    response.send({ message: "Welcome." });
})

export default router;