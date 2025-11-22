import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.cont";
import { shouldBeAdmin } from "../middleware/auth";

const router: Router = Router();

router.post("/", shouldBeAdmin, createProduct);

router.put("/:id", shouldBeAdmin, updateProduct);

router.delete("/:id", shouldBeAdmin, deleteProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

export default router;
