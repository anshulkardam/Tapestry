import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
} from "../controllers/category.cont";
import { shouldBeAdmin } from "../middleware/auth";

const router: Router = Router();

router.post("/", shouldBeAdmin, createCategory);

router.put("/:id", shouldBeAdmin, updateCategory);

router.delete("/:id", shouldBeAdmin, deleteCategory);

router.get("/", getCategories);

export default router;
